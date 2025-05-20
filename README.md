# 🏠 Cohabit Client - Find Your Perfect Roommate

## 🔗 Live URL

[https://cohabit-sabbirosa.netlify.app](https://cohabit-sabbirosa.netlify.app)

## 🚀 Project Purpose

**Cohabit Client** is the frontend application for a modern roommate-matching platform. Built with React, this responsive single-page application provides an intuitive user interface for finding compatible roommates and shared living spaces based on location, budget, and lifestyle preferences.

## 🌟 Key Features

- 🔐 **Authentication System**

  - Login/Register with email/password and Google OAuth.
  - Password validation (uppercase, lowercase, special characters, length ≥ 8).
  - Persistent login state via token storage and context API.
  - Protected routes for authenticated content.

- 👥 **User Experience**

  - Responsive design for all device sizes.
  - Dark/Light theme toggle.
  - Loaders for improved perceived performance.

## 🔧 Used Technologies

### 📦 Core Packages

| Package              | Purpose                     |
| -------------------- | --------------------------- |
| `react`              | Frontend library            |
| `react-router`       | Routing and navigation      |
| `sweetalert2`        | User-friendly notifications |
| `react-helmet-async` | Dynamic document titles     |
| `swiper`             | Image gallery for listings  |
| `react-icons`        | Comprehensive icon library  |
| `tailwindcss`        | Utility-first styling       |
| `daisyui`            | UI component library        |

## 📝 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/sabbirosa/cohabit-client.git

# Navigate to project directory
cd cohabit-client

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env.local

# Add your environment variables
# VITE_API_URI=http://localhost:5000/api

# VITE_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
# VITE_FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
# VITE_FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
# VITE_FIREBASE_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET"
# VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_FIREBASE_MESSAGING_SENDER_ID"
# VITE_FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"

# Start development server
npm run dev
```

## 🔗 API Connection

The client connects to the Cohabit Server API. Ensure the server is running and the `VITE_API_URL` environment variable is set correctly.
