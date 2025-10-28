<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

// --- State ---
const tickets = ref([
  { id: 2001, title: 'NELFUND School Fees Delay', status: 'open' },
  { id: 2002, title: 'Student Mail Application Not Received', status: 'in_progress' },
  { id: 2003, title: 'Portal Password Reset Request', status: 'open' },
  { id: 2004, title: 'Result Verification Pending', status: 'closed' },
])
// Form State
const newTicketTitle = ref('')
const newTicketStatus = ref('open')
const editingTicketId = ref(null)
const editTicketTitle = ref('')
const editTicketStatus = ref('open')
// Modal State
const isModalOpen = ref(false)
const modalMode = ref('create')
const formError = ref('')

const toast = useToast()

// --- Handlers ---
// Open Modal
const openModal = (mode, ticket = null) => {
  formError.value = ''
  modalMode.value = mode
  if (mode === 'edit' && ticket) {
    editingTicketId.value = ticket.id
    editTicketTitle.value = ticket.title
    editTicketStatus.value = ticket.status
  } else {
    editingTicketId.value = null
    newTicketTitle.value = ''
    newTicketStatus.value = 'open'
  }
  isModalOpen.value = true
}

// Close Modal
const closeModal = () => {
  isModalOpen.value = false
  editingTicketId.value = null
  editTicketTitle.value = ''
  editTicketStatus.value = 'open'
  newTicketTitle.value = ''
  newTicketStatus.value = 'open'
  formError.value = ''
}

// Add New Ticket Logic
const handleAddNewTicket = (event) => {
  // event.preventDefault() handled by handleSubmit
  console.log('Add New Ticket Handler Called') // Debug log
  formError.value = ''
  if (!newTicketTitle.value.trim()) {
    formError.value = 'Ticket title cannot be empty.'
    return
  }
  const newTicket = {
    id: Date.now(),
    title: newTicketTitle.value.trim(),
    status: newTicketStatus.value,
  }
  tickets.value.unshift(newTicket)
  toast.success(`Ticket #${newTicket.id} created successfully!`)
  closeModal()
}

// Delete Ticket Logic
const handleDeleteTicket = (idToDelete) => {
  if (window.confirm(`Are you sure you want to delete ticket #${idToDelete}?`)) {
    tickets.value = tickets.value.filter((ticket) => ticket.id !== idToDelete)
    toast.success(`Ticket #${idToDelete} deleted successfully!`)
  }
}

// Start Edit Logic
const handleStartEdit = (ticket) => {
  openModal('edit', ticket)
}

// Update Ticket Logic
const handleUpdateTicket = (event) => {
  // event.preventDefault() handled by handleSubmit
  console.log('Update Ticket Handler Called') // Debug log
  formError.value = ''
  if (!editTicketTitle.value.trim()) {
    formError.value = 'Ticket title cannot be empty.'
    return
  }
  tickets.value = tickets.value.map((ticket) =>
    ticket.id === editingTicketId.value
      ? { ...ticket, title: editTicketTitle.value.trim(), status: editTicketStatus.value }
      : ticket,
  )
  toast.success(`Ticket #${editingTicketId.value} updated successfully!`)
  closeModal()
}

// --- NEW: Unified Submit Handler for Modal Form ---
const handleSubmit = (event) => {
  event.preventDefault() // Prevent page reload here
  console.log('Modal form submitted, mode:', modalMode.value) // Debug log
  if (modalMode.value === 'create') {
    handleAddNewTicket(event) // Call create function
  } else if (modalMode.value === 'edit') {
    handleUpdateTicket(event) // Call update function
  }
}
</script>

<template>
  <section class="page-content">
    <div class="container">
      <div class="page-header">
        <h2 class="section-title">Manage Tickets</h2>
        <button class="btn btn-primary" @click="openModal('create')" :disabled="isModalOpen">
          Create New Ticket
        </button>
      </div>

      <div class="modal-backdrop" v-if="isModalOpen">
        <div class="modal-content">
          <h3>
            {{ modalMode === 'create' ? 'Create New Ticket' : `Edit Ticket #${editingTicketId}` }}
          </h3>

          <p
            v-if="formError"
            class="form-error"
            style="
              display: block;
              background-color: #fee2e2;
              color: #dc2626;
              padding: 0.75rem;
              border-radius: 8px;
              margin-bottom: 1rem;
            "
          >
            {{ formError }}
          </p>

          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="modalTitle">Title</label>
              <input
                type="text"
                id="modalTitle"
                :value="modalMode === 'create' ? newTicketTitle : editTicketTitle"
                @input="
                  modalMode === 'create'
                    ? (newTicketTitle = $event.target.value)
                    : (editTicketTitle = $event.target.value)
                "
                required
              />
            </div>
            <div class="form-group">
              <label for="modalStatus">Status</label>
              <select
                id="modalStatus"
                :value="modalMode === 'create' ? newTicketStatus : editTicketStatus"
                @change="
                  modalMode === 'create'
                    ? (newTicketStatus = $event.target.value)
                    : (editTicketStatus = $event.target.value)
                "
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: flex-end">
              <button type="submit" class="btn btn-primary">
                {{ modalMode === 'create' ? 'Add Ticket' : 'Save Changes' }}
              </button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <div class="ticket-list">
        <template v-if="tickets.length > 0">
          <div class="ticket-card" v-for="ticket in tickets" :key="ticket.id">
            <div class="ticket-info">
              <h3>{{ ticket.title }}</h3>
              <p>Ticket #{{ ticket.id }}</p>
            </div>
            <div class="ticket-actions">
              <span :class="['ticket-status', `status-${ticket.status.replace('_', '-')}`]">
                {{ ticket.status.replace('_', ' ') }}
              </span>
              <button class="btn-icon" @click="handleStartEdit(ticket)" :disabled="isModalOpen">
                Edit
              </button>
              <button
                class="btn-icon btn-icon-danger"
                @click="handleDeleteTicket(ticket.id)"
                :disabled="isModalOpen"
              >
                Delete
              </button>
            </div>
          </div>
        </template>
        <p v-else>No tickets found.</p>
      </div>
    </div>
  </section>
</template>
