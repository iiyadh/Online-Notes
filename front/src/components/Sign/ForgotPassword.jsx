import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import './styles/ForgotPassword.scss';

const ForgotPassword = ({ setShowForgotPassword }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add forgot password logic here (for now, it's just a log)
    console.log('Password reset link sent to:', email);

    // Display success toast notification
    toast.success('A password reset link has been sent to your email!');

    // Close the forgot password form after submission
    setShowForgotPassword(false);
  };

  return (
    <div className="forgot-password-container">
      <h3>Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
        <button type="button" onClick={() => setShowForgotPassword(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
