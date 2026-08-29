import React from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

function DropIllustration() {
  
  return (
    <svg
      className="hero-illustration"
      viewBox="0 0 400 320"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* decorative plus signs */}
      <g className="deco deco-plus" opacity="0.6">
        <path d="M40 40h10v30h-10z" />
        <path d="M25 55h40v10h-40z" />
      </g>
      <g className="deco deco-plus" opacity="0.6" transform="translate(320,20)">
        <path d="M40 40h10v30h-10z" />
        <path d="M25 55h40v10h-40z" />
      </g>
      <g className="deco deco-plus" opacity="0.5" transform="translate(10,220)">
        <path d="M40 40h8v24h-8z" />
        <path d="M28 52h32v8h-32z" />
      </g>
      <g
        className="deco deco-plus"
        opacity="0.5"
        transform="translate(340,230)"
      >
        <path d="M40 40h8v24h-8z" />
        <path d="M28 52h32v8h-32z" />
      </g>

      {/* hearts */}
      <path
        className="deco-heart deco-heart-lg"
        d="M200 40c-10-18-36-16-36 4 0 18 24 32 36 44 12-12 36-26 36-44 0-20-26-22-36-4z"
      />
      <path
        className="deco-heart deco-heart-sm"
        d="M330 60c-5-9-18-8-18 2 0 9 12 16 18 22 6-6 18-13 18-22 0-10-13-11-18-2z"
      />

      {/* glow circle */}
      <circle cx="200" cy="170" r="95" className="glow-circle" />

      {/* hands */}
      <path
        className="hand hand-left"
        d="M120 220c-6-30-4-60 6-84 4-10 16-10 18 0 3 14 4 30 2 44 18-8 34-4 40 10 10 22 6 46-10 62-18 18-42 22-56 8-10-10-14-24-0 -40z"
      />
      <path
        className="hand hand-right"
        d="M280 220c6-30 4-60-6-84-4-10-16-10-18 0-3 14-4 30-2 44-18-8-34-4-40 10-10 22-6 46 10 62 18 18 42 22 56 8 10-10 14-24 0-40z"
      />

      {/* blood drop */}
      <path
        className="blood-drop"
        d="M200 90c26 34 46 62 46 90a46 46 0 0 1-92 0c0-28 20-56 46-90z"
      />
      {/* cross on drop */}
      <path
        className="drop-cross"
        d="M191 158h18v18h18v18h-18v18h-18v-18h-18v-18h18z"
      />
    </svg>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="hero-heading">
          Donate Blood,
          <br />
          <span className="hero-heading-accent">Save Lives</span>
        </h1>
        <p className="hero-subtext">
          Thousands of people need blood every day.
          <br />
          Find nearby donors and save a life today.
        </p>
        <div className="hero-actions">
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: "#e0392b",
              color: "#fff",
              borderColor: "#e0392b",
            }}
            onClick={()=>{navigate('/register')}}
          >
            Become a Donor
          </button>
          <button className="btn btn-outline" onClick={()=>{navigate('/find-donor')}}>Find Donor</button>
        </div>
      </div>
      <div className="hero-media">
        <DropIllustration />
      </div>
    </section>
  );
}
