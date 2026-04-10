import React from 'react';
import { useTheme, THEMES, Theme } from '../contexts/ThemeContext';

interface ThemeSwitcherProps {
  lang: 'pt' | 'en';
  fullWidth?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ lang, fullWidth = false }) => {
  const { theme, setTheme } = useTheme();

  const label = lang === 'pt' ? 'Selecionar tema visual' : 'Select visual theme';

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
      aria-label={label}
      title={label}
      className={`
        bg-transparent text-fg font-black uppercase cursor-pointer
        focus:outline-none focus-visible:ring-4 focus-visible:ring-theme-border focus-visible:ring-offset-2
        text-xs border-theme-sm border-theme-border
        ${fullWidth ? 'w-full bg-surface text-sm px-3 py-2' : 'px-2 py-1'}
      `}
    >
      {THEMES.map((t) => (
        <option key={t.id} value={t.id}>
          {lang === 'pt' ? t.labelPt : t.labelEn}
        </option>
      ))}
    </select>
  );
};
