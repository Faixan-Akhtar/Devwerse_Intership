// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import Navbar from "./components/Navbar";
// // import "./DonorProfile.css";

// // function getInitials(name = "") {
// //   return name
// //     .split(" ")
// //     .filter(Boolean)
// //     .slice(0, 2)
// //     .map((word) => word[0].toUpperCase())
// //     .join("");
// // }

// // export default function DonorProfile() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const [donor, setDonor] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     fetchDonor();
// //   }, [id]);

// //   const fetchDonor = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       console.log("Fetching donor:", id);

// //       // const response = await axios.get(
// //       //   `http://localhost:5000/api/donors/${id}`
// //       // );

// //       const token = localStorage.getItem("token");

// // const response = await axios.get(
// //   `http://localhost:5000/api/donors/${donorId}`,
// //   {
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //   }
// // );

// //       console.log("Donor response:", response.data);

// //       setDonor(response.data.donor);
// //     } catch (error) {
// //       console.error("Donor profile error:", error);

// //       setError(
// //         error.response?.data?.message ||
// //           "Unable to load donor profile."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <>
// //         <Navbar />

// //         <div className="profile-message">
// //           Loading donor profile...
// //         </div>
// //       </>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <>
// //         <Navbar />

// //         <div className="profile-message error">
// //           <h2>Unable to load donor</h2>

// //           <p>{error}</p>

// //           <button onClick={() => navigate("/find-donor")}>
// //             Back to Find Donor
// //           </button>
// //         </div>
// //       </>
// //     );
// //   }

// //   if (!donor) {
// //     return (
// //       <>
// //         <Navbar />

// //         <div className="profile-message">
// //           <h2>No donor information available.</h2>

// //           <button onClick={() => navigate("/find-donor")}>
// //             Back to Find Donor
// //           </button>
// //         </div>
// //       </>
// //     );
// //   }

// //   const {
// //     name,
// //     bloodGroup,
// //     phone,
// //     email,
// //     city,
// //     address,
// //     gender,
// //     age,
// //     weight,
// //     isAvailable,
// //     available,
// //   } = donor;

// //   const donorAvailable =
// //     isAvailable !== undefined
// //       ? isAvailable
// //       : available;

// //   return (
// //     <>
// //       <Navbar />

// //       <main className="donor-profile-page">

// //         <button
// //           className="back-button"
// //           onClick={() => navigate("/find-donor")}
// //         >
// //           ← Back to Donors
// //         </button>

// //         <div className="donor-profile-card">

// //           {/* PROFILE HEADER */}

// //           <div className="profile-header">

// //             <div className="profile-avatar">
// //               {getInitials(name)}
// //             </div>

// //             <div className="profile-header-info">

// //               <h1>{name}</h1>

// //               <div className="blood-group">
// //                 {bloodGroup}
// //               </div>

// //               <div
// //                 className={
// //                   donorAvailable
// //                     ? "availability available"
// //                     : "availability unavailable"
// //                 }
// //               >
// //                 <span></span>

// //                 {donorAvailable
// //                   ? "Available for Donation"
// //                   : "Currently Unavailable"}
// //               </div>

// //             </div>

// //           </div>


// //           {/* BASIC INFORMATION */}

// //           <section className="profile-section">

// //             <h2>Donor Information</h2>

// //             <div className="profile-grid">

// //               <div className="profile-item">
// //                 <span>Gender</span>
// //                 <strong>{gender || "Not provided"}</strong>
// //               </div>

// //               <div className="profile-item">
// //                 <span>Age</span>
// //                 <strong>
// //                   {age ? `${age} years` : "Not provided"}
// //                 </strong>
// //               </div>

// //               <div className="profile-item">
// //                 <span>Weight</span>
// //                 <strong>
// //                   {weight ? `${weight} kg` : "Not provided"}
// //                 </strong>
// //               </div>

// //               <div className="profile-item">
// //                 <span>Blood Group</span>
// //                 <strong>{bloodGroup}</strong>
// //               </div>

// //             </div>

// //           </section>


// //           {/* CONTACT INFORMATION */}

// //           <section className="profile-section">

// //             <h2>Contact Information</h2>

