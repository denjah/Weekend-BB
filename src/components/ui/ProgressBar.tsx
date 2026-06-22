interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
  colorClass?: string;
  heightClass?: string;
}

export const ProgressBar = ({ 
  progress, 
  label, 
  className = '', 
  colorClass = 'bg-accent-primary',
  heightClass = 'h-1'
}: ProgressBarProps) => {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between text-xs font-mono mb-2">
          <span className="text-text-secondary uppercase tracking-widest">{label}</span>
          <span className="text-text-primary">{safeProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-black/40 border border-white/5 overflow-hidden ${heightClass}`}>
        <div 
          className={`${heightClass} ${colorClass} transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]`}
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};

