export const Logo = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 700 458.78"
    className={className}
    style={{ width: '48px', height: '48px' }}
  >
    <defs>
      <linearGradient id="grad-icon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1B2B5A" />
        <stop offset="100%" stopColor="#4facfe" />
      </linearGradient>
    </defs>
    <g fill="url(#grad-icon)">
      <circle cx="633.82" cy="66.18" r="66.18" />
      <polygon points="459.67 0 611.89 266.92 527.44 458.78 263.19 0 459.67 0" />
      <polygon points="196.48 0 348.71 266.92 264.25 458.78 0 0 196.48 0" />
    </g>
  </svg>
);

