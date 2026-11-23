import React from 'react';
import { LogOut, CheckCircle2, Shield, Calendar, Mail, Key } from 'lucide-react';

export default function Dashboard({ user, onLogout }) {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-avatar">
        {getInitials(user.name)}
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
        Welcome, {user.name}!
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
        You have successfully logged in to your account.
      </p>

      <div className="user-info-box">
        <div className="info-row">
          <span className="info-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Mail size={15} /> Email
          </span>
          <span className="info-value">{user.email}</span>
        </div>

        <div className="info-row">
          <span className="info-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Key size={15} /> Method
          </span>
          <span className="info-value">{user.authMethod || 'Password'}</span>
        </div>

        <div className="info-row">
          <span className="info-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={15} /> Session Time
          </span>
          <span className="info-value">{user.loginTime}</span>
        </div>

        <div className="info-row">
          <span className="info-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Shield size={15} /> Status
          </span>
          <span className="info-value" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <CheckCircle2 size={15} /> Authenticated
          </span>
        </div>
      </div>

      <button
        type="button"
        className="logout-btn"
        onClick={onLogout}
      >
        <LogOut size={16} />
        <span>Log Out</span>
      </button>
    </div>
  );
}
