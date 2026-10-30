import React, { useEffect, useRef } from 'react';

interface TiltCardProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  className = '',
  style = {},
  children,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const stateRef = useRef({
    currentRX: 0,
    currentRY: 0,
    currentScale: 1,
    targetRX: 0,
    targetRY: 0,
    targetScale: 1,
  });

  const startSpringLoop = () => {
    if (rafRef.current !== null) return;

    const tick = () => {
      const el = cardRef.current;
      if (!el) {
        rafRef.current = null;
        return;
      }

      const s = stateRef.current;
      const lerp = 0.16;
      s.currentRX += (s.targetRX - s.currentRX) * lerp;
      s.currentRY += (s.targetRY - s.currentRY) * lerp;
      s.currentScale += (s.targetScale - s.currentScale) * lerp;

      el.style.transform = `perspective(1000px) rotateX(${s.currentRX.toFixed(2)}deg) rotateY(${s.currentRY.toFixed(2)}deg) scale3d(${s.currentScale.toFixed(3)}, ${s.currentScale.toFixed(3)}, ${s.currentScale.toFixed(3)})`;

      const settled =
        Math.abs(s.targetRX - s.currentRX) < 0.02 &&
        Math.abs(s.targetRY - s.currentRY) < 0.02 &&
        Math.abs(s.targetScale - s.currentScale) < 0.002;

      if (settled) {
        s.currentRX = s.targetRX;
        s.currentRY = s.targetRY;
        s.currentScale = s.targetScale;
        el.style.transform =
          s.targetScale === 1 && s.targetRX === 0 && s.targetRY === 0
            ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
            : `perspective(1000px) rotateX(${s.currentRX.toFixed(2)}deg) rotateY(${s.currentRY.toFixed(2)}deg) scale3d(${s.currentScale.toFixed(3)}, ${s.currentScale.toFixed(3)}, ${s.currentScale.toFixed(3)})`;
        rafRef.current = null;
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    stateRef.current.targetRX = ((y - centerY) / centerY) * -4.2;
    stateRef.current.targetRY = ((x - centerX) / centerX) * 4.2;
    stateRef.current.targetScale = 1.015;

    el.style.setProperty('--spotlight-x', `${x.toFixed(0)}px`);
    el.style.setProperty('--spotlight-y', `${y.toFixed(0)}px`);
    startSpringLoop();
  };

  const handleMouseEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = 'box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease';
    stateRef.current.targetScale = 1.015;
    startSpringLoop();
  };

  const handleMouseLeave = () => {
    stateRef.current.targetRX = 0;
    stateRef.current.targetRY = 0;
    stateRef.current.targetScale = 1;
    startSpringLoop();
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-surface ${className}`.trim()}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
