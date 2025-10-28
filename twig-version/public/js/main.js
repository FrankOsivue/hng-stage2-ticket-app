// public/js/main.js

// Wait until the HTML is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Find the hamburger button and the navigation links container
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const navLinksContainer = document.querySelector(".nav-links-container");
  const navLinks = document.querySelectorAll(
    ".nav-links-container a, .nav-links-container button"
  ); // Get all links/buttons inside

  // Check if both elements exist before adding listeners
  if (mobileNavToggle && navLinksContainer) {
    // Add click listener to the hamburger button
    mobileNavToggle.addEventListener("click", () => {
      // Toggle the 'active' class on the button (for the 'X' animation)
      mobileNavToggle.classList.toggle("active");
      // Toggle the 'mobile-menu-open' class on the container (to slide it in/out)
      navLinksContainer.classList.toggle("mobile-menu-open");
    });

    // Add click listeners to each link/button inside the mobile menu
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Close the menu when a link is clicked
        mobileNavToggle.classList.remove("active");
        navLinksContainer.classList.remove("mobile-menu-open");
      });
    });
  }
});
