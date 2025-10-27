// src/components/Header.jsx
// Combined React and useState import
import React, { useState } from "react";
// Keep Link and useNavigate
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  // Check if logged in
  const isLoggedIn = !!localStorage.getItem("ticketapp_session");
  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to run when the logout button is clicked
  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session"); // Delete the token
    navigate("/"); // Send user back to the landing page
  };

  // --- MOVED: Toggle function for mobile menu ---
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Flip the state
  };

  // --- NEW: Function to close menu when a mobile link is clicked ---
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false); // Close menu
  };

  // --- NEW: Function to handle logout AND close mobile menu ---
  const handleMobileLogoutClick = () => {
    handleLogout(); // Perform logout actions
    setIsMobileMenuOpen(false); // Close menu
  };

  return (
    <header className="main-header">
      <nav className="container">
        <Link to="/" className="logo">
          SOLPOINT
        </Link>

        {/* --- Hamburger Button (Connects to toggleMobileMenu) --- */}
        <button
          className={`mobile-nav-toggle ${isMobileMenuOpen ? "active" : ""}`} // Add 'active' class when open for potential 'X' icon styling
          onClick={toggleMobileMenu} // Use the correct toggle function
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* --- ADDED: Wrapper div for mobile overlay --- */}
        {/* Adds 'mobile-menu-open' class when state is true */}
        <div
          className={`nav-links-container ${
            isMobileMenuOpen ? "mobile-menu-open" : ""
          }`}
        >
          <ul className="nav-links">
            {/* Check if isLoggedIn is true or false */}
            {isLoggedIn ? (
              // If TRUE (user is logged in): Show these buttons
              <>
                <li>
                  {/* Add onClick to close menu */}
                  <Link
                    to="/tickets"
                    className="nav-btn nav-btn-login"
                    onClick={handleMobileLinkClick}
                  >
                    My Tickets
                  </Link>
                </li>
                <li>
                  {/* Use specific handler for mobile logout + close */}
                  <button
                    onClick={handleMobileLogoutClick}
                    className="nav-btn nav-btn-start"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // If FALSE (user is logged out): Show these buttons
              <>
                <li>
                  {/* Add onClick to close menu */}
                  <Link
                    to="/login"
                    className="nav-btn nav-btn-login"
                    onClick={handleMobileLinkClick}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  {/* Add onClick to close menu */}
                  <Link
                    to="/login"
                    className="nav-btn nav-btn-start"
                    onClick={handleMobileLinkClick}
                  >
                    Get Started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
