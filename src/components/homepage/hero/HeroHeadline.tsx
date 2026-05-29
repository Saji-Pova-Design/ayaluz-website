type HeroHeadlineProps = {
  lines: [string, string, string];
};

export function HeroHeadline({ lines }: HeroHeadlineProps) {
  return (
    <h1 className="font-canela text-light">
      {lines.map((line, index) => (
        <span
          key={`${index}-${line}`}
          className="block text-[clamp(2rem,5.5vw,3.75rem)] font-normal leading-[1.12] tracking-[0.01em]"
        >
          {line}
        </span>
      ))}
    </h1>
  );
}
