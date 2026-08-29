import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email.trim(),
          password: form.password,
        },
      );

      console.log("LOGIN RESPONSE:", response.data);

      const token = response.data.token;

      if (!token) {
        throw new Error("Login successful, but server did not return a token.");
      }

      // Save authentication token
      localStorage.setItem("token", token);

      // Save user
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      // Verify it was actually saved
      console.log("TOKEN SAVED:", localStorage.getItem("token"));

      // navigate("/find-donor");
      navigate("/home");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(
        error.response?.data?.message || error.message || "Login failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-card">
          <div className="logo">
            <span className="logo-icon">❤️</span>

            <span className="logo-text">
              Life<span className="logo-highlight">Link</span>
            </span>
          </div>

          <h2 className="welcome-title">Welcome Back!</h2>

          <p className="welcome-subtitle">Login to continue</p>

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>

                <a href="#forgot" className="forgot-link">
                  Forgot Password?
                </a>
              </div>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* REMEMBER ME */}
            <div className="remember-row">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleChange}
              />

              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            {/* LOGIN BUTTON */}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="register-text">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