// //             <div className="contact-list">

// //               <div className="contact-row">
// //                 <span className="contact-icon">
// //                   📞
// //                 </span>

// //                 <div>
// //                   <small>Phone</small>
// //                   <strong>
// //                     {phone || "Not provided"}
// //                   </strong>
// //                 </div>
// //               </div>


// //               <div className="contact-row">
// //                 <span className="contact-icon">
// //                   ✉️
// //                 </span>

// //                 <div>
// //                   <small>Email</small>
// //                   <strong>
// //                     {email || "Not provided"}
// //                   </strong>
// //                 </div>
// //               </div>


// //               <div className="contact-row">
// //                 <span className="contact-icon">
// //                   📍
// //                 </span>

// //                 <div>
// //                   <small>City</small>
// //                   <strong>
// //                     {city || "Not provided"}
// //                   </strong>
// //                 </div>
// //               </div>


// //               <div className="contact-row">
// //                 <span className="contact-icon">
// //                   🏠
// //                 </span>

// //                 <div>
// //                   <small>Address</small>
// //                   <strong>
// //                     {address || "Not provided"}
// //                   </strong>
// //                 </div>
// //               </div>

// //             </div>

// //           </section>


// //           {/* REQUEST BLOOD */}

// //           {donorAvailable && (

// //             <div className="request-section">

// //               <h2>Need Blood?</h2>

// //               <p>
// //                 If you need this donor's blood group,
// //                 you can send a blood request.
// //               </p>

// //               <button
// //                 className="request-button"
// //                 onClick={() =>
// //                   navigate(`/request-blood/${donor._id}`)
// //                 }
// //               >
// //                 Request Blood
// //               </button>

// //             </div>

// //           )}

// //         </div>

// //       </main>
// //     </>
// //   );
// // }




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./components/Navbar";
// import "./DonorProfile.css";

// function getInitials(name = "") {
//   return name
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((word) => word[0].toUpperCase())
//     .join("");
// }

// export default function DonorProfile() {
//   // IMPORTANT: id comes from the URL
//   const { id } = useParams();

//   const navigate = useNavigate();

//   const [donor, setDonor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchDonor();
//   }, [id]);

//   const fetchDonor = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       console.log("Fetching donor ID:", id);

//       // Check whether user is logged in
//       const token = localStorage.getItem("token");

//       console.log("Token exists:", !!token);

//       if (!token) {
//         setError("Please login first.");
//         return;
//       }

//       // Make sure we actually have an ID
//       if (!id) {
//         setError("Donor ID is missing.");
//         return;
//       }

//       // Send token to backend
//       const response = await axios.get(
//         `http://localhost:5000/api/donors/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Donor response:", response.data);

//       setDonor(
//         response.data.donor || response.data
//       );

//     } catch (error) {
//       console.error(
//         "Donor profile error:",
//         error
//       );

//       console.error(
//         "Backend response:",
//         error.response?.data
//       );

//       setError(
//         error.response?.data?.message ||
//           "Unable to load donor profile."
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= LOADING ================= */

//   if (loading) {
//     return (
//       <>
//         <Navbar />

//         <div className="profile-message">
//           Loading donor profile...
//         </div>
//       </>
//     );
//   }

//   /* ================= ERROR ================= */

//   if (error) {
//     return (
//       <>
//         <Navbar />

//         <div className="profile-message error">
//           <h2>Unable to load donor</h2>

//           <p>{error}</p>

//           <button
//             onClick={() => navigate("/find-donor")}
//           >
//             Back to Find Donor
//           </button>
//         </div>
//       </>
//     );
//   }

//   /* ================= NO DONOR ================= */

//   if (!donor) {
//     return (
//       <>
//         <Navbar />

//         <div className="profile-message">
//           <h2>
//             No donor information available.
//           </h2>

//           <button
//             onClick={() => navigate("/find-donor")}
//           >
//             Back to Find Donor
//           </button>
//         </div>
//       </>
//     );
//   }

//   /* ================= DONOR DATA ================= */

