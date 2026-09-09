import React from 'react';
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
    className: `animated-button ${className}`,
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
