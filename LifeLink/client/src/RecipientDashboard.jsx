import React, { useEffect, useMemo, useState } from "react";
import "./RecipientDashboard.css";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

// =========API URL===========

const API_URL = "http://localhost:5000/api/requests/my";

// ===========DEFAULT USER===========

const DEFAULT_USER = {
  name: "User",
};

// ==============ICON COMPONENT===============

const Icon = ({ name, size = 18 }) => {
  const paths = {
    heart:
      "M12 21s-7.5-4.6-10-9.1C0.3 8.5 2 5 5.5 5c2 0 3.4 1.1 4.5 2.6C11.1 6.1 12.5 5 14.5 5 18 5 19.7 8.5 18 11.9 19.5 16.4 12 21 12 21z",

    dashboard: "M4 4h7v7H4V4zm9 0h7v4h-7V4zm0 7h7v9h-7v-9zM4 14h7v6H4v-6z",

    search:
      "M11 4a7 7 0 105.29 12.29l4.21 4.2 1.41-1.41-4.2-4.21A7 7 0 0011 4zm0 2a5 5 0 110 10 5 5 0 010-10z",

    clipboard:
      "M9 3h6v2h4v16H5V5h4V3zm0 2v0h6V5H9zm-2 4h10v2H7V9zm0 4h10v2H7v-2zm0 4h6v2H7v-2z",

    user: "M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z",

    logout:
      "M10 3H5a2 2 0 00-2 2v14a2 2 0 002 2h5v-2H5V5h5V3zm7.6 8L13 6.4 14.4 5l6.6 7-6.6 7-1.4-1.4L17.6 13H8v-2h9.6z",

    menu: "M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z",

    close:
      "M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7l-1.4-1.4L9.2 12 2.9 5.7l1.4-1.4L10.6 10.6l6.3-6.3z",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
};

// ============NAVIGATION=============

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
  },
  {
    key: "find",
    label: "Find Donor",
    icon: "search",
  },
  {
    key: "requests",
    label: "My Requests",
    icon: "clipboard",
  },
  {
    key: "profile",
    label: "My Profile",
    icon: "user",
  },
];

// =============GET NAME FROM ANY OBJECT================

const getNameFromObject = (obj) => {
  if (!obj || typeof obj !== "object") {
    return "";
  }

  return (
    obj.name ||
    obj.fullName ||
    obj.username ||
    obj.userName ||
    obj.displayName ||
    obj.firstName ||
    ""
  );
};

// ================SAFE JSON PARSER=================

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

// =====================GET USER FROM LOCAL STORAGE====================

