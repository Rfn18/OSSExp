"use client";

import DocGrid from "@/components/doc-grid";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EventDocumentation({
  params,
}: {
  params: Promise<{ sluq: string }>;
}) {
  const router = useRouter();
  return (
    <div className="w-full px-4 md:px-8 lg:px-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-8">
        <div>
          <div
            onClick={() => router.back()}
            className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          >
            <MoveLeft size={20} />
            <p>Kembali</p>
          </div>

          <h1 className="text-3xl font-bold mt-2">Dokumentasi Galeri</h1>
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            <span className="relative inline-block">
              <span className="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1 bg-yellow-400"></span>
              MPLS 2025
            </span>
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-8">
        <DocGrid />
        <DocGrid />
        <DocGrid />
      </div>
    </div>
  );
}
