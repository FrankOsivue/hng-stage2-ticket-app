// server.js
const express = require("express");
const Twig = require("twig");
const path = require("path");
const session = require("express-session");
const fs = require("fs"); // File System module

const app = express();
const port = process.env.PORT || 3000;

// --- Express Configuration ---
app.set("views", path.join(__dirname, "views")); // Set views directory
app.set("view engine", "twig"); // Use Twig engine
Twig.cache(false); // Disable Twig cache for dev

app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use(express.urlencoded({ extended: true })); // Parse form data

// --- Session Setup ---
app.use(
  session({
    secret: "your_secret_key_12345", // Change this!
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Use true for HTTPS
  })
);

// --- Middleware ---
// Make session available in Twig templates
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Middleware to protect routes
const requireLogin = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login"); // Redirect if not logged in
  }
  next(); // Proceed if logged in
};

// --- Routes ---
// GET / (Homepage)
app.get("/", (req, res) => {
  res.render("landing.twig", {
    pageTitle: "Home - SOLPOINT",
  });
});

// GET /login
app.get("/login", (req, res) => {
  res.render("login.twig", {
    pageTitle: "Login - SOLPOINT",
  });
});

// POST /login (Handles Login Form)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // --- Simulate User Check ---
  if (email === "user@example.com" && password === "password123") {
    req.session.user = { email: email };
    req.session.isLoggedIn = true;
    res.redirect("/dashboard");
  } else {
    res.render("login.twig", {
      pageTitle: "Login - SOLPOINT",
      error: "Invalid email or password.",
    });
  }
});

// GET /dashboard (Protected)
app.get("/dashboard", requireLogin, (req, res) => {
  res.render("dashboard.twig", {
    pageTitle: "Dashboard - SOLPOINT",
  });
});

// GET /tickets (Protected) - Reads and displays tickets
app.get("/tickets", requireLogin, (req, res) => {
  fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, data) => {
    let tickets = [];
    let readError = null;
    if (err) {
      console.error("Error reading db.json:", err);
      readError = "Could not load tickets.";
    } else {
      try {
        tickets = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing db.json:", parseErr);
        readError = "Error loading ticket data.";
      }
    }
    res.render("tickets.twig", {
      pageTitle: "Manage Tickets - SOLPOINT",
      tickets: tickets,
      error: readError,
    });
  });
});

// GET /tickets/new (Protected) - Displays the form to create a ticket
app.get("/tickets/new", requireLogin, (req, res) => {
  res.render("ticket_form.twig", {
    pageTitle: "Create New Ticket - SOLPOINT",
    formAction: "/tickets/create",
    buttonText: "Add Ticket",
    ticket: {}, // Empty object for new ticket form
  });
});

// POST /tickets/create (Protected) - Handles the create form submission
app.post("/tickets/create", requireLogin, (req, res) => {
  const { title, status } = req.body;

  // Validation
  if (
    !title ||
    !title.trim() ||
    !["open", "in_progress", "closed"].includes(status)
  ) {
    return res.render("ticket_form.twig", {
      pageTitle: "Create New Ticket - SOLPOINT",
      formAction: "/tickets/create",
      buttonText: "Add Ticket",
      ticket: { title, status },
      error: "Invalid input.",
    });
  }

  // Read current tickets
  fs.readFile(path.join(__dirname, "db.json"), "utf8", (readErr, data) => {
    if (readErr) {
      console.error("Error reading db.json for create:", readErr);
      return res.redirect("/tickets?error=read_failed");
    }
    let tickets = [];
    try {
      tickets = JSON.parse(data);
    } catch (parseErr) {
      console.error("Error parsing db.json for create:", parseErr);
      return res.redirect("/tickets?error=parse_failed");
    }

    // Create and add new ticket
    const newTicket = { id: Date.now(), title: title.trim(), status: status };
    tickets.unshift(newTicket);

    // Write back to file
    fs.writeFile(
      path.join(__dirname, "db.json"),
      JSON.stringify(tickets, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing db.json after create:", writeErr);
          return res.redirect("/tickets?error=write_failed");
        }
        res.redirect("/tickets"); // Redirect back to list
      }
    );
  });
});