const getStoredUser = () => {
  try {
    const possibleKeys = [
      "user",
      "currentUser",
      "loggedInUser",
      "authUser",
      "userData",
      "recipient",
      "profile",
    ];

    for (const key of possibleKeys) {
      const storedValue = localStorage.getItem(key);

      if (!storedValue) {
        continue;
      }

      const parsed = safeParse(storedValue);

      if (!parsed) {
        continue;
      }

      // Example:
      // { name: "Eman" }

      const directName = getNameFromObject(parsed);

      if (directName) {
        return {
          ...parsed,
          name: directName,
        };
      }

      // Example:
      // { user: { name: "Eman" } }

      if (parsed.user) {
        const nestedName = getNameFromObject(parsed.user);

        if (nestedName) {
          return {
            ...parsed.user,
            name: nestedName,
          };
        }
      }

      // Example:
      // { data: { user: { name: "Eman" } } }

      if (parsed.data) {
        const dataName = getNameFromObject(parsed.data);

        if (dataName) {
          return {
            ...parsed.data,
            name: dataName,
          };
        }

        if (parsed.data.user) {
          const nestedDataName = getNameFromObject(parsed.data.user);

          if (nestedDataName) {
            return {
              ...parsed.data.user,
              name: nestedDataName,
            };
          }
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error reading user from localStorage:", error);

    return null;
  }
};

// =============GET USER FROM JWT TOKE================

const getUserFromToken = () => {
  try {
    const token =
      localStorage.getItem("token") || localStorage.getItem("accessToken");

    if (!token) {
      return null;
    }

    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const base64Url = parts[1];

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    const payload = JSON.parse(jsonPayload);

    const name = getNameFromObject(payload);

    if (name) {
      return {
        ...payload,
        name,
      };
    }

    return null;
  } catch (error) {
    console.warn("Could not read user from JWT:", error);

    return null;
  }
};

// =========GET INITIAL LOGGED-IN USER=========

const getInitialLoggedInUser = () => {
  const storedUser = getStoredUser();

  if (storedUser?.name) {
    return storedUser;
  }

  const tokenUser = getUserFromToken();

  if (tokenUser?.name) {
    return tokenUser;
  }

  return DEFAULT_USER;
};

// =================GET USER NAME=============

const getUserName = (user) => {
  const name = getNameFromObject(user);

  if (name) {
    return name.toUpperCase();
  }

  const storedUser = getStoredUser();

  if (storedUser?.name) {
    return storedUser.name;
  }

  const tokenUser = getUserFromToken();

  if (tokenUser?.name) {
    return tokenUser.name;
  }

  return "User";
};

// =============GET INITIAL LETTER================

const getInitial = (name) => {
  if (!name) {
    return "U";
  }

  const cleanName = String(name).trim();

  if (!cleanName) {
    return "U";
  }

  return cleanName.charAt(0).toUpperCase();
};

// =========STATUS TONES=============

const STATUS_TONE = {
  accepted: "success",
  pending: "warning",
  rejected: "danger",
  completed: "info",
};

// ==========STATUS BADGE============

function StatusBadge({ status }) {
  const safeStatus = status || "Pending";

  const tone = STATUS_TONE[String(safeStatus).toLowerCase()] || "neutral";

  return (
    <span className={`status-badge status-badge--${tone}`}>
      Status: <strong>{safeStatus}</strong>
    </span>
  );
}

// ===========STAT CARD===========

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-card__value">{value}</div>

      <div className="stat-card__label">{label}</div>
    </div>
  );
}

// ===============INITIAL AVATAR==============

function InitialAvatar({ name, className = "request-row__avatar" }) {
  return (
    <div
      className={`${className} initial-avatar`}
      aria-label={name || "User"}
      title={name || "User"}
    >
      {getInitial(name)}
    </div>
  );
}

// =========REQUEST ROW===========

function RequestRow({ request, onViewDetails }) {
  const donorName = request.donorName || "Waiting for Donor";

  return (
    <div className="request-row">
      {/* ==========DONOR INITIAL AVATAR============= */}

      <InitialAvatar name={donorName} />

      {/* =============REQUEST INFORMATION============ */}

      <div className="request-row__info">
        <div className="request-row__name">{donorName}</div>

        <div className="request-row__meta">
          <span className="blood-group">{request.bloodGroup || "-"}</span>

          <span className="dot">•</span>

          <span>
            {request.units || 1} Unit
            {Number(request.units) > 1 ? "s" : ""}
          </span>

          <span className="dot">•</span>

          <span>{request.location || "Unknown"}</span>
        </div>

        <StatusBadge status={request.status} />
      </div>

      {/* =================VIEW DETAILS================= */}

      <button
        type="button"
        className="btn-outline"
        onClick={() => onViewDetails(request)}
      >
        View Details
      </button>
    </div>
  );
}

// ===========MAIN DASHBOARD==============

export default function Dashboard({
  user: initialUser = DEFAULT_USER,
  requests: initialRequests = [],
  activeNav = "dashboard",
}) {
  // ========STATE==========

  const [active, setActive] = useState(activeNav);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  const [user, setUser] = useState(
    getInitialLoggedInUser() || initialUser || DEFAULT_USER,
  );

  const [requests, setRequests] = useState(
    Array.isArray(initialRequests) ? initialRequests : [],
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==============LOAD DASHBOARD===============

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      // ------TOKEN-------

      const token =
        localStorage.getItem("token") || localStorage.getItem("accessToken");

      // --------HEADERS---------

      const headers = {
        Accept: "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // -----------API REQUEST-----------

      const response = await fetch(API_URL, {
        method: "GET",
        headers,
        credentials: "include",
      });

      // ---------CONTENT TYPE-----------

      const contentType = response.headers.get("content-type") || "";

      // -------------ERROR RESPONSE---------------

      if (!response.ok) {
        let message = `Server error: ${response.status}`;

        if (contentType.includes("application/json")) {
          const errorData = await response.json();

          message = errorData.message || errorData.error || message;
        } else {
          const text = await response.text();

          if (text.includes("<!DOCTYPE")) {
            message =
              "Backend returned an HTML page instead of JSON. Check your backend URL.";
          }
        }

        throw new Error(message);
      }

      // ----------CHECK JSON---------

      if (!contentType.includes("application/json")) {
        throw new Error("Backend did not return JSON.");
      }

      // --------JSON DATA----------

      const data = await response.json();

      console.log("RECIPIENT DASHBOARD RESPONSE:", data);

      // ===========FIND USER============

      let backendUser = null;

      if (data?.user) {
        backendUser = data.user;
      } else if (data?.recipient) {
        backendUser = data.recipient;
      } else if (data?.data?.user) {
        backendUser = data.data.user;
      } else if (data?.data?.recipient) {
        backendUser = data.data.recipient;
      }

      // ---------------If backend returns an array, try recipient from request---------------

      if (!backendUser) {
        let possibleRequests = [];

        if (Array.isArray(data)) {
          possibleRequests = data;
        } else if (Array.isArray(data?.requests)) {
          possibleRequests = data.requests;
        } else if (Array.isArray(data?.data)) {
          possibleRequests = data.data;
        } else if (Array.isArray(data?.data?.requests)) {
          possibleRequests = data.data.requests;
        }

        const firstRequest = possibleRequests[0];

        if (
          firstRequest?.recipient &&
          typeof firstRequest.recipient === "object"
        ) {
          backendUser = firstRequest.recipient;
        }
      }

      // ----------Update USER-----------

      if (backendUser) {
        const backendName = getNameFromObject(backendUser);

        if (backendName) {
          const updatedUser = {
            ...user,
            ...backendUser,
            name: backendName,
          };

          setUser(updatedUser);

          // Save so name remains available after refresh
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }

      // ===========FIND REQUESTS=============

      let backendRequests = [];

      if (Array.isArray(data)) {
        backendRequests = data;
      } else if (Array.isArray(data.requests)) {
        backendRequests = data.requests;
      } else if (Array.isArray(data.myRequests)) {
        backendRequests = data.myRequests;
      } else if (Array.isArray(data.data)) {
        backendRequests = data.data;
      } else if (Array.isArray(data.data?.requests)) {
        backendRequests = data.data.requests;
      }

      console.log("REQUESTS FOUND:", backendRequests);

      // =======FORMAT REQUESTS=========

      const formattedRequests = backendRequests.map((request) => {
        // ----------DONOR OBJECT------------

        const donor =
          request?.donor && typeof request.donor === "object"
            ? request.donor
            : null;

        // ---------DONOR NAME---------

        const donorName =
          request?.donorName ||
          request?.donor?.name ||
          request?.donor?.fullName ||
          request?.donor?.username ||
          request?.donor?.userName ||
          "Waiting for Donor";

        // --------STATUS----------

        let status = String(request?.status || "pending").toLowerCase();

        if (status === "pending") {
          status = "Pending";
        } else if (status === "accepted") {
          status = "Accepted";
        } else if (status === "fulfilled") {
          status = "Completed";
        } else if (status === "cancelled") {
          status = "Rejected";
        } else if (status === "rejected") {
          status = "Rejected";
        } else {
          status = status.charAt(0).toUpperCase() + status.slice(1);
        }

        // -------------RETURN UI OBJECT--------------

        return {
          id: request?._id || request?.id || Math.random(),

          donorName: donorName,

          bloodGroup:
            request?.bloodGroup ||
            request?.blood_group ||
            request?.bloodType ||
            "-",

          units: request?.units || request?.quantity || 1,

          location:
            request?.location || request?.city || request?.hospital || "-",

          status,

          hospital: request?.hospital || "",

          urgency: request?.urgency || "",

          message: request?.message || "",

          createdAt: request?.createdAt || null,

          // Keep original donor if needed
          donor,
        };
      });

      // ------------UPDATE REQUESTS-------------

      setRequests(formattedRequests);
    } catch (err) {
      console.error("Recipient dashboard error:", err);

      setError(err?.message || "Failed to load recipient requests.");
    } finally {
      setLoading(false);
    }
  };

  // ===========FIRST LOAD===========

  useEffect(() => {
    // Load stored user immediately
    const storedUser = getInitialLoggedInUser();

    if (storedUser?.name) {
      setUser(storedUser);
    }

    loadDashboard();
  }, []);

  // ===========AUTO REFRESH=========

  useEffect(() => {
    const interval = setInterval(() => {
      loadDashboard();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // ===========DYNAMIC USER NAME=============

  const displayUserName = getUserName(user);

  // ===========DYNAMIC STATISTICS=============

  const stats = useMemo(() => {
    const total = requests.length;

    const accepted = requests.filter(
      (request) => String(request?.status || "").toLowerCase() === "accepted",
    ).length;

    const pending = requests.filter(
      (request) => String(request?.status || "").toLowerCase() === "pending",
    ).length;

    return [
      {
        value: total,
        label: "My Requests",
      },

      {
        value: accepted,
        label: "Accepted",
      },

      {
        value: pending,
        label: "Pending",
      },
    ];
  }, [requests]);

  // ========NAVIGATION========

  const handleNavClick = (key) => {
    setActive(key);

    setDrawerOpen(false);
  };

  // ==========VIEW DETAILS============

  const handleViewDetails = (request) => {
    setSelected(request);
  };

  // ======LOGOUT========

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("accessToken");

    localStorage.removeItem("user");

    localStorage.removeItem("currentUser");

    localStorage.removeItem("loggedInUser");

    localStorage.removeItem("authUser");

    localStorage.removeItem("userData");

    alert("Logged out");
    navigate("/login");
  };

  const navigate = useNavigate();

  // ==========UI==========

  return (
    <div className="app-shell">
      {/* ================ MOBILE TOP BAR =================== */}

      <header className="mobile-topbar">
        <div
          className="brand"
          onClick={() => {
            navigate("/home");
          }}
        >
          {/* <Icon
            name="heart"
            size={20}
          /> */}
          <FaHeartbeat id="heart" color="red" />

          <span className="brand__life">Life</span>

          <span className="brand__link">Link</span>
        </div>

        <button
          type="button"
          className="icon-btn"
          aria-label="Toggle menu"
          onClick={() => setDrawerOpen((open) => !open)}
        >
          <Icon name={drawerOpen ? "close" : "menu"} size={22} />
        </button>
      </header>

      {/* ==========SIDEBAR===========*/}

      <aside className={`sidebar ${drawerOpen ? "sidebar--open" : ""}`}>
        <div
          className="brand brand--sidebar"
          onClick={() => {
            navigate("/home");
          }}
        >
          {/* <Icon
            name="heart"
            size={22}
          /> */}
          <FaHeartbeat id="heart" color="red" />

          <span className="brand__life">Life</span>

          <span className="brand__link">Link</span>
        </div>

        <nav className="nav">
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.key}
              className={`nav-item ${
                active === item.key ? "nav-item--active" : ""
              }`}
              onClick={() => handleNavClick(item.key)}
            >
              <Icon name={item.icon} size={18} />

              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="nav-item nav-item--logout"
          onClick={handleLogout}
        >
          <Icon name="logout" size={18} />

          <span>Logout</span>
        </button>
      </aside>

      {/* ============MOBILE SCRIM=============== */}

      {drawerOpen && (
        <div className="scrim" onClick={() => setDrawerOpen(false)} />
      )}

      {/* ==========MAIN========== */}

      <main className="main">
        {/* ===========HEADER=========== */}

        <div className="main__header">
          <h1>
            Welcome, <span className="welcome-name">{displayUserName}</span>
            <span className="wave">👋</span>
          </h1>

          <p className="subtitle">Here's your overview.</p>
        </div>

        {/* =========STATS========== */}

        <section className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </section>

        {/* ============REQUESTS=============*/}

        <section className="requests-section">
          <h2>Recent Requests</h2>

          {/* ============LOADING============ */}

          {loading ? (
            <div className="requests-list">
              <p className="empty-state">Loading requests...</p>
            </div>
          ) : error ? (
            /* ========ERROR========*/

            <div className="requests-list">
              <p className="empty-state">{error}</p>

              <button
                type="button"
                className="btn-outline"
                onClick={loadDashboard}
              >
                Try Again
              </button>
            </div>
          ) : (
            /* =============REQUEST LIST============= */

            <div className="requests-list">
              {requests.length === 0 ? (
                <p className="empty-state">No requests yet.</p>
              ) : (
                requests.map((request) => (
                  <RequestRow
                    key={request.id}
                    request={request}
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </div>
          )}
        </section>
      </main>

      {/* ===============DETAILS MODAL================ */}

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            {/* CLOSE */}

            <button
              type="button"
              className="icon-btn modal__close"
              onClick={() => setSelected(null)}
            >
              <Icon name="close" size={18} />
            </button>

            {/* INITIAL AVATAR */}

            <InitialAvatar
              name={selected.donorName || "Donor"}
              className="modal__avatar initial-avatar"
            />

            {/* DONOR NAME */}

            <h3>{selected.donorName || "Waiting for Donor"}</h3>

            {/* DETAILS */}

            <p className="modal__meta">
              {selected.bloodGroup || "-"}

              {" • "}

              {selected.units || 1}

              {" Unit"}

              {Number(selected.units) > 1 ? "s" : ""}

              {" • "}

              {selected.location || "Unknown"}
            </p>

            {/* STATUS */}

            <StatusBadge status={selected.status} />
          </div>
        </div>
      )}
    </div>
  );
}
