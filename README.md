# HNG Internship Stage 2 Task: SOLPOINT - Multi-Framework Student Ticket App

## Project Overview

This repository contains the submission for the HNG Internship Stage 2 frontend task. The challenge was to build a robust ticket management web application.

I built **SOLPOINT**, designed for university students to submit and track support issues (e.g., NELFUND fees, portal access, result verification).

The core requirement was to implement the _exact same_ application using three distinct frontend technologies, demonstrating adaptability and understanding of different frameworks and rendering approaches while maintaining strict consistency in UI/UX, layout, and functionality.

**Developer:** Mark Francis

---

## Core Features Implemented (Consistent Across All Versions)

- **Landing Page:** Introduces SOLPOINT, provides navigation ("Submit My Ticket", "Check My Tickets"). Features required design elements (wavy background, decorative shapes, max-width container).
- **Authentication (Simulated):** Includes Signup and Login functionality. User credentials are created and stored/verified using `localStorage` (for client-side versions) or `express-session` (for server-side version). Uses toast notifications for feedback.
- **Protected Routes:** Dashboard (`/dashboard`) and Ticket Management (`/tickets`) pages are only accessible after successful login. Unauthorized access redirects to the login page.
- **Dashboard:** Displays placeholder summary statistics (Total, Open, Resolved tickets) and provides navigation to the ticket management page. Includes a functional Logout button.
- **Ticket Management (CRUD):**
  - **Create:** Form (in modal for React/Vue) to add new student issue tickets with validation (title required, valid status).
  - **Read:** Displays the list of tickets dynamically with status indicators.
  - **Update:** Form (in modal for React/Vue) to edit existing ticket details with validation.
  - **Delete:** Functionality to remove tickets with a confirmation step.
- **Consistent Design:** All versions adhere strictly to the layout requirements (max-width 1440px centered, specific hero section design, card styles, responsive behavior for mobile/tablet/desktop, status color coding).
- **Mobile Navigation:** Implemented a functional hamburger menu for smaller screens in all versions.

---

## Implementations

Each version is a complete, standalone application located in its respective subfolder. Detailed setup instructions and technical notes can be found in the `README.md` file within each subfolder.

### 1. React Version (Client-Side SPA)

- Built using **React (with Vite)**, leveraging functional components, Hooks (`useState`), and client-side routing (`react-router-dom`). Authentication and CRUD operations interact with `localStorage` and component state.
- **Live Deployment:** [**https://hng-stage2-ticket-app.vercel.app**]
- **Source Code:** [**./react-version/**](./react-version/)

### 2. Vue.js Version (Client-Side SPA)

- Built using **Vue.js (v3 with Vite)**, utilizing the Composition API (`<script setup>`, `ref`, `computed`), Single-File Components, and `vue-router` for navigation and route protection. Similar to React, auth and CRUD interact with `localStorage` and component state.
- **Live Deployment:** [**https://hng-stage2-ticket-app-ksey.vercel.app/**]
- **Source Code:** [**./vue-version/**](./vue-version/)

### 3. Twig Version (Server-Side Rendered)

- Built using **Node.js** with the **Express** framework and **Twig** as the server-side templating engine. Authentication is managed using `express-session`, and CRUD operations interact directly with a `db.json` file on the server via the `fs` module. Navigation triggers full page reloads as expected in a server-rendered application.
- **Live Deployment:** [**https://solpoint-twig-version.onrender.com**]
- **Source Code:** [**./twig-version/**](./twig-version/)

---

## Conclusion

This project successfully demonstrates the implementation of the SOLPOINT application across three different frontend paradigms, adhering to all specified requirements for functionality, design consistency, and error handling. It provided valuable practical experience in adapting core logic to different framework ecosystems.
