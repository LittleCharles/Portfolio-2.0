import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUp, Folder } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../App';

/**
 * Decorative MS Windows Explorer chrome that sits below the page header
 * when the win98 skin is active. Three rows: menu bar (decorative),
 * nav buttons (functional via react-router), and address bar
 * (Enter or "Go" navigates).
 *
 * Renders nothing on other skins.
 */
export const Win98Chrome: React.FC = () => {
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [draft, setDraft] = useState('');

  // Convert /about → C:\Portfolio\about for the address bar.
  const pathToWindows = (pathname: string) => {
    const cleaned = pathname.replace(/^\/+|\/+$/g, '');
    return cleaned ? `C:\\Portfolio\\${cleaned.replace(/\//g, '\\')}` : 'C:\\Portfolio';
  };

  // Reset draft whenever the route changes externally
  useEffect(() => {
    setDraft(pathToWindows(location.pathname));
  }, [location.pathname]);

  if (theme !== 'win98') return null;

  const menuItemsPt = [
    { hot: 'A', rest: 'rquivo' },
    { hot: 'E', rest: 'ditar' },
    { hot: 'V', rest: 'er' },
    { hot: 'F', rest: 'avoritos' },
    { hot: 'A', rest: 'juda' },
  ];
  const menuItemsEn = [
    { hot: 'F', rest: 'ile' },
    { hot: 'E', rest: 'dit' },
    { hot: 'V', rest: 'iew' },
    { hot: 'F', rest: 'avorites' },
    { hot: 'H', rest: 'elp' },
  ];
  const menuItems = lang === 'pt' ? menuItemsPt : menuItemsEn;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // C:\Portfolio\about → /about
    const stripped = draft
      .replace(/^[A-Z]:\\Portfolio/i, '')
      .replace(/\\/g, '/')
      .trim();
    navigate(stripped || '/');
  };

  const labels = {
    back: lang === 'pt' ? 'Voltar' : 'Back',
    forward: lang === 'pt' ? 'Avançar' : 'Forward',
    up: lang === 'pt' ? 'Subir' : 'Up',
    address: lang === 'pt' ? 'Endereço' : 'Address',
    go: lang === 'pt' ? 'Ir' : 'Go',
    menu: lang === 'pt' ? 'Menu' : 'Menu',
  };

  return (
    <div
      className="win98-chrome fixed left-0 right-0 top-0 z-[45]"
      role="toolbar"
      aria-label={lang === 'pt' ? 'Barra de ferramentas' : 'Toolbar'}
    >
      {/* Menu bar — desktop */}
      <div className="hidden md:flex items-center gap-1 px-2 py-1 text-xs font-sans border-b border-[#808080]">
        {menuItems.map((item, i) => (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            className="px-2 py-0.5 hover:bg-[#000080] hover:text-white"
          >
            <span className="underline">{item.hot}</span>
            {item.rest}
          </button>
        ))}
      </div>

      {/* Menu bar — mobile (collapsed indicator) */}
      <div className="md:hidden flex items-center px-3 py-1 text-xs font-sans border-b border-[#808080]">
        <span aria-hidden="true">☰</span>
        <span className="ml-2">{labels.menu}</span>
      </div>

      {/* Nav buttons row */}
      <div className="flex items-center gap-1 px-2 py-1 border-b border-[#808080]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="win98-btn flex items-center gap-1 h-7 px-2 text-xs font-bold"
          aria-label={labels.back}
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden md:inline">{labels.back}</span>
        </button>
        <button
          type="button"
          onClick={() => navigate(1)}
          className="win98-btn flex items-center gap-1 h-7 px-2 text-xs font-bold"
          aria-label={labels.forward}
        >
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden md:inline">{labels.forward}</span>
        </button>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="win98-btn flex items-center gap-1 h-7 px-2 text-xs font-bold"
          aria-label={labels.up}
        >
          <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden md:inline">{labels.up}</span>
        </button>
      </div>

      {/* Address bar */}
      <form
        onSubmit={handleAddressSubmit}
        className="flex items-center gap-2 px-2 py-1"
      >
        <label
          htmlFor="win98-address"
          className="text-xs font-sans font-bold shrink-0"
        >
          {labels.address}:
        </label>
        <div className="win98-address-field flex items-center gap-1 flex-1 px-1 h-6 bg-white">
          <Folder className="w-3.5 h-3.5 shrink-0 text-[#dab500]" aria-hidden="true" />
          <input
            id="win98-address"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent border-0 outline-none text-xs font-sans min-w-0"
          />
        </div>
        <button
          type="submit"
          className="win98-btn hidden sm:block px-3 h-6 text-xs font-bold"
        >
          {labels.go}
        </button>
      </form>
    </div>
  );
};
