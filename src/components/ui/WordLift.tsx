import React from 'react';

interface WordLiftProps {
  children: React.ReactNode;
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
  const renderItem = (child: React.ReactNode, keyPrefix: string | number): React.ReactNode => {
    if (typeof child === 'string') {
      const parts = child.split(/(\s+)/);
      return parts.map((part, index) => {
        if (part.trim().length > 0) {
          return (
            <span key={`${keyPrefix}-${index}`} className="word-lift">
              {part}
            </span>
          );
        }
        return part;
      });
    }
    return child;
  };

  return (
    <Component className={className} style={style}>
      {React.Children.map(children, (child, idx) => renderItem(child, idx))}
    </Component>
  );
};