//   const {
//     name,
//     fullName,
//     bloodGroup,
//     phone,
//     email,
//     city,
//     address,
//     gender,
//     age,
//     weight,
//     isAvailable,
//     available,
//   } = donor;

//   // Your database has both `name` and older records
//   // may have `fullName`.
//   const donorName =
//     name || fullName || "Unknown Donor";

//   const donorAvailable =
//     isAvailable !== undefined
//       ? isAvailable
//       : available !== undefined
//       ? available
//       : false;

//   /* ================= UI ================= */

//   return (
//     <>
//       <Navbar />

//       <main className="donor-profile-page">

//         {/* BACK */}

//         <button
//           className="back-button"
//           onClick={() =>
//             navigate("/find-donor")
//           }
//         >
//           ← Back to Donors
//         </button>

//         <div className="donor-profile-card">

//           {/* ================= PROFILE HEADER ================= */}

//           <div className="profile-header">

//             <div className="profile-avatar">
//               {getInitials(donorName)}
//             </div>

//             <div className="profile-header-info">

//               <h1>
//                 {donorName}
//               </h1>

//               <div className="blood-group">
//                 {bloodGroup || "Blood group not provided"}
//               </div>

//               <div
//                 className={
//                   donorAvailable
//                     ? "availability available"
//                     : "availability unavailable"
//                 }
//               >
//                 <span></span>

//                 {donorAvailable
//                   ? "Available for Donation"
//                   : "Currently Unavailable"}
//               </div>

//             </div>

//           </div>

//           {/* ================= DONOR INFORMATION ================= */}

//           <section className="profile-section">

//             <h2>
//               Donor Information
//             </h2>

//             <div className="profile-grid">

//               <div className="profile-item">
//                 <span>Gender</span>

//                 <strong>
//                   {gender || "Not provided"}
//                 </strong>
//               </div>

//               <div className="profile-item">
//                 <span>Age</span>

//                 <strong>
//                   {age
//                     ? `${age} years`
//                     : "Not provided"}
//                 </strong>
//               </div>

//               <div className="profile-item">
//                 <span>Weight</span>

//                 <strong>
//                   {weight
//                     ? `${weight} kg`
//                     : "Not provided"}
//                 </strong>
//               </div>

//               <div className="profile-item">
//                 <span>Blood Group</span>

//                 <strong>
//                   {bloodGroup || "Not provided"}
//                 </strong>
//               </div>

//             </div>

//           </section>

//           {/* ================= CONTACT INFORMATION ================= */}

//           <section className="profile-section">

//             <h2>
//               Contact Information
//             </h2>

//             <div className="contact-list">

//               <div className="contact-row">

//                 <span className="contact-icon">
//                   📞
//                 </span>

//                 <div>
//                   <small>Phone</small>

//                   <strong>
//                     {phone || "Not provided"}
//                   </strong>
//                 </div>

//               </div>

//               <div className="contact-row">

//                 <span className="contact-icon">
//                   ✉️
//                 </span>

//                 <div>
//                   <small>Email</small>

//                   <strong>
//                     {email || "Not provided"}
//                   </strong>
//                 </div>

//               </div>

//               <div className="contact-row">

//                 <span className="contact-icon">
//                   📍
//                 </span>

//                 <div>
//                   <small>City</small>

//                   <strong>
//                     {city || "Not provided"}
//                   </strong>
//                 </div>

//               </div>

//               <div className="contact-row">

//                 <span className="contact-icon">
//                   🏠
//                 </span>

//                 <div>
//                   <small>Address</small>

//                   <strong>
//                     {address || "Not provided"}
//                   </strong>
//                 </div>

//               </div>

//             </div>

//           </section>

//           {/* ================= REQUEST BLOOD ================= */}

//           {donorAvailable && (

//             <div className="request-section">

//               <h2>
//                 Need Blood?
//               </h2>

//               <p>
//                 If you need this donor's blood
//                 group, you can send a blood
//                 request.
//               </p>

//               <button
//                 className="request-button"
//                 onClick={() =>
//                   navigate(
//                     `/request-blood/${donor._id}`
//                   )
//                 }
//               >
//                 Request Blood
//               </button>

//             </div>

//           )}

//         </div>

