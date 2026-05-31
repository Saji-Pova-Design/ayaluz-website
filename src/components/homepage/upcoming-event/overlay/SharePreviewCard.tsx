"use client";

type SharePreviewCardProps = {
  title: string;
  description: string;
};

export default function SharePreviewCard({
  title,
  description,
}: SharePreviewCardProps) {
  return (
    <div className="rounded-[28px] border border-[#E5E5E5] bg-white p-8">
      <h3 className="text-[32px] font-medium text-[#111111]">
        {title}
      </h3>

      <p className="mt-4 text-[22px] leading-[1.4] text-[#555555]">
        {description}
      </p>
    </div>
  );
}