import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = true;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/auth/session', { withCredentials: true });
        setUser(response.data.user || null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password }, { withCredentials: true });
      setUser(response.data.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login ,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