// GET /tickets/edit/:id (Protected) - Displays the form to edit a ticket
app.get("/tickets/edit/:id", requireLogin, (req, res) => {
  const idToEdit = parseInt(req.params.id, 10);

  fs.readFile(path.join(__dirname, "db.json"), "utf8", (readErr, data) => {
    if (readErr) {
      console.error("Error reading db.json for edit:", readErr);
      return res.redirect("/tickets?error=read_failed");
    }
    let tickets = [];
    try {
      tickets = JSON.parse(data);
    } catch (parseErr) {
      console.error("Error parsing db.json for edit:", parseErr);
      return res.redirect("/tickets?error=parse_failed");
    }

    // Find the ticket
    const ticket = tickets.find((t) => t.id === idToEdit);

    if (!ticket) {
      return res.redirect("/tickets?error=not_found"); // Ticket not found
    }

    // Render the form, passing the ticket data
    res.render("ticket_form.twig", {
      pageTitle: `Edit Ticket #${idToEdit} - SOLPOINT`,
      formAction: `/tickets/update/${idToEdit}`, // Form POSTs here
      buttonText: "Save Changes",
      ticket: ticket, // Pass existing ticket data
    });
  });
});

// POST /tickets/update/:id (Protected) - Handles the edit form submission
app.post("/tickets/update/:id", requireLogin, (req, res) => {
  const idToUpdate = parseInt(req.params.id, 10);
  const { title, status } = req.body;

  // Validation
  if (
    !title ||
    !title.trim() ||
    !["open", "in_progress", "closed"].includes(status)
  ) {
    // Re-render form with error and existing data
    return res.render("ticket_form.twig", {
      pageTitle: `Edit Ticket #${idToUpdate} - SOLPOINT`,
      formAction: `/tickets/update/${idToUpdate}`,
      buttonText: "Save Changes",
      ticket: { id: idToUpdate, title, status }, // Pass submitted data back
      error: "Invalid input.",
    });
  }

  // Read current tickets
  fs.readFile(path.join(__dirname, "db.json"), "utf8", (readErr, data) => {
    if (readErr) {
      console.error("Error reading db.json for update:", readErr);
      return res.redirect("/tickets?error=read_failed");
    }
    let tickets = [];
    try {
      tickets = JSON.parse(data);
    } catch (parseErr) {
      console.error("Error parsing db.json for update:", parseErr);
      return res.redirect("/tickets?error=parse_failed");
    }

    // Find and update the ticket
    let ticketFound = false;
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === idToUpdate) {
        ticketFound = true;
        return { ...ticket, title: title.trim(), status: status }; // Update
      }
      return ticket;
    });

    if (!ticketFound) {
      return res.redirect("/tickets?error=not_found"); // Ticket disappeared?
    }

    // Write back to file
    fs.writeFile(
      path.join(__dirname, "db.json"),
      JSON.stringify(updatedTickets, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing db.json after update:", writeErr);
          return res.redirect("/tickets?error=write_failed");
        }
        res.redirect("/tickets"); // Redirect back to list
      }
    );
  });
});

// POST /tickets/delete/:id (Protected) - Handles ticket deletion
app.post("/tickets/delete/:id", requireLogin, (req, res) => {
  const idToDelete = parseInt(req.params.id, 10);

  fs.readFile(path.join(__dirname, "db.json"), "utf8", (readErr, data) => {
    if (readErr) {
      console.error("Error reading db.json for delete:", readErr);
      return res.redirect("/tickets?error=read_failed");
    }
    let tickets = [];
    try {
      tickets = JSON.parse(data);
    } catch (parseErr) {
      console.error("Error parsing db.json for delete:", parseErr);
      return res.redirect("/tickets?error=parse_failed");
    }

    // Filter out the ticket
    const updatedTickets = tickets.filter((ticket) => ticket.id !== idToDelete);

    // Write back to file
    fs.writeFile(
      path.join(__dirname, "db.json"),
      JSON.stringify(updatedTickets, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing db.json after delete:", writeErr);
          return res.redirect("/tickets?error=write_failed");
        }
        res.redirect("/tickets"); // Redirect back to list
      }
    );
  });
});

// GET /logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/");
  });
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`Twig server running at http://localhost:${port}`);
});
