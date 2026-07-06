"use client";

import React, { useState } from "react";
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

// --- Types ---
type Photo = {
  id: string;
  url: string;
  sectionId: string;
};

type DeletedPhoto = Photo & {
  deletedAt: string;
  sectionName: string;
};

type Section = {
  id: string;
  title: string;
  description: string;
};

export default function DetailEditDocumentation() {
  const router = useRouter();

  // --- State ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);

  // Mock Data
  const eventDetails = {
    title: "Isra' Mi'raj 2025",
    badgeDate: "18 April 2025",
    badgeCategory: "Olahraga",
    date: "17 Mei 2026",
    time: "07.00 - 13.00 WIB",
    duration: "2 Hari",
    location: "Graha, Lt. 4",
    category: "Sosial",
    organizer: "Rohis Bhakta",
  };

  const initialSections: Section[] = [
    {
      id: "sec1",
      title: "Apel Pembukaan",
      description: "Pembukaan resmi kegiatan",
    },
    {
      id: "sec2",
      title: "Pembagian Hadiah",
      description: "Pemberian penghargaan peserta",
    },
  ];

  const initialPhotos: Photo[] = [
    {
      id: "p1",
      url: "https://picsum.photos/seed/p1/400/400",
      sectionId: "sec1",
    },
    {
      id: "p2",
      url: "https://picsum.photos/seed/p2/400/400",
      sectionId: "sec1",
    },
    {
      id: "p3",
      url: "https://picsum.photos/seed/p3/400/400",
      sectionId: "sec1",
    },
    {
      id: "p4",
      url: "https://picsum.photos/seed/p4/400/400",
      sectionId: "sec1",
    },
    {
      id: "p5",
      url: "https://picsum.photos/seed/p5/400/400",
      sectionId: "sec1",
    },
    {
      id: "p6",
      url: "https://picsum.photos/seed/p6/400/400",
      sectionId: "sec1",
    },
    {
      id: "p7",
      url: "https://picsum.photos/seed/p7/400/400",
      sectionId: "sec1",
    },
    {
      id: "p8",
      url: "https://picsum.photos/seed/p8/400/400",
      sectionId: "sec2",
    },
    {
      id: "p9",
      url: "https://picsum.photos/seed/p9/400/400",
      sectionId: "sec2",
    },
    {
      id: "p10",
      url: "https://picsum.photos/seed/p10/400/400",
      sectionId: "sec2",
    },
    {
      id: "p11",
      url: "https://picsum.photos/seed/p11/400/400",
      sectionId: "sec2",
    },
  ];

  const [sections] = useState<Section[]>(initialSections);
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [deletedPhotos, setDeletedPhotos] = useState<DeletedPhoto[]>([]);

  // --- Handlers ---
  const handleDeletePhoto = (photo: Photo) => {
    const sectionName =
      sections.find((s) => s.id === photo.sectionId)?.title || "Unknown";
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    setDeletedPhotos((prev) => [
      { ...photo, deletedAt: timeString, sectionName },
      ...prev,
    ]);
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  };

  const handleRestorePhoto = (photo: DeletedPhoto) => {
    setPhotos((prev) => [
      ...prev,
      { id: photo.id, url: photo.url, sectionId: photo.sectionId },
    ]);
    setDeletedPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  };

  const handleEmptyTrash = () => {
    setDeletedPhotos([]);
  };

  const handleSave = () => {
    setIsEditMode(false);
    setDeletedPhotos([]); // Konfirmasi penghapusan permanen
    setIsTrashOpen(false);
  };

  const handleCancel = () => {
    setPhotos(initialPhotos);
    setDeletedPhotos([]);
    setIsEditMode(false);
    setIsTrashOpen(false);
  };

  // --- Helpers ---
  const getPhotosBySection = (sectionId: string) =>
    photos.filter((p) => p.sectionId === sectionId);

  return (
    <div className="w-auto h-auto min-h-full font-sans text-gray-900 pb-16 relative">
      {/* Top bar: back + mode toggle */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <MoveLeft size={16} strokeWidth={2.5} />
          Kembali
        </button>

        {/* Segmented Mode Toggle */}
        <div className="relative flex items-center bg-gray-100 rounded-xl p-1 w-[180px]">
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-200 ease-out ${
              isEditMode ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
            }`}
          />
          <button
            onClick={() => setIsEditMode(false)}
            className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              !isEditMode ? "text-gray-900" : "text-gray-400"
            }`}
          >
            <Eye size={14} /> Lihat
          </button>
          <button
            onClick={() => setIsEditMode(true)}
            className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              isEditMode ? "text-gray-900" : "text-gray-400"
            }`}
          >
            <Pencil size={14} /> Edit
          </button>
        </div>
      </div>

      {/* Header: Title (left) + Detail Event card (right) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start mb-8">
        {/* Title Block */}
        <div className="w-full lg:w-[340px] flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              <Calendar size={12} /> {eventDetails.badgeDate}
            </span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {eventDetails.badgeCategory}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {eventDetails.title}
          </h1>
        </div>

        {/* Detail Event Card */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Detail Event
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
            <DetailItem
              icon={Calendar}
              label="Tanggal"
              value={eventDetails.date}
            />
            <DetailItem icon={Clock} label="Jam" value={eventDetails.time} />
            <DetailItem
              icon={Sun}
              label="Waktu Penyelenggaraan"
              value={eventDetails.duration}
            />
            <DetailItem
              icon={MapPin}
              label="Lokasi"
              value={eventDetails.location}
            />
            <DetailItem
              icon={Tag}
              label="Kategori"
              value={eventDetails.category}
            />
            <DetailItem
              icon={Users}
              label="Penyelenggara"
              value={eventDetails.organizer}
            />
          </div>
        </div>
      </div>

      {/* Upload row (Edit Mode Only) */}
      {isEditMode && (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`flex-1 flex items-center justify-center border-2 border-dashed rounded-2xl py-8 px-4 transition-colors cursor-pointer
              ${isDragging ? "border-[#1e3a8a] bg-blue-50" : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
          >
            <div className="text-center">
              <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">
                Drag and drop or browse files
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
              <select className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]">
                <option value="">Select</option>
                {sections.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1e3a8a] hover:bg-[#172e6e] text-white text-sm font-semibold rounded-xl shadow-sm transition-colors">
              <Plus size={16} /> Tambah Event
            </button>
          </div>
        </div>
      )}

      {/* Divider + progress label */}
      <div className="flex items-center gap-4 mb-8">
        <hr className="flex-1 border-gray-200" />
        <span className="text-xs font-medium text-gray-400 whitespace-nowrap">
          {sections.length} Section
        </span>
      </div>

      {/* Sections Loop */}
      <div className="space-y-10">
        {sections.map((section, idx) => {
          const sectionPhotos = getPhotosBySection(section.id);
          if (!isEditMode && sectionPhotos.length === 0) return null;

          return (
            <div key={section.id}>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>

              {sectionPhotos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {sectionPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm"
                    >
                      <img
                        src={photo.url}
                        alt="Dokumentasi"
                        className="w-full h-full object-cover"
                      />
                      {isEditMode && (
                        <button
                          onClick={() => handleDeletePhoto(photo)}
                          className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-md"
                          title="Hapus Foto"
                        >
                          <X size={14} strokeWidth={3} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">
                    Belum ada foto di section ini
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom action bar (Edit Mode Only) */}
      {isEditMode && (
        <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-100">
          {/* Recently Deleted trigger — always visible in edit mode */}
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
              className="px-6 py-2.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 text-sm font-semibold rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#1e3a8a] hover:bg-[#172e6e] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              Simpan
            </button>
          </div>
        </div>
      )}

      {/* Recently Deleted Drawer */}
      {isTrashOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsTrashOpen(false)}
          />
          {/* Panel */}
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
                          {photo.sectionName}
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

// --- Small subcomponent for detail card items ---
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
