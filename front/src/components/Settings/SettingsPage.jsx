import React, { useState } from 'react';
import './styles/SettingsPage.scss';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <form className="settings-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Update your username" />
            </div>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </form>
        );
      case 'password':
        return (
          <form className="settings-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input type="password" id="currentPassword" placeholder="Enter your current password" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" id="newPassword" placeholder="Enter your new password" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm your new password" />
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
      <div className="settings-content">{renderContent()}</div>
    </div>
  );
};

export default SettingsPage;
