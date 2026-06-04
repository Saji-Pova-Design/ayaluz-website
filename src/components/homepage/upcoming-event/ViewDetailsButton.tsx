type ViewDetailsButtonProps = {
  onClick: () => void;
};

export function ViewDetailsButton({ onClick }: ViewDetailsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-[#111111] transition-all duration-300 hover:opacity-70 lg:gap-2 lg:text-[16px]"
    >
      <span className="border-b border-transparent transition-all duration-300 group-hover:border-[#111111]">
        View details
      </span>

      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}