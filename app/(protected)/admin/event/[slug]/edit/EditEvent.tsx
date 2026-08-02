"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Calendar,
  Clock,
  MapPin,
  Link as LinkIcon,
  UploadCloud,
  CheckCircle2,
  XCircle,
  X,
  Repeat2,
  Tag,
  Activity,
} from "lucide-react";
import { EventFormValues } from "@/app/types/eventType";
import api from "@/app/services/api";
import useSWR from "swr";
import { useRouter } from "next/navigation";

type NotificationType = "success" | "error" | null;

interface Notification {
  type: NotificationType;
  message: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────
function toDateInput(value?: string | null) {
  if (!value) return "";
  return value.split("T")[0].split(" ")[0];
}

function toTimeInput(value?: string | null) {
  if (!value) return "";
  return value.slice(0, 5);
}

function extractEvent(raw: any) {
  return raw?.data?.data ?? raw?.data ?? raw ?? null;
}

function resolveCoverUrl(coverImage?: string | null) {
  if (!coverImage) return null;
  if (coverImage.startsWith("http")) return coverImage;

  const cloudBase = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL ?? "";
  return cloudBase ? `${cloudBase}/${coverImage}` : coverImage;
}

// Mapping response event -> shape yang dipakai react-hook-form
function mapEventToFormValues(event: any): EventFormValues {
  return {
    title: event.title ?? "",
    slug: event.slug ?? "",
    description: event.description ?? "",
    location: event.location ?? "",
    start_date: toDateInput(event.start_date),
    end_date: toDateInput(event.end_date),
    start_time: toTimeInput(event.start_time),
    end_time: toTimeInput(event.end_time),
    link: event.link ?? "",
    status: event.status ?? "upcoming",
    is_repeat: !!event.is_repeat,
    event_category_id: event.event_category_id
      ? String(event.event_category_id)
      : "",
  };
}

function Toast({
  notification,
  onClose,
}: {
  notification: Notification;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = notification.type === "success";

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-start gap-3 px-4 py-3.5 rounded-xl shadow-lg border max-w-sm w-full
        animate-[slideIn_0.3s_ease-out]
        ${
          isSuccess
            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}
    >
      <div className="flex-shrink-0 mt-0.5">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">
          {isSuccess ? "Berhasil!" : "Gagal!"}
        </p>
        <p className="text-sm mt-0.5 opacity-80">{notification.message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-0.5 rounded-md opacity-60 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  icon,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
        {icon && <span className="text-gray-400">{icon}</span>}
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 " +
  "transition duration-150 hover:border-gray-300";

const readonlyCls =
  "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-500 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition duration-150";

function SectionCard({
  title,
  step,
  headerRight,
  children,
}: {
  title: string;
  step: number;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex-shrink-0">
            {step}
          </span>
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        </div>
        {headerRight}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function EditEvent({ slug }: { slug: string }) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const router = useRouter();
  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/`;

  const fetcher = (url: string) => api.get(url).then((res) => res.data);

  const {
    data: eventRaw,
    isLoading: isEventLoading,
    error: eventError,
  } = useSWR(slug ? `/events/${slug}` : null, fetcher);

  const event = extractEvent(eventRaw);

  const {
    data: categoriesResponse,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useSWR("/event-categories", fetcher);

  const categories = categoriesResponse?.data?.data;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    defaultValues: { status: "upcoming", is_repeat: false },
  });

  useEffect(() => {
    if (!event || !categories) return;

    reset(mapEventToFormValues(event));

    const resolvedCover = resolveCoverUrl(event.cover_image);
    if (resolvedCover) setCoverPreview(resolvedCover);
  }, [event, categories, reset]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue("title", title);
    const slugified = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setValue("slug", slugified, { shouldValidate: true });
  };

  const applyFile = (file: File) => {
    setCoverImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setCoverPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) applyFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) applyFile(file);
  };

  const onSubmit = async (data: EventFormValues) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        formData.append(
          key,
          key === "is_repeat" ? (value ? "1" : "0") : String(value),
        );
      });

      if (coverImage) {
        formData.append("cover_image", coverImage);
      }

      // Method spoofing — Laravel gak bisa parse multipart/form-data di method PUT langsung
      formData.append("_method", "PUT");

      await api.post(`/events/${slug}`, formData);

      setNotification({
        type: "success",
        message: "Event berhasil diperbarui.",
      });
      router.push("/admin/event");
    } catch (error: any) {
      setNotification({
        type: "error",
        message:
          error.response?.data?.message ??
          "Gagal menyimpan perubahan. Periksa koneksi dan coba lagi.",
      });
    }
  };

  const statusOptions = [
    { value: "upcoming", label: "Upcoming" },
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  if (isEventLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-gray-400">
        Memuat data event…
      </div>
    );
  }

  if (eventError || !event) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-red-500">
        Event dengan slug &quot;{slug}&quot; tidak ditemukan.
      </div>
    );
  }

  return (
    <>
      {notification && (
        <Toast
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="font-sans text-gray-900">
        <div className="mx-auto">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Edit Event
            </h1>
            <p className="text-sm text-gray-500 mt-1.5">
              Lengkapi informasi di bawah untuk mengubah event pada sistem.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <SectionCard title="Informasi Umum" step={1}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="Judul Event"
                    required
                    error={errors.title?.message}
                  >
                    <input
                      type="text"
                      {...register("title", {
                        required: "Judul event wajib diisi",
                      })}
                      onChange={handleTitleChange}
                      className={inputCls}
                      placeholder="Masukkan judul event"
                    />
                  </Field>

                  <Field
                    label="Slug URL"
                    required
                    hint="Dibuat otomatis dari judul"
                    error={errors.slug?.message}
                  >
                    <input
                      type="text"
                      {...register("slug", { required: "Slug wajib diisi" })}
                      className={readonlyCls}
                      placeholder="judul-event"
                      readOnly
                    />
                  </Field>
                </div>

                <Field
                  label="Deskripsi Event"
                  required
                  error={errors.description?.message}
                >
                  <textarea
                    {...register("description", {
                      required: "Deskripsi wajib diisi",
                    })}
                    rows={4}
                    className={`${inputCls} resize-y`}
                    placeholder="Ceritakan detail tentang event ini…"
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard
              title="Waktu Pelaksanaan"
              step={2}
              headerRight={
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="is_repeat"
                      {...register("is_repeat")}
                      className="peer sr-only"
                    />
                    <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-blue-500 transition-colors duration-200" />
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 peer-checked:translate-x-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Repeat2 className="w-3.5 h-3.5 text-gray-400" />
                    Event Berulang
                  </span>
                </label>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <Field
                  label="Tanggal Mulai"
                  required
                  icon={<Calendar className="w-4 h-4" />}
                  error={errors.start_date?.message}
                >
                  <input
                    type="date"
                    {...register("start_date", {
                      required: "Tanggal mulai wajib diisi",
                    })}
                    className={inputCls}
                  />
                </Field>

                <Field
                  label="Tanggal Selesai"
                  required
                  icon={<Calendar className="w-4 h-4" />}
                  error={errors.end_date?.message}
                >
                  <input
                    type="date"
                    {...register("end_date", {
                      required: "Tanggal selesai wajib diisi",
                    })}
                    className={inputCls}
                  />
                </Field>

                <Field
                  label="Waktu Mulai"
                  required
                  icon={<Clock className="w-4 h-4" />}
                  error={errors.start_time?.message}
                >
                  <input
                    type="time"
                    {...register("start_time", {
                      required: "Waktu mulai wajib diisi",
                    })}
                    className={inputCls}
                  />
                </Field>

                <Field
                  label="Waktu Selesai"
                  required
                  icon={<Clock className="w-4 h-4" />}
                  error={errors.end_time?.message}
                >
                  <input
                    type="time"
                    {...register("end_time", {
                      required: "Waktu selesai wajib diisi",
                    })}
                    className={inputCls}
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Detail & Pengaturan" step={3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  label="Lokasi / Platform"
                  required
                  icon={<MapPin className="w-4 h-4" />}
                  error={errors.location?.message}
                >
                  <input
                    type="text"
                    {...register("location", {
                      required: "Lokasi wajib diisi",
                    })}
                    className={inputCls}
                    placeholder="Zoom Meeting atau Jl. Sudirman No. 1"
                  />
                </Field>

                <Field
                  label="Tautan Eksternal"
                  icon={<LinkIcon className="w-4 h-4" />}
                >
                  <input
                    type="url"
                    {...register("link")}
                    className={inputCls}
                    placeholder="https://..."
                  />
                </Field>

                <Field
                  label="Kategori Event"
                  required
                  icon={<Tag className="w-4 h-4" />}
                  error={errors.event_category_id?.message}
                >
                  <select
                    {...register("event_category_id", {
                      required: "Kategori wajib dipilih",
                    })}
                    className={`${inputCls} appearance-none`}
                    disabled={isCategoriesLoading || !!categoriesError}
                  >
                    <option value="">
                      {isCategoriesLoading
                        ? "Memuat kategori..."
                        : categoriesError
                          ? "Gagal memuat kategori"
                          : "Pilih kategori…"}
                    </option>
                    {!isCategoriesLoading &&
                      !categoriesError &&
                      categories?.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </Field>

                <Field
                  label="Status"
                  required
                  icon={<Activity className="w-4 h-4" />}
                >
                  <select
                    {...register("status")}
                    className={`${inputCls} appearance-none`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Media" step={4}>
              <Field label="Cover Image">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`relative flex justify-center items-center rounded-xl border-2 border-dashed transition-all duration-200
                    ${isDragging ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}
                    ${coverPreview ? "p-0 overflow-hidden" : "px-6 py-12"}
                    group cursor-pointer`}
                >
                  {coverPreview ? (
                    <>
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                        <img
                          src={`${imageUrl}${coverPreview}`}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                          <UploadCloud className="w-7 h-7 text-white" />
                          <p className="text-white text-sm font-medium">
                            Klik untuk mengganti gambar
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </>
                  ) : (
                    <div className="text-center pointer-events-none">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-100 mb-4">
                        <UploadCloud className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer pointer-events-auto"
                        >
                          Pilih file
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageChange}
                          />
                        </label>{" "}
                        atau seret & lepas di sini
                      </p>
                      <p className="text-xs text-gray-400 mt-1.5">
                        PNG, JPG, GIF — maks. 5 MB
                      </p>
                    </div>
                  )}
                </div>
              </Field>
            </SectionCard>

            <div className="flex items-center justify-between gap-3 pt-2 pb-6">
              <p className="text-xs text-gray-400">
                <span className="text-red-500">*</span> Wajib diisi
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-150"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 flex items-center gap-2 shadow-sm shadow-blue-200"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Menyimpan…
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
