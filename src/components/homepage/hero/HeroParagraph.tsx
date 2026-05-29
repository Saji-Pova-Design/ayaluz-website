type HeroParagraphProps = {
  lines: [string, string];
};

export function HeroParagraph({ lines }: HeroParagraphProps) {
  return (
    <div className="max-w-xl font-sans-minimal text-[16px] leading-[1.65] tracking-[0.01em] text-gold-accent lg:text-[20px] lg:leading-[1.6]">
      {lines.map((line, index) => (
        <p key={`${index}-${line}`}>{line}</p>
      ))}
    </div>
  );
}
