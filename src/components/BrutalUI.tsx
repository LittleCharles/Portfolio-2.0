
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 font-black border-theme border-theme-border transition-[transform,box-shadow,background-color,color] duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-tighter will-change-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-3 focus-visible:ring-offset-2";

  const variants = {
    primary:   "bg-accent text-on-accent shadow-theme hover:bg-surface hover:text-fg hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-theme-lg",
    secondary: "bg-inverse-bg text-inverse-fg shadow-theme hover:bg-accent-3 hover:translate-x-[-2px] hover:translate-y-[-2px]",
    outline:   "bg-surface text-fg shadow-theme hover:bg-surface-alt hover:shadow-theme-lg hover:translate-x-[-2px] hover:translate-y-[-2px]",
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
    <div
      className={`brutal-card bg-surface border-theme border-theme-border p-8 shadow-theme relative h-full ${className}`}
      data-title={title || 'Portfolio.exe'}
    >
      {decoration && (
        <div className="absolute top-2 right-2 flex gap-1">
           <div className="w-3 h-3 border-theme-sm border-theme-border rounded-full"></div>
           <div className="w-3 h-3 border-theme-sm border-theme-border rounded-full bg-fg"></div>
        </div>
      )}
      {title && (
        <div className="border-b-theme border-theme-border pb-4 mb-6">
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
        group px-6 py-2 font-black uppercase transition-all relative text-sm tracking-widest focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-3 focus-visible:ring-offset-2
        ${isActive ? 'text-fg' : 'text-muted hover:text-accent-3'}
      `}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[60%] h-1.5 bg-accent -z-10"></span>
      )}
      {!isActive && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[60%] h-1.5 bg-accent-3 -z-10 transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100"></span>
      )}
    </Link>
  );
};

export const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string; className?: string }> = ({ children, subtitle, className = '' }) => (
  <div className={`mb-16 ${className}`}>
    <h2 className="text-5xl md:text-8xl font-black uppercase leading-none text-fg break-words tracking-tighter">
      {children}
    </h2>
    {subtitle && (
      <p className="mt-4 text-xl font-mono bg-accent text-on-accent inline-block px-4 py-1 border-theme-sm border-theme-border font-bold">
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
    className="group flex items-center justify-between p-5 border-theme border-theme-border bg-surface text-fg hover:bg-accent hover:text-on-accent transition-[transform,box-shadow,background-color,color] shadow-theme-sm hover:translate-y-[-2px] hover:shadow-theme will-change-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-theme-border focus-visible:ring-offset-2"
  >
    <span className="font-black text-xl uppercase">{label}</span>
    <span className="text-fg group-hover:text-on-accent group-hover:rotate-45 transition-[transform,color] duration-300">
      {icon}
    </span>
    <span className="sr-only"> (opens in new window)</span>
  </a>
);
