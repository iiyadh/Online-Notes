import  { useState } from "react";
import "./styles/UserProfile.scss";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const UserProfile = ({ user }) => {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = true;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async ()=>{
    try {
      // Add login logic here
      const res = await axios.post("http://localhost:3000/auth/logout",{ withCredentials: true });
      if (res.status === 200) {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src="https://gravatar.com/avatar/4cf7398e9900f4167d1925253c9c8d62?s=400&d=robohash&r=x" alt={`${user.name}'s Profile`} />
        <h2>{user.name}</h2>
        <button
          className="menu-toggle-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          ...
        </button>
      </div>
      {menuOpen && (
        <div className="menu">
          <button className="menu-item">Settings</button>
          <button className="menu-item" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
