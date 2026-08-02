"use client";

import React, { useState } from "react";
import {
  Search,
  Clock,
  ArrowRight,
  ImageOff,
  ImagePlus,
  SlidersHorizontal,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/admin/dashboardHeader";
import useSWR from "swr";
import api from "@/app/services/api";
import { useRouter } from "next/navigation";

// --- Types ---
type DocPhoto = {
  id: string | number;
  url: string;
};

type DocGroup = {
  id: string | number;
  slug?: string;
  title: string;
  dateRange: string;
  photos: DocPhoto[];
};

// --- Helpers ---
const BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function formatDateIndo(value?: string | null) {
  if (!value) return "-";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "-";
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDateRange(start?: string | null, end?: string | null) {
  if (!start || !end) return "-";
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "-";

  const sameDay = startDate.toDateString() === endDate.toDateString();
  if (sameDay) return formatDateIndo(start);

  const sameMonth =
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear();

  if (sameMonth) {
    return `${startDate.getDate()}–${endDate.getDate()} ${BULAN[startDate.getMonth()]} ${startDate.getFullYear()}`;
  }

  return `${formatDateIndo(start)} – ${formatDateIndo(end)}`;
}

// Normalisasi bentuk response paginate Laravel: {data: {data: [...]}}
function extractList(raw: any) {
  return raw?.data?.data ?? raw?.data ?? raw ?? [];
}

// Ambil semua event, lalu untuk tiap event ambil dokumentasi top-by-category-nya
const fetchDocGroups = async (): Promise<DocGroup[]> => {
  const eventsRes = await api.get("/events");
  const events = extractList(eventsRes.data);

  const groups = await Promise.all(
    events.map(async (event: any) => {
      const docsRes = await api.get("/documentations/top-by-category", {
        params: { event_id: event.id },
      });

      const docs = docsRes.data?.data ?? [];

      return {
        id: event.id,
        slug: event.slug,
        title: event.title,
        dateRange: formatDateRange(event.start_date, event.end_date),
        photos: docs.map((doc: any) => ({ id: doc.id, url: doc.url })),
      };
    }),
  );

  return groups;
};

export default function DocGalleriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const {
    data: docGroups,
    isLoading,
    error,
  } = useSWR("events-with-top-docs", fetchDocGroups);

  const filteredGroups = (docGroups ?? []).filter((g) =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-auto h-auto min-h-full font-sans text-gray-900 pb-12">
      <DashboardHeader
        title="documentations"
        description="List dokumetasi event di SMK Bhakti Wiyata"
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 p-4 rounded-2xl border border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground flex-shrink-0 flex items-center gap-1.5">
          <SlidersHorizontal size={14} className="text-muted-foreground" />
          <span className="text-primary-blue">
            {filteredGroups.length}
          </span>{" "}
          Event Ditemukan
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="w-full sm:w-auto">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama event..."
                className="pl-9 h-10 text-sm rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="px-6 py-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm text-gray-400">Memuat data event…</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm text-red-500">Gagal memuat data event.</p>
            </div>
          ) : filteredGroups.length > 0 ? (
            <div className="space-y-12">
              {filteredGroups.map((group, idx) => (
                <div key={group.id}>
                  {/* Group Header — SELALU tampil, apapun status dokumentasinya */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {group.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                        <Clock size={12} />
                        {group.dateRange}
                      </div>
                    </div>

                    {group.photos.length > 0 && (
                      <a
                        href={`/admin/documentation/${group.slug ?? group.id}`}
                        className="flex items-center gap-1.5 text-sm font-semibold text-[#1e3a8a] hover:text-[#172e6e] transition-colors whitespace-nowrap"
                      >
                        Lihat Semua Dokumentasi
                        <ArrowRight size={14} />
                      </a>
                    )}
                  </div>

                  {/* Kalau ada dokumentasi -> grid foto. Kalau belum -> validasi + tombol tambah */}
                  {group.photos.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {group.photos.slice(0, 8).map((photo) => (
                        <div
                          key={photo.id}
                          className="aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 group cursor-pointer"
                        >
                          <img
                            src={photo.url}
                            alt={group.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                        <ImageOff className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-semibold text-foreground mb-1">
                        Belum ada dokumentasi untuk event ini
                      </p>
                      <Button
                        onClick={() =>
                          router.push(`/admin/documentation/${group.slug}`)
                        }
                        className="gap-2 bg-gradient hover:bg-gradient-hover transition-all duration-300 ease-out cursor-pointer"
                      > 
                        <Plus size={14} />
                        Buat Dokumentasi
                      </Button>
                    </div>
                  )}

                  {idx < filteredGroups.length - 1 && (
                    <hr className="border-gray-100 mt-12" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <ImageOff className="w-8 h-8 text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">
                Tidak ada event yang ditemukan
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
