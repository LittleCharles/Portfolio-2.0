
import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu, X, MessageSquare } from 'lucide-react';
import { translations } from './translations';

// Pages (lazy-loaded for code splitting)
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Contact = React.lazy(() => import('./pages/Contact'));

// Components
import { NavLink } from './components/BrutalUI';
import { StructuredData } from './components/StructuredData';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { MatrixBackground } from './components/MatrixBackground';
const ChatTerminal = React.lazy(() =>
  import('./components/ChatTerminal').then(m => ({ default: m.ChatTerminal }))
);

type Language = 'pt' | 'en';
interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: typeof translations.pt;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [lang, setLang] = useState<Language>('pt');

  const t = translations[lang];
  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <ThemeProvider>
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <BrowserRouter basename="/Portfolio-2.0">
        <StructuredData lang={lang} />
        <MatrixBackground />
        <div className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-on-accent bg-bg text-fg">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:text-on-accent focus:px-4 focus:py-2 focus:border-theme focus:border-theme-border focus:font-black focus:uppercase"
          >
            {lang === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
          </a>

          <header className="fixed top-0 left-0 w-full z-40 bg-bg border-b-theme border-theme-border">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
              <Link to="/" className="text-2xl md:text-3xl font-black tracking-tighter uppercase hover:text-accent-3 transition-colors flex items-baseline whitespace-nowrap">
                LUIS CARLOS<span className="text-accent">.V</span>
              </Link>

              <nav className="hidden lg:flex items-center gap-2">
                <NavLink to="/">{t.nav.home}</NavLink>
                <NavLink to="/about">{t.nav.about}</NavLink>
                <NavLink to="/projects">{t.nav.projects}</NavLink>
                <NavLink to="/contact">{t.nav.contact}</NavLink>

                <div className="flex items-center gap-2 ml-4 border-l-theme border-theme-border pl-4">
                  <ThemeSwitcher lang={lang} />
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as Language)}
                    aria-label={lang === 'pt' ? 'Selecionar idioma' : 'Select language'}
                    className="bg-transparent text-fg font-black uppercase cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-theme-border focus-visible:ring-offset-2 text-xs border-theme-sm border-theme-border px-2 py-1"
                  >
                    <option value="pt">PT</option>
                    <option value="en">EN</option>
                  </select>
                </div>
              </nav>

              <button
                className="lg:hidden p-3 border-theme border-theme-border bg-accent text-on-accent"
                onClick={toggleMenu}
                aria-label={mobileMenuOpen ? (lang === 'pt' ? 'Fechar menu' : 'Close menu') : (lang === 'pt' ? 'Abrir menu' : 'Open menu')}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="lg:hidden absolute top-20 left-0 w-full bg-bg border-b-theme border-theme-border shadow-theme">
                <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                  <Link to="/" className="text-xl font-black uppercase py-2 text-fg" onClick={toggleMenu}>{t.nav.home}</Link>
                  <Link to="/about" className="text-xl font-black uppercase py-2 text-fg" onClick={toggleMenu}>{t.nav.about}</Link>
                  <Link to="/projects" className="text-xl font-black uppercase py-2 text-fg" onClick={toggleMenu}>{t.nav.projects}</Link>
                  <Link to="/contact" className="text-xl font-black uppercase py-2 text-fg" onClick={toggleMenu}>{t.nav.contact}</Link>
                  <div className="pt-4 border-t-theme-sm border-theme-border flex flex-col gap-3">
                    <ThemeSwitcher lang={lang} fullWidth />
                    <select
                      value={lang}
                      onChange={(e) => setLang(e.target.value as Language)}
                      aria-label={lang === 'pt' ? 'Selecionar idioma' : 'Select language'}
                      className="w-full bg-surface text-fg font-black uppercase cursor-pointer text-sm border-theme-sm border-theme-border px-3 py-2 focus-visible:ring-4 focus-visible:ring-theme-border focus-visible:ring-offset-2"
                    >
                      <option value="pt">PORTUGUÊS</option>
                      <option value="en">ENGLISH</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </header>

          <main id="main-content" className="flex-grow pt-28 pb-12 px-4 container mx-auto">
            <React.Suspense fallback={
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="border-theme border-theme-border bg-accent text-on-accent px-8 py-4 shadow-theme font-black uppercase animate-pulse">
                  Loading...
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </React.Suspense>
          </main>

          <button
            onClick={() => setShowTerminal(true)}
            aria-label={lang === 'pt' ? 'Abrir terminal de chat' : 'Open chat terminal'}
            className="fixed bottom-8 right-8 z-30 bg-inverse-bg text-inverse-fg p-4 border-theme border-theme-border shadow-theme hover:translate-y-[-4px] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-3 focus-visible:ring-offset-2"
          >
            <MessageSquare className="w-8 h-8" />
          </button>

          {showTerminal && (
            <React.Suspense fallback={null}>
              <ChatTerminal onClose={() => setShowTerminal(false)} />
            </React.Suspense>
          )}

          <footer className="bg-bg text-fg py-12 border-t-theme border-theme-border">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-2xl font-black uppercase">LUIS CARLOS VIEIRA</p>
                <p className="font-mono text-muted font-bold uppercase">{t.footer.role}</p>
              </div>
              <div className="flex gap-6 font-black uppercase text-sm">
                <a href="https://github.com/LittleCharles" target="_blank" rel="noopener noreferrer" className="group relative hover:text-accent-3 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-3 focus-visible:ring-offset-2">
                  GitHub
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[3px] bg-accent-3 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  <span className="sr-only"> ({lang === 'pt' ? 'abre em nova janela' : 'opens in new window'})</span>
                </a>
                <a href="https://www.linkedin.com/in/luis-carlos-vieira/" target="_blank" rel="noopener noreferrer" className="group relative hover:text-accent-3 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-3 focus-visible:ring-offset-2">
                  LinkedIn
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[3px] bg-accent-3 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  <span className="sr-only"> ({lang === 'pt' ? 'abre em nova janela' : 'opens in new window'})</span>
                </a>
              </div>
              <div className="font-mono text-xs text-muted font-bold uppercase">
                © {new Date().getFullYear()} LCV. {t.footer.created}.
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </LanguageContext.Provider>
    </ThemeProvider>
  );
};

export default App;
