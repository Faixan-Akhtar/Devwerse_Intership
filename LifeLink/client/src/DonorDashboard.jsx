import React, { useEffect, useState } from "react";
import "./DonorDashboard.css";
import { FaHeartbeat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// =========API=========

const API_BASE = "http://localhost:5000/api/blood-requests";

// ===========ICON============

const Icon = ({ name, size = 18 }) => {
  const paths = {
    heart:
      "M12 21s-7.5-4.6-10-9.1C0.3 8.5 2 5 5.5 5c2 0 3.4 1.1 4.5 2.6C11.1 6.1 12.5 5 14.5 5 18 5 19.7 8.5 18 11.9 19.5 16.4 12 21 12 21z",

    dashboard: "M4 4h7v7H4V4zm9 0h7v4h-7V4zm0 7h7v9h-7v-9zM4 14h7v6H4v-6z",

    user: "M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z",

    clipboard:
      "M9 3h6v2h4v16H5V5h4V3zm0 2v0h6V5H9zm-2 4h10v2H7V9zm0 4h10v2H7v-2zm0 4h6v2H7v-2z",

    availability:
      "M12 2a10 10 0 100 20 10 10 0 000-20zm1 5h-2v6l5 3 1-1.7-4-2.3V7z",

    donation:
      "M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z",

    logout:
      "M10 3H5a2 2 0 00-2 2v14a2 2 0 002 2h5v-2H5V5h5V3zm7.6 8L13 6.4 14.4 5l6.6 7-6.6 7-1.4-1.4L17.6 13H8v-2h9.6z",

    menu: "M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z",

    close:
      "M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7l-1.4-1.4L9.2 12 2.9 5.7l1.4-1.4L10.6 10.6l6.3-6.3z",

    check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",

    reject:
      "M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7l1.4-1.4L9.2 12 2.9 5.7l1.4-1.4L10.6 10.6l6.3-6.3z",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.user} />
    </svg>
  );
};

// ============GET TOKEN===========

const getToken = () => {
  return (
    localStorage.getItem("token") || localStorage.getItem("accessToken") || ""
  );
};

// =============GET USER NAME=============

const getLoggedInUser = () => {
  const possibleKeys = [
    "user",
    "currentUser",
    "loggedInUser",
    "authUser",
    "userData",
  ];

  for (const key of possibleKeys) {
    try {
      const value = localStorage.getItem(key);

      if (!value) continue;

      const parsed = JSON.parse(value);

      const user = parsed?.user || parsed?.data?.user || parsed;

      const name = user?.name || user?.fullName || user?.username;

      if (name) {
        return name;
      }
    } catch (error) {
      // Ignore invalid localStorage values
    }
  }

  return "Donor";
};

// ============INITIAL LETTER============

const getInitial = (name) => {
  if (!name || !String(name).trim()) {
    return "D";
  }

  return String(name).trim().charAt(0).toUpperCase();
};

// ================NORMALIZE REQUEST================

const normalizeRequest = (request) => {
  const recipient =
    request?.recipient ||
    request?.user ||
    request?.createdBy ||
    request?.requester ||
    null;

  const recipientName =
    recipient?.name ||
    recipient?.fullName ||
    recipient?.username ||
    request?.recipientName ||
    request?.userName ||
    request?.name ||
    "User";

  let status = String(request?.status || "pending").toLowerCase();

  if (status === "fulfilled") {
    status = "completed";
  }

  if (status === "cancelled") {
    status = "rejected";
  }

  return {
    ...request,

    id: request?._id || request?.id,

    recipientName,

    recipientAvatar:
      recipient?.avatar ||
      recipient?.profileImage ||
      recipient?.image ||
      request?.recipientAvatar ||
      request?.avatar ||
      "",

    bloodGroup: request?.bloodGroup || request?.bloodType || "-",

    units: request?.units || request?.quantity || 1,

    location: request?.location || request?.hospital || "-",

    hospital: request?.hospital || "",

    message: request?.message || request?.reason || "",

    urgency: request?.urgency || "",

    status,

    createdAt: request?.createdAt || null,
  };
};

