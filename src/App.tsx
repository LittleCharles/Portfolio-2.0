
import React, { useState, createContext, useContext } from 'react';
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

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <BrowserRouter basename="/Portfolio-2.0">
        <div className="min-h-screen flex flex-col font-sans selection:bg-brutal-green selection:text-black bg-white">
          
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
                    className="bg-transparent font-black uppercase cursor-pointer focus:outline-none text-xs border-2 border-black px-2 py-1"
                  >
                    <option value="pt">PT</option>
                    <option value="en">EN</option>
                  </select>
                </div>
              </nav>

              <button className="lg:hidden p-2 border-4 border-black bg-brutal-green" onClick={toggleMenu}>
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
                      className="w-full bg-white font-black uppercase cursor-pointer text-sm border-2 border-black px-3 py-2"
                    >
                      <option value="pt">PORTUGUÊS</option>
                      <option value="en">ENGLISH</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </header>

          <main className="flex-grow pt-28 pb-12 px-4 container mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <button 
            onClick={() => setShowTerminal(true)}
            className="fixed bottom-8 right-8 z-30 bg-black text-white p-4 border-4 border-white shadow-[8px_8px_0_0_#CCFF00] hover:translate-y-[-4px] transition-all"
          >
            <MessageSquare className="w-8 h-8" />
          </button>

          {showTerminal && <ChatTerminal onClose={() => setShowTerminal(false)} />}

          <footer className="bg-white text-black py-12 border-t-4 border-black">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-black uppercase">LUIS CARLOS VIEIRA</h4>
                <p className="font-mono text-gray-600 font-bold uppercase">{t.footer.role}</p>
              </div>
              <div className="flex gap-6 font-black uppercase text-sm">
                <a href="https://github.com/LittleCharles" target="_blank" className="hover:text-brutal-purple hover:underline decoration-4 transition-all">GitHub</a>
                <a href="https://www.linkedin.com/in/luis-carlos-vieira/" target="_blank" className="hover:text-brutal-purple hover:underline decoration-4 transition-all">LinkedIn</a>
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
