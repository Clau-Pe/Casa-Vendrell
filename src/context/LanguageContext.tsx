import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import i18n from '../i18n/config';

// ===========================
// TIPOS
// ===========================
export type Language = 'es' | 'ca' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

// ===========================
// CREAR CONTEXTO
// ===========================
const LanguageContext = createContext<LanguageContextType | null>(null);

// ===========================
// PROVIDER
// ===========================
interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem('language') as Language) ?? 'es'
  );

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ===========================
// HOOK PARA CONSUMIR EL CONTEXTO
// ===========================
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguageContext(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext debe usarse dentro de LanguageProvider');
  }
  return context;
}