import React, { useState } from "react";
import { FaHeartbeat } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const year = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="ll-footer">
      <div className="ll-footer__wrap">

        {/* top: brand + newsletter */}
        <div className="ll-footer__top">
          <div className="ll-footer__brand">
            <div className="ll-footer__logo">
              {/* <svg viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M12 2C12 2 3 13 3 18.5C3 23.5 7 26 12 26C17 26 21 23.5 21 18.5C21 13 12 2 12 2Z"
                  fill="#C41E3A"
                />
              </svg> */}
              {/* <span>LifeLink</span> */}
              <h2><FaHeartbeat id="heart" color="red"/><span>LIFE</span>LINK</h2>
            </div>
            <p className="ll-footer__tagline">
              A direct line between donors and the patients who need them —
              matched by type, distance, and urgency.
            </p>

            <div className="ll-footer__social">
              <a href="#" aria-label="LifeLink on Twitter / X" className="ll-footer__icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.6-6.9L4.2 22H1l8.1-9.3L.9 2H8.2l5.1 6.4L18.9 2Zm-1.2 18h1.9L7.4 4h-2l12.3 16Z"/></svg>
              </a>
              <a href="#" aria-label="LifeLink on Instagram" className="ll-footer__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="#" aria-label="LifeLink on LinkedIn" className="ll-footer__icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z"/></svg>
              </a>
            </div>
          </div>

          <form className="ll-footer__newsletter" onSubmit={handleSubmit}>
            <h4 className="ll-footer__heading">Stay in the loop</h4>
            <p className="ll-footer__sub">
              Monthly updates on urgent needs near you. No spam, unsubscribe anytime.
            </p>
            <div className="ll-footer__field">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
              />
              <button type="submit">Subscribe</button>
            </div>
            {submitted && (
              <span className="ll-footer__confirm" role="status">
                ✓ You're on the list.
              </span>
            )}
          </form>
        </div>

        {/* link columns */}
        <nav className="ll-footer__cols" aria-label="Footer navigation">
          <div className="ll-footer__col">
            <h4>Donors</h4>
            <a href="#">Become a donor</a>
            <a href="#">Eligibility check</a>
            <a href="#">Donation centers</a>
            <a href="#">Donor dashboard</a>
          </div>
          <div className="ll-footer__col">
            <h4>Hospitals</h4>
            <a href="#">Request blood</a>
            <a href="#">Partner with us</a>
            <a href="#">Inventory API</a>
            <a href="#">Support center</a>
          </div>
          <div className="ll-footer__col">
            <h4>About</h4>
            <a href="#">Our mission</a>
            <a href="#">Safety standards</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          <div className="ll-footer__col">
            <h4>Legal</h4>
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
            <a href="#">Cookie settings</a>
          </div>
        </nav>

        {/* bottom bar */}
        <div className="ll-footer__bottom">
          <span>© {year} LifeLink. All rights reserved.</span>
          <h2><FaHeartbeat id="heart" color="red"/></h2>
          <span className="ll-footer__meta">Made to save lives, not sell data.</span>
        </div>
      </div>
    </footer>
  );
}