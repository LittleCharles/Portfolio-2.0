
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Monitor, Database, Cloud, GraduationCap, Briefcase, ExternalLink } from 'lucide-react';
import { BrutalButton, BrutalCard, SectionTitle } from '../components/BrutalUI';
import { useLanguage } from '../App';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const version = useMemo(() => {
    const birthDate = new Date(2003, 7, 30);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return (age / 10).toFixed(1);
  }, []);

  const mainSkills = [
    { name: 'JavaScript', icon: 'JS' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'React.js', icon: 'R' },
    { name: 'Next.js', icon: 'N' },
    { name: 'Node.js', icon: 'Node' },
    { name: 'AWS', icon: 'AWS' },
  ];

  const featuredProjects = [
    {
      id: '1',
      title: 'E-Com Brutal',
      description: t.projects.ecom_desc,
      tags: ['Next.js', 'Tailwind'],
      image: 'https://picsum.photos/800/600?random=1',
    },
    {
      id: '2',
      title: 'Crypto Tracker',
      description: t.projects.crypto_desc,
      tags: ['React', 'WebSockets'],
      image: 'https://picsum.photos/800/600?random=2',
    }
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col justify-center relative py-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
               <span className="w-3 h-3 bg-brutal-green rounded-full"></span>
               <span className="font-mono font-bold text-xs md:text-sm tracking-widest bg-black text-white px-3 py-1 uppercase">
                 {t.hero.status}
               </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.9] md:leading-[0.85] tracking-[0.02em] mb-8 whitespace-pre-line break-words">
              {t.hero.greeting.split(',').map((part, i) => (
                <React.Fragment key={i}>
                  {part}{i === 0 ? ',' : ''}
                  {i === 0 && <br className="hidden md:block"/>}
                  {i === 0 && <span className="md:hidden"> </span>}
                </React.Fragment>
              ))}
            </h1>
            
            <p className="text-lg md:text-2xl font-bold max-w-3xl leading-snug text-gray-700 mb-10">
              {t.hero.role}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <BrutalButton onClick={() => navigate('/contact')} className="w-full sm:w-auto text-center justify-center">
                {t.hero.cta}
              </BrutalButton>
            </div>
          </div>

          <div className="lg:col-span-2 hidden lg:block">
            <div className="relative group">
              <div className="absolute inset-0 bg-brutal-purple translate-x-4 translate-y-4 border-4 border-black -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform"></div>
              <div className="border-4 border-black bg-white overflow-hidden shadow-hard aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-500">
                <img 
                  src="assets/ImageProfile2.png" 
                  alt="Luis Carlos Vieira" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brutal-green border-4 border-black p-4 shadow-hard-sm">
                <span className="font-black uppercase text-xl">L.C.V. (v.{version})</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <BrutalCard className="relative pt-12 flex flex-col gap-4 group">
          <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-black"></div>
          <div className="absolute top-4 left-6 font-black uppercase tracking-tighter text-xl">Frontend</div>
          <hr className="border-2 border-black w-full" />
          <div className="px-2">
            <Monitor size={40} className="mb-4 text-brutal-green" strokeWidth={3} />
            <p className="font-mono text-sm leading-tight font-bold">
              {lang === 'pt' 
                ? 'Interfaces pixel-perfect e responsivas. React, Next.js e Tailwind CSS para criar experiências únicas.' 
                : 'Pixel-perfect, responsive interfaces. React, Next.js, and Tailwind CSS.'}
            </p>
          </div>
        </BrutalCard>

        <BrutalCard className="relative pt-12 flex flex-col gap-4 group">
          <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-black"></div>
          <div className="absolute top-4 left-6 font-black uppercase tracking-tighter text-xl">Backend</div>
          <hr className="border-2 border-black w-full" />
          <div className="px-2">
            <Database size={40} className="mb-4 text-blue-500" strokeWidth={3} />
            <p className="font-mono text-sm leading-tight font-bold">
              {lang === 'pt' 
                ? 'APIs robustas e arquitetura de banco de dados. Escalabilidade não é opcional.' 
                : 'Robust APIs and database architecture. Scalability is a must.'}
            </p>
          </div>
        </BrutalCard>

        <BrutalCard className="relative pt-12 flex flex-col gap-4 group">
          <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-black"></div>
          <div className="absolute top-4 left-6 font-black uppercase tracking-tighter text-xl">
            {t.services.infra}
          </div>
          <hr className="border-2 border-black w-full" />
          <div className="px-2">
            <Cloud size={40} className="mb-4 text-brutal-purple" strokeWidth={3} />
            <p className="font-mono text-sm leading-tight font-bold">
              {t.services.infra_desc}
            </p>
          </div>
        </BrutalCard>
      </section>

      {/* About Summary */}
      <section>
        <SectionTitle className="text-5xl md:text-8xl" subtitle="Luis Carlos Vieira">{t.about.title}</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BrutalCard className="bg-white flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-black text-white p-2 border-2 border-black">
                <GraduationCap size={24} />
              </div>
              <h4 className="font-black uppercase text-2xl tracking-tight">{t.about.edu_title}</h4>
            </div>
            
            <ul className="space-y-6 font-mono font-bold flex-grow">
              <li className="border-l-4 border-black pl-4">
                <p className="text-[10px] opacity-60 font-black uppercase tracking-widest">2023 - 2025</p>
                <p className="text-sm uppercase tracking-tight">{t.about.facens_desc}</p>
              </li>
              <li className="border-l-4 border-gray-300 pl-4">
                <p className="text-[10px] opacity-40 font-black uppercase tracking-widest">2018 - 2020</p>
                <p className="text-sm uppercase tracking-tight text-gray-400">{t.about.etec_desc}</p>
              </li>
            </ul>

            <button 
              onClick={() => navigate('/about')} 
              className="mt-12 w-full text-left font-black uppercase text-xs md:text-sm hover:text-brutal-purple flex items-center gap-2 group transition-all"
            >
              {t.about.view_full_edu} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </BrutalCard>

          <BrutalCard className="bg-white flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-black text-white p-2 border-2 border-black">
                <Briefcase size={24} />
              </div>
              <h4 className="font-black uppercase text-2xl tracking-tight">{t.about.exp_title}</h4>
            </div>
            
            <ul className="space-y-6 font-mono font-bold flex-grow">
              <li className="border-l-4 border-brutal-green pl-4">
                <p className="text-[10px] opacity-60 font-black uppercase tracking-widest">
                  {lang === 'pt' ? 'OUTUBRO 2023 - PRESENTE' : 'OCTOBER 2023 - PRESENT'}
                </p>
                <p className="text-sm uppercase tracking-tight">{t.about.lionsoft_desc}</p>
              </li>
              <li className="border-l-4 border-gray-300 pl-4 opacity-50">
                <p className="text-[10px] opacity-60 font-black uppercase tracking-widest">
                  {lang === 'pt' ? 'JUNHO 2023 - SETEMBRO 2023' : 'JUNE 2023 - SEPTEMBER 2023'}
                </p>
                <p className="text-sm uppercase tracking-tight">{t.about.cls_desc}</p>
              </li>
            </ul>

            <button 
              onClick={() => navigate('/about')} 
              className="mt-12 w-full text-left font-black uppercase text-xs md:text-sm hover:text-brutal-purple flex items-center gap-2 group transition-all"
            >
              {t.about.more} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </BrutalCard>
        </div>
      </section>

      {/* Projects Highlights - COMING SOON */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <SectionTitle className="mb-0 text-4xl md:text-8xl">{t.projects.title}</SectionTitle>
        </div>
        <div className="border-4 border-black bg-white p-12 md:p-24 text-center">
          <h3 className="text-4xl md:text-6xl font-black uppercase mb-4">EM BREVE</h3>
          <p className="font-mono text-sm md:text-base font-bold text-gray-600">
            {lang === 'pt' ? 'PROJETOS INCRÍVEIS ESTÃO A CAMINHO...' : 'AMAZING PROJECTS COMING SOON...'}
          </p>
        </div>
      </section>

      {/* Commented out for now
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <SectionTitle className="mb-0 text-4xl md:text-8xl">{t.projects.title}</SectionTitle>
          <button onClick={() => navigate('/projects')} className="font-black uppercase hover:text-brutal-purple hover:underline flex items-center gap-2 text-sm transition-colors">
            {t.projects.view_all} <ArrowRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
           {featuredProjects.map(project => (
             <div key={project.id} className="group flex flex-col gap-4">
                <div className="border-4 border-black overflow-hidden shadow-hard aspect-video bg-gray-200">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl md:text-2xl font-black uppercase">{project.title}</h4>
                    <p className="font-mono text-xs md:text-sm">{project.description}</p>
                  </div>
                  <button className="p-2 border-2 border-black hover:bg-brutal-green shrink-0 transition-colors"><ExternalLink size={18} /></button>
                </div>
             </div>
           ))}
        </div>
      </section>
      */}

      {/* Stack Summary */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <SectionTitle className="mb-0 text-4xl md:text-8xl">Stack</SectionTitle>
          <button onClick={() => navigate('/about')} className="font-black uppercase hover:text-brutal-purple hover:underline flex items-center gap-2 text-sm transition-colors">
            {t.stack.more} <ArrowRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
           {mainSkills.map(skill => (
             <BrutalCard key={skill.name} className="flex flex-col items-center justify-center py-6 md:py-8 text-center bg-white group hover:translate-y-[-5px] transition-transform">
               <span className="text-2xl md:text-3xl font-black mb-2">{skill.icon}</span>
               <span className="font-bold uppercase text-[10px] md:text-xs font-mono">{skill.name}</span>
             </BrutalCard>
           ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-black text-white p-8 md:p-24 border-4 border-black shadow-hard-lg relative overflow-hidden text-center">
         <h2 className="text-3xl md:text-6xl font-black uppercase mb-8 relative z-10">
           {t.contact.subtitle}
         </h2>
         <BrutalButton variant="primary" onClick={() => navigate('/contact')} className="relative z-10 w-full sm:w-auto px-12 py-5 text-lg">
           {t.contact.cta}
         </BrutalButton>
      </section>
    </div>
  );
};

export default Home;
