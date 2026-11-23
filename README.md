# Modern React Login Portal (NexusAuth)

A clean, responsive, and feature-rich Authentication and Login Portal built with React and Vite.

## ✨ Features

- **Modern Glassmorphism UI**: Polished gradient background, backdrop blur, smooth card elevation, and responsive design for mobile & desktop.
- **Sign In & Sign Up Modes**: Instant tab switching between Login and Registration.
- **Form Validation**:
  - Live client-side email format validation.
  - Password strength indicator (Too short, Weak, Fair, Good, Strong) based on length, numbers, and symbols.
  - Password confirmation match validation.
  - Required fields checks and clear inline error messages.
- **Interactive Controls**:
  - Password show / hide visibility toggle.
  - "Remember me" checkbox.
  - "Forgot password?" modal dialog with simulated reset email flow.
  - Social login buttons (Google & GitHub).
- **Dark / Light Theme Toggle**: Seamless switch between light and dark modes with persistent styling variables.
- **Simulated Authentication & User Dashboard**:
  - Loading spinner states on submit.
  - Welcomes the user with initials avatar, authenticated session details, and a logout button.

## 🚀 Getting Started

### 1. Development Server
The development server is already running! You can open your browser and navigate to:
```
http://localhost:5173/
```

To run it anytime manually:
```bash
npm run dev
```

### 2. Build for Production
To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```
├── index.html                    # Root HTML template with Inter typography
├── package.json                  # Scripts & dependencies
├── vite.config.js                # Vite configuration
└── src/
    ├── main.jsx                  # React application entry point
    ├── index.css                 # Theme variables & glassmorphic styling
    ├── App.jsx                   # Main layout, theme state, and navigation
    └── components/
        ├── LoginForm.jsx         # Sign In form & social auth
        ├── SignUpForm.jsx        # Registration form with password strength meter
        ├── ForgotPasswordModal.jsx # Password reset modal dialog
        └── Dashboard.jsx         # Authenticated state / welcome card
```
