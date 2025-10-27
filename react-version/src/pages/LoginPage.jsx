// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast function

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Removed 'error' state
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // No need to clear error state

    // Validation using toast
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    // --- Simulate Authentication ---
    if (email === "user@example.com" && password === "password123") {
      localStorage.setItem("ticketapp_session", "mock_token_12345");
      toast.success("Login successful!"); // Success notification
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password."); // Failure notification
    }
  };

  return (
    <section className="auth-container">
      <div className="container">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Student Portal Login</h2>
          {/* Removed conditional error paragraph */}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="form-error">Please enter a valid email.</span>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="form-error">Password is required.</span>
          </div>

          <button type="submit" className="btn btn-primary btn-full-width">
            Login
          </button>

          <p className="auth-switch">
            Don't have an account? <a href="#">Sign Up</a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
