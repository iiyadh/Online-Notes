import React, { useState } from 'react';
import axios from 'axios';
import './styles/SettingsPage.scss';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.defaults.withCredentials = true;

  
  const handleUsernameChange = async (e) => {
    e.preventDefault();

    if (!username) {
      setError('Username cannot be empty');
      return;
    }

    try {
      const response = await axios.put('/settings/username', { newUsername: username }, { withCredentials: true });
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating the username');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All password fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const response = await axios.put(
        '/settings/password',
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating the password');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <form className="settings-form" onSubmit={handleUsernameChange}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Update your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </form>
        );
      case 'password':
        return (
          <form className="settings-form" onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">
              Change Password
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        &larr;
      </button>
      <h1 className="settings-title">Settings</h1>
      <div className="settings-menu">
        <button
          className={`menu-item ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Account Settings
        </button>
        <button
          className={`menu-item ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
      </div>
      <div className="settings-content">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsPage;
