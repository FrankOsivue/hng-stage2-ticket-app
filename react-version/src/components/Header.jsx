// src/components/Header.jsx
import React from "react";
// Need Link for clicking between pages without reloading
// Need useNavigate to send user to login after logout
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  // Check if we saved a token when the user logged in
  // The '!!' just turns whatever we get (token string or null) into true/false
  const isLoggedIn = !!localStorage.getItem("ticketapp_session");

  // Function to run when the logout button is clicked
  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session"); // Delete the token
    navigate("/login"); // Send user back to the login page
    // Note to self: The header might only update after I refresh or navigate away/back
  };

  return (
    <header className="main-header">
      <nav className="container">
        {/* Logo always links back to the home page */}
        <Link to="/" className="logo">
          SOLPOINT
        </Link>
        <ul className="nav-links">
          {/* Check if isLoggedIn is true or false */}
          {isLoggedIn ? (
            // If TRUE (user is logged in): Show these buttons
            <>
              <li>
                <Link to="/tickets" className="nav-btn nav-btn-login">
                  My Tickets
                </Link>
              </li>
              {/* Make the button call handleLogout when clicked */}
              <li>
                <button
                  onClick={handleLogout}
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
                <Link to="/login" className="nav-btn nav-btn-login">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav-btn nav-btn-start">
                  Get Started
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
