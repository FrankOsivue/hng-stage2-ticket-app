# SOLPOINT - Student Ticket Management App (Twig/Node.js Version)

This is the server-side rendered implementation of the SOLPOINT web application using Twig as the templating engine, built with Node.js and Express. It fulfills the requirements for the HNG Internship Stage 2 task. My name is Mark Francis, and building this version provided valuable experience with server-side logic, session management, and file system interactions, contrasting with the client-side approaches of React and Vue.

SOLPOINT allows university students to submit and track support tickets related to common issues.

---

## Frameworks and Libraries Used

- **Node.js:** The JavaScript runtime environment used to run the server.
- **Express:** A minimal and flexible Node.js web application framework used to handle routing, requests, and responses.
- **Twig:** A flexible, fast, and secure template engine (originally from PHP, ported to JS) used to render dynamic HTML pages on the server.
- **express-session:** Middleware used to manage user sessions for authentication (storing login status server-side).
- **Node.js `fs` Module:** Built-in module used for reading from and writing to the `db.json` file (simulating a database for CRUD operations).
- **CSS3:** Provided all styling via a static file served by Express, ensuring design consistency.

---

## Setup and Execution Steps

To run this Twig/Node.js version locally:

1.  **Clone the Repository:** Ensure you have cloned the main project repository containing this `twig-version` folder.
2.  **Navigate to Directory:** Open your terminal and change into this specific folder:
    ```bash
    cd path/to/your/project/twig-version
    ```
3.  **Install Dependencies:** Install Express, Twig, and express-session:
    ```bash
    npm install
    ```
4.  **Run Server:** Start the Node.js server:
    ```bash
    node server.js
    ```
5.  **Open in Browser:** The terminal will output `Twig server running at http://localhost:3000`. Open this URL in your web browser.

---

## Notes on Implementation Structure

This version follows a traditional server-rendered architecture:

- **`server.js`:** Contains all the application logic:
  - Express setup (view engine, static files, middleware).
  - Session configuration using `express-session`.
  - Route definitions (`app.get`, `app.post`) for each page and action.
  - Authentication logic (checking credentials, managing `req.session`).
  - Route protection middleware (`requireLogin`).
  - CRUD operations logic using the `fs` module to read/write `db.json`.
- **`views/`:** Contains `.twig` template files.
  - Reusable partials (`_header.twig`, `_footer.twig`) are included using `{% include %}`.
  - Page templates (`landing.twig`, `login.twig`, `dashboard.twig`, `tickets.twig`, `ticket_form.twig`) receive data passed from `server.js` (e.g., `tickets`, `pageTitle`, `error`, `session`) and use Twig syntax (`{{ variable }}`, `{% if %}`, `{% for %}`) to render dynamic HTML.
- **`public/`:** Contains static assets (`style.css`, `js/main.js`) served directly by Express.
- **`db.json`:** Acts as a simple file-based database to store ticket data.

Building this version highlighted the differences between client-side and server-side rendering, particularly in handling state (session vs. local state) and user interactions (form submissions + page reloads vs. dynamic updates).

---

## Notes on Accessibility

Basic accessibility practices were followed:

- Semantic HTML tags are used in the Twig templates.
- Form inputs have associated `<label>` tags.

---

## Known Issues

- **Basic Error Handling:** Error handling for file read/write operations is basic (redirects with query parameters). More robust error pages could be implemented.
- **No Real Database:** Uses a simple `db.json` file, which is not suitable for concurrent users or large amounts of data in production.
- **Simple Ticket ID Generation:** Uses `Date.now()`, which is not guaranteed to be unique under load.
- **Mobile Nav (Client-Side JS):** Relies on a simple client-side script (`public/js/main.js`) for the hamburger menu toggle, as Twig itself cannot handle interactive browser events.

---

## Test User Credentials

Use the following hardcoded credentials to log in:

- **Email:** `user@example.com`
- **Password:** `password123`

---

## Live Deployment

_(You will add your Render/Railway link here once deployed)_

**[Link to Deployed Twig App - ]**
