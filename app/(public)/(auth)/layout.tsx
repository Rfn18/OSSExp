import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex font-sans">
      {/* ── Left Branding Panel ── */}
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden bg-gradient-to-br from-[#0f1e4d] via-[#1e3a8a] to-[#2b4fc0] flex-col justify-between p-12 xl:p-16">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />

        <div className="relative flex items-center gap-2.5">
          <img src="/images/logo.svg" alt="OSS67" width="36" height="36" />
          <p className={`${outfit.className} font-bold text-xl text-white`}>
            OSS67
          </p>
        </div>

        <div className="relative flex flex-col gap-6 max-w-sm">
          <h1
            className={`${outfit.className} text-3xl xl:text-4xl font-bold text-white leading-tight`}
          >
            Satu akun, akses{" "}
            <span className="relative inline-block">
              <span className="absolute bottom-1.5 left-0 -z-10 h-3 w-full -rotate-1 bg-yellow-400/80 rounded" />
              semua event
            </span>{" "}
            OSIS.
          </h1>
          <p className="text-sm xl:text-base text-blue-100/80 leading-relaxed">
            Ikuti, dokumentasikan, dan pantau seluruh kegiatan SMK Bhakti Wiyata
            & TI Pelita Nusantara dari satu tempat.
          </p>
        </div>

        <div className="relative flex items-center gap-8 text-blue-100/70 text-xs">
          <span>© 2024 OSS67</span>
          <span className="h-3 w-px bg-white/20" />
          <span>Sekbid IPTEK OSS67</span>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-12 bg-white relative">
        {/* Mobile brand header */}
        <div className="lg:hidden flex items-center gap-2 absolute top-6 left-6">
          <img src="/images/logo.svg" alt="OSS67" width="28" height="28" />
          <p className={`${outfit.className} font-bold text-lg text-[#1e3a8a]`}>
            OSS67
          </p>
        </div>

        <div className="w-full max-w-sm mt-12 lg:mt-0">{children}</div>
      </div>
    </div>
  );
}
