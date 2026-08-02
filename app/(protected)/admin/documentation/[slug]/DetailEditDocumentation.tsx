"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  MoveLeft,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Users,
  Sun,
  UploadCloud,
  X,
  RotateCcw,
  Trash2,
  Eye,
  Pencil,
  Image as ImageIcon,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import api from "@/app/services/api";
import type { Photo } from "@/app/types/photoType";
import {
  MasonryPhotoAlbum,
  RowsPhotoAlbum,
  type Photo as AlbumPhoto,
} from "react-photo-album";
import "react-photo-album/rows.css";
import { getIdealColumns } from "@/lib/photoAlbum";

type DeletedPhoto = Photo & {
  deletedAt: string;
  categoryName: string;
};

type Category = {
  id: number;
  title: string;
  description: string;
};

type PendingFile = {
  file: File;
  previewUrl: string;
};

// --- Helpers ---
function extractList(raw: any) {
  return raw?.data?.data ?? raw?.data ?? raw ?? [];
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
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return "-";
  if (s.toDateString() === e.toDateString()) return formatDateIndo(start);
  return `${formatDateIndo(start)} – ${formatDateIndo(end)}`;
}

function formatTimeRange(start?: string | null, end?: string | null) {
  if (!start || !end) return "-";
  const clean = (t: string) => t.slice(0, 5).replace(":", ".");
  return `${clean(start)} - ${clean(end)} WIB`;
}

