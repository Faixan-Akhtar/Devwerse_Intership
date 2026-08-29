import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./RequestBlood.css";
import Navbar from "./components/Navbar";

const API_URL = "http://localhost:5000/api";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function PhoneIcon() {
  return <span className="rb-icon">☎</span>;
}

function MailIcon() {
  return <span className="rb-icon">✉</span>;
}

function LocationIcon() {
  return <span className="rb-icon">⌖</span>;
}

function BloodIcon() {
  return <span className="rb-blood-icon">♥</span>;
}

export default function RequestBlood() {
  const { donorId } = useParams();
  const navigate = useNavigate();

  const [donor, setDonor] = useState(null);

  // Field names match the backend's blood-request payload exactly.
  // Do NOT send donorId / city / reason — the backend doesn't use them.
  const [formData, setFormData] = useState({
    bloodGroup: "",
    units: "1",
    hospital: "",
    location: "",
    urgency: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!donorId) {
      setError("Donor ID is missing.");
      setLoading(false);
      return;
    }

    fetchDonor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donorId]);

  // ===========GET SELECTED DONOR==============
  async function fetchDonor() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        navigate("/login", { replace: true });
        return;
      }

      const response = await fetch(`${API_URL}/donors/${donorId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        alert("Your session has expired. Please login again.");
        navigate("/login", { replace: true });
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Donor not found");
      }

      const donorData = data.donor || data.data;

      if (!donorData) {
        throw new Error("Donor information was not found.");
      }

      setDonor(donorData);

      setFormData((prev) => ({
        ...prev,
        bloodGroup: donorData.bloodGroup || "",
        location: donorData.location || donorData.city || "",
        units: "1",
      }));
    } catch (err) {
      console.error("Fetch donor error:", err);
      setError(err.message || "Unable to load donor information.");
    } finally {
      setLoading(false);
    }
  }

  // ===========HANDLE FORM INPUT=============
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    // Get selected donor ID
    const selectedDonorId = donor?._id || donor?.id;

    console.log("=================================");
    console.log("SENDING BLOOD REQUEST");
    console.log("DONOR:", donor);
    console.log("DONOR ID:", selectedDonorId);
    console.log("BLOOD GROUP:", formData.bloodGroup);
    console.log("UNITS:", formData.units);
    console.log("HOSPITAL:", formData.hospital);
    console.log("LOCATION:", formData.location);
    console.log("URGENCY:", formData.urgency);
    console.log("MESSAGE:", formData.message);
    console.log("=================================");

    // =========VALIDATION============

    if (!selectedDonorId) {
      setError("Donor information is missing.");
      return;
    }

    if (!formData.bloodGroup) {
      setError("Blood group is required.");
      return;
    }

    if (!formData.units) {
      setError("Units are required.");
      return;
    }

    if (!formData.hospital.trim()) {
      setError("Hospital is required.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!formData.urgency) {
      setError("Please select urgency.");
      return;
    }

    try {
      setSending(true);

      // ======REQUEST BODY=======

      const requestBody = {
        donorId: selectedDonorId,

        bloodGroup: formData.bloodGroup,

        units: Number(formData.units),

        hospital: formData.hospital.trim(),

        location: formData.location.trim(),

        urgency: formData.urgency,

        message: formData.message.trim(),
      };

      console.log("========== REQUEST BODY ==========");

      console.log(requestBody);

      // ============API REQUEST==============

      const response = await fetch(`${API_URL}/blood-requests`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      console.log("========== SERVER RESPONSE ==========");

      console.log("STATUS:", response.status);

      console.log("DATA:", data);

      // ============TOKEN EXPIRED=============

      if (response.status === 401) {
        localStorage.removeItem("token");

        alert("Your session has expired. Please login again.");

        navigate("/login", {
          replace: true,
        });

        return;
      }

      // ===========SERVER ERROR===========

      if (!response.ok) {
        throw new Error(data.message || "Failed to send blood request");
      }

      // =========SUCCESS=========

      setSuccess(
        "Blood request sent successfully! The donor will be notified.",
      );
      navigate("/home");
      alert("Blood request sent successfully! The donor will be notified.");

      // Clear only fields that should be entered again
      setFormData((prev) => ({
        ...prev,

        units: "1",

        hospital: "",

        urgency: "",

        message: "",
      }));
    } catch (err) {
      console.error("Send blood request error:", err);

      setError(err.message || "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  // ===========LOADING===========
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="rb-loading">
          <div className="rb-spinner"></div>
          <p>Loading donor information...</p>
        </div>
      </>
    );
  }

  // =========DONOR NOT FOUND=========
  if (error && !donor) {
    return (
      <>
        <Navbar />
        <div className="rb-error-page">
          <div className="rb-error-card">
            <h2>Donor Not Found</h2>
            <p>{error}</p>
            <button
              onClick={() => navigate("/find-donor")}
              className="rb-back-btn"
            >
              Back to Find Donor
            </button>
          </div>
        </div>
      </>
    );
  }

  //========MAIN PAGE==========
  return (
    <>
      <Navbar />

      <main className="rb-page">
        <button className="rb-back-link" onClick={() => navigate(-1)}>
          ← Back to Donor Profile
        </button>

        <section className="rb-heading">
          <div>
            <h1>
              Request Blood <span>🩸</span>
            </h1>
            <p>You are requesting blood from the donor below.</p>
          </div>
        </section>

        <div className="rb-grid">
          {/* DONOR INFORMATION */}
          <section className="rb-card rb-donor-card">
            <div className="rb-card-heading">
              <div className="rb-heading-icon">👤</div>
              <h2>Donor Information</h2>
            </div>

            <div className="rb-donor-header">
              <div className="rb-avatar">
                {donor.photoUrl ? (
                  <img src={donor.photoUrl} alt={donor.name} />
                ) : (
                  getInitials(donor.name)
                )}
              </div>

              <div className="rb-donor-main">
                <div className="rb-name-status">
                  <h2>{donor.name}</h2>
                  <span
                    className={
                      donor.isAvailable
                        ? "rb-status available"
                        : "rb-status unavailable"
                    }
                  >
                    ● {donor.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>

                <p className="rb-blood">
                  <BloodIcon />
                  Blood Group: <strong>{donor.bloodGroup}</strong>
                </p>

                <p className="rb-location">
                  <LocationIcon />
                  {donor.city || donor.location}
                </p>
              </div>
            </div>

            <div className="rb-divider"></div>

            <div className="rb-contact-list">
              {donor.phone && (
                <div className="rb-contact-row">
                  <PhoneIcon />
                  <div>
                    <span>Phone</span>
                    <strong>{donor.phone}</strong>
                  </div>
                </div>
              )}

              {donor.email && (
                <div className="rb-contact-row">
                  <MailIcon />
                  <div>
                    <span>Email</span>
                    <strong>{donor.email}</strong>
                  </div>
                </div>
              )}

              {donor.address && (
                <div className="rb-contact-row">
                  <LocationIcon />
                  <div>
                    <span>Address</span>
                    <strong>{donor.address}</strong>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* REQUEST FORM */}
          <section className="rb-card rb-request-card">
            <div className="rb-card-heading">
              <div className="rb-heading-icon">📄</div>
              <h2>Request Details</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="rb-form-row">
                <div className="rb-field">
                  <label>Blood Group</label>
                  <div className="rb-readonly-input">
                    🩸 {formData.bloodGroup}
                  </div>
                </div>

                <div className="rb-field">
                  <label>
                    Units Required<span>*</span>
                  </label>
                  <input
                    type="number"
                    name="units"
                    min="1"
                    value={formData.units}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="rb-form-row">
                <div className="rb-field">
                  <label>
                    Hospital<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    placeholder="Enter hospital name"
                    required
                  />
                </div>

                <div className="rb-field">
                  <label>
                    Location<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    required
                  />
                </div>
              </div>

              <div className="rb-field">
                <label>
                  Urgency<span>*</span>
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select urgency</option>
                  <option value="EMERGENCY">Emergency</option>
                  <option value="SURGERY">Surgery</option>
                  <option value="ACCIDENT">Accident</option>
                  {/* <option value="MEDICAL TREATMENT">Medical Treatment</option> */}
                  <option value="LOW">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="rb-field">
                <label>
                  Message <small>(Optional)</small>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Explain why you need blood..."
                  rows="5"
                />
              </div>

              {error && <div className="rb-alert rb-alert-error">{error}</div>}
              {success && (
                <div className="rb-alert rb-alert-success">{success}</div>
              )}

              <button
                type="submit"
                className="rb-submit-btn"
                disabled={sending || !donor.isAvailable}
              >
                {sending ? "Sending Request..." : "➤ Send Blood Request"}
              </button>

              {!donor.isAvailable && (
                <p className="rb-unavailable-message">
                  This donor is currently unavailable.
                </p>
              )}
            </form>
          </section>
        </div>

        <section className="rb-safe-card">
          <div className="rb-safe-main">
            <div className="rb-safe-icon">🛡️</div>
            <div>
              <h3>Your Information is Safe</h3>
              <p>Your blood request is securely submitted through LifeLink.</p>
            </div>
          </div>

          <div className="rb-safe-items">
            <div>
              <strong>🔒 Secure</strong>
              <span>Your request is protected</span>
            </div>
            <div>
              <strong>✓ Private</strong>
              <span>Your data stays confidential</span>
            </div>
            <div>
              <strong>❤️ Help Save Lives</strong>
              <span>Your request can save a life</span>
            </div>
          </div>
        </section>

        <footer className="rb-footer">
          © 2026 LifeLink. All rights reserved.
        </footer>
      </main>
    </>
  );
}
