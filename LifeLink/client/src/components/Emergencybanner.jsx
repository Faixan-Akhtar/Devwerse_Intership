// import React from "react";
// import "./CallToAction.css";

// function HandHeart() {
//   return (
//     <svg
//       className="cta-illustration"
//       viewBox="0 0 160 100"
//       xmlns="http://www.w3.org/2000/svg"
//       aria-hidden="true"
//     >
//       <path
//         className="cta-hand"
//         d="M20 92c-8-4-14-14-14-26 0-10 4-20 10-28 3-4 9-3 10 2l3 14
//            2-16c1-5 8-5 9 0l2 16 2-15c1-5 8-5 9 0l1 15 3-12c1-5 8-4 8 1
//            l-1 22c8 2 14 9 14 18 0 8-4 14-10 18l-2 1H30l-10-10z"
//       />
//       <path
//         className="cta-heart"
//         d="M96 38c-4-8-16-7-16 2 0 8 10 14 16 20 6-6 16-12 16-20
//            0-9-12-10-16-2z"
//       />
//     </svg>
//   );
// }

// export default function CallToAction() {
//   return (
//     <section className="cta-banner">
//       <div className="cta-text">
//         <h2 className="cta-heading">Become a Hero. Donate Blood.</h2>
//         <p className="cta-subtext">
//           Your blood can give someone a second chance at life.
//         </p>
//       </div>
//       <div className="cta-center">
//         <img src="/AI Eraser_image.png" width='100%'/>
//       </div>
//       <div className="cta-right">
//         <button className="cta-button">Become a Donor</button>
//         {/* <img src="/CallToAction image.jpg" width="100"/> */}
//         {/* <HandHeart /> */}
//       </div>
//     </section>
//   );
// }

// EmergencyBanner.jsx
// A simple React component. It just shows some text, a button, and a phone number.
// We import our CSS file so the styles apply to this component.

import "./Emergencybanner.css";
import { useNavigate } from "react-router-dom";

function EmergencyBanner() {
  const navigate = useNavigate()
  return (
    <div className="emergency-banner">
      {/* Left side: siren icon + heading text */}
      <div className="emergency-left">
        <span className="emergency-icon">🚨</span>

        <div>
          <p className="emergency-title">Emergency? Need Blood Urgently?</p>
          <p className="emergency-subtitle">
            We're here to help 24/7. Contact our support team immediately.
          </p>
        </div>
      </div>

      {/* Right side: call button + phone number */}
      <div className="emergency-right">
        <button className="emergency-button" onClick={()=>{navigate('/contact')}}>📞 Call Emergency Helpline</button>

        <div className="emergency-divider"></div>

        <div className="emergency-phone">
          <span className="emergency-icon" style={{ fontSize: "20px" }}>
            📞
          </span>
          <div className="emergency-phone-text">
            <p className="phone-number">+91 98765 43210</p>
            <p className="phone-available">Available 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyBanner;