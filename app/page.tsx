import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardEvent } from "@/components/card-event";

/* ── Reusable divider ── */
function Divider() {
  return (
    <div className="flex items-center gap-3 w-full my-2">
      <div className="flex-1 h-px bg-border" />
      <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

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
    <div className="group relative flex gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-sm sm:p-6">
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ring-1 ring-inset transition-transform duration-300 group-hover:scale-110 ${accentMap[accent]}`}
      >
        {icon}
      </div>
      <div className="flex-1 space-y-1.5">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

const IconVisi = (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
    <path
      d="M12 4.5C7 4.5 2.7 8 1 12c1.7 4 6 7.5 11 7.5s9.3-3.5 11-7.5c-1.7-4-6-7.5-11-7.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconMisi1 = (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
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
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
    <path
      d="M12 2 3 7l9 5 9-5-9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

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
    <div className="w-full font-sans dark:bg-black">
      <section className="min-h-full flex flex-col md:flex-row items-center justify-between gap-10 px-6 sm:px-12 md:px-20 py-16 md:py-0">
        <div className="flex flex-col gap-7 max-w-xl w-full">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Mudah lihat dan cari{" "}
            <span className="relative inline-block">
              <span className="absolute bottom-1.5 left-0 -z-10 h-3 w-full -rotate-1 bg-yellow-400/80 rounded" />
              dokumentasi
            </span>{" "}
            event OSIS
          </h1>

          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
            Cari dokumentasi terbaru dan terbaik dari event organisasi kami,
            kepoin kami juga. Don't Forget To Reminds.
          </p>

          <div className="flex items-center gap-4">
            <Button className="bg-gradient text-lg text-white font-bold flex items-center gap-2 rounded-full px-6 h-12">
              Explore Event <MoveRight size={24} strokeWidth={3} />
            </Button>
            <Button className="text-lg bg-transparent text-foreground border border-foreground font-bold flex items-center gap-2 rounded-full px-6 h-12 ml-4">
              Tentang OSIS
            </Button>
          </div>
        </div>
        <div className="relative w-full max-w-lg">
          <img
            src="https://picsum.photos/seed/picsum/530/300"
            alt="Hero Image"
            className="relative w-full max-w-md mt-8 rounded-3xl z-1 shadow-lg ml-6 -rotate-6"
          />
          <img
            src="https://picsum.photos/seed/picsum/530/300"
            alt="Hero Image"
            className="relative w-full max-w-md rounded-3xl z-10 shadow-lg mt-0"
          />
        </div>
      </section>

      <div className="w-full min-h-screen flex flex-1 items-center justify-between font-sans dark:bg-black px-20 mt-10">
        <div className="flex flex-col gap-8 max-w-xl">
          <p className="font-light text-primary-blue">SEKILAS TENTANG OSIS</p>
          <h1 className="text-4xl font-bold leading-tight">
            OSS67, Terampil Mandiri <br />
            <span className="relative inline-block">
              <span className="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1  bg-yellow-400"></span>
              Bersahaja
            </span>
          </h1>
          <p className="text-base font-normal leading-relaxed max-w-prose">
            Organisasi Siswa Intra Sekolah (OSIS) adalah wadah resmi bagi siswa
            untuk berorganisasi, berkreasi, dan menyelenggarakan kegiatan yang
            memperkaya pengalaman belajar di sekolah. seluruh program kerja OSIS
            menjadi lebih transparan dan mudah diikuti.
          </p>
          <div className="flex items-center gap-12">
            <div>
              <h3 className="text-3xl font-bold text-gradient">8</h3>
              <p className="opacity-50">Seksi Bidang</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gradient">30</h3>
              <p className="opacity-50">Pengurus</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gradient">2020</h3>
              <p className="opacity-50">Tahun Berdiri</p>
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-xl flex flex-col gap-4">
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
              Dokumentasi
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">Event Highlight</h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary-blue hover:gap-3 transition-all duration-200"
          >
            Lihat Semua <MoveRight size={16} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((e, i) => (
            <CardEvent key={i} {...e} />
          ))}
        </div>
      </section>

      {/* ── PESAN KETUA ── */}
      <section className="px-6 sm:px-12 md:px-20 py-12 pb-20">
        <div className="w-full flex flex-col items-center justify-center bg-[#F1F2F3] dark:bg-zinc-900 rounded-3xl p-8 sm:p-12 gap-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Pesan Ketua OSIS
            </span>
            <div className="ring-2 ring-primary-blue/20 rounded-full p-0.5">
              <img
                src="https://avatar.vercel.sh/shadcn1"
                alt="Ketua OSIS"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
          </div>

          <blockquote className="text-base sm:text-lg font-medium text-foreground/80 max-w-xl leading-relaxed italic">
            "Saya berharap OSIS Bhakti Wiyata &amp; TI Pelita Nusantara dapat
            mengerjakan seluruh visi misi dari OSIS yang sudah dibuat di awal
            dengan efisien dan objektif."
          </blockquote>

          <div>
            <p className="font-bold text-base">Fasterino Rafael V.</p>
            <p className="text-sm text-muted-foreground">
              Ketua OSIS Periode 2025–2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
