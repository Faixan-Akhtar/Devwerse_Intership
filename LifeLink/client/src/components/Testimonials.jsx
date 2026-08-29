// Testimonials.jsx
// A simple testimonials section. The cards can be scrolled left/right
// using the arrow buttons, or by swiping/scrolling on mobile.

import { useRef } from "react";
import "./Testimonials.css";

// All the testimonial data lives in one array.
// To add a new testimonial, just add a new object here.
const testimonials = [
  {
    text: "Thanks to a blood donor, my mother is alive today. I will always be grateful.",
    name: "Priya Sharma",
    role: "Recipient",
    initials: "PS",
    color: "#e07a7a",
  },
  {
    text: "Donating blood is a small act that makes a big difference in someone's life.",
    name: "Rahul Verma",
    role: "Donor",
    initials: "RV",
    color: "#6f9ce0",
  },
  {
    text: "Lifelink made it easy to find blood donors when we needed it the most.",
    name: "Ankit Patel",
    role: "Recipient",
    initials: "AP",
    color: "#5a5a5a",
  },
  {
    text: "Proud to be a regular donor. Every drop truly counts.",
    name: "Neha Singh",
    role: "Donor",
    initials: "NS",
    color: "#e0507a",
  },
];

function Testimonials() {
  // A ref lets us "point" to the scrolling container in the DOM,
  // so our arrow buttons can tell it to scroll.
  const trackRef = useRef(null);

  function scrollLeft() {
    trackRef.current.scrollBy({ left: -260, behavior: "smooth" });
  }

  function scrollRight() {
    trackRef.current.scrollBy({ left: 260, behavior: "smooth" });
  }

  return (
    <section className="testimonials">
      <h2 className="testimonials-heading">Real People. Real Impact.</h2>

      <div className="testimonials-row">
        <button className="arrow-button" onClick={scrollLeft}>
          ‹
        </button>

        {/* This is the scrollable strip of cards */}
        <div className="cards-track" ref={trackRef}>
          {testimonials.map((item) => (
            <div className="testimonial-card" key={item.name}>
              <p className="quote-mark">"</p>
              <p className="testimonial-text">{item.text}</p>

              <div className="testimonial-person">
                <div
                  className="avatar-circle"
                  style={{ backgroundColor: item.color }}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="person-name">{item.name}</p>
                  <p className="person-role">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow-button" onClick={scrollRight}>
          ›
        </button>
      </div>
    </section>
  );
}

export default Testimonials;