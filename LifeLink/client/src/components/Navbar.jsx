// // import React, { useState } from "react";
// // import { MdMenu } from "react-icons/md";
// // import { FaHeartbeat } from "react-icons/fa";
// // import { NavLink } from "react-router-dom";
// // import "./Navbar.css";

// // const Navbar = () => {
// //   const [menu,setMenu] = useState(false);

// //   const handleMenu = () => {
// //     setMenu(!menu)
// //   }
// //   return (
// //     <>
// //       <header>
// //         <nav>
// //           <div className="container">
// //             <div className="logo">
// //               <h2><FaHeartbeat id="heart"/><span>LIFE</span>LINK</h2>
// //             </div>
// //             <div className={menu ? "menu-mobile" : "menu-web"}>
             
// //               <NavLink to="/" className="route">
// //                 <p>Home</p>
// //               </NavLink>
// //               <NavLink to="/about" className="route">
// //                 <p>About</p>
// //               </NavLink>
// //               {/* <NavLink to="/how_it_works" className="route">
// //                 <p>How To Work</p>
// //               </NavLink> */}
// //               <NavLink to="/find-donor" className="route">
// //                 <p>Search Donor</p>
// //               </NavLink>
// //               <NavLink to="/contact" className="route">
// //                 <p>Contact</p>
// //               </NavLink>
              

// //               {/* <div className="btns"> */}
// //                 <NavLink to="/login" className="btn" id="loginBtn">
// //                   Login
// //                 </NavLink>

// //                 <NavLink to="/register" className="btn" id="registerBtn">
// //                   Register
// //                 </NavLink>
// //               {/* </div> */}
// //             </div>

// //             <div className="menuBtn" onClick={handleMenu}>
// //               <MdMenu />
// //             </div>
// //           </div>
// //         </nav>
// //       </header>
// //     </>
// //   );
// // };

// // export default Navbar;



// import React, { useState } from "react";
// import { MdMenu } from "react-icons/md";
// import { FaHeartbeat, FaUserCircle } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const [menu, setMenu] = useState(false);

//   const handleMenu = () => {
//     setMenu(!menu);
//   };

//   return (
//     <>
//       <header>
//         <nav>
//           <div className="container">
//             <div className="logo">
//               <h2><FaHeartbeat id="heart" /><span>LIFE</span>LINK</h2>
//             </div>
//             <div className={menu ? "menu-mobile" : "menu-web"}>

//               <NavLink to="/" className="route">
//                 <p>Home</p>
//               </NavLink>
//               <NavLink to="/about" className="route">
//                 <p>About</p>
//               </NavLink>
//               {/* <NavLink to="/how_it_works" className="route">
//                 <p>How To Work</p>
//               </NavLink> */}
//               <NavLink to="/find-donor" className="route">
//                 <p>Search Donor</p>
//               </NavLink>
//               <NavLink to="/contact" className="route">
//                 <p>Contact</p>
//               </NavLink>

//               {/* <div className="btns"> */}
//                 <NavLink to="/login" className="btn" id="loginBtn">
//                   Login
//                 </NavLink>

//                 <NavLink to="/register" className="btn" id="registerBtn">
//                   Register
//                 </NavLink>
//               {/* </div> */}
//             </div>

//             <div className="right-icons">
//               <NavLink to="/profile" className="profile-icon" aria-label="Profile">
//                 <FaUserCircle />
//               </NavLink>

//               <div className="menuBtn" onClick={handleMenu}>
//                 <MdMenu />
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navbar;



// import React, { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// const API_URL = "http://localhost:5000";

// function getInitials(name = "") {
//   return name
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((part) => part[0].toUpperCase())
//     .join("");
// }

// const [user, setUser] = useState(null);
// const [menuOpen, setMenuOpen] = useState(false);
// const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// export default function Navbar() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const menuRef = useRef(null);

//   // Get logged-in user
//   useEffect(() => {
//     loadUser();
//   }, []);

//   // Close menu when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target)
//       ) {
//         setMenuOpen(false);
//       }
//     }

//     document.addEventListener(
//       "mousedown",
//       handleClickOutside
//     );

//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//     };
//   }, []);

//   const loadUser = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setUser(null);
//         return;
//       }

//       const response = await fetch(
//         `${API_URL}/api/users/me`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Unable to load user");
//       }

//       const data = await response.json();

