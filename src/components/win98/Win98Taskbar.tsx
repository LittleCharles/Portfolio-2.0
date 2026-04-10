import React from 'react';
import { Volume2, Wifi, Monitor } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../App';
import { Win98Clock } from './Win98Clock';

/**
 * Fixed taskbar at the bottom of the viewport — only rendered on
 * the Win98 skin. Contains: Start button, the "active app" button
 * (the portfolio itself, rendered as pressed), and a system tray
 * with small decorative icons and the live clock.
 */
export const Win98Taskbar: React.FC = () => {
  const { theme } = useTheme();
  const { lang } = useLanguage();

  if (theme !== 'win98') return null;

  const startLabel = lang === 'pt' ? 'Iniciar' : 'Start';
  const appLabel = 'Portfolio — LCV';

  return (
    <div
      className="win98-taskbar fixed bottom-0 left-0 right-0 z-[60] h-10 flex items-center gap-1 px-1"
      role="toolbar"
      aria-label={lang === 'pt' ? 'Barra de tarefas' : 'Taskbar'}
    >
      {/* Start button */}
      <button
        type="button"
        className="win98-btn flex items-center gap-1.5 h-8 px-2 font-bold text-sm shrink-0"
      >
        <span className="w-4 h-4 grid grid-cols-2 gap-[1px] shrink-0" aria-hidden="true">
          <span className="bg-red-600" />
          <span className="bg-green-600" />
          <span className="bg-yellow-400" />
          <span className="bg-blue-600" />
        </span>
        <span>{startLabel}</span>
      </button>

      {/* Vertical separator */}
      <div
        className="h-7 w-px bg-[#808080] mx-0.5 shrink-0"
        style={{ boxShadow: '1px 0 0 #ffffff' }}
        aria-hidden="true"
      />

      {/* Active app — rendered pressed */}
      <button
        type="button"
        className="win98-btn-pressed hidden sm:flex items-center gap-1.5 h-8 px-2 text-xs font-bold max-w-[220px] truncate"
        aria-current="true"
      >
        <Monitor className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="truncate">{appLabel}</span>
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* System tray */}
      <div className="win98-tray flex items-center gap-2 h-7 px-2 shrink-0">
        <Volume2 className="w-3.5 h-3.5 hidden sm:block" aria-hidden="true" />
        <Wifi className="w-3.5 h-3.5 hidden sm:block" aria-hidden="true" />
        <Win98Clock />
      </div>
    </div>
  );
};
