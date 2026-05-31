type ViewDetailsButtonProps = {
  onClick: () => void;
};

export function ViewDetailsButton({ onClick }: ViewDetailsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 inline-flex w-fit items-center gap-1 self-start font-sans-minimal text-[14px] tracking-[0.03em] text-[#2B4A40] underline-offset-4 transition-[color,opacity] duration-300 hover:text-[#1F3A32] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B4A40]/40 lg:mt-2 lg:text-[16px]"
    >
      <span>View Details</span>
      <span aria-hidden className="opacity-80">
        →
      </span>
    </button>
  );
}