//       </main>
//     </>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./components/Navbar";
// import "./DonorProfile.css";

// function getInitials(name = "") {
//   return name
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((word) => word[0].toUpperCase())
//     .join("");
// }

// export default function DonorProfile() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [donor, setDonor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchDonor();
//   }, [id]);

//   const fetchDonor = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       console.log("Donor ID:", id);

//       // Get token from localStorage
//       const token = localStorage.getItem("token");

//       console.log("Token exists:", !!token);

//       // User must be logged in
//       if (!token) {
//         setError("Authentication required. Please login again.");
//         setLoading(false);
//         return;
//       }

//       // Make request with Authorization header
//       const response = await axios.get(
//         `http://localhost:5000/api/donors/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Donor response:", response.data);

//       // Backend returns { donor: ... }
//       setDonor(
//         response.data.donor || response.data
//       );

//     } catch (error) {
//       console.error("Donor profile error:", error);

//       if (error.response?.status === 401) {
//         setError(
//           "Your login session has expired. Please login again."
//         );
//       } else {
//         setError(
//           error.response?.data?.message ||
//             "Unable to load donor profile."
//         );
//       }

//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= LOADING ================= */

//   if (loading) {
//     return (
//       <>
//         <Navbar />

//         <div className="profile-message">
//           Loading donor profile...
//         </div>
//       </>
//     );
//   }

//   /* ================= ERROR ================= */

//   if (error) {
//     return (
//       <>
//         <Navbar />

//         <div className="profile-message error">
//           <h2>Unable to load donor</h2>

//           <p>{error}</p>

//           <button
//             onClick={() => navigate("/find-donor")}
//           >
//             Back to Find Donor
//           </button>

//           <button
//             onClick={() => navigate("/login")}
//             style={{ marginLeft: "10px" }}
//           >
//             Login Again
//           </button>
//         </div>
//       </>
//     );
//   }

//   /* ================= NO DONOR ================= */

//   if (!donor) {
//     return (
//       <>
//         <Navbar />

//         <div className="profile-message">
//           <h2>No donor information available.</h2>

//           <button
//             onClick={() => navigate("/find-donor")}
//           >
//             Back to Find Donor
//           </button>
//         </div>
//       </>
//     );
//   }

//   const {
//     name,
//     fullName,
//     bloodGroup,
//     phone,
//     email,
//     city,
//     location,
//     address,
//     gender,
//     age,
//     weight,
//     isAvailable,
//     available,
//   } = donor;

//   // Some old donor records use fullName
//   // while newer records use name.
//   const donorName = name || fullName || "Donor";

//   // Support both isAvailable and available
//   const donorAvailable =
//     isAvailable !== undefined
//       ? isAvailable
//       : available !== undefined
//       ? available
//       : false;

//   const donorCity = city || location;

//   return (
//     <>
//       <Navbar />

//       <main className="donor-profile-page">

//         {/* BACK BUTTON */}

//         <button
//           className="back-button"
//           onClick={() => navigate("/find-donor")}
//         >
//           ← Back to Donors
//         </button>

//         <div className="donor-profile-card">

//           {/* PROFILE HEADER */}

//           <div className="profile-header">

//             <div className="profile-avatar">
//               {getInitials(donorName)}
//             </div>

//             <div className="profile-header-info">

//               <h1>{donorName}</h1>

//               <div className="blood-group">
//                 {bloodGroup || "N/A"}
//               </div>

//               <div
//                 className={
//                   donorAvailable
//                     ? "availability available"
//                     : "availability unavailable"
//                 }
//               >
//                 <span></span>

//                 {donorAvailable
//                   ? "Available for Donation"
//                   : "Currently Unavailable"}
//               </div>

//             </div>
//           </div>

//           {/* DONOR INFORMATION */}

//           <section className="profile-section">

//             <h2>Donor Information</h2>

//             <div className="profile-grid">

//               <div className="profile-item">
//                 <span>Gender</span>

//                 <strong>
//                   {gender || "Not provided"}
//                 </strong>
//               </div>

//               <div className="profile-item">
//                 <span>Age</span>

//                 <strong>
//                   {age
//                     ? `${age} years`
//                     : "Not provided"}
//                 </strong>
//               </div>

