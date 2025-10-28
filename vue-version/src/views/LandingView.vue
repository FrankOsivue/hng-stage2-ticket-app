<script setup>
import { RouterLink } from 'vue-router' // Use RouterLink for navigation
</script>

<template>
  <div class="landing-page">
    <section class="hero">
      <div class="container hero-content">
        <h1>The Student Solutions point</h1>
        <p class="subtitle">
          Use SOLPOINT to easily report problems with fees, portal access, results, and more, and
          see their status.
        </p>
        <div class="hero-buttons">
          <RouterLink to="/login" class="btn btn-primary">Get Started</RouterLink>
          <RouterLink to="/login" class="btn btn-secondary">Log In</RouterLink>
        </div>
      </div>
      <div class="hero-wave"></div>
      <div class="decorative-circle circle-1"></div>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="section-title">Get Your Issues Resolved</h2>
        <div class="features-grid">
          <div class="feature-box">
            <h3>Report Problems Easily</h3>
            <p>
              Quickly submit tickets for common issues like NELFUND delays, mail access, or password
              resets.
            </p>
          </div>
          <div class="feature-box">
            <h3>Track Your Ticket Status</h3>
            <p>See if your issue is open, in progress, or closed directly from your dashboard.</p>
          </div>
          <div class="feature-box">
            <h3>All Your Requests in One Place</h3>
            <p>Manage all your university support requests through here.</p>
          </div>
        </div>
      </div>
      <div class="decorative-circle circle-2"></div>
    </section>
  </div>
</template>
