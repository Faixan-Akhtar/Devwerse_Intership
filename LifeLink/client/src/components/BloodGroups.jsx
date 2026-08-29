import React from "react";
import "./BloodGroups.css";

const GROUPS = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

export default function BloodGroups() {
  return (
    <section className="blood-groups">
      <h2 className="section-title">Blood Groups</h2>
      <div className="blood-groups-list">
        {GROUPS.map((group) => (
          <span className="blood-group-pill" key={group}>
            {group}
          </span>
        ))}
      </div>
    </section>
  );
}
