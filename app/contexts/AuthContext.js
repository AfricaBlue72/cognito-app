import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchAuthSessionWithAmplify, getCurrentUserWithAmplify } from '../../libs/cognitoAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const userData = await getCurrentUserWithAmplify();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Error fetching user data:', error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const session = await fetchAuthSessionWithAmplify();
        if (session) {
          await fetchUserData();
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.log('Error checking auth status:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    fetchUserData();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const refreshUser = async () => {
    await fetchUserData();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
