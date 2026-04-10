import React from 'react';
// Import each icon from its own subpath (named exports) so the barrel
// index doesn't drag the entire @react95/icons catalog (~3.5MB).
import { Computer3 } from '@react95/icons/Computer3';
import { Folder } from '@react95/icons/Folder';
import { RecycleEmpty } from '@react95/icons/RecycleEmpty';
import { Globe } from '@react95/icons/Globe';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../App';

/**
 * Decorative Windows-98-style desktop icons in the left strip of the
 * viewport. Only renders on the win98 skin and only on lg+ viewports
 * (where the main has reserved padding-left for them). Each icon is a
 * cara-de-pau easter-egg button — clicking pops a classic Windows-style
 * "access denied" alert.
 *
 * The icons themselves come from @react95/icons which ships authentic
 * pixel-art SVGs of the original Windows 95/98 system icons.
 */

interface IconDef {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  message: string;
}

const DesktopIcon: React.FC<IconDef> = ({ Icon, label, message }) => (
  <button
    type="button"
    onClick={() => alert(message)}
    className="w-16 flex flex-col items-center gap-1 p-1 transition-colors hover:bg-[#000080]/40 focus-visible:outline-none focus-visible:bg-[#000080]/50"
  >
    <Icon width={32} height={32} aria-hidden="true" />
    <span
      className="text-[10px] font-sans text-white text-center leading-tight px-0.5 break-words"
      style={{
        textShadow:
          '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
      }}
    >
      {label}
    </span>
  </button>
);

export const Win98Desktop: React.FC = () => {
  const { theme } = useTheme();
  const { lang } = useLanguage();

  if (theme !== 'win98') return null;

  const iconsPt: IconDef[] = [
    { Icon: Computer3,    label: 'Meu Computador', message: 'Acesso negado.' },
    { Icon: Folder,       label: 'Documentos',     message: 'Pasta vazia.' },
    { Icon: RecycleEmpty, label: 'Lixeira',        message: 'A Lixeira está vazia.' },
    { Icon: Globe,        label: 'Internet',       message: 'Conexão recusada.' },
  ];
  const iconsEn: IconDef[] = [
    { Icon: Computer3,    label: 'My Computer',  message: 'Access denied.' },
    { Icon: Folder,       label: 'Documents',    message: 'Folder is empty.' },
    { Icon: RecycleEmpty, label: 'Recycle Bin',  message: 'The Recycle Bin is empty.' },
    { Icon: Globe,        label: 'Internet',     message: 'Connection refused.' },
  ];

  const icons = lang === 'pt' ? iconsPt : iconsEn;

  return (
    <div
      className="hidden lg:flex fixed left-2 z-[5] flex-col gap-3"
      style={{ top: '12rem' /* below win98 chrome + header */ }}
      aria-hidden="true"
    >
      {icons.map((item, i) => (
        <DesktopIcon key={i} {...item} />
      ))}
    </div>
  );
};