//       setUser(data.user);

//     } catch (error) {
//       console.error("Navbar user error:", error);

//       setUser(null);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");

//     // If you store user data separately
//     localStorage.removeItem("user");

//     setUser(null);
//     setMenuOpen(false);

//     navigate("/login");
//   };

//   const goToProfile = () => {
//     setMenuOpen(false);
//     navigate("/profile");
//   };

//   const goToDashboard = () => {
//     setMenuOpen(false);

//     if (user?.role === "DONOR") {
//       navigate("/donor-dashboard");
//     } else {
//       navigate("/recipient-dashboard");
//     }
//   };

//   const goToRequests = () => {
//     setMenuOpen(false);
//     navigate("/my-requests");
//   };

//   return (
//     <header className="navbar">

//       {/* Logo */}

//       <Link to="/" className="navbar-logo">

//         <span className="logo-icon">
//           🩸
//         </span>

//         <span className="logo-text">
//           LifeLink
//         </span>

//       </Link>


//       {/* Navigation */}

//       <nav className="navbar-links">

//         <Link to="/">
//           Home
//         </Link>

//         <Link to="/about">
//           About
//         </Link>

//         <Link to="/contact">
//           Contact
//         </Link>

//         <Link to="/how-it-works">
//           How It Works
//         </Link>

//         {/* Show Find Donor only when logged in */}

//         {user && (
//           <Link to="/find-donor">
//             Search Donor
//           </Link>
//         )}

//       </nav>


//       {/* Right side */}

//       <div className="navbar-right">

//         {!user ? (

//           /* Not logged in */

//           <div className="auth-buttons">

//             <button
//               className="login-btn"
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </button>

//             <button
//               className="register-btn"
//               onClick={() => navigate("/register")}
//             >
//               Register
//             </button>

//           </div>

//         ) : (

//           /* Logged in */

//           <div
//             className="profile-menu-wrapper"
//             ref={menuRef}
//           >

//             <button
//               className="profile-button"
//               onClick={() =>
//                 setMenuOpen((prev) => !prev)
//               }
//               aria-label="Open profile menu"
//               aria-expanded={menuOpen}
//             >

//               <span className="profile-avatar">
//                 {getInitials(user.fullName)}
//               </span>

//             </button>


//             {menuOpen && (

//               <div className="profile-dropdown">

//                 {/* User information */}

//                 <div className="dropdown-user">

//                   <div className="dropdown-avatar">
//                     {getInitials(user.fullName)}
//                   </div>

//                   <div className="dropdown-user-info">

//                     <strong>
//                       {user.fullName}
//                     </strong>

//                     <span>
//                       {user.role === "DONOR"
//                         ? "Blood Donor"
//                         : "Blood Recipient"}
//                     </span>

//                   </div>

//                 </div>


//                 <div className="dropdown-divider" />


//                 {/* Profile */}

//                 <button
//                   className="dropdown-item"
//                   onClick={goToProfile}
//                 >

//                   <span className="dropdown-icon">
//                     👤
//                   </span>

//                   <span>
//                     My Profile
//                   </span>

//                 </button>


//                 {/* Dashboard */}

//                 <button
//                   className="dropdown-item"
//                   onClick={goToDashboard}
//                 >

//                   <span className="dropdown-icon">
//                     📊
//                   </span>

//                   <span>
//                     Dashboard
//                   </span>

//                 </button>


//                 {/* Requests */}

//                 <button
//                   className="dropdown-item"
//                   onClick={goToRequests}
//                 >

//                   <span className="dropdown-icon">
//                     📋
//                   </span>

//                   <span>
//                     My Requests
//                   </span>

//                 </button>


//                 <div className="dropdown-divider" />


//                 {/* Logout */}

//                 <button
//                   className="dropdown-item logout-item"
//                   onClick={handleLogout}
//                 >

//                   <span className="dropdown-icon">
//                     🚪
//                   </span>

//                   <span>
//                     Logout
//                   </span>

//                 </button>

//               </div>

//             )}

//           </div>

//         )}

//       </div>
//       <button
//   className="mobile-menu-button"
//   onClick={() =>
//     setMobileMenuOpen((prev) => !prev)
//   }
//   aria-label="Toggle navigation menu"
// >
//   {mobileMenuOpen ? <MdClose /> : <MdMenu />}
// </button>

//     </header>
//   );
// }














