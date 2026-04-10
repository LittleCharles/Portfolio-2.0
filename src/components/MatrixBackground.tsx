import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Matrix rain canvas background. Only active on the terminal skin.
 * Renders binary columns (0s and 1s) falling with three brightness levels:
 *   - bright white head (8%)
 *   - neon green body  (20%)
 *   - dim green trail  (rest, with variable alpha)
 *
 * Driven by setInterval at 45ms (~22fps) on purpose — it gives the classic
 * Matrix feel without burning the GPU. Respects prefers-reduced-motion.
 */
export const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== 'terminal') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    setSize();

    const fontSize = 12;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = Array.from(
      { length: columns },
      () => Math.floor(Math.random() * -50),
    );

    const handleResize = () => {
      setSize();
      columns = Math.floor(width / fontSize);
      drops = Array.from(
        { length: columns },
        () => Math.floor(Math.random() * -50),
      );
    };

    const draw = () => {
      // Persistent fade trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = Math.random() < 0.5 ? '0' : '1';
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const rand = Math.random();

        if (rand < 0.08) {
          ctx.fillStyle = '#ffffff';
        } else if (rand < 0.28) {
          ctx.fillStyle = '#00ff41';
        } else {
          ctx.fillStyle = `rgba(0, 180, 60, ${0.25 + Math.random() * 0.4})`;
        }

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = window.setInterval(draw, 45);
    window.addEventListener('resize', handleResize);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  if (theme !== 'terminal') return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
    />
  );
};
