import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles, Layers } from 'lucide-react';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import Dashboard from './components/Dashboard';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  const [user, setUser] = useState(null);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  // Sync theme with HTML data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-container">
      {/* Ambient gradient lights for modern aesthetic */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Header Bar */}
      <header className="header-bar">
        <a href="#" className="brand-logo">
          <div className="brand-icon-wrap">
            <Layers size={20} />
          </div>
          <span>NexusAuth</span>
        </a>

        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </header>

      {/* Main Form Center */}
      <main className="main-wrapper">
        <div className="auth-card">
          {user ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : (
            <>
              {/* Tab navigation */}
              <div className="tab-container">
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                  onClick={() => setActiveTab('signup')}
                >
                  Create Account
                </button>
              </div>

              {activeTab === 'login' ? (
                <LoginForm
                  onLoginSuccess={handleLoginSuccess}
                  onSwitchToSignup={() => setActiveTab('signup')}
                  onForgotPassword={() => setIsForgotOpen(true)}
                />
              ) : (
                <SignUpForm
                  onSignupSuccess={handleLoginSuccess}
                  onSwitchToLogin={() => setActiveTab('login')}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
      />

      {/* Footer */}
      <footer className="footer-bar">
        <div>&copy; {new Date().getFullYear()} NexusAuth Inc. All rights reserved.</div>
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <span>&bull;</span>
          <a href="#" className="footer-link">Terms of Service</a>
          <span>&bull;</span>
          <a href="#" className="footer-link">Help Center</a>
        </div>
      </footer>
    </div>
  );
}
