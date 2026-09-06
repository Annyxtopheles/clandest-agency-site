import React from 'react';

interface WordLiftProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  className?: string;
  style?: React.CSSProperties;
}

export const WordLift: React.FC<WordLiftProps> = ({
  children,
  as: Component = 'span',
  className = '',
  style = {},
}) => {
  const parts = children.split(/(\s+)/);

  return (
    <Component className={className} style={style}>
      {parts.map((part, index) => {
        if (part.trim().length > 0) {
          return (
            <span key={index} className="word-lift">
              {part}
            </span>
          );
        }
        return part;
      })}
    </Component>
  );
};
