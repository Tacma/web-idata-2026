import { createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router';
import type { Language } from '../types';

interface LanguageContextType {
  language: Language;
  getLocalizedValue: <T>(value_es: T, value_en: T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  
  // Extract language from URL path
  const language: Language = location.pathname.startsWith('/es') ? 'es' : 'en';

  const getLocalizedValue = <T,>(value_es: T, value_en: T): T => {
    return language === 'en' ? value_en : value_es;
  };

  return (
    <LanguageContext.Provider value={{ language, getLocalizedValue }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
