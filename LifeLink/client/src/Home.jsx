import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import BloodGroups from "./components/BloodGroups";
import HowItWorks from "./components/HowItWorks";
import CallToAction from "./components/Emergencybanner";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import EmergencyBanner from "./components/Emergencybanner";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="page-card">
        <Hero />
        <Stats />
        <BloodGroups />
        <HowItWorks />
        <EmergencyBanner/>
        <Testimonials/>
      </div>
      <Footer />
    </>
  );
}
