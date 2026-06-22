import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className = '', onClick }: CardProps) => {
  return (
    <div 
      className={`bg-bg-secondary border border-border-subtle rounded-xl overflow-hidden transition-all duration-300 ${onClick ? 'cursor-pointer shadow-spring hover:border-white/30 hover:-translate-y-1' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`p-6 border-b border-border-subtle ${className}`}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;

