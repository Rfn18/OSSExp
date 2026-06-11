"use client";

import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { MoveLeft, MoveRight, Radio } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();

  const ItemCard = ({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <div className="flex items-start gap-4 py-4 border-b border-border last:border-0">
      <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-foreground/70">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <p className="text-sm font-medium text-foreground">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-background font-sans">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pb-16">
        {/* ── HERO IMAGE ── */}
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src="https://picsum.photos/seed/mpls/1440/660"
            alt="MPLS 2025"
            className="w-full object-cover"
            style={{ aspectRatio: "16/7" }}
          />

          {/* Status badge */}
          <span className="absolute top-5 right-5 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/30 bg-white/10 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Ongoing
          </span>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

          {/* Bottom overlay: back + title */}
          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-8 pt-16">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 mb-3 text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 group"
            >
              <MoveLeft
                size={18}
                strokeWidth={2.5}
                className="group-hover:-translate-x-0.5 transition-transform duration-200"
              />
              Kembali
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
              MPLS 2025
            </h1>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
          {/* ── LEFT: main content ── */}
          <div className="flex-1 min-w-0">
            {/* Deskripsi */}
            <section className="mb-8">
              <h2 className="font-bold text-xl text-foreground mb-3">
                Deskripsi
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Masa Pengenalan Lingkungan sekolah menghadirkan pengalaman seru,
                mengenalkan lingkungan sekolah, membangun kebersamaan,
                menumbuhkan disiplin, serta menginspirasi siswa baru untuk
                beradaptasi, berkembang, dan memulai perjalanan pendidikan
                dengan semangat percaya diri yang kuat dan positif.
              </p>
            </section>

            {/* Dokumentasi */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-xl text-foreground">
                  Dokumentasi
                </h2>
                <a
                  href="#"
                  className="flex items-center gap-1.5 text-sm font-semibold text-primary-blue hover:gap-3 transition-all duration-200"
                >
                  Galeri Foto <MoveRight size={14} />
                </a>
              </div>

              {/* Photo grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <img
                  src="https://picsum.photos/seed/mpls1/400/400"
                  alt="Dokumentasi MPLS"
                  className="w-full aspect-square object-cover rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                />
                <img
                  src="https://picsum.photos/seed/mpls2/400/400"
                  alt="Dokumentasi MPLS"
                  className="w-full aspect-square object-cover rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                />
                <img
                  src="https://picsum.photos/seed/mpls3/400/400"
                  alt="Dokumentasi MPLS"
                  className="w-full aspect-square object-cover rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                />
                <img
                  src="https://picsum.photos/seed/mpls4/800/400"
                  alt="Dokumentasi MPLS"
                  className="w-full aspect-video object-cover rounded-xl col-span-2 hover:opacity-90 transition-opacity cursor-pointer"
                />
                <img
                  src="https://picsum.photos/seed/mpls5/400/400"
                  alt="Dokumentasi MPLS"
                  className="w-full aspect-square object-cover rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                />
              </div>
            </section>
          </div>

          {/* ── RIGHT: sidebar ── */}
          <div className="sticky top-24 w-full lg:w-72 flex-shrink-0">
            {/* Detail card */}
            <div className="rounded-2xl border border-border bg-background/80 backdrop-blur-sm shadow-sm p-5">
              <h3 className="font-bold text-base text-foreground mb-1">
                Detail Event
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                Informasi lengkap kegiatan
              </p>
              <div className="mt-3">
                <ItemCard
                  icon={<FontAwesomeIcon icon={faCalendar} />}
                  title="Tanggal"
                  description="10 Agustus 2025"
                />
              </div>
            </div>

            {/* Google Drive button */}
            <Button
              variant="ghost"
              className="w-full h-11 font-bold text-white mt-3 gap-2 rounded-xl
                bg-drive-gradient bg-[length:200%_auto] bg-left
                hover:bg-right hover:text-white/90
                transition-[background-position] duration-500 ease-out
                shadow-sm hover:shadow-md"
            >
              <FontAwesomeIcon icon={faGoogleDrive} />
              Buka Google Drive
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