//               <div className="profile-item">
//                 <span>Weight</span>

//                 <strong>
//                   {weight
//                     ? `${weight} kg`
//                     : "Not provided"}
//                 </strong>
//               </div>

//               <div className="profile-item">
//                 <span>Blood Group</span>

//                 <strong>
//                   {bloodGroup || "Not provided"}
//                 </strong>
//               </div>

//             </div>

//           </section>

//           {/* CONTACT INFORMATION */}

//           <section className="profile-section">

//             <h2>Contact Information</h2>

//             <div className="contact-list">

//               <div className="contact-row">

//                 <span className="contact-icon">
//                   📞
//                 </span>

//                 <div>
//                   <small>Phone</small>

//                   <strong>
//                     {phone || "Not provided"}
//                   </strong>
//                 </div>

//               </div>

//               <div className="contact-row">

//                 <span className="contact-icon">
//                   ✉️
//                 </span>

//                 <div>
//                   <small>Email</small>

//                   <strong>
//                     {email || "Not provided"}
//                   </strong>
//                 </div>

//               </div>

//               <div className="contact-row">

//                 <span className="contact-icon">
//                   📍
//                 </span>

//                 <div>
//                   <small>City</small>

//                   <strong>
//                     {donorCity || "Not provided"}
//                   </strong>
//                 </div>

//               </div>

//               <div className="contact-row">

//                 <span className="contact-icon">
//                   🏠
//                 </span>

//                 <div>
//                   <small>Address</small>

//                   <strong>
//                     {address || "Not provided"}
//                   </strong>
//                 </div>

//               </div>

//             </div>

//           </section>

//           {/* REQUEST BLOOD */}

//           {donorAvailable && (

//             <div className="request-section">

//               <h2>Need Blood?</h2>

//               <p>
//                 If you need this donor's blood group,
//                 you can send a blood request.
//               </p>

//               <button
//                 className="request-button"
//                 onClick={() =>
//                   navigate(
//                     `/request-blood/${donor._id}`
//                   )
//                 }
//               >
//                 Request Blood
//               </button>

//             </div>

//           )}

//         </div>

//       </main>
//     </>
//   );
// }







// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./components/Navbar";
// import "./DonorProfile.css";
// import api from "./api";

// function getInitials(name = "") {
//   return name
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((word) => word[0].toUpperCase())
//     .join("");
// }

// export default function DonorProfile() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [donor, setDonor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchDonor();
//   }, [id]);

//   // const fetchDonor = async () => {
//   //   try {
//   //     setLoading(true);
//   //     setError("");

//   //     console.log("=================================");
//   //     console.log("FETCHING DONOR");
//   //     console.log("Donor ID:", id);

//   //     // Get JWT
//   //     const token = localStorage.getItem("token");

//   //     console.log(
//   //       "Token exists:",
//   //       !!token
//   //     );

//   //     console.log(
//   //       "Token:",
//   //       token
//   //     );

//   //     // Stop immediately if token does not exist
//   //     if (!token) {
//   //       setError(
//   //         "Authentication token is missing. Please login again."
//   //       );
//   //       return;
//   //     }

//   //     // Request donor
//   //     const response = await axios.get(
//   //       `http://localhost:5000/api/donors/${id}`,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );

//   //     console.log(
//   //       "DONOR RESPONSE:",
//   //       response.data
//   //     );

//   //     setDonor(
//   //       response.data.donor
//   //     );

//   //   } catch (error) {
//   //     console.error(
//   //       "DONOR PROFILE ERROR:",
//   //       error
//   //     );

//   //     console.error(
//   //       "STATUS:",
//   //       error.response?.status
//   //     );

//   //     console.error(
//   //       "SERVER RESPONSE:",
//   //       error.response?.data
//   //     );

//   //     setError(
//   //       error.response?.data?.message ||
//   //       "Unable to load donor profile."
//   //     );

//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

// const fetchDonor = async () => {
//   try {
//     setLoading(true);
//     setError("");

//     console.log("========== DONOR REQUEST ==========");

//     console.log("Donor ID:", id);

