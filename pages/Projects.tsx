
import React from 'react';
import { SectionTitle, BrutalButton } from '../components/BrutalUI';
import { Github, ExternalLink } from 'lucide-react';
import { useLanguage } from '../App';

const Projects: React.FC = () => {
  const { t, lang } = useLanguage();

  // const projectsImages = [
  //   'https://picsum.photos/800/600?random=1',
  //   'https://picsum.photos/800/600?random=2',
  //   'https://picsum.photos/800/600?random=3',
  //   'https://picsum.photos/800/600?random=4'
  // ];

  return (
    <div className="animate-in fade-in duration-500">
      <SectionTitle subtitle={t.projects.subtitle}>{t.projects.title}</SectionTitle>

      {/* Coming Soon Message */}
      <div className="border-4 border-black bg-white p-12 md:p-32 text-center">
        <h2 className="text-5xl md:text-8xl font-black uppercase mb-6">EM BREVE</h2>
        <p className="font-mono text-base md:text-xl font-bold text-gray-600 max-w-2xl mx-auto">
          {lang === 'pt'
            ? 'PROJETOS INCRÍVEIS ESTÃO A CAMINHO. FIQUE LIGADO!'
            : 'AMAZING PROJECTS COMING SOON. STAY TUNED!'}
        </p>
      </div>

      {/* Commented out for now
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {t.projects.list.map((project, index) => (
          <div key={index} className="group relative">
            <div className="relative border-4 border-black bg-black shadow-hard mb-6 overflow-hidden">
               <img
                src={projectsImages[index]}
                alt={project.title}
                className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-brutal-green/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-multiply"></div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black uppercase">{project.title}</h3>
                <span className="font-mono text-4xl font-black text-gray-200 -mt-2 opacity-50 select-none">
                  0{index + 1}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-black text-white px-2 py-1 font-mono text-xs uppercase font-bold">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="font-mono text-sm leading-relaxed border-l-4 border-brutal-green pl-4">
                {project.description}
              </p>

              <div className="flex gap-4 mt-2">
                 <BrutalButton variant="primary" className="text-sm py-2 px-4" icon={<ExternalLink size={16} />}>
                   {t.projects.demo}
                 </BrutalButton>
                 <BrutalButton variant="outline" className="text-sm py-2 px-4" icon={<Github size={16} />}>
                   {t.projects.code}
                 </BrutalButton>
              </div>
            </div>
          </div>
        ))}
      </div>
      */}
    </div>
  );
};

export default Projects;
