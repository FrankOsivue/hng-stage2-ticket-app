<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter() // For programmatic navigation
const isLoggedIn = computed(() => !!localStorage.getItem('ticketapp_session'))
const isMobileMenuOpen = ref(false) // Mobile menu state

// Logout: remove token, redirect to landing
const handleLogout = () => {
  localStorage.removeItem('ticketapp_session')
  router.push('/')
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close menu when a link inside mobile nav is clicked
const handleMobileLinkClick = () => {
  isMobileMenuOpen.value = false
}

// Handle logout + close menu on mobile
const handleMobileLogoutClick = () => {
  handleLogout()
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="main-header">
    <nav class="container">
      <RouterLink to="/" class="logo">SOLPOINT</RouterLink>

      <button
        :class="['mobile-nav-toggle', { active: isMobileMenuOpen }]"
        @click="toggleMobileMenu"
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div :class="['nav-links-container', { 'mobile-menu-open': isMobileMenuOpen }]">
        <ul class="nav-links">
          <template v-if="isLoggedIn">
            <li>
              <RouterLink to="/tickets" class="nav-btn nav-btn-login" @click="handleMobileLinkClick"
                >My Tickets</RouterLink
              >
            </li>
            <li>
              <button @click="handleMobileLogoutClick" class="nav-btn nav-btn-start">Logout</button>
            </li>
          </template>
          <template v-else>
            <li>
              <RouterLink to="/login" class="nav-btn nav-btn-login" @click="handleMobileLinkClick"
                >Login</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/login" class="nav-btn nav-btn-start" @click="handleMobileLinkClick"
                >Get Started</RouterLink
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Scoped styles: Only affect this component */
</style>
