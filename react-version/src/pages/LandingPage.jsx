// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom"; // DO NOT FORGET TO IMPORT THIS LINK MARK

function LandingPage() {
  return (
    // Fragment wraps multiple top-level sections
    <>
      <section className="hero">
        <div className="container hero-content">
          <h1>The Student Solutions point</h1>
          <p className="subtitle">
            Use SOLPOINT to easily report problems with fees, portal access,
            results, and more, and see their status.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </div>
        <div className="hero-wave"></div>
        <div className="decorative-circle circle-1"></div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <div className="feature-box">
              <h3>Report Problems Easily</h3>
              <p>
                Quickly submit tickets for common issues like NELFUND delays,
                mail access, or password resets
              </p>
            </div>
            <div className="feature-box">
              <h3>Track Your Ticket Status</h3>
              <p>
                See if your issue is open, in progress, or closed directly from
                your dashboard.
              </p>
            </div>
            <div className="feature-box">
              <h3>All Your Requests in One Place</h3>
              <p>Manage all your university support requests here.</p>
            </div>
          </div>
        </div>
        <div className="decorative-circle circle-2"></div>
      </section>
    </>
  );
}

export default LandingPage;
