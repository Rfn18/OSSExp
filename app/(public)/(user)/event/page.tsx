import { CardEvent } from "@/components/card-event";
import Paginate from "@/components/paginate";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

const events = Array(6).fill({
  status: "ongoing" as const,
  imgSrc: "https://picsum.photos/seed/event/530/300",
  date: "18 April 2025",
  category: "Olahraga",
  title: "PHBN 2025",
  description:
    "Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara",
  link: "/event/PHBN-2025",
});

export default function EventPage() {
  return (
    <div className="w-full font-sans dark:bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 pt-4">
        <div className="mb-8 sm:mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-blue mb-2">
            Dokumentasi Kegiatan
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-foreground">
            Ada apa aja sih di{" "}
            <span className="text-primary-blue">OSSBHAKTA67</span>?
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed max-w-lg">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((e, i) => (
            <CardEvent key={i} {...e} />
          ))}
        </div>

        <Paginate />
      </div>
    </div>
  );
}
