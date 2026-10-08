export default function ActivityCardItem({ card }) {
  return (
    <div className="relative h-56 overflow-hidden rounded-2xl shadow-md transition-transform duration-300 ease-out hover:z-20 hover:scale-105 hover:shadow-xl">
      <img
        src={card.image}
        alt={card.title}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#102380] via-[#102380]/85 to-transparent px-4 pb-4 pt-10">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white p-2 shadow-md">
            <img
              src={card.icon}
              alt=""
              className="h-full w-full object-contain"
            />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-white">{card.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-white/70">
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}