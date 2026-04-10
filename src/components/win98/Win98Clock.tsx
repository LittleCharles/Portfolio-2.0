import React, { useEffect, useState } from 'react';

/**
 * Live HH:MM clock with a colon that blinks every second — a small nod
 * to the Windows 98 system tray clock (and older CRT displays).
 * Stand-alone on purpose so the parent Taskbar doesn't re-render each tick.
 */
export const Win98Clock: React.FC = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const blinkOn = now.getSeconds() % 2 === 0;

  return (
    <span
      className="font-mono text-xs tabular-nums leading-none"
      aria-label={`${hh}:${mm}`}
      role="timer"
    >
      {hh}
      <span style={{ opacity: blinkOn ? 1 : 0.25 }}>:</span>
      {mm}
    </span>
  );
};
