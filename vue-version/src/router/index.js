// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import all view components
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import TicketsView from '../views/TicketsView.vue'

// Define all application routes
const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingView, // Public route
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView, // Public route (Auth page)
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }, // Protected route
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: TicketsView,
    meta: { requiresAuth: true }, // Protected route
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// --- Global Navigation Guard (Protection Logic) ---
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    const isAuthenticated = localStorage.getItem('ticketapp_session')

    // If NOT authenticated, redirect to login
    if (!isAuthenticated) {
      return next({ path: '/login' })
    }
  }

  // Proceed with navigation
  next()
})

export default router
