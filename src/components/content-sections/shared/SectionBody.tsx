type SectionBodyProps = {
  body: string[]
}

export default function SectionBody({
  body,
}: SectionBodyProps) {
  return (
    <div className="space-y-5">
      {body.map((paragraph, index) => (
        <p
          key={index}
          className="
            max-w-[720px]
            text-base
            leading-[1.75]
            tracking-[-0.02em]
            text-[#1A1A1A]
            md:text-lg
          "
        >
          {paragraph}
        </p>
      ))}
    </div>
  )
}