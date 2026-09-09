import React, { useEffect, useRef } from 'react';
import { triggerHaptic } from '../../utils/haptics';

interface TextPressureProps {
  text?: string;
  className?: string;
}

export const TextPressure: React.FC<TextPressureProps> = ({
  text = 'CLANDESTAGENCY',
  className = 'footer-giant-wordmark-container',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    const chars = text.split('');
    const mouse = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };

    const updateInitialPos = () => {
      const rect = container.getBoundingClientRect();
      mouse.x = rect.left + rect.width / 2;
      mouse.y = rect.top + rect.height / 2;
      cursor.x = mouse.x;
      cursor.y = mouse.y;
    };
    updateInitialPos();

    const handleMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
        triggerHaptic('light');
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      // Elastic spring back to center when finger lifts
      const rect = container.getBoundingClientRect();
      cursor.x = rect.left + rect.width / 2;
      cursor.y = rect.top + rect.height / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    const setSize = () => {
      const containerW = container.getBoundingClientRect().width;
      if (containerW <= 0) return;
      const newFontSize = containerW / (chars.length * 0.72);
      title.style.fontSize = `${Math.max(newFontSize, 24).toFixed(1)}px`;
    };

    setSize();
    window.addEventListener('resize', setSize);

    const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getAttr = (distance: number, maxDist: number, minVal: number, maxVal: number) => {
      const val = maxVal - Math.abs((maxVal * distance) / maxDist);
      return Math.max(minVal, val + minVal);
    };

    let animId: number;
    const animate = () => {
      mouse.x += (cursor.x - mouse.x) / 12;
      mouse.y += (cursor.y - mouse.y) / 12;

      const titleRect = title.getBoundingClientRect();
      const maxDist = Math.max(titleRect.width / 2, 200);

      spansRef.current.forEach((span) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const charCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };

        const d = dist(mouse, charCenter);
        const rawWght = getAttr(d, maxDist, 400, 800);
        const wght = Math.min(800, Math.max(400, Math.round(rawWght / 100) * 100));
        const wdth = Math.floor(getAttr(d, maxDist, 88, 108));

        const settings = `'wght' ${wght}, 'wdth' ${wdth}`;
        if (span.style.fontVariationSettings !== settings) {
          span.style.fontVariationSettings = settings;
        }
      });

      const containerW = container.getBoundingClientRect().width;
      const scrollW = title.scrollWidth;
      if (scrollW > containerW && containerW > 0) {
        const scale = containerW / scrollW;
        title.style.transform = `scaleX(${scale.toFixed(4)})`;
      } else {
        title.style.transform = 'scaleX(1)';
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animId);
    };
  }, [text]);

  const chars = text.split('');

  return (
    <div ref={containerRef} className={className} data-text={text}>
      <h2 ref={titleRef} className="text-pressure-title" aria-label={text}>
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) spansRef.current[i] = el;
            }}
            data-char={char}
          >
            {char}
          </span>
        ))}
      </h2>
    </div>
  );
};
