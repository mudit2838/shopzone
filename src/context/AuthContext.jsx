import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {

    try {
      const persistedAuth = sessionStorage.getItem('shopzone_auth');
      return persistedAuth === 'true';
    } catch {
      return false;
    }
  });

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };


  useEffect(() => {
    sessionStorage.setItem('shopzone_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  const value = {
    isAuthenticated,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
