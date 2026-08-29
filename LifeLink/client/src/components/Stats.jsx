import React from "react";
import "./Stats.css";

const STATS = [
  { value: "12,540+", label: "Total Donors" },
  { value: "3,245+", label: "Blood Requests" },
  // { value: "520+", label: "Hospitals" },
  { value: "9,876+", label: "Successful Donations" },
];

export default function Stats() {
  return (
    <section className="stats">
      {STATS.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
