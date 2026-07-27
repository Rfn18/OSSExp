"use client";

import { useState } from "react";
import { CardEvent } from "@/components/card-event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Check,
  Users,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/admin/dashboardHeader";

const MOCK_USERS = [
  { id: 1, name: "Budi Santoso" },
  { id: 2, name: "Siti Aminah" },
  { id: 3, name: "Ahmad Fauzi" },
  { id: 4, name: "Dewi Lestari" },
];

export default function EventManagement() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");

  const activeFilterCount = [
    statusFilter !== "all",
    categoryFilter !== "all",
    sortFilter !== "all",
    userFilter !== "all",
    searchQuery !== "",
  ].filter(Boolean).length;

  const handleReset = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSortFilter("all");
    setUserFilter("all");
  };

  const handleApply = () => {
    setIsFilterOpen(false);
  };

  const events = Array(8).fill({
    status: "ongoing" as const,
    imgSrc: "https://picsum.photos/seed/event/530/300",
    date: "18 April 2025",
    category: "Olahraga",
    title: "PHBN 2025",
    description:
      "Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara",
    link: "https://example.com/event1",
  });

  return (
    <>
      <div
        className="flex flex-col sm:flex-row sm:items-center
      justify-between gap-1 mb-7 w-full"
      >
        <DashboardHeader
          title="Event Management"
          description="Menu event management"
        />
        <div className="w-full flex flex-col justify-end sm:items-end">
          <Button
            onClick={() => router.push("/admin/event/create")}
            className="w-full sm:w-auto bg-gradient font-semibold text-white hover:opacity-90 transition cursor-pointer"
          >
            <Plus size={16} />
            Create Event
          </Button>
        </div>
      </div>
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

          <Button
            onClick={() => setIsFilterOpen(true)}
            variant="outline"
            className="relative h-9 px-4 rounded-xl gap-2 border-border hover:bg-muted/50 w-full sm:w-auto"
          >
            <SlidersHorizontal size={14} className="text-primary-blue" />
            <span className="font-medium text-sm">Filter</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-primary-blue text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {events.map((event, index) => (
          <CardEvent
            key={index}
            imgSrc={event.imgSrc}
            date={event.date}
            category={event.category}
            title={event.title}
            description={event.description}
            status={event.status}
          />
        ))}
      </div>

      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
        <p className="w-full text-sm text-muted-foreground text-center sm:text-left">
          Menampilkan <span className="font-semibold text-foreground">1</span> –{" "}
          <span className="font-semibold text-foreground">6</span> dari{" "}
          <span className="font-semibold text-foreground">9</span> event
        </p>

        <Pagination className="mx-0 sm:justify-end">
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="rounded-xl h-9 px-3 text-sm"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="rounded-xl h-9 w-9 text-sm">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                className="rounded-xl h-9 w-9 text-sm"
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="rounded-xl h-9 w-9 text-sm">
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                className="rounded-xl h-9 px-3 text-sm"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm overflow-y-hidden"
            onClick={() => setIsFilterOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-primary-blue" />
                <h2 className="text-lg font-semibold text-foreground">
                  Filter Event
                </h2>
              </div>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Status
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-10 text-sm rounded-xl">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="ongoing">Berlangsung</SelectItem>
                        <SelectItem value="upcoming">Akan Datang</SelectItem>
                        <SelectItem value="past">Selesai</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Kategori
                  </label>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="h-10 text-sm rounded-xl">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="islami">Islami</SelectItem>
                        <SelectItem value="olahraga">Olahraga</SelectItem>
                        <SelectItem value="pendidikan">Pendidikan</SelectItem>
                        <SelectItem value="seni">Seni & Budaya</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Users size={12} />
                  Dibuat Oleh (User)
                </label>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="h-10 text-sm rounded-xl">
                    <SelectValue placeholder="Pilih user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Semua User</SelectItem>
                      {MOCK_USERS.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                  Urutkan
                </label>
                <Select value={sortFilter} onValueChange={setSortFilter}>
                  <SelectTrigger className="h-10 text-sm rounded-xl">
                    <SelectValue placeholder="Urutkan berdasarkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Default</SelectItem>
                      <SelectItem value="newest">Terbaru</SelectItem>
                      <SelectItem value="oldest">Terlama</SelectItem>
                      <SelectItem value="name_asc">Nama (A-Z)</SelectItem>
                      <SelectItem value="name_desc">Nama (Z-A)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border bg-muted/10">
              <Button
                onClick={handleReset}
                variant="ghost"
                className="text-sm gap-2 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw size={14} />
                Reset
              </Button>
              <Button
                onClick={handleApply}
                className="gap-2 bg-primary-blue hover:bg-primary-blue/90 text-white rounded-xl px-5"
              >
                <Check size={14} />
                Terapkan Filter
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
