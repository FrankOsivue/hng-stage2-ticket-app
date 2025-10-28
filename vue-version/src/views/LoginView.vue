<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// Import the hook to access the toast function
import { useToast } from 'vue-toastification'

// --- State Variables ---
const email = ref('')
const password = ref('')
const name = ref('')
const confirmPassword = ref('')
const isSignupMode = ref(false)

const router = useRouter()
// NOTE: We don't call useToast() here globally

// Function to toggle between Login and Signup forms
const toggleMode = () => {
  isSignupMode.value = !isSignupMode.value
  // Clear fields on mode switch
  name.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
}

// Handle account creation
const handleSignup = (event) => {
  event.preventDefault()
  const toast = useToast() // Get toast function inside handler

  // Validation
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    toast.error('Oops! Need all fields for signup.')
    return
  }
  if (password.value !== confirmPassword.value) {
    toast.error("Heads up! Passwords don't match.")
    return
  }
  if (!/\S+@\S+\.\S+/.test(email.value)) {
    toast.error("Hmm, that email doesn't look right.")
    return
  }

  // Check existing user
  if (localStorage.getItem(`user_${email.value}`)) {
    toast.error('This email is already taken. Try logging in.')
    return
  }

  // Save user data (insecure for production)
  const userData = JSON.stringify({
    name: name.value,
    email: email.value,
    password: password.value,
  })
  localStorage.setItem(`user_${email.value}`, userData)

  toast.success('Account created! Please log in now.')
  isSignupMode.value = false // Switch to login
  // Clear only necessary fields after signup success before switching
  email.value = ''
  password.value = ''
}

// Handle user login
const handleLogin = (event) => {
  event.preventDefault()
  const toast = useToast() // Get toast function inside handler

  // Validation
  if (!email.value || !password.value) {
    toast.error('Need both email and password to log in.')
    return
  }

  // Check if user exists
  const storedUserData = localStorage.getItem(`user_${email.value}`)

  if (storedUserData) {
    const userData = JSON.parse(storedUserData)
    // Check password (insecure for production)
    if (userData.password === password.value) {
      localStorage.setItem('ticketapp_session', email.value) // Set session
      toast.success('Logged in successfully!')
      router.push('/dashboard') // Redirect
    } else {
      toast.error('Invalid email or password.')
    }
  } else {
    toast.error('No account found. Did you mean to sign up?')
  }
}

// --- Unified Submit Handler ---
// Decides whether to call handleLogin or handleSignup
const handleSubmit = (event) => {
  event.preventDefault() // Prevent page reload
  if (isSignupMode.value) {
    handleSignup(event)
  } else {
    handleLogin(event)
  }
}
</script>

<template>
  <section class="auth-container">
    <div class="container">
      <form class="auth-form" @submit.prevent="handleSubmit" novalidate>
        <h2>{{ isSignupMode ? 'Create Your Account' : 'Student Portal Login' }}</h2>

        <div class="form-group" v-if="isSignupMode">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" required v-model="name" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required v-model="email" />
          <span class="form-error">Please enter a valid email.</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required v-model="password" />
          <span class="form-error">Password is required.</span>
        </div>

        <div class="form-group" v-if="isSignupMode">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            v-model="confirmPassword"
          />
        </div>

        <button type="submit" class="btn btn-primary btn-full-width">
          {{ isSignupMode ? 'Sign Up' : 'Login' }}
        </button>

        <p class="auth-switch">
          {{ isSignupMode ? 'Already have an account?' : "Don't have an account?" }}
          <button type="button" @click="toggleMode" class="link-button">
            {{ isSignupMode ? 'Login' : 'Sign Up' }}
          </button>
        </p>
      </form>
    </div>
  </section>
</template>
