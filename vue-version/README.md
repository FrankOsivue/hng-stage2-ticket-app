# SOLPOINT - Student Ticket Management App (Vue.js Version)

This is the Vue.js implementation of the SOLPOINT web application, built for the HNG Internship Stage 2 task. As Mark Francis, my goal in the HNG internship is to sharpen my frontend development skills. Translating the application from React to Vue was an excellent exercise in understanding different framework concepts, reactivity systems, and component structures while maintaining the same core logic and user experience.

SOLPOINT is designed to help university students submit and manage support tickets for issues like NELFUND fees, portal access, and result verification.

---

## Frameworks and Libraries Used

- **Vue.js:** (v3+) The progressive JavaScript framework used for building the user interface with its component system and Composition API (`<script setup>`).
- **Vite:** The build tool used for the development environment and production bundling. Provided a fast and efficient setup.
- **Vue Router:** (v4+) The official library for handling client-side routing and navigation between the application's views (pages). Used for implementing protected routes via navigation guards.
- **Vue Toastification:** Used for displaying user-friendly success and error notifications.
- **JavaScript (ES6+):** Used for application logic, state management (`ref`), event handling, and CRUD operations.
- **CSS3:** Provided all styling, ensuring consistency with the other framework versions (shared `style.css`).

---

## Setup and Execution Steps

To run this Vue.js version locally:

1.  **Clone the Repository:** Ensure you have cloned the main project repository containing this `vue-version` folder.
2.  **Navigate to Directory:** Open your terminal and change into this specific folder:
    ```bash
    cd path/to/your/project/vue-version
    ```
3.  **Install Dependencies:** Install the required packages:
    ```bash
    npm install
    ```
4.  **Run Development Server:** Start the Vite development server:
    ```bash
    npm run dev
    ```
5.  **Open in Browser:** The terminal will provide a local URL (e.g., `http://localhost:5173`). Open this in your browser.

---

## Notes on UI Components and State Structure

Building this version helped solidify my understanding of Vue's specific patterns:

- **Component Structure:**
  - `src/components/`: Contains reusable UI parts like `Header.vue` and `Footer.vue`. Vue's Single-File Component (`.vue`) structure keeps template, script, and scoped styles together.
  - `src/views/`: Contains the page-level components (`LandingView.vue`, `LoginView.vue`, etc.) rendered by Vue Router.
  - `App.vue`: The root component providing the main layout (Header, Footer) and the `<RouterView>` outlet for page content.
- **State Management:**
  - **Local Component State (`ref`):** Used within `LoginView.vue` and `TicketsView.vue` to manage form inputs, modal visibility, and the ticket list. Working with Vue's reactivity system (`ref` and `.value`) was a key learning point compared to React's `useState`.
  - **Authentication State:** Simulated using `localStorage` (`ticketapp_session`). Vue Router's navigation guards (`router.beforeEach` in `src/router/index.js`) check this value to protect routes. The `Header.vue` uses a `computed` property to reactively check `localStorage` for displaying conditional links.
- **CRUD Logic:** Implemented within `TicketsView.vue`. The core JavaScript logic (`.map`, `.filter`, `.unshift`) remained similar to the React version, but updating the state involved modifying the `.value` property of the `ref` holding the tickets array.

---

## Notes on Accessibility

Basic accessibility considerations were included:

- **Semantic HTML:** Used appropriate tags (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<button>`).
- **Labels:** Form inputs are associated with `<label>` tags.
- **Basic Contrast & Focus:** Standard browser focus outlines are used.

---

## Known Issues

- **Header Update on Logout:** Similar to the React version, the Header might not instantly update upon logout without a page refresh or further navigation, due to `localStorage` not being inherently reactive across components without a dedicated state management solution.
- **Simple Ticket ID Generation:** New ticket IDs use `Date.now()`, which is sufficient for simulation but not robust for production.

---

## Test User Credentials

Create an account via the Sign Up form, or use previously created credentials stored in `localStorage`. Example during testing:

- **Email:** `vue@test.com`
- **Password:** `password123`

---

## Live Deployment

**[Link to Deployed Vue App - https://hng-stage2-ticket-app-ksey.vercel.app/]**

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