// =============REQUEST AVATAR==============

function RequestAvatar({ request }) {
  const name = request?.recipientName || "User";

  const image = request?.recipientAvatar;

  if (image) {
    return (
      <img
        className="request-avatar"
        src={image}
        alt={name}
        onError={(event) => {
          event.currentTarget.style.display = "none";

          const next = event.currentTarget.nextElementSibling;

          if (next) {
            next.style.display = "flex";
          }
        }}
      />
    );
  }

  return (
    <div className="request-avatar request-avatar-letter">
      {getInitial(name)}
    </div>
  );
}

// ===========STATUS============

function StatusBadge({ status }) {
  const safeStatus = String(status || "pending").toLowerCase();

  const label = safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1);

  return <span className={`request-status status-${safeStatus}`}>{label}</span>;
}

// ==========REQUEST CARD============

function RequestCard({ request, onAccept, onReject, updatingId, onView }) {
  const isUpdating = updatingId === request.id;

  const status = String(request.status || "pending").toLowerCase();

  const isPending = status === "pending";

  return (
    <div className="request-card">
      {/* Avatar */}
      <RequestAvatar request={request} />

      {/* Information */}
      <div className="request-info">
        <div className="request-name">{request.recipientName || "User"}</div>

        <div className="request-meta">
          <span className="blood-group">{request.bloodGroup}</span>

          <span className="meta-dot">•</span>

          <span>
            {request.units} Unit
            {Number(request.units) > 1 ? "s" : ""}
          </span>
        </div>

        {request.message && (
          <div className="request-message">Message: {request.message}</div>
        )}

        {request.location && request.location !== "-" && (
          <div className="request-location">{request.location}</div>
        )}

        <div className="request-time">{formatTime(request.createdAt)}</div>
      </div>

      {/* Right side */}
      <div className="request-actions">
        {isPending ? (
          <>
            <button
              className="accept-btn"
              disabled={isUpdating}
              onClick={() => onAccept(request)}
            >
              <Icon name="check" size={16} />

              {isUpdating ? "Updating..." : "Accept"}
            </button>

            <button
              className="reject-btn"
              disabled={isUpdating}
              onClick={() => onReject(request)}
            >
              <Icon name="reject" size={16} />
              Reject
            </button>
          </>
        ) : (
          <>
            <StatusBadge status={status} />

            <button className="view-btn" onClick={() => onView(request)}>
              View
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ==========TIME===========

function formatTime(date) {
  if (!date) {
    return "";
  }

  const created = new Date(date);

  if (Number.isNaN(created.getTime())) {
    return "";
  }

  const now = new Date();

  const difference = now.getTime() - created.getTime();

  const minutes = Math.floor(difference / 60000);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} day${days > 1 ? "s" : ""} ago`;
}

// ==========MAIN COMPONENT===========

export default function DonorDashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Donor");

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState(null);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // =============LOAD REQUESTS=============

  const loadRequests = async () => {
    try {
      setError("");

      const token = getToken();

      const headers = {
        Accept: "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE}/donor`, {
        method: "GET",
        headers,
        credentials: "include",
      });

      const contentType = response.headers.get("content-type") || "";

      if (!response.ok) {
        let message = `Server error: ${response.status}`;

        if (contentType.includes("application/json")) {
          const data = await response.json();

          message = data?.message || data?.error || message;
        }

        throw new Error(message);
      }

      if (!contentType.includes("application/json")) {
        throw new Error("Backend did not return JSON.");
      }

      const data = await response.json();

      console.log("DONOR REQUESTS:", data);

      // -------------Support different backend response format--------------

      let backendRequests = [];

      if (Array.isArray(data)) {
        backendRequests = data;
      } else if (Array.isArray(data.requests)) {
        backendRequests = data.requests;
      } else if (Array.isArray(data.data)) {
        backendRequests = data.data;
      } else if (Array.isArray(data.data?.requests)) {
        backendRequests = data.data.requests;
      } else if (Array.isArray(data.bloodRequests)) {
        backendRequests = data.bloodRequests;
      }

      const formatted = backendRequests.map(normalizeRequest);

      setRequests(formatted);
    } catch (err) {
      console.error("Donor requests error:", err);

      setError(err.message || "Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  const getRequestId = (request) => {
    if (!request) return null;

    // Normal MongoDB document
    if (typeof request._id === "string") {
      return request._id;
    }

    // MongoDB object format
    if (request._id?.$oid) {
      return request._id.$oid;
    }

    // Normal id
    if (typeof request.id === "string") {
      return request.id;
    }

    if (request.id?.$oid) {
      return request.id.$oid;
    }

    return null;
  };

  const updateRequestStatus = async (request, newStatus) => {
    try {
      const requestId = getRequestId(request);

      console.log("=================================");
      console.log("REQUEST OBJECT:", request);
      console.log("REQUEST ID:", requestId);
      console.log("NEW STATUS:", newStatus);
      console.log("=================================");

      if (!requestId) {
        alert("Request ID is missing");
        return;
      }

      const token =
        localStorage.getItem("token") || localStorage.getItem("accessToken");

      const response = await fetch(
        `http://localhost:5000/api/blood-requests/${requestId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",

            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },

          credentials: "include",

          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const contentType = response.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      console.log("STATUS UPDATE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          typeof data === "object"
            ? data.message || "Failed to update request status"
            : data || "Failed to update request status",
        );
      }

      // --------------UPDATE UI IMMEDIATELY---------------

      setRequests((previousRequests) =>
        previousRequests.map((item) => {
          const itemId = getRequestId(item);

          if (String(itemId) === String(requestId)) {
            return {
              ...item,
              status: newStatus,
            };
          }

          return item;
        }),
      );

      // ---------------RELOAD FROM DATABASE--------------------

      // await loadDashboard();
    } catch (error) {
      console.error("UPDATE REQUEST STATUS ERROR:", error);

      alert(error.message || "Failed to update request status");
    }
  };

  // ============ACCEPT==============

  const handleAccept = async (request) => {
    const confirmed = window.confirm(
      `Accept blood request from ${request.recipientName}?`,
    );

    if (!confirmed) {
      return;
    }

    await updateRequestStatus(request, "accepted");
  };

  // ===========REJECT============

  const handleReject = async (request) => {
    const confirmed = window.confirm(
      `Reject blood request from ${request.recipientName}?`,
    );

    if (!confirmed) {
      return;
    }

    await updateRequestStatus(request, "rejected");
  };

  // ============INITIAL LOAD=============

  useEffect(() => {
    setUserName(getLoggedInUser());

    loadRequests();
  }, []);

  // ============AUTO REFRESH============

  useEffect(() => {
    const interval = setInterval(() => {
      loadRequests();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // ============STATS=============

  const pendingRequests = requests.filter(
    (request) => String(request.status).toLowerCase() === "pending",
  ).length;

  const acceptedRequests = requests.filter(
    (request) => String(request.status).toLowerCase() === "accepted",
  ).length;

  const rejectedRequests = requests.filter(
    (request) => String(request.status).toLowerCase() === "rejected",
  ).length;

  // ==========UI===========

  return (
    <div className="donor-dashboard">
      {/* =============MOBILE HEADER============== */}

      <header className="mobile-header">
        <div className="mobile-brand">
          {/* <Icon
            name="heart"
            size={21}
          /> */}
          <FaHeartbeat id="heart" color="red" />

          <span>LifeLink</span>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setDrawerOpen((value) => !value)}
        >
          <Icon name={drawerOpen ? "close" : "menu"} size={22} />
        </button>
      </header>

      {/* ================SIDEBAR================ */}

      <aside className={`donor-sidebar ${drawerOpen ? "sidebar-open" : ""}`}>
        {/* Logo */}

        <div
          className="sidebar-logo"
          onClick={() => {
            navigate("/home");
          }}
        >
          {/* <Icon
            name="heart"
            size={20}
          /> */}
          <FaHeartbeat id="heart" color="red" />
          {/* onClick={()=>{navigate('/home')}} */}

          <span>LifeLink</span>
        </div>

        {/* Navigation */}

        <nav className="sidebar-nav">
          <button className="sidebar-item active">
            <Icon name="dashboard" size={18} />

            <span>Dashboard</span>
          </button>

          <button className="sidebar-item">
            <Icon name="user" size={18} />

            <span>My Profile</span>
          </button>

          <button className="sidebar-item">
            <Icon name="clipboard" size={18} />

            <span>Requests</span>

            {pendingRequests > 0 && (
              <span className="request-count">{pendingRequests}</span>
            )}
          </button>

          <button className="sidebar-item">
            <Icon name="availability" size={18} />

            <span>Availability</span>
          </button>

          <button className="sidebar-item">
            <Icon name="donation" size={18} />

            <span>My Donations</span>
          </button>
        </nav>

        {/* Logout */}

        <button
          className="sidebar-item logout-item"
          onClick={() => {
            localStorage.removeItem("token");

            localStorage.removeItem("accessToken");

            window.location.href = "/login";

            navigate("/login");
          }}

          // onClick={()=>{navigate('/login')}}
        >
          <Icon name="logout" size={18} />

          <span>Logout</span>
        </button>
      </aside>

      {/* Mobile overlay */}

      {drawerOpen && (
        <div className="sidebar-overlay" onClick={() => setDrawerOpen(false)} />
      )}

      {/* =========MAIN========= */}

      <main className="donor-main">
        {/* Header */}

        <div className="dashboard-header">
          <h1>
            Welcome, <strong>{userName}</strong>{" "}
            <span className="wave">👋</span>
          </h1>

          <p>Here's what's happening today.</p>
        </div>

        {/* ================STATS================= */}

        <section className="stats">
          <div className="stat-card">
            <div className="stat-value">{pendingRequests}</div>

            <div className="stat-label">New Requests</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{acceptedRequests}</div>

            <div className="stat-label">Accepted</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{rejectedRequests}</div>

            <div className="stat-label">Rejected</div>
          </div>
        </section>

        {/* =============NEW REQUESTS================*/}

        <section className="requests-section">
          <div className="requests-header">
            <h2>New Requests</h2>

            <button className="view-all-btn" onClick={loadRequests}>
              Refresh
            </button>
          </div>

          {/* Loading */}

          {loading && <div className="message-box">Loading requests...</div>}

          {/* Error */}

          {!loading && error && (
            <div className="message-box error-box">
              <p>{error}</p>

              <button onClick={loadRequests}>Try Again</button>
            </div>
          )}

          {/* Empty */}

          {!loading && !error && requests.length === 0 && (
            <div className="message-box">No blood requests available.</div>
          )}

          {/* Requests */}

          {!loading && !error && requests.length > 0 && (
            <div className="requests-list">
              {requests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  updatingId={updatingId}
                  onView={setSelectedRequest}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ============DETAILS MODAL============== */}

      {selectedRequest && (
        <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
          <div
            className="details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedRequest(null)}
            >
              <Icon name="close" size={18} />
            </button>

            <RequestAvatar request={selectedRequest} />

            <h2>{selectedRequest.recipientName}</h2>

            <div className="modal-details">
              <p>
                <strong>Blood Group:</strong> {selectedRequest.bloodGroup}
              </p>

              <p>
                <strong>Units:</strong> {selectedRequest.units}
              </p>

              <p>
                <strong>Location:</strong> {selectedRequest.location}
              </p>

              {selectedRequest.hospital && (
                <p>
                  <strong>Hospital:</strong> {selectedRequest.hospital}
                </p>
              )}

              {selectedRequest.message && (
                <p>
                  <strong>Message:</strong> {selectedRequest.message}
                </p>
              )}

              <p>
                <strong>Status:</strong>{" "}
                <StatusBadge status={selectedRequest.status} />
              </p>
            </div>

            {String(selectedRequest.status).toLowerCase() === "pending" && (
              <div className="modal-actions">
                <button
                  className="accept-btn"
                  onClick={() => updateRequestStatus(request, "accepted")}
                >
                  ✓ Accept
                </button>

                <button
                  className="reject-btn"
                  onClick={() => updateRequestStatus(request, "rejected")}
                >
                  ✕ Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
