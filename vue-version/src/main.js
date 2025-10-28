// src/main.js
import './assets/style.css' // Your global styles

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// --- VUE TOASTIFICATION IMPORTS ---
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css' // Import CSS
// --- END VUE TOASTIFICATION IMPORTS ---

const app = createApp(App)

app.use(router)

// --- INSTALL THE TOAST PLUGIN ---
// Configure options globally
const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
}
app.use(Toast, toastOptions)
// --- END INSTALL ---

app.mount('#app') // Mount the app
