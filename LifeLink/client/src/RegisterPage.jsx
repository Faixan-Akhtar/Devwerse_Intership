import React, { useState } from "react";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("donor"); // "donor" | "recipient"
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    address: "",
    bloodGroup: "",
    gender: "",
    age: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Registering as:", role, form);
  //   // Hook up your API call here
  // };
  //   const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (form.password !== form.confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:5000/api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         role,
  //         fullName: form.fullName,
  //         email: form.email,
  //         phone: form.phone,
  //         password: form.password,
  //         city: form.city,
  //         address: form.address,
  //         bloodGroup: form.bloodGroup,
  //         gender: form.gender,
  //         age: form.age,
  //         weight: form.weight,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Registration failed");
  //     }

  //     console.log("Registration successful:", data);
  //     alert("Registration successful!");

  //   } catch (error) {
  //     console.error("Registration error:", error)
  //     alert(error.message);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (form.password !== form.confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:5000/api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: form.fullName,
  //         email: form.email,
  //         phone: form.phone,
  //         password: form.password,
  //         role: role.toUpperCase(),
  //       }),
  //     });

  //     const data = await response.json();

  //     console.log("Server response:", data);

  //     if (!response.ok) {
  //       throw new Error(data.message || "Registration failed");
  //     }

  //     alert("Registration successful!");

  //   } catch (error) {
  //     console.error("Registration error:", error);
  //     alert(error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: role.toUpperCase(),
          city: form.city,
          address: form.address,
          bloodGroup: form.bloodGroup,
          gender: form.gender,
          age: form.age,
          weight: form.weight,
        }),
      });

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Response:", data);

      navigate("/home");

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-page">
        {/* <h1 className="page-title">Register Page</h1> */}

        <div className="register-card">
          <p className="register-as-label">Register As</p>

          <div className="role-toggle">
            <button
              type="button"
              className={`role-btn ${role === "donor" ? "active" : ""}`}
              onClick={() => setRole("donor")}
            >
              Donor
            </button>
            <button
              type="button"
              className={`role-btn ${role === "recipient" ? "active" : ""}`}
              onClick={() => setRole("recipient")}
            >
              Recipient
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bloodGroup">Blood Group</label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Enter your age"
                  value={form.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  placeholder="Enter your weight"
                  value={form.weight}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="register-btn">
              Register
            </button>

            <p className="login-text">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
