type CalendarExpandButtonProps = {
  label: string;
  onClick: () => void;
};

export default function CalendarExpandButton({
  label,
  onClick,
}: CalendarExpandButtonProps) {
  return (
    <div
      className="
        w-full
        lg:max-w-[1100px]
      "
    >
      <button
        type="button"
        onClick={onClick}
        className="
          group
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-[#2B4A40]/12
          bg-[#FFFAF1]
          px-5
          py-3
          text-sm
          font-medium
          tracking-[-0.01em]
          text-[#2B4A40]
          shadow-[0_14px_40px_-28px_rgba(20,25,22,0.32)]
          transition-all
          duration-300
          hover:border-[#2B4A40]
          hover:bg-[#2B4A40]
          hover:text-[#FFFAF1]
          md:px-6
          md:py-4
          md:text-base
        "
      >
        <span>
          {label.replace(" ↓", "")}
        </span>

        <span
          className="
            transition-transform
            duration-300
            group-hover:translate-y-0.5
          "
        >
          ↓
        </span>
      </button>
    </div>
  );
}