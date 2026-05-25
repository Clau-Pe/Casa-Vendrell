import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Admin, LoginCredentials, AuthResponse } from '../types/auth';
import { apiPost } from '../api/client';

// ===========================
// TIPOS DEL CONTEXTO
// ===========================
interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

// ===========================
// CREAR CONTEXTO
// ===========================
const AuthContext = createContext<AuthContextType | null>(null);

// ===========================
// PROVIDER
// ===========================
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await apiPost<AuthResponse>(
      '/auth/login',
      credentials
    );
    setAdmin(response.admin);
    setToken(response.token);
    localStorage.setItem('token', response.token);
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ===========================
// HOOK PARA CONSUMIR EL CONTEXTO
// ===========================
// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider');
  }
  return context;
}