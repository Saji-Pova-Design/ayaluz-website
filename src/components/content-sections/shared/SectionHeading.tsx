type SectionHeadingProps = {
  children: React.ReactNode
}

export default function SectionHeading({
  children,
}: SectionHeadingProps) {
  return (
    <h2
      className="
        font-canela
        font-medium
        text-2xl
        leading-[1.08]
        tracking-[-0.04em]
        text-[#111111]
        md:text-4xl
      "
    >
      {children}
    </h2>
  )
}