import React, { useEffect, useRef, useState } from "react";
import { FaHeartbeat } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdMenu,
  MdClose,
  MdPerson,
  MdDashboard,
  MdLogout,
  MdAssignment,
} from "react-icons/md";
import "./Navbar.css";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const profileMenuRef = useRef(null);

  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* =====================================================
     GET LOGGED-IN USER
  ===================================================== */

  useEffect(() => {
    loadUser();

    const handleStorageChange = () => {
      loadUser();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function loadUser() {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Unable to read user:", error);
      setUser(null);
    }
  }

  /* =====================================================
     CLOSE PROFILE DROPDOWN WHEN CLICKING OUTSIDE
  ===================================================== */

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =====================================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ===================================================== */

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  /* =====================================================
     NAVIGATION
  ===================================================== */

  function goToProfile() {
    setProfileOpen(false);
    navigate("/profile");
  }

  function goToDashboard() {
    setProfileOpen(false);

    if (user?.role === "DONOR") {
      navigate("/donor-dashboard");
    } else if (user?.role === "RECIPIENT") {
      navigate("/recipient-dashboard");
    } else {
      navigate("/");
    }
  }

  function goToRequests() {
    setProfileOpen(false);
    navigate("/requests");
  }

  /* =====================================================
     LOGOUT
  ===================================================== */

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setProfileOpen(false);
    setMobileOpen(false);

    navigate("/login");
  }

  /* =====================================================
     ACTIVE LINK
  ===================================================== */

  function isActive(path) {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  }

  /* =====================================================
     ROLE
  ===================================================== */

  function getRoleLabel() {
    if (user?.role === "DONOR") {
      return "Blood Donor";
    }

    if (user?.role === "RECIPIENT") {
      return "Blood Recipient";
    }

    return "LifeLink User";
  }

  const initials = getInitials(
    user?.fullName || user?.name || "User"
  );

  const displayName =
    user?.fullName ||
    user?.name ||
    "User";

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="navbar">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          className="navbar-logo"
          aria-label="LifeLink Home"
          onClick={()=>{navigate('/home')}}
        >
          <span className="logo-icon">
            {/* <MdHeartBroken color='red'/> */}
            <FaHeartbeat id="heart" color="red"/>
          </span>

          <span className="logo-text">
            LifeLink
          </span>
        </Link>


        {/* =================================================
            DESKTOP / TABLET NAVIGATION
        ================================================= */}

        <nav
          className={`navbar-links ${
            mobileOpen ? "navbar-links-mobile-open" : ""
          }`}
          aria-label="Main navigation"
        >

          <Link
            to="/"
            className={isActive("/") ? "active" : ""}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={isActive("/about") ? "active" : ""}
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>

          <Link
            to="/find-donor"
            className={isActive("/find-donor") ? "active" : ""}
            onClick={() => setMobileOpen(false)}
          >
            Search Donor
          </Link>

          <Link
            to="/contact"
            className={isActive("/contact") ? "active" : ""}
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>

          {/* <Link
            to="/profile"
            className={isActive("/profile") ? "active" : ""}
            onClick={() => setMobileOpen(false)}
          >
            <FaRegUserCircle fontSize={20} />
          </Link> */}

        </nav>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="navbar-right">

          {/* ===============================================
              NOT LOGGED IN
          =============================================== */}

          {!user && (
            <div className="auth-buttons" di>

              <button
                type="button"
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                type="button"
                className="register-btn"
                onClick={() => navigate("/register")}
              >
                Register
              </button>

            </div>
          )}


          {/* ===============================================
              LOGGED IN
          =============================================== */}

          {user && (
            <div
              className="profile-menu-wrapper"
              ref={profileMenuRef}
            >

              <button
                type="button"
                className="profile-button"
                onClick={() =>
                  setProfileOpen((previous) => !previous)
                }
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
              >

                <span className="profile-avatar">
                  {initials}
                </span>

              </button>


              {/* ==========================================
                  PROFILE DROPDOWN
              ========================================== */}

              {profileOpen && (
                <div className="profile-dropdown">

                  {/* User information */}

                  <div className="dropdown-user">

                    <div className="dropdown-avatar">
                      {initials}
                    </div>

                    <div className="dropdown-user-info">

                      <strong>
                        {displayName}
                      </strong>

                      <span>
                        {getRoleLabel()}
                      </span>

                      {user.email && (
                        <small>
                          {user.email}
                        </small>
                      )}

                    </div>

                  </div>


                  <div className="dropdown-divider" />


                  {/* My Profile */}

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={goToProfile}
                  >
                    <span className="dropdown-icon">
                      <MdPerson />
                    </span>

                    <span>
                      My Profile
                    </span>
                  </button>


                  {/* Dashboard */}

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={goToDashboard}
                  >
                    <span className="dropdown-icon">
                      <MdDashboard />
                    </span>

                    <span>
                      Dashboard
                    </span>
                  </button>


                  {/* Requests */}

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={goToRequests}
                  >
                    <span className="dropdown-icon">
                      <MdAssignment />
                    </span>

                    <span>
                      My Requests
                    </span>
                  </button>


                  <div className="dropdown-divider" />


                  {/* Logout */}

                  <button
                    type="button"
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    <span className="dropdown-icon">
                      <MdLogout />
                    </span>

                    <span>
                      Logout
                    </span>
                  </button>

                </div>
              )}

            </div>
          )}


          {/* ===============================================
              MOBILE MENU BUTTON
          =============================================== */}

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() =>
              setMobileOpen((previous) => !previous)
            }
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >

            {mobileOpen ? (
              <MdClose />
            ) : (
              <MdMenu />
            )}

          </button>

        </div>

      </header>


      {/* =================================================
          MOBILE NAVIGATION
      ================================================= */}

      {mobileOpen && (
        <div className="mobile-navigation">

          <Link
            to="/"
            className={isActive("/") ? "mobile-active" : ""}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={isActive("/about") ? "mobile-active" : ""}
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>

          <Link
            to="/find-donor"
            className={
              isActive("/find-donor")
                ? "mobile-active"
                : ""
            }
            onClick={() => setMobileOpen(false)}
          >
            Search Donor
          </Link>

          <Link
            to="/contact"
            className={
              isActive("/contact")
                ? "mobile-active"
                : ""
            }
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>

          {/* <Link
            to="/profile"
            className={
              isActive("/profile")
                ? "mobile-active"
                : ""
            }
            onClick={() => setMobileOpen(false)}
          >
            <FaRegUserCircle fontSize={20} />
          </Link> */}

          {/* Mobile auth */}

          {!user && (
            <div className="mobile-auth-buttons">

              <button
                type="button"
                className="mobile-login"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </button>

              <button
                type="button"
                className="mobile-register"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/register");
                }}
              >
                Register
              </button>

            </div>
          )}

          {/* Mobile logged-in shortcuts */}

          {user && (
            <div className="mobile-user-actions">

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/profile");
                }}
              >
                <MdPerson />
                My Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  goToDashboard();
                }}
              >
                <MdDashboard />
                Dashboard
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/requests");
                }}
              >
                <MdAssignment />
                My Requests
              </button>

              <button
                type="button"
                className="mobile-logout"
                onClick={handleLogout}
              >
                <MdLogout />
                Logout
              </button>

            </div>
          )}

        </div>
      )}
    </>
  );
}






// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./Navbar.css";

// export default function Navbar() {
//   const location = useLocation();

//   return (
//     <header className="navbar">
//       <div className="navbar-container">

//         {/* Logo */}
//         <Link to="/" className="navbar-logo">
//           <span className="logo-heart">♥</span>
//           <span>LifeLink</span>
//         </Link>

//         {/* Navigation */}
//         <nav className="navbar-menu">
//           <Link
//             to="/"
//             className={location.pathname === "/" ? "active" : ""}
//           >
//             Home
//           </Link>

//           <Link
//             to="/about"
//             className={location.pathname === "/about" ? "active" : ""}
//           >
//             About
//           </Link>

//           <Link
//             to="/find-donor"
//             className={location.pathname === "/find-donor" ? "active" : ""}
//           >
//             Search Donor
//           </Link>

//           <Link
//             to="/contact"
//             className={location.pathname === "/contact" ? "active" : ""}
//           >
//             Contact
//           </Link>
//         </nav>

//         {/* Authentication buttons */}
//         <div className="navbar-actions">
//           <Link to="/login" className="login-btn">
//             Login
//           </Link>

//           <Link to="/register" className="register-btn">
//             Register
//           </Link>
//         </div>

//       </div>
//     </header>
//   );
// }