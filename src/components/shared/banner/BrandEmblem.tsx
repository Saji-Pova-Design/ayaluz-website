type BrandEmblemProps = {
  className?: string;
  size?: number;
};

/** Gold mandala mark — matches AYALUZ brand emblem */
export function BrandEmblem({ className = "", size = 36 }: BrandEmblemProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="18" cy="18" r="17" stroke="#C4A574" strokeWidth="0.75" />
      <circle cx="18" cy="18" r="12" stroke="#C4A574" strokeWidth="0.5" opacity="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="18"
          y1="6"
          x2="18"
          y2="10"
          stroke="#C4A574"
          strokeWidth="0.6"
          transform={`rotate(${deg} 18 18)`}
        />
      ))}
      <circle cx="18" cy="18" r="3" fill="#C4A574" opacity="0.9" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <circle
          key={`dot-${deg}`}
          cx="18"
          cy="8"
          r="1"
          fill="#C4A574"
          transform={`rotate(${deg} 18 18)`}
        />
      ))}
    </svg>
  );
}
