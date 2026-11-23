import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, CheckCircle2 } from 'lucide-react';

export default function SignUpForm({ onSignupSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Compute password strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'Too short', color: 'none' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', class: 'weak' };
      case 2:
        return { score: 2, label: 'Fair', class: 'fair' };
      case 3:
        return { score: 3, label: 'Good', class: 'good' };
      case 4:
        return { score: 4, label: 'Strong', class: 'strong' };
      default:
        return { score: 0, label: 'Too short', class: '' };
    }
  };

  const strength = getPasswordStrength(formData.password);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSignupSuccess({
        name: formData.name,
        email: formData.email,
        authMethod: 'Email Registration',
        loginTime: new Date().toLocaleTimeString(),
      });
    }, 1200);
  };

  return (
    <div>
      <div className="auth-header">
        <div className="badge">
          <UserPlus size={14} /> Create Account
        </div>
        <h2 className="auth-title">Get Started</h2>
        <p className="auth-subtitle">Create a free account to join our platform</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-name">
            Full Name
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <User size={18} />
            </span>
            <input
              id="signup-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Alex Johnson"
              className={`form-input no-trailing ${errors.name ? 'has-error' : ''}`}
            />
          </div>
          {errors.name && <div className="field-error-text">{errors.name}</div>}
        </div>

        {/* Email Address */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-email">
            Email address
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Mail size={18} />
            </span>
            <input
              id="signup-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@example.com"
              className={`form-input no-trailing ${errors.email ? 'has-error' : ''}`}
            />
          </div>
          {errors.email && <div className="field-error-text">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-password">
            Password
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Lock size={18} />
            </span>
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className={`form-input ${errors.password ? 'has-error' : ''}`}
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Strength Meter */}
          {formData.password && (
            <div className="strength-meter">
              <div className="strength-bars">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`strength-bar ${i <= strength.score ? strength.class : ''}`}
                  />
                ))}
              </div>
              <div className="strength-label">
                <span>Strength:</span>
                <span style={{ fontWeight: 600 }}>{strength.label}</span>
              </div>
            </div>
          )}

          {errors.password && <div className="field-error-text">{errors.password}</div>}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-confirm-password">
            Confirm Password
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Lock size={18} />
            </span>
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className={`form-input ${errors.confirmPassword ? 'has-error' : ''}`}
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="field-error-text">{errors.confirmPassword}</div>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label className="checkbox-label" style={{ alignItems: 'flex-start' }}>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="checkbox-input"
              style={{ marginTop: '0.15rem' }}
            />
            <span style={{ fontSize: '0.82rem', lineHeight: '1.3' }}>
              I agree to the <a href="#" style={{ color: 'var(--primary-color)' }}>Terms of Service</a> and{' '}
              <a href="#" style={{ color: 'var(--primary-color)' }}>Privacy Policy</a>.
            </span>
          </label>
          {errors.agreeTerms && (
            <div className="field-error-text">{errors.agreeTerms}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="spinner" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <CheckCircle2 size={18} />
            </>
          )}
        </button>
      </form>

      <div className="switch-auth-mode">
        Already have an account?
        <button
          type="button"
          className="switch-link"
          onClick={onSwitchToLogin}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