//     const token = localStorage.getItem("token");

//     console.log("Token:", token);
//     console.log("Token exists:", !!token);

//     if (!token) {
//       setError(
//         "Authentication token not found. Please login again."
//       );
//       return;
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     };

//     console.log("Axios config:", config);

//     // const response = await axios.get(
//     //   `http://localhost:5000/api/donors/${id}`,
//     //   config
//     // );
//     const response = await api.get(`/donors/${id}`);

// console.log("Donor response:", response.data);

// setDonor(response.data.donor);

//     console.log(
//       "DONOR RESPONSE:",
//       response.data
//     );

//     // setDonor(response.data.donor);

//   } catch (error) {
//     console.error(
//       "DONOR PROFILE ERROR:",
//       error
//     );

//     console.error(
//       "STATUS:",
//       error.response?.status
//     );

//     console.error(
//       "SERVER MESSAGE:",
//       error.response?.data
//     );

//     setError(
//       error.response?.data?.message ||
//       "Unable to load donor profile."
//     );

//   } finally {
//     setLoading(false);
//   }
// };



//   if (loading) {
//     return (
//       <>
//         <Navbar />

//         <div className="profile-message">
//           Loading donor profile...
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Navbar />

//         <div className="profile-message error">
//           <h2>
//             Unable to load donor
//           </h2>

//           <p>{error}</p>

//           <button
//             onClick={() =>
//               navigate("/find-donor")
//             }
//           >
//             Back to Find Donor
//           </button>
//         </div>
//       </>
//     );
//   }

//   if (!donor) {
//     return (
//       <>
//         <Navbar />

//         <div className="profile-message">
//           <h2>
//             No donor information available.
//           </h2>

//           <button
//             onClick={() =>
//               navigate("/find-donor")
//             }
//           >
//             Back to Find Donor
//           </button>
//         </div>
//       </>
//     );
//   }

//   const {
//     name,
//     bloodGroup,
//     phone,
//     email,
//     city,
//     address,
//     gender,
//     age,
//     weight,
//     isAvailable,
//     available,
//   } = donor;

//   const donorAvailable =
//     isAvailable !== undefined
//       ? isAvailable
//       : available;

//   return (
//     <>
//       <Navbar />

//       <main className="donor-profile-page">

//         <button
//           className="back-button"
//           onClick={() =>
//             navigate("/find-donor")
//           }
//         >
//           ← Back to Donors
//         </button>

//         <div className="donor-profile-card">

//           <div className="profile-header">

//             <div className="profile-avatar">
//               {getInitials(name)}
//             </div>

//             <div className="profile-header-info">

//               <h1>
//                 {name}
//               </h1>

//               <div className="blood-group">
//                 {bloodGroup || "N/A"}
//               </div>

//               <div
//                 className={
//                   donorAvailable
//                     ? "availability available"
//                     : "availability unavailable"
//                 }
//               >
//                 <span></span>

//                 {donorAvailable
//                   ? "Available for Donation"
//                   : "Currently Unavailable"}
//               </div>

//             </div>

//           </div>


//           <section className="profile-section">

//             <h2>
//               Donor Information
//             </h2>

//             <div className="profile-grid">

//               <div className="profile-item">
//                 <span>Gender</span>
//                 <strong>
//                   {gender || "Not provided"}
//                 </strong>
//               </div>

//               <div className="profile-item">
//                 <span>Age</span>
//                 <strong>
//                   {age
//                     ? `${age} years`
//                     : "Not provided"}
//                 </strong>
//               </div>

//               <div className="profile-item">
//                 <span>Weight</span>
//                 <strong>
//                   {weight
//                     ? `${weight} kg`
//                     : "Not provided"}
//                 </strong>
//               </div>

//               <div className="profile-item">
//                 <span>Blood Group</span>
//                 <strong>
//                   {bloodGroup || "Not provided"}
//                 </strong>
//               </div>

//             </div>

//           </section>


//           <section className="profile-section">

//             <h2>
//               Contact Information
//             </h2>

//             <div className="contact-list">

//               <div className="contact-row">

//                 <span className="contact-icon">
//                   📞
//                 </span>

