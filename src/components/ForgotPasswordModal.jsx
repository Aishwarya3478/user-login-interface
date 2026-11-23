import React, { useState } from 'react';
import { Mail, X, CheckCircle, ArrowRight } from 'lucide-react';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError('Email address is required');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleClose = () => {
    setEmail('');
    setIsSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Reset Password</h3>
          <button className="close-modal-btn" onClick={handleClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Link Sent!</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              We've emailed instructions to <strong>{email}</strong>. Please check your inbox and spam folder.
            </p>
            <button
              type="button"
              className="submit-btn"
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              Enter the email associated with your account and we'll send you a link to reset your password.
            </p>

            <div className="form-group">
              <label className="form-label" htmlFor="reset-email">
                Email address
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Mail size={18} />
                </span>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="name@example.com"
                  className={`form-input no-trailing ${error ? 'has-error' : ''}`}
                />
              </div>
              {error && <div className="field-error-text">{error}</div>}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
              style={{ marginTop: '1rem' }}
            >
              {isLoading ? (
                <>
                  <div className="spinner" />
                  <span>Sending instructions...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
