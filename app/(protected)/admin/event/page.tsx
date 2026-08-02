"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import useSWR from "swr";
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
  Loader2,
  CalendarX,
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
import api from "@/app/services/api";
import { useAuth } from "@/app/context/AuthContext";
import { Category, Event, EventFormValues } from "@/app/types/eventType";
import { User } from "@/app/types/userType";
import axios from "axios";
import { toast } from "sonner";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const paginatedFetcher = async (url: string) => {
  const response = await api.get(url);
  const result = response.data;
  return {
    data: result.data ?? [],
  };
};

const simpleFetcher = (url: string) =>
  api.get(url).then((res) => res.data.data ?? []);

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventManagement() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const isAdmin = user?.role?.guard_name === "admin";

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortFilter, setSortFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState<string>("all");

  const [draftStatus, setDraftStatus] = useState(statusFilter);
  const [draftCategory, setDraftCategory] = useState(categoryFilter);
  const [draftSort, setDraftSort] = useState(sortFilter);
  const [draftUser, setDraftUser] = useState(userFilter);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(currentPage));
    params.set("per_page", String(perPage));

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (categoryFilter !== "all") params.set("category_id", categoryFilter);
    if (userFilter !== "all") params.set("user_id", userFilter);

    if (sortFilter === "newest") params.set("sort", "-created_at");
    else if (sortFilter === "oldest") params.set("sort", "created_at");
    else if (sortFilter === "name_asc") params.set("sort", "title");
    else if (sortFilter === "name_desc") params.set("sort", "-title");

    return params.toString();
  }, [
    currentPage,
    debouncedSearch,
    statusFilter,
    categoryFilter,
    userFilter,
    sortFilter,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter, categoryFilter, userFilter, sortFilter]);

  const {
    data: eventsResponse,
    isLoading: isEventsLoading,
    error: eventsError,
    mutate: mutateEvents,
  } = useSWR(
    isAuthenticated ? `/events?${queryParams}` : null,
    paginatedFetcher,
  );

  const { data: categoriesResponse = [] } = useSWR<Category[]>(
    isAuthenticated ? "/event-categories" : null,
    simpleFetcher,
  );

  const { data: userResponse = [] } = useSWR<User[]>(
    isAuthenticated && isAdmin ? "/users" : null,
    simpleFetcher,
  );

  const events: Event[] = eventsResponse?.data?.data ?? [];
  const categories: Category[] = categoriesResponse?.data ?? [];
  const users: User[] = userResponse?.data ?? [];

  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/`;

  const activeFilterCount = [
    statusFilter !== "all",
    categoryFilter !== "all",
    sortFilter !== "all",
    userFilter !== "all",
    debouncedSearch !== "",
  ].filter(Boolean).length;

  const handleReset = () => {
    setDraftStatus("all");
    setDraftCategory("all");
    setDraftSort("all");
    setDraftUser("all");
    setSearchQuery("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSortFilter("all");
    setUserFilter("all");
  };

  const handleApply = () => {
    setStatusFilter(draftStatus);
    setCategoryFilter(draftCategory);
    setSortFilter(draftSort);
    setUserFilter(draftUser);
    setIsFilterOpen(false);
  };

  const handleOpenFilter = () => {
    setDraftStatus(statusFilter);
    setDraftCategory(categoryFilter);
    setDraftSort(sortFilter);
    setDraftUser(userFilter);
    setIsFilterOpen(true);
  };

  const getPaginationInfo = () => {
    const totalPages = eventsResponse?.data?.last_page || 0;
    const currentPage = eventsResponse?.data?.current_page || 1;
    const from = eventsResponse?.data?.from || 0;
    const to = eventsResponse?.data?.to || 0;
    const totalData = eventsResponse?.data?.total || 0;

    return { totalPages, currentPage, from, to, totalData };
  };

  const paginationInfo = getPaginationInfo();

  const paginationNumbers = useMemo(() => {
    if (paginationInfo.totalPages === 0) return [];
    const pages: (number | "ellipsis")[] = [];
    const current = paginationInfo.currentPage;
    const total = paginationInfo.totalPages;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push("ellipsis");

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (current < total - 2) pages.push("ellipsis");
      pages.push(total);
    }
    return pages;
  }, [paginationInfo]);

  const handleDeleteEvent = async (slug: string) => {
    try {
      await api.delete(`/events/${slug}`);
      mutateEvents();
      toast.success("Event berhasil dihapus");
    } catch (error) {
      toast.error("Event gagal dihapus");
    }
  };
  const handleEditEvent = (slug: string) => {
    router.push(`/admin/event/${slug}/edit`);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-7 w-full">
        <DashboardHeader
          title="Event Management"
          description="Kelola semua event organisasi kamu"
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

      {/* ─── Filter Bar ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 p-4 rounded-2xl border border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground flex-shrink-0 flex items-center gap-1.5 mb-3 sm:mb-0">
          <SlidersHorizontal size={14} className="text-muted-foreground" />
          {isEventsLoading ? (
            <Loader2 size={14} className="animate-spin text-primary-blue" />
          ) : (
            <span className="text-primary-blue">
              {paginationInfo.totalData ?? 0}
            </span>
          )}
          <span>Event Ditemukan</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="w-full sm:w-auto relative">
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

          <Button
            onClick={handleOpenFilter}
            variant="outline"
            className="relative h-10 px-4 rounded-xl gap-2 border-border hover:bg-muted/50 w-full sm:w-auto"
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

      {isEventsLoading && events.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary-blue mb-4" />
          <p className="text-sm text-muted-foreground">Memuat event...</p>
        </div>
      )}

      {eventsError && !isEventsLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">
            Gagal memuat event
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            {(eventsError as Error).message || "Terjadi kesalahan pada server"}
          </p>
          <Button
            onClick={() => mutateEvents()}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw size={14} />
            Coba Lagi
          </Button>
        </div>
      )}

      {!isEventsLoading && !eventsError && events.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <CalendarX className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">
            Tidak ada event ditemukan
          </p>
          <p className="text-xs text-muted-foreground mb-4 max-w-sm">
            {activeFilterCount > 0
              ? "Coba ubah filter atau reset pencarian untuk melihat event lainnya."
              : "Belum ada event yang dibuat. Klik tombol Create Event untuk memulai."}
          </p>
          {activeFilterCount > 0 ? (
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <RotateCcw size={14} />
              Reset Filter
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/admin/event/create")}
              className="gap-2 bg-gradient"
            >
              <Plus size={14} />
              Buat Event Pertama
            </Button>
          )}
        </div>
      )}

      {/* ─── Events Grid ────────────────────────────────────────────────── */}
      {!isEventsLoading && !eventsError && events.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            {events.map((event) => (
              <CardEvent
                key={event.id}
                imgSrc={`${imageUrl}${event.cover_image}`}
                date={formatDate(event.start_date)}
                category={event.category?.name || "Tanpa Kategori"}
                title={event.title}
                description={event.description}
                link={event.slug}
                status={event.status}
                modal={true}
                onEdit={() => handleEditEvent(event.slug)}
                onDelete={() => handleDeleteEvent(event.slug)}
              />
            ))}
          </div>

          {/* ─── Pagination ─────────────────────────────────────────────── */}
          {paginationInfo.totalPages > 1 && (
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
              <p className="w-full text-sm text-muted-foreground text-center sm:text-left">
                Menampilkan{" "}
                <span className="font-semibold text-foreground">
                  {paginationInfo.from}
                </span>{" "}
                –{" "}
                <span className="font-semibold text-foreground">
                  {paginationInfo.to}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-foreground">
                  {paginationInfo.totalData}
                </span>{" "}
                event
              </p>

              <Pagination className="mx-0 sm:justify-end">
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (paginationInfo.currentPage > 1)
                          setCurrentPage(paginationInfo.currentPage - 1);
                      }}
                      className={`rounded-xl h-9 px-3 text-sm ${
                        paginationInfo.currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
                    />
                  </PaginationItem>

                  {paginationNumbers.map((page, idx) =>
                    page === "ellipsis" ? (
                      <PaginationItem key={`ellipsis-${idx}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page as number);
                          }}
                          isActive={page === paginationInfo.currentPage}
                          className="rounded-xl h-9 w-9 text-sm"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          paginationInfo.currentPage < paginationInfo.totalPages
                        )
                          setCurrentPage(paginationInfo.currentPage + 1);
                      }}
                      className={`rounded-xl h-9 px-3 text-sm ${
                        paginationInfo.currentPage === paginationInfo.totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* ─── Filter Modal ───────────────────────────────────────────────── */}
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
                  <Select value={draftStatus} onValueChange={setDraftStatus}>
                    <SelectTrigger className="h-10 text-sm rounded-xl">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="ongoing">Berlangsung</SelectItem>
                        <SelectItem value="upcoming">Akan Datang</SelectItem>
                        <SelectItem value="completed">Selesai</SelectItem>
                        <SelectItem value="cancelled">Dibatalkan</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Kategori
                  </label>
                  <Select
                    value={draftCategory}
                    onValueChange={setDraftCategory}
                  >
                    <SelectTrigger className="h-10 text-sm rounded-xl">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Semua</SelectItem>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filter by User (hanya untuk admin) */}
              {isAdmin && (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users size={12} />
                    Dibuat Oleh (User)
                  </label>
                  <Select value={draftUser} onValueChange={setDraftUser}>
                    <SelectTrigger className="h-10 text-sm rounded-xl">
                      <SelectValue placeholder="Pilih user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Semua User</SelectItem>
                        {users?.map((u) => (
                          <SelectItem key={u.id} value={String(u.id)}>
                            {u.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                  Urutkan
                </label>
                <Select value={draftSort} onValueChange={setDraftSort}>
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
