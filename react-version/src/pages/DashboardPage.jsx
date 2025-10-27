// src/pages/DashboardPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <section className="page-content">
      <div className="container">
        <h2 className="section-title">Dashboard</h2>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Tickets</h3>
            {/* Placeholder data */}
            <div className="count">12</div>
          </div>
          <div className="stat-card">
            <h3>Open Tickets</h3>
            {/* Placeholder data */}
            <div className="count">3</div>
          </div>
          <div className="stat-card">
            <h3>Resolved Tickets</h3>
            {/* Placeholder data */}
            <div className="count">9</div>
          </div>
        </div>

        <div className="dashboard-nav">
          <h2 className="section-title">Manage</h2>
          <Link to="/tickets" className="btn btn-primary">
            Go to Ticket Management
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
