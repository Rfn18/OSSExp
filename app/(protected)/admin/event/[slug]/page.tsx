"use client";

import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";
import {
  Calendar,
  Clock,
  MapPin,
  MoveLeft,
  MoveRight,
  Pencil,
  Tag,
  Timer,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import api from "@/app/services/api";
import { use, useState } from "react";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

// ─── Helpers ──────────────────────────────────────────────────────────────
function extractEvent(raw: any) {
  return raw?.data?.data ?? raw?.data ?? raw ?? null;
}

function resolveCoverUrl(coverImage?: string | null) {
  if (!coverImage) return "https://picsum.photos/seed/event/1440/660";
  if (coverImage.startsWith("http")) return coverImage;
  const imgUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/`;
  return imgUrl ? `${imgUrl}/${coverImage}` : coverImage;
}

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

function formatTimeRange(start?: string | null, end?: string | null) {
  if (!start || !end) return "-";
  const clean = (t: string) => t.slice(0, 5).replace(":", ".");
  return `${clean(start)} - ${clean(end)}`;
}

function computeDurationDays(start?: string | null, end?: string | null) {
  if (!start || !end) return "-";
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "-";

  const diffMs = endDate.getTime() - startDate.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;
  return `${diffDays} Hari`;
}

const STATUS_MAP: Record<
  string,
  { label: string; dotClass: string; animate?: boolean }
> = {
  upcoming: { label: "Upcoming", dotClass: "bg-blue-400" },
  ongoing: { label: "Ongoing", dotClass: "bg-green-400", animate: true },
  completed: { label: "Completed", dotClass: "bg-gray-400" },
  cancelled: { label: "Cancelled", dotClass: "bg-red-400" },
};

function ItemCard({
  icon,
  title,
  description,
  isLink,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 py-4 last:border-0">
      <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-foreground/70">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground">
          {title}
        </p>
        {isLink ? (
          <a
            href={description}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:underline text-blue-600 hover:text-blue-600/80 transition-colors duration-200"
          >
            {description}
          </a>
        ) : (
          <p className="text-sm font-medium text-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

export default function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const fetcher = (url: string) => api.get(url).then((res) => res.data);

  const {
    data: eventRaw,
    isLoading,
    error,
  } = useSWR(slug ? `/events/${slug}` : null, fetcher);

  const event = extractEvent(eventRaw);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/events/${slug}`);
      router.push("/admin/event");
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Gagal menghapus event.");
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full font-sans dark:bg-black">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-24 text-center text-sm text-muted-foreground">
          Memuat detail event…
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="w-full font-sans dark:bg-black">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-24 text-center">
          <p className="text-sm text-red-500 mb-4">
            Event dengan slug &quot;{slug}&quot; tidak ditemukan.
          </p>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mx-auto text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <MoveLeft size={16} />
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const status = STATUS_MAP[event.status] ?? STATUS_MAP.upcoming;

  return (
    <div className="w-full font-sans dark:bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 pt-4">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pb-16">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={resolveCoverUrl(event.cover_image)}
              alt={event.title}
              className="w-full object-cover"
              style={{ aspectRatio: "16/7" }}
            />

            <span className="absolute top-5 right-5 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/30 bg-white/10 backdrop-blur-md">
              <span
                className={`h-1.5 w-1.5 rounded-full ${status.dotClass} ${
                  status.animate ? "animate-pulse" : ""
                }`}
              />
              {status.label}
            </span>

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

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
                {event.title}
              </h1>
            </div>
          </div>

          <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 min-w-0">
              <section className="mb-8">
                <h2 className="font-bold text-xl text-foreground mb-3">
                  Deskripsi
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </section>

              {event.link && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-xl text-foreground">
                      Dokumentasi
                    </h2>
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-primary-blue hover:gap-3 transition-all duration-200"
                    >
                      Buka Tautan <MoveRight size={14} />
                    </a>
                  </div>
                </section>
              )}
            </div>

            <div className="sticky top-24 w-full lg:w-72 flex-shrink-0">
              <div className="rounded-2xl border border-border bg-background/80 backdrop-blur-sm shadow-sm p-5">
                <h3 className="font-bold text-base text-foreground mb-1">
                  Detail Event
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Informasi lengkap kegiatan
                </p>
                <div className="mt-3">
                  <ItemCard
                    icon={<Calendar className="h-5 w-5" />}
                    title="Tanggal"
                    description={formatDateRange(
                      event.start_date,
                      event.end_date,
                    )}
                  />

                  <ItemCard
                    icon={<Clock className="h-5 w-5" />}
                    title="Jam"
                    description={formatTimeRange(
                      event.start_time,
                      event.end_time,
                    )}
                  />

                  <ItemCard
                    icon={<Timer className="h-5 w-5" />}
                    title="Lama Penyelenggaraan"
                    description={computeDurationDays(
                      event.start_date,
                      event.end_date,
                    )}
                  />

                  <ItemCard
                    icon={<MapPin className="h-5 w-5" />}
                    title="Lokasi"
                    description={event.location}
                  />

                  <ItemCard
                    icon={<Tag className="h-5 w-5" />}
                    title="Kategori"
                    description={event.category?.name ?? "-"}
                  />

                  <ItemCard
                    icon={<FontAwesomeIcon icon={faGoogleDrive} />}
                    title="Drive"
                    isLink={true}
                    description={event.link ? event.link : "-"}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Button
                  variant="ghost"
                  onClick={() =>
                    router.push(`/admin/events/${event.slug}/edit`)
                  }
                  className="flex-1 h-11 font-bold text-white hover:text-white gap-2 rounded-xl
                  bg-blue-600 hover:bg-blue-500
                  transition-colors duration-200
                cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setDeleteDialogOpen(true)}
                  disabled={isDeleting}
                  className="flex-1 h-11 font-bold text-white hover:text-white gap-2 rounded-xl
                  bg-red-600 hover:bg-red-500
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-colors duration-200
                 cursor-pointer"
                >
                  <Trash className="h-4 w-4" />
                  {isDeleting ? "Menghapus…" : "Hapus"}
                </Button>

                <ConfirmDialog
                  open={deleteDialogOpen}
                  onOpenChange={setDeleteDialogOpen}
                  title="Hapus Event?"
                  description={`Event "${event.title}" akan dihapus permanen dan tidak bisa dikembalikan.`}
                  confirmLabel="Hapus"
                  variant="destructive"
                  isLoading={isDeleting}
                  onConfirm={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