function computeDurationDays(start?: string | null, end?: string | null) {
  if (!start || !end) return "-";
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return "-";
  const days = Math.round((e.getTime() - s.getTime()) / 86400000) + 1;
  return `${days} Hari`;
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function DetailEditDocumentation({ slug }: { slug: string }) {
  const router = useRouter();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [uploadCategoryId, setUploadCategoryId] = useState("");
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [deletedPhotos, setDeletedPhotos] = useState<DeletedPhoto[]>([]);

  const { data: eventRaw, isLoading: isEventLoading } = useSWR(
    slug ? `/events/${slug}` : null,
    fetcher,
  );
  const event = eventRaw?.data?.data ?? eventRaw?.data ?? null;

  const { data: categoriesRaw } = useSWR("/doc-category", fetcher);
  const categories: Category[] = extractList(categoriesRaw).map((c: any) => ({
    id: c.id,
    title: c.name,
    description: c.description ?? "",
  }));

  const galleriesKey = event ? `/doc-galleries?event_id=${event.id}` : null;
  const { data: galleriesRaw, isLoading: isGalleriesLoading } = useSWR(
    galleriesKey,
    fetcher,
  );
  const galleries = extractList(galleriesRaw);

  const serverPhotos: Photo[] = useMemo(() => {
    const list: Photo[] = [];
    galleries.forEach((gallery: any) => {
      (gallery.documentations ?? []).forEach((doc: any) => {
        list.push({
          id: doc.id,
          url: doc.file_path,
          galleryId: gallery.id,
          categoryId: gallery.doc_category_id,
          width: doc.width ?? 800,
          height: doc.height ?? 800,
        });
      });
    });
    return list;
  }, [galleriesRaw]);

  console.log(serverPhotos);

  const activePhotos = photos ?? serverPhotos;

  useEffect(() => {
    return () => {
      pendingFiles.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
  }, [pendingFiles]);

  // --- Handlers ---
  const handleDeletePhoto = (photo: Photo) => {
    const categoryName =
      categories.find((c) => c.id === photo.categoryId)?.title || "Unknown";
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    setDeletedPhotos((prev) => [
      { ...photo, deletedAt: timeString, categoryName },
      ...prev,
    ]);
    setPhotos((activePhotos ?? serverPhotos).filter((p) => p.id !== photo.id));
  };

  const handleRestorePhoto = (photo: DeletedPhoto) => {
    setPhotos([...(photos ?? serverPhotos), photo]);
    setDeletedPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  };

  const handleEmptyTrash = () => {
    setDeletedPhotos([]);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const newPending: PendingFile[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setPendingFiles((prev) => [...prev, ...newPending]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemovePendingFile = (index: number) => {
    setPendingFiles((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const getOrCreateGallery = async (categoryId: string) => {
    const existing = galleries.find(
      (g: any) => String(g.doc_category_id) === String(categoryId),
    );
    if (existing) return existing.id;

    const res = await api.post("/doc-galleries", {
      event_id: event.id,
      doc_category_id: categoryId,
      soft_order: galleries.length,
    });
    return res.data?.data?.id ?? res.data?.id;
  };

  const handleUpload = async () => {
    if (!uploadCategoryId || pendingFiles.length === 0) return;

    setIsSaving(true);
    try {
      const galleryId = await getOrCreateGallery(uploadCategoryId);

      for (const { file } of pendingFiles) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("gallery_id", String(galleryId));
        formData.append("alt_text", file.name);
        formData.append("type", "photo");
        formData.append("soft_order", "0");

        await api.post("/documentations", formData);
      }

      pendingFiles.forEach((p) => URL.revokeObjectURL(p.previewUrl));
      setPendingFiles([]);
      setUploadCategoryId("");
      mutate(galleriesKey);
    } catch (error) {
      alert("Gagal mengunggah dokumentasi. Coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      for (const photo of deletedPhotos) {
        await api.delete(`/documentations/${photo.id}`);
      }

      setDeletedPhotos([]);
      setPhotos(null);
      setIsEditMode(false);
      setIsTrashOpen(false);
      mutate(galleriesKey);
    } catch (error) {
      alert("Gagal menyimpan perubahan. Coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    pendingFiles.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPhotos(null);
    setDeletedPhotos([]);
    setPendingFiles([]);
    setIsEditMode(false);
    setIsTrashOpen(false);
  };

  const getPhotosByCategory = (categoryId: number) =>
    activePhotos.filter((p) => p.categoryId === categoryId);

  const usedCategoryIds = new Set(galleries.map((g: any) => g.doc_category_id));
  const relevantCategories = categories.filter((c) =>
    usedCategoryIds.has(c.id),
  );

  if (isEventLoading || isGalleriesLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-gray-400">
        Memuat data dokumentasi…
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-red-500">
        Event dengan slug &quot;{slug}&quot; tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="w-auto h-auto min-h-full font-sans text-gray-900 pb-16 relative">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <MoveLeft size={16} strokeWidth={2.5} />
          Kembali
        </button>

        <div className="relative flex items-center bg-gray-100 rounded-xl p-1 w-[180px]">
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-200 ease-out ${
              isEditMode ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
            }`}
          />
          <button
            onClick={() => setIsEditMode(false)}
            className={`relative flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              !isEditMode ? "text-gray-900" : "text-gray-400"
            }`}
          >
            <Eye size={14} /> Lihat
          </button>
          <button
            onClick={() => setIsEditMode(true)}
            className={`relative flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              isEditMode ? "text-gray-900" : "text-gray-400"
            }`}
          >
            <Pencil size={14} /> Edit
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-6 items-start mb-8">
        <div className="w-full lg:w-[340px] flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              <Calendar size={12} /> {formatDateIndo(event.start_date)}
            </span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {event.category?.name ?? "-"}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {event.title}
          </h1>
        </div>

        <div className="flex-1 w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Detail Event
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
            <DetailItem
              icon={Calendar}
              label="Tanggal"
              value={formatDateRange(event.start_date, event.end_date)}
            />
            <DetailItem
              icon={Clock}
              label="Jam"
              value={formatTimeRange(event.start_time, event.end_time)}
            />
            <DetailItem
              icon={Sun}
              label="Lama Penyelenggaraan"
              value={computeDurationDays(event.start_date, event.end_date)}
            />
            <DetailItem icon={MapPin} label="Lokasi" value={event.location} />
            <DetailItem
              icon={Tag}
              label="Kategori"
              value={event.category?.name ?? "-"}
            />
            <DetailItem
              icon={Users}
              label="Penyelenggara"
              value={event.user?.name ?? "-"}
            />
          </div>
        </div>
      </div>

      {/* Upload row */}
      {isEditMode && (
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative flex-1 flex items-center justify-center border-2 border-dashed rounded-2xl py-8 px-4 transition-colors cursor-pointer
                ${isDragging ? "border-[#1e3a8a] bg-blue-50" : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center pointer-events-none">
                <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  {pendingFiles.length > 0
                    ? `${pendingFiles.length} file dipilih`
                    : "Drag and drop or browse files"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Maksimum 500 MB File Size
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-[260px]">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Kategori
                </label>
                <select
                  value={uploadCategoryId}
                  onChange={(e) => setUploadCategoryId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleUpload}
                disabled={
                  isSaving || !uploadCategoryId || pendingFiles.length === 0
                }
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1e3a8a] hover:bg-[#172e6e] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
              >
                <Plus size={16} />{" "}
                {isSaving ? "Mengunggah…" : "Tambah Dokumentasi"}
              </button>
            </div>
          </div>

          {pendingFiles.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 mb-2.5">
                Preview ({pendingFiles.length} foto siap diunggah)
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {pendingFiles.map((pending, index) => (
                  <div
                    key={pending.previewUrl}
                    className="relative group aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50"
                  >
                    <img
                      src={pending.previewUrl}
                      alt={pending.file.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemovePendingFile(index)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                      title="Batalkan file ini"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <hr className="flex-1 border-gray-200" />
        <span className="text-xs font-medium text-gray-400 whitespace-nowrap">
          {relevantCategories.length} Kategori
        </span>
      </div>

      <div className="space-y-10">
        {relevantCategories.map((category) => {
          const categoryPhotos = getPhotosByCategory(category.id);
          if (!isEditMode && categoryPhotos.length === 0) return null;
          const albumPhotos: AlbumPhoto[] = categoryPhotos.map((p) => ({
            key: String(p.id),
            src: p.url,
            width: Number(p.width) || 800,
            height: Number(p.height) || 800,
          }));

          return (
            <div key={category.id}>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>

              {categoryPhotos.length > 0 ? (
                <MasonryPhotoAlbum
                  photos={albumPhotos}
                  columns={getIdealColumns}
                  spacing={12}
                  sizes={{
                    size: "calc(100vw - 64px)",
                    sizes: [
                      {
                        viewport: "(max-width: 640px)",
                        size: "calc(50vw - 24px)",
                      },
                      {
                        viewport: "(max-width: 1200px)",
                        size: "calc(25vw - 24px)",
                      },
                      {
                        viewport: "(min-width: 1201px)",
                        size: "calc(16vw - 24px)",
                      },
                    ],
                  }}
                  render={{
                    photo: (props, { photo }) => {
                      const original = categoryPhotos.find(
                        (p) => String(p.id) === photo.key,
                      );
                      return (
                        <div
                          key={photo.key}
                          className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                          style={{ maxWidth: 320 }} // batas atas lebar tiap foto
                        >
                          <img
                            {...props}
                            src={photo.src}
                            alt="Dokumentasi"
                            className="w-full h-auto"
                          />
                          {isEditMode && original && (
                            <button
                              onClick={() => handleDeletePhoto(original)}
                              className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-md z-10"
                              title="Hapus Foto"
                            >
                              <X size={14} strokeWidth={3} />
                            </button>
                          )}
                        </div>
                      );
                    },
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">
                    Belum ada foto di kategori ini
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {relevantCategories.length === 0 && !isEditMode && (
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">
              Belum ada dokumentasi untuk event ini
            </p>
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      {isEditMode && (
        <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-100">
          <button
            onClick={() => setIsTrashOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            <Trash2 size={15} className="text-gray-400" />
            Recently Deleted
            {deletedPhotos.length > 0 && (
              <span className="bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {deletedPhotos.length}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="px-6 py-2.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 bg-[#1e3a8a] hover:bg-[#172e6e] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50"
            >
              {isSaving ? "Menyimpan…" : "Simpan"}
            </button>
          </div>
        </div>
      )}

      {/* Recently Deleted Drawer */}
      {isTrashOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsTrashOpen(false)}
          />
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-red-500" />
                <h3 className="text-base font-bold text-gray-900">
                  Recently Deleted
                </h3>
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {deletedPhotos.length}
                </span>
              </div>
              <button
                onClick={() => setIsTrashOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {deletedPhotos.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Trash2 className="w-8 h-8 text-gray-200 mb-3" />
                  <p className="text-sm text-gray-400">
                    Belum ada foto yang dihapus
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {deletedPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <img
                          src={photo.url}
                          alt="Deleted"
                          className="w-full h-full object-cover grayscale opacity-70"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {photo.categoryName}
                        </p>
                        <p className="text-xs text-gray-400">
                          Dihapus {photo.deletedAt}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRestorePhoto(photo)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold rounded-lg transition-colors flex-shrink-0"
                      >
                        <RotateCcw size={12} /> Kembalikan
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {deletedPhotos.length > 0 && (
              <div className="p-6 border-t border-gray-100">
                <button
                  onClick={handleEmptyTrash}
                  className="w-full py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  Kosongkan Semua
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="w-4 h-4 text-gray-400 mt-0.5" strokeWidth={2} />
      <div>
        <p className="text-[11px] font-medium text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
