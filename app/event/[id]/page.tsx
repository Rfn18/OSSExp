"use client";

import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { Dot, MoveLeft, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EventDetail({
  params,
}: {
  params: Promise<{ id: string }>;
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
  }) => {
    return (
      <div className="flex items-center gap-4 mb-4 mt-8">
        <div className="flex items-center justify-center rounded-full self-start mt-1">
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold">{title}</p>
          <p className="text-sm opacity-50">{description}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full h-full">
      <div className="max-w-full px-20 rounded-xl bg-background">
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src="https://picsum.photos/seed/mpls/1440/660"
            alt="MPLS 2025"
            className="w-full object-cover"
            style={{ aspectRatio: "16/7" }}
          />

          <p className="absolute top-8 right-10 z-100 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center px-4 py-2 text-white text-sm font-medium rounded-full bg-white/2.5 border border-white/50 backdrop-blur-sm  hover:bg-white/30 transition-all duration-300 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none transition antialiased">
            <Dot /> Ongoing
          </p>
          <div
            className="absolute inset-0 bg-gradient-to-t
      from-black/80 via-black/40 to-transparent"
          />
          <div className="absolute bottom-0 left-0 right-0 px-10 pb-8">
            <h3
              onClick={() => router.back()}
              className="flex items-center gap-2 mb-2 text-white/80 cursor-pointer"
            >
              <MoveLeft size={24} strokeWidth={3} />
              Kembali
            </h3>
            <h1 className="text-4xl m-0 font-bold text-white leading-tight tracking-tight">
              MPLS 2025
            </h1>
          </div>
        </div>
        <div className="mt-8 flex justify-between gap-12 items-start">
          <div>
            <div className="flex flex-col gap-4 mb-4">
              <h3 className="font-bold text-2xl">Deskripsi</h3>
              <p className=" text-muted-foreground leading-relaxed">
                Masa Pengenalan Lingkungan sekolah menghadirkan pengalaman seru,
                mengenalkan lingkungan sekolah, membangun kebersamaan,
                menumbuhkan disiplin, serta menginspirasi siswa baru untuk
                beradaptasi, berkembang, dan memulai perjalanan pendidikan
                dengan semangat percaya diri yang kuat positif{" "}
              </p>
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-2xl">Dokuemntasi</h3>
                <p className="text-sm text-muted-foreground inline-flex items-center gap-1 cursor-pointer">
                  Galery Foto <MoveRight />
                </p>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <img
                  src="https://picsum.photos/seed/mpls/400/400"
                  alt="MPLS 2025"
                  className="w-full h-full object-cover rounded-lg"
                />
                <img
                  src="https://picsum.photos/seed/mpls/400/400"
                  alt="MPLS 2025"
                  className="w-full h-full object-cover rounded-lg"
                />
                <img
                  src="https://picsum.photos/seed/mpls/400/400"
                  alt="MPLS 2025"
                  className="w-full h-full object-cover rounded-lg"
                />
                {/* Mengubah col-span-2 menjadi ukuran normal */}
                <img
                  src="https://picsum.photos/seed/mpls/400/190"
                  alt="MPLS 2025"
                  className="w-full object-cover rounded-lg col-span-1 lg:col-span-2 "
                />
                <img
                  src="https://picsum.photos/seed/mpls/400/400"
                  alt="MPLS 2025"
                  className="w-full  object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="sticky z-10 top-30 max-w-xl w-full">
            <div className=" border rounded-lg p-6 bg-background/50 backdrop-blur-sm h-max ">
              <h3 className="font-bold text-2xl mb-4">Detail Event</h3>
              <div>
                <ItemCard
                  icon={<FontAwesomeIcon icon={faCalendar} size="xl" />}
                  title="Tanggal"
                  description="10 Agustus 2025"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full h-10 text-lg font-bold text-white mt-4 gap-2 rounded-lg
             bg-drive-gradient bg-[length:200%_auto] bg-left
             hover:bg-right hover:text-white/90 hover:cursor-pointer
             transition-[background-position] duration-500 ease-out"
            >
              <FontAwesomeIcon icon={faGoogleDrive} />
              Google Drive
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
