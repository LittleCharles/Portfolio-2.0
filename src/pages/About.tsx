
import React from 'react';
import { BrutalCard } from '../components/BrutalUI';
import { useLanguage } from '../App';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { MapPin, Mail, Calendar, Layout, Server, Zap, ChevronLeft, ChevronRight, PenTool } from 'lucide-react';

const About: React.FC = () => {
  const { t, lang } = useLanguage();

  useDocumentHead({
    title: lang === 'pt' ? 'Sobre' : 'About',
    description: lang === 'pt'
      ? 'Conheça Luis Carlos Vieira - experiência, formação e tech stack completa.'
      : 'Meet Luis Carlos Vieira - experience, education and full tech stack.'
  });

  const techGroups = [
    {
      category: t.about.stack_categories.frontend,
      icon: <div className="w-8 h-8 border-theme-sm border-accent flex items-center justify-center"><Layout size={18} className="text-accent" /></div>,
      items: ["JAVASCRIPT (ES6+)", "TYPESCRIPT", "REACT.JS", "NEXT.JS", "TAILWIND CSS", "REACT NATIVE"]
    },
    {
      category: t.about.stack_categories.backend,
      icon: <div className="w-8 h-8 border-theme-sm border-accent-2 flex items-center justify-center"><Server size={18} className="text-accent-2" /></div>,
      items: ["NODE.JS", "EXPRESS.JS", "REST APIS", "FIREBASE"]
    },
    {
      category: t.about.stack_categories.infra,
      icon: <div className="w-8 h-8 border-theme-sm border-accent-3 flex items-center justify-center"><Zap size={18} className="text-accent-3" /></div>,
      items: ["AWS (EC2, S3, AMPLIFY)", "GIT / GITHUB", "DOCKER", "VERCEL"]
    },
    {
      category: t.about.stack_categories.platforms,
      icon: <div className="w-8 h-8 border-theme-sm border-theme-border flex items-center justify-center"><PenTool size={18} className="text-fg" /></div>,
      items: ["WORDPRESS", "SHOPIFY", "FRAMER", "FIGMA"]
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col lg:flex-row gap-0 lg:items-start relative">
      
      {/* SIDEBAR - Fixa no desktop acompanhando o scroll */}
      <aside className="lg:w-1/4 w-full lg:sticky lg:top-28 p-4 z-10">
        <div className="bg-surface text-fg border-theme border-theme-border p-5 shadow-theme flex flex-col">
          {/* Foto de Perfil */}
          <div className="border-theme border-theme-border mb-6 grayscale overflow-hidden aspect-[4/5] shrink-0">
            <picture>
              <source
                srcSet="/Portfolio-2.0/assets/ImageProfile2-400.webp 400w, /Portfolio-2.0/assets/ImageProfile2-800.webp 800w"
                sizes="(max-width: 1024px) 100vw, 25vw"
                type="image/webp"
              />
              <img
                src="/Portfolio-2.0/assets/ImageProfile2-800.png"
                alt="Luis Carlos Vieira - Full Stack Developer"
                className="w-full h-full object-cover"
                width={640}
                height={800}
                loading="lazy"
              />
            </picture>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">LUIS CARLOS VIEIRA</h2>
            <div className="inline-block bg-inverse-bg text-inverse-fg px-2 py-0.5 text-[10px] font-black tracking-widest uppercase">
              {t.about.sidebar.role}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t-theme-sm border-theme-border space-y-4">
            <div className="flex items-center gap-3 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-tight">
              <MapPin size={14} className="text-accent-2 shrink-0" />
              <span>{t.about.sidebar.location}</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-tight break-all">
              <Mail size={14} className="text-accent shrink-0" />
              <span>luis.carlos.vieira@live.com</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-tight">
              <Calendar size={14} className="text-accent-3 shrink-0" />
              <span>{t.about.sidebar.born}</span>
            </div>
          </div>

          {/* Texto Decorativo LC no fundo da sidebar - Visível apenas em telas grandes */}
          <div className="mt-12 opacity-10 hidden lg:block select-none pointer-events-none self-end">
            <div className="text-[60px] font-black leading-none uppercase tracking-tighter">LCV</div>
          </div>
        </div>
      </aside>

      {/* CONTEÚDO DIREITA */}
      <main className="lg:w-3/4 w-full p-4 lg:pl-8 space-y-12 md:space-y-16 pb-20">
        
        <header>
          <h1 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter leading-[0.8] mb-6 break-words text-fg">
            {t.nav.about}
          </h1>
          <div className="inline-block bg-accent text-on-accent border-theme border-theme-border px-4 md:px-6 py-1 shadow-theme-sm">
            <span className="font-black uppercase text-sm md:text-xl">{t.about.cv_label}</span>
          </div>
        </header>

        {/* Seção Objetivo */}
        <section>
          <div className="bg-inverse-bg text-inverse-fg p-6 md:p-10 border-theme border-theme-border shadow-theme-lg relative group overflow-hidden">
            <h4 className="text-xl md:text-2xl font-black uppercase mb-6 text-highlight tracking-[0.2em]">{t.about.objective_title}</h4>
            <p className="font-mono leading-relaxed relative z-10 text-lg md:text-xl font-medium">
              {t.about.objective_text}
            </p>
          </div>
        </section>

        {/* Experiência */}
        <section className="space-y-8">
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-fg">
            {t.about.experience.title}
          </h3>

          <div className="space-y-8">
            <div className="bg-surface text-fg border-theme border-theme-border p-6 md:p-8 shadow-theme relative">
               <div className="absolute -top-3 left-4 md:left-6 bg-accent text-on-accent px-3 py-0.5 font-black uppercase text-[10px] border-theme border-theme-border shadow-theme-sm">
                 {t.about.experience.present}
               </div>

               <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-1">
                 <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight">LIONSOFT INC.</h4>
                 <span className="font-mono text-[10px] font-black text-muted uppercase">{t.about.experience.lionsoft.period}</span>
               </div>

               <p className="font-black uppercase text-accent-3 mb-6 text-base md:text-lg underline decoration-[2px] underline-offset-4">
                 {t.about.experience.lionsoft.role}
               </p>

               <ul className="space-y-4 font-mono text-xs md:text-sm font-bold">
                 {t.about.experience.lionsoft.tasks.map((task, i) => (
                   <li key={i} className="flex gap-3">
                     <span className="text-accent font-black">▶</span>
                     <span>{task}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-8">
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-fg">
            {t.about.stack_title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {techGroups.map((group) => (
              <div key={group.category} className="space-y-4">
                <div className="flex items-center gap-3">
                  {group.icon}
                  <h5 className="font-black uppercase text-xl md:text-2xl tracking-tight text-fg">{group.category}</h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="bg-inverse-bg text-inverse-fg px-2.5 py-1.5 font-mono text-[10px] font-black uppercase border-theme-sm border-theme-border hover:bg-accent hover:text-on-accent transition-all">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Educação */}
        <section className="space-y-8">
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-fg">
            {t.about.education.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <BrutalCard className="p-5">
              <p className="text-[10px] font-black text-muted mb-1 font-mono uppercase tracking-widest">{t.about.education.period_ads}</p>
              <h5 className="font-black uppercase text-lg md:text-xl leading-tight mb-2 text-fg">{t.about.education.facens}</h5>
              <p className="font-mono text-[10px] font-black uppercase text-accent-3">Facens - Sorocaba/SP</p>
            </BrutalCard>
            <BrutalCard className="p-5">
              <p className="text-[10px] font-black text-muted mb-1 font-mono uppercase tracking-widest">{t.about.education.period_etec}</p>
              <h5 className="font-black uppercase text-lg md:text-xl leading-tight mb-2 text-fg">{t.about.education.etec}</h5>
              <p className="font-mono text-[10px] font-black uppercase text-accent-3">Etec Rubens de Faria</p>
            </BrutalCard>
          </div>
        </section>

      </main>
    </div>
  );
};

export default About;
