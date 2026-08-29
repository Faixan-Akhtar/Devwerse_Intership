import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FindDonor.css";
import Navbar from "./components/Navbar";

const API_URL = "http://localhost:5000";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

const AVATAR_PALETTE = [
  { bg: "#fde3e3", fg: "#d92d2d" },
  { bg: "#e0edff", fg: "#2c5cc9" },
  { bg: "#e7f7ec", fg: "#1f9d55" },
  { bg: "#fdf1de", fg: "#c9781f" },
  { bg: "#f1e8fb", fg: "#7c3aed" },
];

function avatarColors(name = "") {
  if (!name) return AVATAR_PALETTE[0];

  const index = name.charCodeAt(0) % AVATAR_PALETTE.length;

  return AVATAR_PALETTE[index];
}
function handleViewDonor(_id) {
  window.location.href = `/donor/${_id}`;
}

export default function FindDonor() {
  const navigate = useNavigate();
  // Empty means "no filter"
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  // Data from MongoDB
  const [donors, setDonors] = useState([]);

  // UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*========LOAD ALL AVAILABLE DONORS=======*/

  const fetchAllDonors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/api/donors/search`);

      console.log("ALL DONORS:", response.data);

      setDonors(response.data.donors || []);
    } catch (error) {
      console.error("LOAD DONORS ERROR:", error);

      setDonors([]);

      setError(error.response?.data?.message || "Unable to load donors.");
    } finally {
      setLoading(false);
    }
  };

  /*=========LOAD ALL DONORS WHEN PAGE OPENS=========*/

  useEffect(() => {
    fetchAllDonors();
  }, []);

  /*========SEARCH DONORS=========*/

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const params = {};

      if (bloodGroup.trim() !== "") {
        params.bloodGroup = bloodGroup.trim();
      }

      if (city.trim() !== "") {
        params.city = city.trim();
      }

      console.log("SEARCH PARAMS:", params);

      const response = await axios.get(`${API_URL}/api/donors/search`, {
        params,
      });

      console.log("SEARCH RESULT:", response.data);

      setDonors(response.data.donors || []);
    } catch (error) {
      console.error("SEARCH ERROR:", error);

      setDonors([]);

      setError(error.response?.data?.message || "Unable to search donors.");
    } finally {
      setLoading(false);
    }
  };

  /*========CLEAR FILTERS=========*/

  const handleClear = async () => {
    setBloodGroup("");
    setCity("");
    setError("");

    await fetchAllDonors();
  };

  /*=========VIEW DONOR=========*/

  return (
    <>
      <Navbar />

      <div className="fd-page">
        <div className="fd-shell">
          {/* ================= HERO ================= */}

          <section className="fd-hero">
            <h1>Find a Blood Donor</h1>

            <p>Search available donors near your location.</p>
          </section>

          {/* ================= FILTERS ================= */}

          <form className="fd-filters" onSubmit={handleSearch}>
            {/* Blood Group */}

            <div className="fd-field">
              <label htmlFor="fd-blood-group">Blood Group</label>

              <select
                id="fd-blood-group"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">All Blood Groups</option>

                {BLOOD_GROUPS.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}

            <div className="fd-field">
              <label htmlFor="fd-city">City</label>

              <input
                id="fd-city"
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            {/* Search */}

            <button type="submit" className="fd-search-btn" disabled={loading}>
              {loading ? "Searching..." : "Search Donors"}
            </button>

            {/* Clear */}

            <button
              type="button"
              className="fd-clear-btn"
              onClick={handleClear}
              disabled={loading}
            >
              Clear
            </button>
          </form>

          {/* ================= ERROR ================= */}

          {error && <div className="fd-error">{error}</div>}

          {/* ================= RESULTS ================= */}

          <section className="fd-results">
            <div className="fd-results-header">
              <div>
                <h2>
                  {city ? `Available Donors Near ${city}` : "Available Donors"}
                </h2>

                <p>
                  {loading
                    ? "Searching..."
                    : `${donors.length} donor${
                        donors.length === 1 ? "" : "s"
                      } found`}
                </p>
              </div>
            </div>

            {/* LOADING */}

            {loading && (
              <div className="fd-loading">
                <div className="fd-spinner"></div>

                <p>Finding available donors...</p>
              </div>
            )}

            {/* NO RESULTS */}

            {!loading && !error && donors.length === 0 && (
              <div className="fd-no-results">
                <div className="fd-no-results-icon">🩸</div>

                <h3>No donors found</h3>

                <p>No available donors match your search.</p>
              </div>
            )}

            {/* DONORS */}

            {!loading && donors.length > 0 && (
              <ul className="fd-donor-list">
                {donors.map((donor) => {
                  const donorName =
                    donor.fullName || donor.name || "Unknown Donor";

                  const colors = avatarColors(donorName);

                  const available =
                    donor.isAvailable === true || donor.available === true;

                  return (
                    <li className="fd-donor-row" key={donor._id || donor.id}>
                      {/* Avatar + Name */}

                      <div className="fd-donor-identity">
                        <div
                          className="fd-donor-avatar"
                          style={{
                            backgroundColor: colors.bg,
                            color: colors.fg,
                          }}
                        >
                          {getInitials(donorName)}
                        </div>

                        <span className="fd-donor-name">{donorName}</span>
                      </div>

                      {/* Blood */}

                      <span className="fd-donor-blood">{donor.bloodGroup}</span>

                      {/* City */}

                      <span className="fd-donor-city">{donor.city}</span>

                      {/* Availability */}

                      <span className="fd-donor-status">
                        <span
                          className={`fd-dot ${
                            available ? "fd-dot-on" : "fd-dot-off"
                          }`}
                        ></span>

                        {available ? "Available" : "Unavailable"}
                      </span>

                      <button
                        type="button"
                        className="fd-view-btn"
                        onClick={() => navigate(`/donor/${donor._id}`)}
                      >
                        View Donor
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
