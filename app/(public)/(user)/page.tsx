import { MoveRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardEvent } from "@/components/card-event";

function InfoCard({
  icon,
  title,
  description,
  accent = "blue",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: "blue" | "orange";
}) {
  const accentMap = {
    blue: "bg-blue-500/10 text-blue-600 ring-blue-500/20",
    orange: "bg-orange-500/10 text-orange-600 ring-orange-500/20",
  } as const;
 
  return (
    <div className="group relative flex gap-4 rounded-2xl border border-border/60 bg-card p-4 sm:p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-sm">
      <div
        className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset transition-transform duration-300 group-hover:scale-110 ${accentMap[accent]}`}
      >
        {icon}
      </div>
      <div className="flex-1 space-y-1 sm:space-y-1.5 min-w-0">
        <h3 className="text-sm sm:text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

// Icon
const IconVisi = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5 sm:h-6 sm:w-6"
    aria-hidden
  >
    <path
      d="M12 4.5C7 4.5 2.7 8 1 12c1.7 4 6 7.5 11 7.5s9.3-3.5 11-7.5c-1.7-4-6-7.5-11-7.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconMisi1 = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5 sm:h-6 sm:w-6"
    aria-hidden
  >
    <path
      d="m4 12 5 5L20 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconMisi2 = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5 sm:h-6 sm:w-6"
    aria-hidden
  >
    <path
      d="M12 2 3 7l9 5 9-5-9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

// Dummy Data
const events = Array(6).fill({
  status: "ongoing" as const,
  imgSrc: "https://picsum.photos/seed/event/530/300",
  date: "18 April 2025",
  category: "Olahraga",
  title: "PHBN 2025",
  description:
    "Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara",
  link: "https://example.com/event1",
});

export default function Home() {
  return (
    <>
      <div className="w-full font-sans dark:bg-black overflow-x-hidden">
        <section className="min-h-full flex flex-col md:flex-row items-center justify-between gap-10 px-6 sm:px-12 md:px-20 py-16 md:py-0">
          <div className="flex flex-col gap-6 sm:gap-7 max-w-xl w-full text-center md:text-left items-center md:items-start">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Mudah lihat dan cari{" "}
              <span className="relative inline-block">
                <span className="absolute bottom-1.5 left-0 -z-10 h-3 w-full -rotate-1 bg-yellow-400/80 rounded" />
                dokumentasi
              </span>{" "}
              event OSIS
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
              Cari dokumentasi terbaru dan terbaik dari event organisasi kami,
              kepoin kami juga. Don't Forget To Reminds.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
              <Button className="bg-gradient text-base sm:text-lg text-white font-bold flex items-center gap-2 rounded-full px-5 sm:px-6 h-11 sm:h-12">
                Explore Event{" "}
                <MoveRight
                  size={20}
                  strokeWidth={3}
                  className="sm:w-6 sm:h-6"
                />
              </Button>
              <Button className="text-base sm:text-lg bg-transparent text-foreground border border-foreground font-bold flex items-center gap-2 rounded-full px-5 sm:px-6 h-11 sm:h-12">
                Tentang OSIS
              </Button>
            </div>
          </div>
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg mt-4 md:mt-0">
            <img
              src="https://picsum.photos/seed/picsum/530/300"
              alt="Hero Image"
              className="relative w-full max-w-[85%] sm:max-w-md mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl z-1 shadow-lg ml-auto sm:ml-6 -rotate-6"
            />
            <img
              src="https://picsum.photos/seed/picsum/530/300"
              alt="Hero Image"
              className="relative w-full max-w-[85%] sm:max-w-md rounded-2xl sm:rounded-3xl z-10 shadow-lg mt-0 mx-auto sm:mx-0"
            />
          </div>
        </section>

        {/* ── TENTANG OSIS ── */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 font-sans dark:bg-black px-6 sm:px-12 md:px-20 py-16 lg:py-10 lg:min-h-screen">
          <div className="flex flex-col gap-6 sm:gap-8 max-w-xl w-full text-center lg:text-left items-center lg:items-start">
            <p className="font-light text-primary-blue text-sm sm:text-base">
              SEKILAS TENTANG OSIS
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              OSS67, Terampil Mandiri <br />
              <span className="relative inline-block">
                <span className="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1 bg-yellow-400" />
                Bersahaja
              </span>
            </h1>
            <p className="text-sm sm:text-base font-normal leading-relaxed max-w-prose">
              Organisasi Siswa Intra Sekolah (OSIS) adalah wadah resmi bagi
              siswa untuk berorganisasi, berkreasi, dan menyelenggarakan
              kegiatan yang memperkaya pengalaman belajar di sekolah. seluruh
              program kerja OSIS menjadi lebih transparan dan mudah diikuti.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-10 md:gap-12">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-gradient">
                  8
                </h3>
                <p className="opacity-50 text-sm sm:text-base">Seksi Bidang</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-gradient">
                  30
                </h3>
                <p className="opacity-50 text-sm sm:text-base">Pengurus</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-gradient">
                  2020
                </h3>
                <p className="opacity-50 text-sm sm:text-base">Tahun Berdiri</p>
              </div>
            </div>
          </div>
          <div className="relative w-full max-w-xl flex flex-col gap-3 sm:gap-4">
            <InfoCard
              icon={IconVisi}
              title="Visi Organisasi"
              description="Mewujudkan OSIS sebagai organisasi yang aktif, disiplin, dan adaptif terhadap perkembangan teknologi."
              accent="blue"
            />
            <InfoCard
              icon={IconMisi1}
              title="Misi Pertama"
              description="Menggunakan teknologi yang relevan di era digital."
              accent="orange"
            />
            <InfoCard
              icon={IconMisi2}
              title="Misi Kedua"
              description="Menciptakan budaya disiplin dimulai dari pengurus OSIS itu sendiri."
              accent="blue"
            />
            <InfoCard
              icon={IconMisi2}
              title="Misi Ketiga"
              description="Membangun solidaritas dan kerja sama antara pengurus dan warga sekolah."
              accent="blue"
            />
          </div>
        </div>

        {/* ── EVENT HIGHLIGHT ── */}
        <section className="px-6 sm:px-12 md:px-20 py-16 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                Dokumentasi
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Event Highlight
              </h2>
            </div>
            <a
              href="#"
              className="flex items-center gap-1.5 text-sm font-semibold text-primary-blue hover:gap-3 transition-all duration-200 w-fit"
            >
              Lihat Semua <MoveRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((e, i) => (
              <CardEvent key={i} {...e} />
            ))}
          </div>
        </section>

        {/* ── PESAN KETUA ── */}
        <section className="px-6 sm:px-12 md:px-20 py-12 sm:py-16 pb-20">
          {/* ── Main Card ── */}
          <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-[2rem] bg-muted/50 px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20">
            {/* ── Decorative colorful elements (inside card) ── */}
            <div className="pointer-events-none absolute inset-0 z-0">
              {/* Blurred color blobs */}
              <div className="absolute -top-16 -left-10 sm:-left-6 md:left-4 h-40 w-40 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-full bg-blue-400/30 blur-2xl sm:blur-3xl" />
              <div className="absolute top-1/4 -right-14 sm:-right-8 md:right-0 h-44 w-44 sm:h-60 sm:w-60 md:h-72 md:w-72 rounded-full bg-yellow-300/30 blur-2xl sm:blur-3xl" />
              <div className="absolute -bottom-16 left-1/4 h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-full bg-orange-300/25 blur-2xl sm:blur-3xl" />
              <div className="absolute -bottom-12 right-4 sm:right-16 md:right-24 h-28 w-28 sm:h-40 sm:w-40 rounded-full bg-pink-300/25 blur-2xl sm:blur-3xl hidden sm:block" />

              {/* Geometric accents */}
              <div className="absolute top-8 right-10 sm:right-20 md:right-32 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-yellow-400 hidden sm:block" />
              <div className="absolute top-14 sm:top-20 right-20 sm:right-32 md:right-48 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-blue-500 hidden md:block" />
              <div className="absolute bottom-12 left-8 sm:left-20 md:left-32 h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-blue-500/70 rotate-12 hidden sm:block" />
              <div className="absolute bottom-20 sm:bottom-28 left-4 sm:left-14 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-orange-400 hidden md:block" />
              <div className="absolute top-1/2 left-4 sm:left-10 h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-yellow-400/50 hidden lg:block" />
              <div className="absolute top-1/3 right-4 sm:right-10 h-8 w-8 sm:h-9 sm:w-9 rounded-lg border-2 border-blue-400/40 -rotate-12 hidden lg:block" />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 text-center">
              <span className="text-xs sm:text-sm opacity-70">
                Pesan Ketua OSIS
              </span>

              <div className="relative">
                <div className="rounded-full">
                  <img
                    src="/images/FasterinoFormal.png"
                    alt="Ketua OSIS"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-yellow-400 text-[#1e3a8a] shadow-md">
                  <Quote
                    size={14}
                    className="sm:w-4 sm:h-4"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </div>
              </div>

              <blockquote className="max-w-2xl text-base sm:text-lg md:text-xl font-medium leading-relaxed text-black/90">
                "Saya berharap OSIS Bhakti Wiyata &amp; TI Pelita Nusantara
                dapat mengerjakan seluruh visi misi dari OSIS yang sudah dibuat
                di awal dengan efisien dan objektif."
              </blockquote>

              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-base sm:text-lg ">
                  Fasterino Rafael V.
                </p>
                <p className="text-xs sm:text-sm opacity-70">
                  Ketua OSIS Periode 2025–2026
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
