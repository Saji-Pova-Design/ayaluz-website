type CalendarHeadlineProps = {
  title: string
  subtitle: string
  description: string
}

export default function CalendarHeadline({
  title,
  subtitle,
  description,
}: CalendarHeadlineProps) {
  return (
    <div>
      {/* H2 */}
      <h2
        className="
          font-canela
          font-medium
          text-2xl
          leading-none
          tracking-[-0.04em]
          text-[#111111]
          md:text-4xl
        "
      >
        {title}
      </h2>

      {/* H3 */}
      <h3
        className="
          mt-3
          font-canela
          font-normal
          text-lg
          leading-[1.05]
          tracking-[-0.03em]
          text-[#111111]
          md:text-2xl
        "
      >
        {subtitle}
      </h3>

      {/* H4 / DESCRIPTION */}
      <p
        className="
          mt-5
          max-w-[900px]
          font-sans
          text-basic
          leading-[1.7]
          tracking-[-0.01em]
          text-[#444444]
          md:text-lg
        "
      >
        {description}
      </p>
    </div>
  )
}