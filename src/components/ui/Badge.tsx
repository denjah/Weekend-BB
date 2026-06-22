interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'pending';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  const baseClasses = 'inline-block px-2 py-1 rounded-sm text-xs font-mono tracking-widest border';
  
  const variants = {
    default: 'bg-black/50 text-text-tertiary border-white/5',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    pending: 'bg-accent-primary/10 text-accent-primary border-accent-primary/20',
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

