// Satu canvas background menerus untuk SELURUH Section 4 (heading, path,
// footer sekaligus) — bukan background terpisah per zona. Base-nya CSS
// gradient yang otomatis merentang ke tinggi section berapa pun.
export default function JourneyBackground({ sunLayerRef }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FBF6EA 0%, #F4EEDC 12%, #FBF6EA 45%, #FBF6EA 70%, #FCEFD2 90%, #FBDFA8 100%)",
      }}
    >
      {/* Zona 1 (heading) — langit+bukit+matahari di belakang, arsitektur di depannya */}
      <div
        className="absolute inset-x-0 top-0 h-[560px] md:h-[720px]"
        style={{
          WebkitMaskImage: "linear-gradient(180deg, black 55%, transparent 100%)",
          maskImage: "linear-gradient(180deg, black 55%, transparent 100%)",
        }}
      >
        <img
          src="/images/journey/heading-bg-bawah.png"
          alt=""
          className="h-full w-full object-cover object-bottom"
        />
      </div>

      <div
        className="absolute right-0 top-0 hidden h-[560px] w-2/3 sm:block md:h-[720px] lg:w-1/2"
        style={{
          WebkitMaskImage: "linear-gradient(180deg, black 55%, transparent 100%)",
          maskImage: "linear-gradient(180deg, black 55%, transparent 100%)",
        }}
      >
        <img
          src="/images/journey/heading-bg-atas.png"
          alt=""
          className="h-full w-full object-contain object-right-bottom"
        />
      </div>

      {/* Zona 3 (footer) — bukit → masjid → matahari+karakter → tanaman */}
      <div
        ref={sunLayerRef}
        className="absolute inset-x-0 bottom-0 h-[620px] md:h-[760px]"
      >
        <div
          className="absolute inset-x-0 bottom-0 h-[440px] md:h-[560px]"
          style={{
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 30%)",
            maskImage: "linear-gradient(180deg, transparent 0%, black 30%)",
          }}
        >
          <img
            src="/images/journey/footer-bg-layer1-bukit.png"
            alt=""
            className="h-full w-full object-contain object-bottom"
          />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-[400px] md:h-[500px]"
          style={{
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 30%)",
            maskImage: "linear-gradient(180deg, transparent 0%, black 30%)",
          }}
        >
          <img
            src="/images/journey/footer-bg-layer2-masjid.png"
            alt=""
            className="h-full w-full object-contain object-bottom"
          />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-[420px] md:h-[520px]"
          style={{
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 25%)",
            maskImage: "linear-gradient(180deg, transparent 0%, black 25%)",
          }}
        >
          <img
            src="/images/journey/footer-bg-layer3-matahari-karakter.png"
            alt=""
            className="h-full w-full object-contain object-bottom"
          />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-56 md:h-80"
          style={{
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 20%)",
            maskImage: "linear-gradient(180deg, transparent 0%, black 20%)",
          }}
        >
          <img
            src="/images/journey/footer-bg-layer4-tanaman.png"
            alt=""
            className="h-full w-full object-cover object-bottom"
          />
        </div>
      </div>
    </div>
  );
}