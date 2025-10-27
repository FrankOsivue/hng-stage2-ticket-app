# SOLPOINT - Student Ticket Management App (React Version)

This project is the React implementation of the SOLPOINT web application, built as part of the HNG Internship Stage 2 task. My name is Mark Francis, and I joined the HNG internship with the goal of becoming a better frontend developer. This project was a significant step in that journey, challenging me to build a complete application with routing, state management, and authentication simulation.

SOLPOINT allows university students to submit and manage support tickets for various issues (e.g., NELFUND fees, portal access) and track their resolution status.

---

## Frameworks and Libraries Used

- **React:** (v18+) The core library for building the user interface with components.
- **Vite:** The build tool used for setting up the development environment and bundling the application. Offers a significantly faster development experience compared to older tools.
- **React Router DOM:** (v6+) For handling client-side routing and navigation between different pages (Landing, Login, Dashboard, Tickets).
- **React Toastify:** Used for displaying user-friendly success and error notifications (toasts/snackbars) for actions like login, ticket creation, updates, and deletion.
- **JavaScript (ES6+):** Used for all the application logic, including state management, event handling, and CRUD operations.
- **CSS3:** Used for all styling, following a responsive, desktop-first approach with a max-width container and specific design elements like waves and decorative shapes.

---

## Setup and Execution Steps

To run this React version locally:

1.  **Clone the Repository:** If you haven't already, clone the main project repository containing this `react-version` folder.
2.  **Navigate to Directory:** Open your terminal and change the directory to this specific folder:
    ```bash
    cd path/to/your/project/react-version
    ```
3.  **Install Dependencies:** Run the following command to install all necessary packages listed in `package.json`:
    ```bash
    npm install
    ```
4.  **Run Development Server:** Start the Vite development server:
    ```bash
    npm run dev
    ```
5.  **Open in Browser:** The terminal will output a local URL (usually `http://localhost:5173`). Open this URL in your web browser to view the application.

---

## Notes on UI Components and State Structure

This project significantly enhanced my understanding of React's component-based architecture and state management.

- **Component Structure:**
  - `src/components/`: Contains reusable UI elements like `Header.jsx`, `Footer.jsx`, and `ProtectedRoute.jsx`. This promotes code reuse and separation of concerns.
  - `src/pages/`: Contains top-level components for each distinct view of the application (`LandingPage.jsx`, `LoginPage.jsx`, `DashboardPage.jsx`, `TicketsPage.jsx`). React Router renders these components based on the URL.
  - `App.jsx`: Serves as the main layout shell, rendering the `Header`, `Footer`, and the routing outlet (`<Routes>`) where page components are swapped.
- **State Management:**
  - **Local Component State (`useState`):** Used extensively within `LoginPage.jsx` (for form inputs, errors) and `TicketsPage.jsx` (for managing the ticket list, form inputs, modal visibility, and editing state). This project provided great practice in managing form state and conditionally rendering UI elements.
  - **Authentication State:** Simulated using the browser's `localStorage`. The `ticketapp_session` key stores a mock token upon successful login. The `ProtectedRoute.jsx` component reads this value to guard access, and the `Header.jsx` uses it to display conditional links (Login/Logout). While effective for this simulation, I understand a more robust solution (like Context API or a dedicated library) would be needed for real-world applications to manage global auth state more effectively and trigger instant UI updates (e.g., in the Header upon logout).
- **CRUD Logic:** Implemented directly within `TicketsPage.jsx` using array manipulation methods (`.map`, `.filter`) combined with `useState` to update the ticket list dynamically after creating, updating, or deleting tickets.

---

## Notes on Accessibility

Basic accessibility practices were followed:

- **Semantic HTML:** Used tags like `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<button>` where appropriate.
- **Labels:** Form inputs are associated with `<label>` tags using `htmlFor`.
- **Basic Contrast & Focus:** Standard browser focus outlines are present. Color choices for status tags aim for sufficient contrast, though rigorous testing wasn't performed.
- _(No images requiring `alt` text were used in this implementation)._

---

## Known Issues

- **Header Update on Logout:** The Header component checks `localStorage` on initial render. After clicking "Logout," the token is removed, and the user is redirected, but the Header might not immediately update to show "Login" until the page is refreshed or navigated away from and back to. A global state management solution (like Context API) would resolve this for a truly instant update.
- **Simple Ticket ID Generation:** New ticket IDs are generated using `Date.now()`. This is sufficient for this simulation but could potentially lead to collisions in a high-traffic, real-world scenario. A proper backend would handle unique ID generation.

---

## Live Deployment

**[Link to Deployed React App - https://hng-stage2-ticket-app.vercel.app]**
