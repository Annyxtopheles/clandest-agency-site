import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

interface AnimatedButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  children,
}) => {
  const btnRef = useRef<any>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const distX = e.clientX - btnCenterX;
    const distY = e.clientY - btnCenterY;
    const moveX = distX * 0.28;
    const moveY = distY * 0.28;
    el.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease';
    el.style.transform = 'translate3d(0px, 0px, 0) scale(1)';
  };

  const handleMouseEnter = () => {
    const el = btnRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease';
  };

  const arrowSvg = (
    <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
  );

  const arrowSvg2 = (
    <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
    </svg>
  );

  const content = (
    <>
      {arrowSvg2}
      <span className="text">{children}</span>
      <span className="circle"></span>
      {arrowSvg}
    </>
  );

  const commonProps = {
    ref: btnRef,
    className: `animated-button ${className}`,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick,
  };

  if (to) {
    return <Link to={to} {...commonProps}>{content}</Link>;
  }

  if (href) {
    return <a href={href} {...commonProps}>{content}</a>;
  }

  return (
    <button type={type} disabled={disabled} {...commonProps}>
      {content}
    </button>
  );
};
