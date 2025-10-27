// src/pages/TicketsPage.jsx
import React, { useState } from "react";
import { toast } from "react-toastify"; // Import toast function

function TicketsPage() {
  // --- State ---
  const [tickets, setTickets] = useState([
    { id: 2001, title: "NELFUND School Fees Delay", status: "open" },
    {
      id: 2002,
      title: "Student Mail Application Not Received",
      status: "in_progress",
    },
    { id: 2003, title: "Portal Password Reset Request", status: "open" },
    { id: 2004, title: "Result Verification Pending", status: "closed" },
  ]);
  // State for Create Form fields
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketStatus, setNewTicketStatus] = useState("open");
  // State for Edit Form fields
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [editTicketTitle, setEditTicketTitle] = useState("");
  const [editTicketStatus, setEditTicketStatus] = useState("open");
  // State for Modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  // Removed formError and editFormError states

  // --- Handlers ---
  // Opens the modal
  const openModal = (mode, ticket = null) => {
    // No need to clear error state here
    setModalMode(mode);
    if (mode === "edit" && ticket) {
      setEditingTicketId(ticket.id);
      setEditTicketTitle(ticket.title);
      setEditTicketStatus(ticket.status);
    } else {
      setEditingTicketId(null);
      setNewTicketTitle("");
      setNewTicketStatus("open");
    }
    setIsModalOpen(true);
  };

  // Closes the modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Reset all form states
    setEditingTicketId(null);
    setEditTicketTitle("");
    setEditTicketStatus("open");
    setNewTicketTitle("");
    setNewTicketStatus("open");
    // No need to clear error state here
  };

  // Adds a new ticket
  const handleAddNewTicket = (event) => {
    event.preventDefault();
    // No need to clear error state
    if (!newTicketTitle.trim()) {
      toast.error("Ticket title cannot be empty."); // Use toast
      return;
    }
    const newTicket = {
      id: Date.now(),
      title: newTicketTitle.trim(),
      status: newTicketStatus,
    };
    setTickets([newTicket, ...tickets]);
    toast.success(`Ticket #${newTicket.id} created successfully!`); // Success toast
    closeModal();
  };

  // Deletes a ticket
  const handleDeleteTicket = (idToDelete) => {
    if (
      window.confirm(`Are you sure you want to delete ticket #${idToDelete}?`)
    ) {
      setTickets(tickets.filter((ticket) => ticket.id !== idToDelete));
      toast.success(`Ticket #${idToDelete} deleted successfully!`); // Success toast
    }
  };

  // Prepares the modal for editing
  const handleStartEdit = (ticket) => {
    openModal("edit", ticket);
  };

  // Saves updated ticket info
  const handleUpdateTicket = (event) => {
    event.preventDefault();
    // No need to clear error state
    if (!editTicketTitle.trim()) {
      toast.error("Ticket title cannot be empty."); // Use toast
      return;
    }
    const updatedTickets = tickets.map((t) =>
      t.id === editingTicketId
        ? { ...t, title: editTicketTitle.trim(), status: editTicketStatus }
        : t
    );
    setTickets(updatedTickets);
    toast.success(`Ticket #${editingTicketId} updated successfully!`); // Success toast
    closeModal();
  };

  // --- Render ---
  return (
    <section className="page-content">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h2 className="section-title">Manage Tickets</h2>
          <button
            className="btn btn-primary"
            onClick={() => openModal("create")}
            disabled={isModalOpen}
          >
            Create New Ticket
          </button>
        </div>

        {/* Modal for Create/Edit Form */}
        {isModalOpen && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <h3>
                {modalMode === "create"
                  ? "Create New Ticket"
                  : `Edit Ticket #${editingTicketId}`}
              </h3>

              {/* Removed form error display paragraphs */}

              <form
                onSubmit={
                  modalMode === "create"
                    ? handleAddNewTicket
                    : handleUpdateTicket
                }
              >
                {/* Title Input */}
                <div className="form-group">
                  <label htmlFor="modalTitle">Title</label>
                  <input
                    type="text"
                    id="modalTitle"
                    required
                    value={
                      modalMode === "create" ? newTicketTitle : editTicketTitle
                    }
                    onChange={(e) =>
                      modalMode === "create"
                        ? setNewTicketTitle(e.target.value)
                        : setEditTicketTitle(e.target.value)
                    }
                  />
                </div>
                {/* Status Select */}
                <div className="form-group">
                  <label htmlFor="modalStatus">Status</label>
                  <select
                    id="modalStatus"
                    value={
                      modalMode === "create"
                        ? newTicketStatus
                        : editTicketStatus
                    }
                    onChange={(e) =>
                      modalMode === "create"
                        ? setNewTicketStatus(e.target.value)
                        : setEditTicketStatus(e.target.value)
                    }
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                {/* Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "1.5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <button type="submit" className="btn btn-primary">
                    {modalMode === "create" ? "Add Ticket" : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Ticket List */}
        <div className="ticket-list">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div className="ticket-card" key={ticket.id}>
                <div className="ticket-info">
                  <h3>{ticket.title}</h3>
                  <p>Ticket #{ticket.id}</p>
                </div>
                <div className="ticket-actions">
                  <span
                    className={`ticket-status status-${ticket.status.replace(
                      "_",
                      "-"
                    )}`}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>
                  <button
                    className="btn-icon"
                    onClick={() => handleStartEdit(ticket)}
                    disabled={isModalOpen}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-icon btn-icon-danger"
                    onClick={() => handleDeleteTicket(ticket.id)}
                    disabled={isModalOpen}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No tickets found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default TicketsPage;