//                 <div>
//                   <small>Phone</small>

//                   <strong>
//                     {phone || "Not provided"}
//                   </strong>
//                 </div>

//               </div>


//               <div className="contact-row">

//                 <span className="contact-icon">
//                   ✉️
//                 </span>

//                 <div>
//                   <small>Email</small>

//                   <strong>
//                     {email || "Not provided"}
//                   </strong>
//                 </div>

//               </div>


//               <div className="contact-row">

//                 <span className="contact-icon">
//                   📍
//                 </span>

//                 <div>
//                   <small>City</small>

//                   <strong>
//                     {city || "Not provided"}
//                   </strong>
//                 </div>

//               </div>


//               <div className="contact-row">

//                 <span className="contact-icon">
//                   🏠
//                 </span>

//                 <div>
//                   <small>Address</small>

//                   <strong>
//                     {address || "Not provided"}
//                   </strong>
//                 </div>

//               </div>

//             </div>

//           </section>


//           {donorAvailable && (

//             <div className="request-section">

//               <h2>
//                 Need Blood?
//               </h2>

//               <p>
//                 If you need this donor's blood
//                 group, you can send a blood
//                 request.
//               </p>

//               <button
//                 className="request-button"
//                 onClick={() =>
//                   navigate(
//                     `/request-blood/${donor._id}`
//                   )
//                 }
//               >
//                 Request Blood
//               </button>

//             </div>

//           )}

//         </div>

//       </main>
//     </>
//   );
// }













