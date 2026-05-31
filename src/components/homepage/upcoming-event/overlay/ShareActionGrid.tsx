"use client";

type ShareActionGridProps = {
  onClose: () => void;
};

export default function ShareActionGrid({
  onClose,
}: ShareActionGridProps) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4">
      <button className="h-[72px] rounded-[20px] bg-[#28543B] text-[22px] font-medium text-white">
        Copy Link
      </button>

      <button
        onClick={onClose}
        className="h-[72px] rounded-[20px] border border-[#DADADA] bg-white text-[22px] font-medium text-[#111111]"
      >
        Cancel
      </button>
    </div>
  );
}