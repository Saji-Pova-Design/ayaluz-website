type CalendarReserveButtonProps = {
    href: string;
    label: string;
  };
  
  export default function CalendarReserveButton({
    href,
    label,
  }: CalendarReserveButtonProps) {
    return (
      <a
        href={href}
        className="inline-flex h-[58px] items-center justify-center rounded-[20px] bg-[#28543B] px-10 text-[20px] font-medium text-white"
      >
        {label}
      </a>
    );
  }