import ImagePlaceholder from "@/Components/ui/ImagePlaceholder"; // Sesuaikan jalur komponen Anda

const ARCH_CLIP_PATH =
  "polygon(16% 88.5%, 16% 41.7%, 21.75% 33.3%, 24.5% 26.7%, 35.75% 20%, 46.5% 15%, 50% 10.83%, 53.25% 15%, 64% 20%, 75.25% 26.7%, 77.75% 33.3%, 83.5% 41.7%, 83.5% 88.5%)";

export default function PhotoFrame({ src, alt, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="relative h-full w-full"
        style={{ clipPath: ARCH_CLIP_PATH }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <ImagePlaceholder label={`Foto — ${alt}`} className="h-full w-full" />
        )}
      </div>

      <img
        src="/images/journey/frame-arch.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          WebkitMaskImage: "url(/images/journey/frame-arch.svg)",
          maskImage: "url(/images/journey/frame-arch.svg)",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />
    </div>
  );
}