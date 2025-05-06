import React, { createContext, useContext, useState, useEffect } from 'react';

import { useAuthStore } from '@/store';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, setLoggedIn } = useAuthStore();

  useEffect(() => {
    // The auth state is persisted in Zustand store
    // We just need to wait for it to rehydrate
    const checkAuth = async () => {
      try {
        // No need for timeout, just set loading to false
        // Zustand will handle the persistence
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: isLoggedIn, 
      isLoading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 