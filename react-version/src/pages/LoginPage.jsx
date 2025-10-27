// src/pages/LoginPage.jsx

// Need useState for form inputs, useNavigate to redirect, toast for messages
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  // --- State Variables ---
  // For Login & Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Only for Signup
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // To switch between Login and Signup forms
  const [isSignupMode, setIsSignupMode] = useState(false);
  // Need this to redirect after login/signup success
  const navigate = useNavigate();

  // --- Signup Function ---
  const handleSignup = (event) => {
    event.preventDefault(); // Stop page reload

    // Basic checks first
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Oops! Need all fields for signup.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Heads up! Passwords don't match.");
      return;
    }
    // Simple email check
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Hmm, that email doesn't look right.");
      return;
    }

    // Check if user already exists in localStorage (using email as key part)
    if (localStorage.getItem(`user_${email}`)) {
      toast.error("This email is already taken. Try logging in.");
      return;
    }

    // --- Save User Data ---
    // Make an object with the user's details
    const userData = JSON.stringify({ name, email, password }); // NOTE: Storing password directly is NOT secure! Okay for HNG task.
    // Save it to localStorage using a key like 'user_test@example.com'
    localStorage.setItem(`user_${email}`, userData);

    toast.success("Account created! Please log in now.");
    setIsSignupMode(false); // Switch back to the login form
    // Clear out the form fields
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // --- Login Function ---
  const handleLogin = (event) => {
    event.preventDefault(); // Stop page reload

    if (!email || !password) {
      toast.error("Need both email and password to log in.");
      return;
    }

    // --- Check if User Exists ---
    // Try to get user data from localStorage using the email
    const storedUserData = localStorage.getItem(`user_${email}`);

    if (storedUserData) {
      // If user exists, parse the stored data (it's saved as a string)
      const userData = JSON.parse(storedUserData);

      // --- Check Password ---
      // Compare entered password with the stored one. (Again, NOT secure!)
      if (userData.password === password) {
        // Correct password!
        // Save a 'session' token (just using email here is fine for simulation)
        localStorage.setItem("ticketapp_session", email);
        toast.success("Logged in successfully!");
        navigate("/dashboard"); // Go to the dashboard
      } else {
        // Wrong password
        toast.error("Invalid email or password.");
      }
    } else {
      // User doesn't exist in localStorage
      toast.error("No account found. Did you mean to sign up?");
    }
  };

  // --- Toggle Form Mode ---
  // Flips between login and signup views
  const toggleMode = () => {
    setIsSignupMode(!isSignupMode); // Change the mode
    // Clear all fields when switching
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // --- Render ---
  return (
    <section className="auth-container">
      <div className="container">
        {/* Use the correct handler based on whether we're in signup mode */}
        <form
          className="auth-form"
          onSubmit={isSignupMode ? handleSignup : handleLogin}
        >
          {/* Change title based on mode */}
          <h2>
            {isSignupMode ? "Create Your Account" : "Student Portal Login"}
          </h2>

          {/* Name field: Only show if isSignupMode is true */}
          {isSignupMode && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {/* Email field: Show always */}
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

          {/* Password field: Show always */}
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

          {/* Confirm Password field: Only show if isSignupMode is true */}
          {isSignupMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          {/* Submit button text changes based on mode */}
          <button type="submit" className="btn btn-primary btn-full-width">
            {isSignupMode ? "Sign Up" : "Login"}
          </button>

          {/* Toggle link/button at the bottom */}
          <p className="auth-switch">
            {isSignupMode
              ? "Already have an account?"
              : "Don't have an account?"}
            {/* Use a button styled like a link to trigger the mode switch */}
            <button type="button" onClick={toggleMode} className="link-button">
              {isSignupMode ? "Login" : "Sign Up"}
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
