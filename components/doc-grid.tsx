import { Images } from "lucide-react";

// Unique seeds so images look different
const photos = [
  { seed: "mpls1", w: 400, h: 400, span: "" },
  { seed: "mpls2", w: 400, h: 400, span: "" },
  { seed: "mpls3", w: 400, h: 400, span: "" },
  { seed: "mpls4", w: 400, h: 400, span: "" },
  { seed: "mpls5", w: 800, h: 400, span: "col-span-2" },
  { seed: "mpls6", w: 400, h: 400, span: "" },
  { seed: "mpls7", w: 400, h: 400, span: "" },
];

export default function DocGrid() {
  return (
    <div className="w-full mt-10">
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Images size={16} className="text-primary-blue" />
            <h4 className="font-bold text-lg text-foreground">
              Apel Pembukaan
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Pembukaan resmi kegiatan
          </p>
        </div>
        <span className="text-xs font-semibold text-muted-foreground bg-muted rounded-full px-3 py-1 self-start">
          {photos.length} foto
        </span>
      </div>

      {/* ── Photo Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map(({ seed, w, h, span }) => (
          <div
            key={seed}
            className={`group relative overflow-hidden rounded-xl bg-muted cursor-pointer ${span}`}
          >
            <img
              src={`https://picsum.photos/seed/${seed}/${w}/${h}`}
              alt={`Dokumentasi ${seed}`}
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                h === 400 ? "aspect-square" : "aspect-video"
              }`}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
