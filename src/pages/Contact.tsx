
import React, { useState } from 'react';
import { SectionTitle, SocialLink, BrutalButton } from '../components/BrutalUI';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';
import { useLanguage } from '../App';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const alertMsg = t.contact.success_alert
      .replace('{name}', formData.name)
      .replace('{message}', formData.message);
    alert(alertMsg);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="animate-in fade-in duration-500">
      <SectionTitle subtitle={t.contact.subtitle}>{t.contact.title}</SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div className="space-y-8">
          <p className="text-xl font-mono leading-relaxed">
            {t.contact.info}
          </p>

          <div className="flex flex-col gap-4">
            <SocialLink label="Email Me" href="mailto:luis.carlos.vieira@live.com" icon={<Mail />} />
            <SocialLink label="LinkedIn" href="https://linkedin.com/in/luis-carlos-vieira" icon={<Linkedin />} />
            <SocialLink label="GitHub" href="https://github.com/LittleCharles" icon={<Github />} />
          </div>

          <div className="mt-8 p-6 bg-brutal-green border-4 border-black shadow-hard">
            <div className="flex items-center gap-4 mb-2">
              <MapPin className="w-6 h-6" />
              <h4 className="font-black uppercase text-xl">{t.contact.location_title}</h4>
            </div>
            <p className="font-mono font-bold">{t.contact.location_val}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border-4 border-black p-8 shadow-hard flex flex-col gap-6">
           <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-4">{t.contact.form_title}</h3>
           
           <div className="flex flex-col gap-2">
             <label className="font-bold uppercase font-mono text-sm">{t.contact.name}</label>
             <input 
              type="text" 
              required
              className="border-4 border-black p-3 font-mono focus:outline-none focus:bg-brutal-green focus:border-black transition-colors"
              placeholder={t.contact.placeholder_name}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
             />
           </div>

           <div className="flex flex-col gap-2">
             <label className="font-bold uppercase font-mono text-sm">{t.contact.email}</label>
             <input 
              type="email" 
              required
              className="border-4 border-black p-3 font-mono focus:outline-none focus:bg-brutal-green focus:border-black transition-colors"
              placeholder={t.contact.placeholder_email}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
             />
           </div>

           <div className="flex flex-col gap-2">
             <label className="font-bold uppercase font-mono text-sm">{t.contact.message}</label>
             <textarea 
              rows={5}
              required
              className="border-4 border-black p-3 font-mono focus:outline-none focus:bg-brutal-green focus:border-black transition-colors resize-none"
              placeholder={t.contact.placeholder_message}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
             />
           </div>

           <BrutalButton type="submit" className="w-full mt-4">
             {t.contact.cta}
           </BrutalButton>
        </form>

      </div>
    </div>
  );
};

export default Contact;
