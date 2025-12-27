import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, LANGUAGES } from './types';
import { en } from './translations/en';
import { hi } from './translations/hi';
import { kn } from './translations/kn';
import { ta } from './translations/ta';
import { te } from './translations/te';

const translations: Record<Language, Translations> = { en, hi, kn, ta, te };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = sessionStorage.getItem('preferredLanguage');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    sessionStorage.setItem('preferredLanguage', lang);
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
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
