import { useAuthContext } from '../context/AuthContext';

// Este hook es un wrapper del contexto
// Así los componentes no necesitan importar el contexto directamente
export function useAuth() {
  return useAuthContext();
}