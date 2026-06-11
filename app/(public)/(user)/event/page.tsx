import { CardEvent } from "@/components/card-event";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, SlidersHorizontal } from "lucide-react";

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

export default function EventPage() {
  return (
    <div className="w-full min-h-screen font-sans dark:bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12">
        <div className="mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-blue mb-2">
            Dokumentasi Kegiatan
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground">
            Ada apa aja sih di{" "}
            <span className="text-primary-blue">OSSBHAKTA67</span>?
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
            Temukan dokumentasi kegiatan, acara lomba, kegiatan islami dan semua
            yang kami buat.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 p-4 rounded-2xl border border-border bg-muted/30">
          <p className="text-sm font-semibold text-foreground flex-shrink-0 flex items-center gap-1.5">
            <SlidersHorizontal size={14} className="text-muted-foreground" />
            <span className="text-primary-blue">9</span> Event Ditemukan
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                placeholder="Cari event..."
                className="pl-8 h-9 text-sm rounded-xl w-full sm:w-48"
              />
            </div>

            <Select>
              <SelectTrigger className="h-9 text-sm rounded-xl w-full sm:w-36">
                <SelectValue placeholder="Status" />
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

            <Select>
              <SelectTrigger className="h-9 text-sm rounded-xl w-full sm:w-36">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="islami">Islami</SelectItem>
                  <SelectItem value="olahraga">Olahraga</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Select: Urutan */}
            <Select>
              <SelectTrigger className="h-9 text-sm rounded-xl w-full sm:w-36">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="oldest">Terlama</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((e, i) => (
            <CardEvent key={i} {...e} />
          ))}
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
          <p className="w-full text-sm text-muted-foreground text-center sm:text-left">
            Menampilkan <span className="font-semibold text-foreground">1</span>{" "}
            – <span className="font-semibold text-foreground">6</span> dari{" "}
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
      </div>
    </div>
  );
}
