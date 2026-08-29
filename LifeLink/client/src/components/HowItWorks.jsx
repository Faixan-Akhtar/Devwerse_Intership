import React from "react";
import "./HowItWorks.css";

const ICONS = {
  register: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 19c0-3.3 2.9-5.5 5.5-5.5s5.5 2.2 5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="17.5" cy="7.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M14.8 13.6c1-.7 2-1 2.7-1 2 0 3.8 1.6 3.8 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  verified: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3l6.5 2.6v5.2c0 4.4-2.8 7.7-6.5 9.2-3.7-1.5-6.5-4.8-6.5-9.2V5.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2.2 2.2L15.5 9.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M15.2 15.2L20 20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  request: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="5.5"
        y="3.5"
        width="13"
        height="17"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 20s-7.5-4.6-9.7-9.3C.8 7.4 2.5 4.2 5.8 3.7c1.9-.3 3.7.6 4.8 2.1a1.6 1.6 0 0 0 2.8 0c1.1-1.5 2.9-2.4 4.8-2.1 3.3.5 5 3.7 3.5 7C19.5 15.4 12 20 12 20z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const STEPS = [
  {
    key: "register",
    title: "1. Register",
    description: "Create your account as donor or recipient",
  },
  {
    key: "verified",
    title: "2. Get Verified",
    description: "Our team will verify your details",
  },
  {
    key: "search",
    title: "3. Search Donor",
    description: "Search donors by blood group and location",
  },
  {
    key: "request",
    title: "4. Send Request",
    description: "Send blood request to available donors",
  },
  {
    key: "heart",
    title: "5. Save Life",
    description: "Your small help can save a life",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2 className="section-title how-title">How It Works</h2>
      <div className="steps-row">
        {STEPS.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="step">
              <div className="step-icon">{ICONS[step.key]}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
            {index < STEPS.length - 1 && (
              <span className="step-arrow" aria-hidden="true">
                &#8250;
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
