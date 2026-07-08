"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Clock,
  ArrowRight,
  ImageOff,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/admin/dashboardHeder";

// --- Types ---
type DocPhoto = {
  id: string;
  url: string;
};

type DocGroup = {
  id: string;
  title: string;
  dateRange: string;
  photos: DocPhoto[];
};

export default function DocGalleriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("2026");
  const [categoryFilter, setCategoryFilter] = useState("Kategori");
  const [uploaderFilter, setUploaderFilter] = useState("Uploader");

  // Mock Data
  const docGroups: DocGroup[] = [
    {
      id: "g1",
      title: "MPLS 2025",
      dateRange: "17 - 21 Februari 2025",
      photos: [
        { id: "p1", url: "https://picsum.photos/seed/mpls1/400/400" },
        { id: "p2", url: "https://picsum.photos/seed/mpls2/400/400" },
        { id: "p3", url: "https://picsum.photos/seed/mpls3/400/400" },
        { id: "p4", url: "https://picsum.photos/seed/mpls4/400/400" },
        { id: "p5", url: "https://picsum.photos/seed/mpls5/400/400" },
        { id: "p6", url: "https://picsum.photos/seed/mpls6/400/400" },
        { id: "p7", url: "https://picsum.photos/seed/mpls7/400/400" },
      ],
    },
    {
      id: "g2",
      title: "Pondok Ramadhan 2026",
      dateRange: "17 - 21 April 2026",
      photos: [
        { id: "p8", url: "https://picsum.photos/seed/ramadhan1/400/400" },
        { id: "p9", url: "https://picsum.photos/seed/ramadhan2/400/400" },
        { id: "p10", url: "https://picsum.photos/seed/ramadhan3/400/400" },
        { id: "p11", url: "https://picsum.photos/seed/ramadhan4/400/400" },
      ],
    },
    {
      id: "g3",
      title: "Isra' Mi'raj 2025",
      dateRange: "18 April 2025",
      photos: [
        { id: "p12", url: "https://picsum.photos/seed/isra1/400/400" },
        { id: "p13", url: "https://picsum.photos/seed/isra2/400/400" },
        { id: "p14", url: "https://picsum.photos/seed/isra3/400/400" },
        { id: "p15", url: "https://picsum.photos/seed/isra4/400/400" },
      ],
    },
  ];

  const filteredGroups = docGroups.filter((g) =>
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
          <span className="text-primary-blue">9</span> Event Ditemukan
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
        {/* Doc Groups */}
        <div className="px-6 py-6">
          {filteredGroups.length > 0 ? (
            <div className="space-y-12">
              {filteredGroups.map((group, idx) => (
                <div key={group.id}>
                  {/* Group Header */}
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
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-sm font-semibold text-[#1e3a8a] hover:text-[#172e6e] transition-colors whitespace-nowrap"
                    >
                      Lihat Semua Dokumentasi
                      <ArrowRight size={14} />
                    </a>
                  </div>

                  {/* Photo Grid */}
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

                  {/* Divider between groups (not after last) */}
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
                Tidak ada dokumentasi yang ditemukan
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Filter Pill Dropdown (visual only, wire up real dropdown logic as needed) ---
function FilterPill({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
    >
      {label}
      <ChevronDown size={14} className="text-gray-400" />
    </button>
  );
}
