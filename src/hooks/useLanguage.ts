import { useLanguageContext } from '../context/LanguageContext';

// Wrapper del contexto de idioma
export function useLanguage() {
  return useLanguageContext();
}