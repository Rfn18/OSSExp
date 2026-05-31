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

export default function EventPage() {
  return (
    <div className="w-full min-h-full flex-1 items-center justify-between font-sans dark:bg-black px-20 mt-10">
      <div>
        <h1 className="font-bold text-3xl">Ada apa aja sih di OSSBHAKTA67</h1>
        <p className="text-md mt-2 text-muted-foreground">
          Temukan dokumentasi kegiatan, acara lomba <br /> kegiatan islami dan
          semua yang kami buat.
        </p>
      </div>
      <div>
        <div className="flex items-center justify-between mt-10">
          <p className="text-sm font-semibold flex-1">9 Event Ditemukan</p>
          <div className="flex items-center gap-4 mt-4">
            <Input placeholder="Cari Event..." className="w-full" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">All</SelectItem>
                  <SelectItem value="dark">Completed</SelectItem>
                  <SelectItem value="system">Upcoming</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">All</SelectItem>
                  <SelectItem value="dark">Islami</SelectItem>
                  <SelectItem value="system">Olahraga</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Terbaru" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">All</SelectItem>
                  <SelectItem value="dark">Terbaru</SelectItem>
                  <SelectItem value="system">Terlama</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardEvent
            status="ongoing"
            imgSrc="https://avatar.vercel.sh/shadcn1"
            date="18 April 2025"
            category="Olahraga"
            title="PHBN 2025"
            description="Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara"
            link="https://example.com/event1"
          />
          <CardEvent
            status="ongoing"
            imgSrc="https://avatar.vercel.sh/shadcn1"
            date="18 April 2025"
            category="Olahraga"
            title="PHBN 2025"
            description="Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara"
            link="https://example.com/event1"
          />
          <CardEvent
            status="ongoing"
            imgSrc="https://avatar.vercel.sh/shadcn1"
            date="18 April 2025"
            category="Olahraga"
            title="PHBN 2025"
            description="Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara"
            link="https://example.com/event1"
          />
          <CardEvent
            status="ongoing"
            imgSrc="https://avatar.vercel.sh/shadcn1"
            date="18 April 2025"
            category="Olahraga"
            title="PHBN 2025"
            description="Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara"
            link="https://example.com/event1"
          />
          <CardEvent
            status="ongoing"
            imgSrc="https://avatar.vercel.sh/shadcn1"
            date="18 April 2025"
            category="Olahraga"
            title="PHBN 2025"
            description="Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara"
            link="https://example.com/event1"
          />
          <CardEvent
            status="ongoing"
            imgSrc="https://avatar.vercel.sh/shadcn1"
            date="18 April 2025"
            category="Olahraga"
            title="PHBN 2025"
            description="Hari Besar Nasional, event kemerdekaan SMK Bhakti Wiyata & SMK TI Pelita Nusantara"
            link="https://example.com/event1"
          />
        </div>
        <div className="w-full flex items-center justify-between mt-2">
          <p className="text-sm text-muted-foreground w-full">
            Menampilkan <span className="font-semibold text-foreground">1</span>{" "}
            sampai <span className="font-semibold text-foreground">6</span> dari{" "}
            <span className="font-semibold text-foreground">9</span> event
          </p>
          <Pagination className="w-full justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
