import Image from "next/image";

type SectionImageProps = {
  src: string;
  alt: string;
  ratio?: "landscape" | "portrait";
  priority?: boolean;
};

export function SectionImage({
  src,
  alt,
  ratio = "landscape",
  priority = false,
}: SectionImageProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] bg-[#E7E2D8]
        ${
          ratio === "landscape"
            ? "aspect-[16/9] w-full"
            : "aspect-[4/5] w-full"
        }
      `}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}