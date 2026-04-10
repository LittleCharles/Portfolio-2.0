import React from 'react';
import { useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../App';

/**
 * Status bar that sits between the main content and the taskbar.
 * Two cells (Win98 status-bar style): a per-route message on the left
 * and "Local intranet" with a lock icon on the right. Decorative.
 */
export const Win98StatusBar: React.FC = () => {
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const location = useLocation();

  if (theme !== 'win98') return null;

  const messagesPt: Record<string, string> = {
    '/':         'Pronto · 12 objetos',
    '/about':    'Carregando perfil...',
    '/projects': 'Pronto · 0 objetos encontrados',
    '/contact':  'Pronto · SSL: Ativo',
  };
  const messagesEn: Record<string, string> = {
    '/':         'Ready · 12 objects',
    '/about':    'Loading profile...',
    '/projects': 'Ready · 0 items found',
    '/contact':  'Ready · SSL: Active',
  };
  const map = lang === 'pt' ? messagesPt : messagesEn;
  const message = map[location.pathname] ?? (lang === 'pt' ? 'Pronto' : 'Ready');
  const zone = lang === 'pt' ? 'Zona local' : 'Local intranet';

  return (
    <div
      className="win98-statusbar fixed left-0 right-0 z-[55] h-6 flex items-stretch text-xs font-sans"
      style={{ bottom: '2.5rem' /* sits on top of the h-10 taskbar */ }}
      role="status"
      aria-live="polite"
    >
      <div className="win98-status-cell flex items-center px-2 flex-1 truncate">
        {message}
      </div>
      <div className="win98-status-cell hidden sm:flex items-center gap-1 px-2 min-w-[140px]">
        <Lock className="w-3 h-3 shrink-0" aria-hidden="true" />
        <span className="truncate">{zone}</span>
      </div>
    </div>
  );
};
