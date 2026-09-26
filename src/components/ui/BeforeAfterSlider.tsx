import React, { useState, useRef, useCallback, useEffect } from 'react';

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Original Design',
  afterLabel = 'Redesign',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset to 50% when slide images change
  useEffect(() => {
    setSliderPosition(50);
  }, [beforeImage, afterImage]);

  const calculatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    calculatePosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (e.touches[0]) {
      setIsDragging(true);
      calculatePosition(e.touches[0].clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      calculatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      calculatePosition(e.touches[0].clientX);
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, calculatePosition]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`before-after-container ${className}`}
      role="slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Before and after comparison slider"
    >
      {/* Redesign (After) Image */}
      <img
        src={afterImage}
        alt={afterLabel}
        draggable={false}
        className="before-after-img after-layer"
      />

      {/* Original (Before) Image with clip-path */}
      <div
        className="before-after-clip-layer"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          draggable={false}
          className="before-after-img before-layer"
        />
      </div>

      {/* Draggable Divider Line & Thumb */}
      <div
        className="before-after-divider"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="before-after-handle" title="Drag to compare">
          <span>⟨|⟩</span>
        </div>
      </div>
    </div>
  );
};
