<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="page-content">
    <div class="container">
      <h2 class="section-title">Dashboard</h2>

      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Total Tickets</h3>
          <div class="count">12</div>
        </div>
        <div class="stat-card">
          <h3>Open Tickets</h3>
          <div class="count">3</div>
        </div>
        <div class="stat-card">
          <h3>Resolved Tickets</h3>
          <div class="count">9</div>
        </div>
      </div>

      <div class="dashboard-nav">
        <h2 class="section-title">Manage</h2>
        <RouterLink to="/tickets" class="btn btn-primary">Go to Ticket Management</RouterLink>
      </div>
    </div>
  </section>
</template>