import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./DonorProfile.css";
import api from "./api";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export default function DonorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchDonor(id);
    } else {
      setError("Donor ID is missing.");
      setLoading(false);
    }
  }, [id]);

  const fetchDonor = async (donorId) => {
    try {
      setLoading(true);
      setError("");

      console.log("========== DONOR PROFILE ==========");
      console.log("Donor ID:", donorId);

      /*
       * api.js should already contain:
       * Authorization: Bearer <token>
       *
       * Therefore we do NOT need to manually add
       * the token here.
       */

      const response = await api.get(`/donors/${donorId}`);

      console.log("Donor API response:", response.data);

      /*
       * Supports both:
       *
       * { donor: {...} }
       *
       * and
       *
       * {...donor fields...}
       */
      const donorData =
        response.data?.donor || response.data;

      if (!donorData) {
        setError("Donor information was not found.");
        return;
      }

      setDonor(donorData);
    } catch (error) {
      console.error("DONOR PROFILE ERROR:", error);

      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );

      if (error.response?.status === 401) {
        setError(
          "Your login session has expired. Please login again."
        );
      } else if (error.response?.status === 403) {
        setError(
          "You are not authorized to view this donor."
        );
      } else if (error.response?.status === 404) {
        setError(
          "Donor not found."
        );
      } else {
        setError(
          error.response?.data?.message ||
            "Unable to load donor profile."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /*
   * ================= LOADING =================
   */

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="profile-message">
          Loading donor profile...
        </div>
      </>
    );
  }

  /*
   * ================= ERROR =================
   */

  if (error) {
    return (
      <>
        <Navbar />

        <div className="profile-message error">
          <h2>
            Unable to load donor
          </h2>

          <p>{error}</p>

          <button
            onClick={() =>
              navigate("/find-donor")
            }
          >
            Back to Find Donor
          </button>

          {error.includes("login") && (
            <button
              onClick={() =>
                navigate("/login")
              }
              style={{ marginLeft: "10px" }}
            >
              Login Again
            </button>
          )}
        </div>
      </>
    );
  }

  /*
   * ================= NO DONOR =================
   */

  if (!donor) {
    return (
      <>
        <Navbar />

        <div className="profile-message">
          <h2>
            No donor information available.
          </h2>

          <button
            onClick={() =>
              navigate("/find-donor")
            }
          >
            Back to Find Donor
          </button>
        </div>
      </>
    );
  }

  /*
   * ================= DONOR DATA =================
   */

  const {
    _id,
    id: donorId,

    name,
    fullName,

    bloodGroup,

    phone,
    email,

    city,
    location,
    address,

    gender,
    age,
    weight,

    isAvailable,
    available,
  } = donor;

  /*
   * Support different database field names
   * without changing the frontend.
   */

  const donorName =
    name ||
    fullName ||
    "Unknown Donor";

  const donorBloodGroup =
    bloodGroup ||
    "N/A";

  const donorCity =
    city ||
    location ||
    "Not provided";

  /*
   * Support both:
   *
   * isAvailable
   * available
   *
   * If neither exists, default to false.
   */

  const donorAvailable =
    typeof isAvailable === "boolean"
      ? isAvailable
      : typeof available === "boolean"
      ? available
      : false;

  /*
   * Use MongoDB _id first.
   * Fallback to id if your backend uses id.
   */

  const currentDonorId =
    _id ||
    donorId ||
    id;

  return (
    <>
      <Navbar />

      <main className="donor-profile-page">

        {/* BACK BUTTON */}

        <button
          className="back-button"
          onClick={() =>
            navigate("/find-donor")
          }
        >
          ← Back to Donors
        </button>

        <div className="donor-profile-card">

          {/* PROFILE HEADER */}

          <div className="profile-header">

            <div className="profile-avatar">
              {getInitials(donorName)}
            </div>

            <div className="profile-header-info">

              <h1>
                {donorName}
              </h1>

              <div className="blood-group">
                {donorBloodGroup}
              </div>

              <div
                className={
                  donorAvailable
                    ? "availability available"
                    : "availability unavailable"
                }
              >
                <span></span>

                {donorAvailable
                  ? "Available for Donation"
                  : "Currently Unavailable"}
              </div>

            </div>

          </div>

          {/* DONOR INFORMATION */}

          <section className="profile-section">

            <h2>
              Donor Information
            </h2>

            <div className="profile-grid">

              <div className="profile-item">

                <span>
                  Gender
                </span>

                <strong>
                  {gender || "Not provided"}
                </strong>

              </div>

              <div className="profile-item">

                <span>
                  Age
                </span>

                <strong>
                  {age !== undefined &&
                  age !== null &&
                  age !== ""
                    ? `${age} years`
                    : "Not provided"}
                </strong>

              </div>

              <div className="profile-item">

                <span>
                  Weight
                </span>

                <strong>
                  {weight !== undefined &&
                  weight !== null &&
                  weight !== ""
                    ? `${weight} kg`
                    : "Not provided"}
                </strong>

              </div>

              <div className="profile-item">

                <span>
                  Blood Group
                </span>

                <strong>
                  {donorBloodGroup}
                </strong>

              </div>

            </div>

          </section>

          {/* CONTACT INFORMATION */}

          <section className="profile-section">

            <h2>
              Contact Information
            </h2>

            <div className="contact-list">

              <div className="contact-row">

                <span className="contact-icon">
                  📞
                </span>

                <div>

                  <small>
                    Phone
                  </small>

                  <strong>
                    {phone || "Not provided"}
                  </strong>

                </div>

              </div>

              <div className="contact-row">

                <span className="contact-icon">
                  ✉️
                </span>

                <div>

                  <small>
                    Email
                  </small>

                  <strong>
                    {email || "Not provided"}
                  </strong>

                </div>

              </div>

              <div className="contact-row">

                <span className="contact-icon">
                  📍
                </span>

                <div>

                  <small>
                    City
                  </small>

                  <strong>
                    {donorCity}
                  </strong>

                </div>

              </div>

              <div className="contact-row">

                <span className="contact-icon">
                  🏠
                </span>

                <div>

                  <small>
                    Address
                  </small>

                  <strong>
                    {address || "Not provided"}
                  </strong>

                </div>

              </div>

            </div>

          </section>

          {/* REQUEST BLOOD */}

          {donorAvailable && currentDonorId && (

            <div className="request-section">

              <h2>
                Need Blood?
              </h2>

              <p>
                If you need this donor's blood
                group, you can send a blood
                request.
              </p>

              <button
                className="request-button"
                onClick={() =>
                  navigate(
                    `/request-blood/${currentDonorId}`
                  )
                }
              >
                Request Blood
              </button>

            </div>

          )}

        </div>

      </main>
    </>
  );
}

