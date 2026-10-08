import { LinkButton } from "@/Components/ui/Button"; // Sesuaikan jalur/kapitalisasi komponen Anda
import PhotoFrame from "./PhotoFrame";

export default function JourneyCard({ step }) {
  const alignRight = step.side === "right";

  return (
    <div
      className={`relative z-10 flex max-w-md flex-col gap-4 sm:items-start sm:gap-5 ${
        alignRight ? "sm:flex-row" : "sm:ml-auto sm:flex-row-reverse"
      }`}
    >
      <PhotoFrame
        src={step.photo}
        alt={step.name}
        className="aspect-[2/3] w-28 shrink-0 sm:w-36"
      />

      <div className="flex flex-col">
        <span className="inline-block w-max rounded-full border border-[#D4AF37]/70 bg-[#FBF6EA] px-3 py-1 text-xs font-semibold tracking-wide text-[#A87C2C]">
          Langkah {step.order}
        </span>
        <h3 className="mt-2 text-2xl font-bold text-[#102380] md:text-3xl">
          {step.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-[#102380]/60">
          {step.ageRange}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#102380]/75 md:text-base">
          {step.description}
        </p>
        <div className="mt-4">
          <LinkButton href={step.ctaHref} size="sm">
            {step.ctaLabel} →
          </LinkButton>
        </div>
      </div>
    </div>
  );
}