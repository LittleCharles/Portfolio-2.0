
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

interface BrutalCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  decoration?: boolean;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 font-black border-4 border-black transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-tighter";
  
  const variants = {
    primary: "bg-brutal-green text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
    secondary: "bg-black text-white shadow-[8px_8px_0px_0px_rgba(204,255,0,1)] hover:bg-brutal-purple hover:translate-x-[-2px] hover:translate-y-[-2px]",
    outline: "bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:translate-x-[-2px] hover:translate-y-[-2px]"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon && <span className="ml-3">{icon}</span>}
    </button>
  );
};

export const BrutalCard: React.FC<BrutalCardProps> = ({ children, title, className = '', decoration = false }) => {
  return (
    <div className={`bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative h-full ${className}`}>
      {decoration && (
        <div className="absolute top-2 right-2 flex gap-1">
           <div className="w-3 h-3 border-2 border-black rounded-full"></div>
           <div className="w-3 h-3 border-2 border-black rounded-full bg-black"></div>
        </div>
      )}
      {title && (
        <div className="border-b-4 border-black pb-4 mb-6">
          <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

export const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`
        px-6 py-2 font-black uppercase transition-all relative text-sm tracking-widest
        ${isActive ? 'text-black' : 'text-gray-500 hover:text-brutal-purple'}
      `}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[60%] h-1.5 bg-brutal-green -z-10"></span>
      )}
      {!isActive && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-brutal-purple -z-10 transition-all group-hover:w-[60%]"></span>
      )}
    </Link>
  );
};

export const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string; className?: string }> = ({ children, subtitle, className = '' }) => (
  <div className={`mb-16 ${className}`}>
    <h2 className="text-5xl md:text-8xl font-black uppercase leading-none text-black break-words tracking-tighter">
      {children}
    </h2>
    {subtitle && (
      <p className="mt-4 text-xl font-mono bg-brutal-green text-black inline-block px-4 py-1 border-2 border-black font-bold">
        {subtitle}
      </p>
    )}
  </div>
);

export const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex items-center justify-between p-5 border-4 border-black bg-white hover:bg-brutal-green transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
  >
    <span className="font-black text-xl uppercase">{label}</span>
    <span className="group-hover:rotate-45 transition-transform duration-300">
      {icon}
    </span>
  </a>
);
