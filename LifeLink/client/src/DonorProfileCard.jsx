import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DonorProfileCard.css";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="9.5"
        r="2.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DonorProfileCard({ onRequestBlood }) {
  //   const { id } = useParams();
  const navigate = useNavigate();
  const { id } = useParams();

  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDonor() {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        // if (!token) {
        //   setError("Please login first.");
        //   return;
        // }
        if (!token) {
          alert("Please login first to view donor details.");
          navigate("/login");
          return;
        }

        console.log("Fetching donor ID:", id);

        const response = await axios.get(`${API_URL}/api/donors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Donor profile response:", response.data);

        setDonor(response.data.donor || response.data);

        //   } catch (error) {
        //     console.error("Fetch donor error:", error);

        //     setError(
        //       error.response?.data?.message ||
        //       "Donor not found"
        //     );
      } catch (error) {
        console.error("Fetch donor error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");

          alert("Your session has expired. Please login again.");

          navigate("/login");

          return;
        }

        setError(error.response?.data?.message || "Donor not found");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchDonor();
    } else {
      setError("Donor ID is missing");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="dpc-page">
        <div className="dpc-card">
          <h2>Loading donor...</h2>
        </div>
      </div>
    );
  }

  if (error || !donor) {
    return (
      <div className="dpc-page">
        <div className="dpc-card">
          <h2>Donor not found</h2>
          <p>{error || "We could not find the donor you are looking for."}</p>
        </div>
      </div>
    );
  }

  const name = donor.fullName || donor.name || "Unknown Donor";

  const available = donor.isAvailable === true || donor.available === true;

  const demographics = [
    donor.gender,
    donor.age ? `${donor.age} Yrs` : null,
    donor.weight ? `${donor.weight} kg` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const rows = [
    {
      icon: <PhoneIcon />,
      label: "Phone",
      value: donor.phone,
    },
    {
      icon: <MailIcon />,
      label: "Email",
      value: donor.email,
    },
    {
      icon: <PinIcon />,
      label: "City",
      value: donor.city,
    },
    {
      icon: <PinIcon />,
      label: "Address",
      value: donor.address,
    },
    {
      icon: <ClockIcon />,
      label: "Last Donation",
      value: donor.lastDonation,
    },
  ].filter((row) => row.value);

  return (
    <>
      <Navbar />
      <div className="dpc-page">
        <div className="dpc-card">
          <div className="dpc-top">
            {donor.photoUrl ? (
              <img
                className="dpc-photo"
                src={donor.photoUrl}
                alt={`${name}'s profile`}
              />
            ) : (
              <div className="dpc-photo dpc-photo-initials" aria-hidden="true">
                {getInitials(name)}
              </div>
            )}

            <div className="dpc-top-info">
              <div className="dpc-name-row">
                <h1>{name}</h1>

                <span
                  className={`dpc-badge ${
                    available ? "dpc-badge-on" : "dpc-badge-off"
                  }`}
                >
                  {available ? "Available" : "Unavailable"}
                </span>
              </div>

              <div className="dpc-blood">{donor.bloodGroup}</div>

              {demographics && (
                <p className="dpc-demographics">{demographics}</p>
              )}
            </div>
          </div>

          <div className="dpc-info-list">
            {rows.map((row) => (
              <div className="dpc-info-row" key={row.label}>
                <span className="dpc-info-left">
                  <span className="dpc-info-icon">{row.icon}</span>

                  <span className="dpc-info-label">{row.label}</span>
                </span>

                <span className="dpc-info-value">{row.value}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="dpc-request-btn"
            onClick={() => navigate(`/request-blood/${donor._id}`)}
          >
            Request Blood
          </button>
        </div>
      </div>
    </>
  );
}
