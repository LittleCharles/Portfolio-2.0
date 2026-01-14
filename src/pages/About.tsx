
import React from 'react';
import { BrutalCard } from '../components/BrutalUI';
import { useLanguage } from '../App';
import { MapPin, Mail, Calendar, Layout, Server, Zap, ChevronLeft, ChevronRight, PenTool } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useLanguage();

  const techGroups = [
    { 
      category: t.about.stack_categories.frontend, 
      icon: <div className="w-8 h-8 border-2 border-brutal-green flex items-center justify-center"><Layout size={18} className="text-brutal-green" /></div>,
      items: ["JAVASCRIPT (ES6+)", "TYPESCRIPT", "REACT.JS", "NEXT.JS", "TAILWIND CSS", "REACT NATIVE"] 
    },
    { 
      category: t.about.stack_categories.backend, 
      icon: <div className="w-8 h-8 border-2 border-blue-500 flex items-center justify-center"><Server size={18} className="text-blue-500" /></div>,
      items: ["NODE.JS", "EXPRESS.JS", "REST APIS", "FIREBASE"] 
    },
    { 
      category: t.about.stack_categories.infra, 
      icon: <div className="w-8 h-8 border-2 border-brutal-purple flex items-center justify-center"><Zap size={18} className="text-brutal-purple" /></div>,
      items: ["AWS (EC2, S3, AMPLIFY)", "GIT / GITHUB", "DOCKER", "VERCEL"] 
    },
    {
      category: t.about.stack_categories.platforms,
      icon: <div className="w-8 h-8 border-2 border-orange-500 flex items-center justify-center"><PenTool size={18} className="text-orange-500" /></div>,
      items: ["WORDPRESS", "SHOPIFY", "FRAMER", "FIGMA"]
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col lg:flex-row gap-0 lg:items-start relative">
      
      {/* SIDEBAR - Fixa no desktop acompanhando o scroll */}
      <aside className="lg:w-1/4 w-full lg:sticky lg:top-28 p-4 z-10">
        <div className="bg-white border-[3px] border-black p-5 shadow-hard flex flex-col">
          {/* Foto de Perfil */}
          <div className="border-[3px] border-black mb-6 grayscale overflow-hidden aspect-[4/5] shrink-0">
            <img 
              src="assets/ImageProfile2.png" 
              alt="Luis Carlos Vieira" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">LUIS CARLOS VIEIRA</h2>
            <div className="inline-block bg-black text-white px-2 py-0.5 text-[10px] font-black tracking-widest uppercase">
              {t.about.sidebar.role}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t-[1px] border-black space-y-4">
            <div className="flex items-center gap-3 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-tight">
              <MapPin size={14} className="text-brutal-red shrink-0" />
              <span>{t.about.sidebar.location}</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-tight break-all">
              <Mail size={14} className="text-brutal-green shrink-0" />
              <span>luis.carlos.vieira@live.com</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-tight">
              <Calendar size={14} className="text-brutal-purple shrink-0" />
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
          <h1 className="text-6xl md:text-[100px]  font-black uppercase tracking-tighter leading-[0.8] mb-6 break-words">
            {t.nav.about}
          </h1>
          <div className="inline-block bg-brutal-green border-[3px] border-black px-4 md:px-6 py-1 shadow-hard-sm">
            <span className="font-black uppercase text-sm md:text-xl">{t.about.cv_label}</span>
          </div>
        </header>

        {/* Seção Objetivo */}
        <section>
          <div className="bg-black text-white p-6 md:p-10 border-[3px] border-black shadow-hard-lg relative group overflow-hidden">
            <h4 className="text-xl md:text-2xl font-black uppercase mb-6 text-brutal-green tracking-[0.2em]">{t.about.objective_title}</h4>
            <p className="font-mono leading-relaxed relative z-10 text-lg md:text-xl font-medium">
              {t.about.objective_text}
            </p>
          </div>
        </section>

        {/* Experiência */}
        <section className="space-y-8">
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            {t.about.experience.title}
          </h3>

          <div className="space-y-8">
            <div className="bg-white border-[3px] border-black p-6 md:p-8 shadow-hard relative">
               <div className="absolute -top-3 left-4 md:left-6 bg-brutal-green text-black px-3 py-0.5 font-black uppercase text-[10px] border-[3px] border-black shadow-hard-sm">
                 {t.about.experience.present}
               </div>
               
               <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-1">
                 <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight">LIONSOFT INC.</h4>
                 <span className="font-mono text-[10px] font-black text-gray-400 uppercase">{t.about.experience.lionsoft.period}</span>
               </div>
               
               <p className="font-black uppercase text-brutal-purple mb-6 text-base md:text-lg underline decoration-[2px] underline-offset-4">
                 {t.about.experience.lionsoft.role}
               </p>
               
               <ul className="space-y-4 font-mono text-xs md:text-sm font-bold">
                 {t.about.experience.lionsoft.tasks.map((task, i) => (
                   <li key={i} className="flex gap-3">
                     <span className="text-brutal-green font-black">▶</span>
                     <span>{task}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-8">
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            {t.about.stack_title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {techGroups.map((group) => (
              <div key={group.category} className="space-y-4">
                <div className="flex items-center gap-3">
                  {group.icon}
                  <h5 className="font-black uppercase text-xl md:text-2xl tracking-tight">{group.category}</h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="bg-black text-white px-2.5 py-1.5 font-mono text-[10px] font-black uppercase border-2 border-black hover:bg-brutal-green hover:text-black transition-all">
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
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            {t.about.education.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <BrutalCard className="bg-white p-5">
              <p className="text-[10px] font-black text-gray-400 mb-1 font-mono uppercase tracking-widest">{t.about.education.period_ads}</p>
              <h5 className="font-black uppercase text-lg md:text-xl leading-tight mb-2">{t.about.education.facens}</h5>
              <p className="font-mono text-[10px] font-black uppercase text-brutal-purple">Facens - Sorocaba/SP</p>
            </BrutalCard>
            <BrutalCard className="bg-white p-5">
              <p className="text-[10px] font-black text-gray-400 mb-1 font-mono uppercase tracking-widest">{t.about.education.period_etec}</p>
              <h5 className="font-black uppercase text-lg md:text-xl leading-tight mb-2">{t.about.education.etec}</h5>
              <p className="font-mono text-[10px] font-black uppercase text-brutal-purple">Etec Rubens de Faria</p>
            </BrutalCard>
          </div>
        </section>

      </main>
    </div>
  );
};

export default About;
