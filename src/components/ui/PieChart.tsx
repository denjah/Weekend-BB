interface PieChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  colorClass?: string;
  emptyColorClass?: string;
  className?: string;
  children?: React.ReactNode;
}

export const PieChart = ({ 
  percentage, 
  size = 120, 
  strokeWidth = 4,
  colorClass = 'text-accent-primary',
  emptyColorClass = 'text-text-primary/5',
  className = '',
  children
}: PieChartProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Empty circle */}
        <circle
          className={emptyColorClass}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={`${colorClass} transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="square"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Optional center content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

