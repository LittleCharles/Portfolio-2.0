import React from 'react';
import { useTheme, Theme } from '../contexts/ThemeContext';

interface Props {
  lang: 'pt' | 'en';
}

const labels: Record<Theme, { pt: string; en: string }> = {
  brutalism: { pt: 'CRIADO EM BRUTALISMO',  en: 'CREATED IN BRUTALISM'  },
  terminal:  { pt: 'CRIADO NO TERMINAL',    en: 'CREATED IN TERMINAL'   },
  minimal:   { pt: 'CRIADO EM MINIMALISMO', en: 'CREATED IN MINIMAL'    },
  win98:     { pt: 'CRIADO EM WINDOWS 98',  en: 'CREATED IN WINDOWS 98' },
};

/**
 * Footer credit line whose suffix changes per active skin —
 * "criado em brutalismo / no terminal / em minimalismo / em windows 98".
 */
export const ThemedFooterCredit: React.FC<Props> = ({ lang }) => {
  const { theme } = useTheme();
  const label = labels[theme][lang];
  return (
    <div className="font-mono text-xs text-muted font-bold uppercase">
      © {new Date().getFullYear()} LCV. {label}.
    </div>
  );
};
