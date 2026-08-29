import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "./index.css";

import Home from "./Home";
import About from "./About";
import FindDonor from "./FindDonor";
import ContactPage from "./ContactPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

import DonorProfileCard from "./DonorProfileCard";

import RequestBlood from "./RequestBlood";
import DonorDashboard from "./DonorDashboard";
import RecipientDashboard from "./RecipientDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />
      <Route path="/find-donor" element={<FindDonor />} />
      <Route path="/donor/:id" element={<DonorProfileCard />} />

      <Route path="/contact" element={<ContactPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/request-blood/:donorId" element={<RequestBlood />} />

      <Route path="/donor-dashboard" element={<DonorDashboard />} />

      <Route path="/recipient-dashboard" element={<RecipientDashboard />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}
