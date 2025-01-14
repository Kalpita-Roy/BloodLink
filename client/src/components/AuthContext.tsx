import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isBloodBank: boolean;
  login: (userType: 'donor' | 'bloodBank') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isBloodBank, setIsBloodBank] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const userType = localStorage.getItem('userType');
      if (userType === 'bloodBank') {
        setIsBloodBank(true);
      }
    }
  }, []);

  const login = (userType: 'donor' | 'bloodBank') => {
    setIsAuthenticated(true);
    setIsBloodBank(userType === 'bloodBank');
    localStorage.setItem('token', 'some-token');
    localStorage.setItem('userType', userType);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsBloodBank(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isBloodBank, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
