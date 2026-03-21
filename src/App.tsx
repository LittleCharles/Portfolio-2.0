
import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu, X, MessageSquare, Globe } from 'lucide-react';
import { translations } from './translations';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

// Components
import { NavLink } from './components/BrutalUI';
import { ChatTerminal } from './components/ChatTerminal';

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
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <BrowserRouter basename="/Portfolio-2.0">
        <div className="min-h-screen flex flex-col font-sans selection:bg-brutal-green selection:text-black bg-white">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-brutal-green focus:text-black focus:px-4 focus:py-2 focus:border-4 focus:border-black focus:font-black focus:uppercase"
          >
            {lang === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
          </a>

          <header className="fixed top-0 left-0 w-full z-40 bg-white border-b-4 border-black">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
              <Link to="/" className="text-2xl md:text-3xl font-black tracking-tighter uppercase hover:text-brutal-purple transition-colors flex items-baseline whitespace-nowrap">
                LUIS CARLOS<span className="text-brutal-green">.V</span>
              </Link>

              <nav className="hidden lg:flex items-center gap-2">
                <NavLink to="/">{t.nav.home}</NavLink>
                <NavLink to="/about">{t.nav.about}</NavLink>
                <NavLink to="/projects">{t.nav.projects}</NavLink>
                <NavLink to="/contact">{t.nav.contact}</NavLink>

                <div className="flex items-center gap-2 ml-4 border-l-4 border-black pl-4">
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as Language)}
                    aria-label={lang === 'pt' ? 'Selecionar idioma' : 'Select language'}
                    className="bg-transparent font-black uppercase cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 text-xs border-2 border-black px-2 py-1"
                  >
                    <option value="pt">PT</option>
                    <option value="en">EN</option>
                  </select>
                </div>
              </nav>

              <button
                className="lg:hidden p-3 border-4 border-black bg-brutal-green"
                onClick={toggleMenu}
                aria-label={mobileMenuOpen ? (lang === 'pt' ? 'Fechar menu' : 'Close menu') : (lang === 'pt' ? 'Abrir menu' : 'Open menu')}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b-4 border-black shadow-hard">
                <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                  <Link to="/" className="text-xl font-black uppercase py-2" onClick={toggleMenu}>{t.nav.home}</Link>
                  <Link to="/about" className="text-xl font-black uppercase py-2" onClick={toggleMenu}>{t.nav.about}</Link>
                  <Link to="/projects" className="text-xl font-black uppercase py-2" onClick={toggleMenu}>{t.nav.projects}</Link>
                  <Link to="/contact" className="text-xl font-black uppercase py-2" onClick={toggleMenu}>{t.nav.contact}</Link>
                  <div className="pt-4 border-t-2 border-black">
                    <select
                      value={lang}
                      onChange={(e) => setLang(e.target.value as Language)}
                      aria-label={lang === 'pt' ? 'Selecionar idioma' : 'Select language'}
                      className="w-full bg-white font-black uppercase cursor-pointer text-sm border-2 border-black px-3 py-2 focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2"
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <button
            onClick={() => setShowTerminal(true)}
            aria-label={lang === 'pt' ? 'Abrir terminal de chat' : 'Open chat terminal'}
            className="fixed bottom-8 right-8 z-30 bg-black text-white p-4 border-4 border-white shadow-[8px_8px_0_0_#CCFF00] hover:translate-y-[-4px] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutal-purple focus-visible:ring-offset-2"
          >
            <MessageSquare className="w-8 h-8" />
          </button>

          {showTerminal && <ChatTerminal onClose={() => setShowTerminal(false)} />}

          <footer className="bg-white text-black py-12 border-t-4 border-black">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-2xl font-black uppercase">LUIS CARLOS VIEIRA</p>
                <p className="font-mono text-gray-600 font-bold uppercase">{t.footer.role}</p>
              </div>
              <div className="flex gap-6 font-black uppercase text-sm">
                <a href="https://github.com/LittleCharles" target="_blank" rel="noopener noreferrer" className="group relative hover:text-brutal-purple transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutal-purple focus-visible:ring-offset-2">
                  GitHub
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[3px] bg-brutal-purple origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  <span className="sr-only"> ({lang === 'pt' ? 'abre em nova janela' : 'opens in new window'})</span>
                </a>
                <a href="https://www.linkedin.com/in/luis-carlos-vieira/" target="_blank" rel="noopener noreferrer" className="group relative hover:text-brutal-purple transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutal-purple focus-visible:ring-offset-2">
                  LinkedIn
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[3px] bg-brutal-purple origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  <span className="sr-only"> ({lang === 'pt' ? 'abre em nova janela' : 'opens in new window'})</span>
                </a>
              </div>
              <div className="font-mono text-xs text-gray-500 font-bold uppercase">
                © {new Date().getFullYear()} LCV. {t.footer.created}.
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </LanguageContext.Provider>
  );
};

export default App;
