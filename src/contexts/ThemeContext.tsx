import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'brutalism' | 'terminal' | 'minimal' | 'win98';

export const THEMES: { id: Theme; labelPt: string; labelEn: string }[] = [
  { id: 'brutalism', labelPt: 'BRUTALISMO', labelEn: 'BRUTALISM' },
  { id: 'terminal',  labelPt: 'TERMINAL',   labelEn: 'TERMINAL'  },
  { id: 'minimal',   labelPt: 'MINIMAL',    labelEn: 'MINIMAL'   },
  { id: 'win98',     labelPt: 'WIN 98',     labelEn: 'WIN 98'    },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-theme';

const isValidTheme = (value: string | null): value is Theme =>
  value === 'brutalism' || value === 'terminal' || value === 'minimal' || value === 'win98';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'brutalism';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isValidTheme(stored) ? stored : 'brutalism';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
