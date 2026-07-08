"use client";

import React, { useMemo, useState } from "react";
import {
  Bell,
  Image as ImageIcon,
  Link2,
  Send,
  Search,
  X,
  AlertTriangle,
  Check,
  Trash2,
  MailOpen,
  Mail,
  Globe,
} from "lucide-react";
import { DashboardHeader } from "@/components/admin/dashboardHeder";
import { Button } from "@/components/ui/button";

type NotificationItem = {
  id: string;
  user_id: string;
  userName: string;
  title: string;
  body: string;
  icon: string;
  url: string;
  is_read: boolean;
  sent_at: string; // ISO date
};

type StatusFilter = "all" | "read" | "unread";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const DEFAULT_ICON =
  "https://api.dicebear.com/7.x/shapes/svg?seed=notif&backgroundColor=1e3a8a";

export default function NotificationSettingPage() {
  const [pushEnabled, setPushEnabled] = useState(true);

  // --- Form state ---
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [icon, setIcon] = useState("");
  const [url, setUrl] = useState("");
  const [sending, setSending] = useState(false);

  // --- History state ---
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n1",
      user_id: "u1",
      userName: "Ahmad Fauzi",
      title: "Rawat Inap Baru",
      body: "Pasien baru telah didaftarkan ke ruang Melati 2.",
      icon: DEFAULT_ICON,
      url: "/pasien/1023",
      is_read: false,
      sent_at: "2026-07-06T08:12:00",
    },
    {
      id: "n2",
      user_id: "u2",
      userName: "Siti Rahma",
      title: "Hasil Lab Tersedia",
      body: "Hasil pemeriksaan laboratorium atas nama Budi Santoso sudah bisa dilihat.",
      icon: DEFAULT_ICON,
      url: "/lab/hasil/551",
      is_read: true,
      sent_at: "2026-07-05T16:40:00",
    },
    {
      id: "n3",
      user_id: "u1",
      userName: "Ahmad Fauzi",
      title: "Jadwal Kontrol Diperbarui",
      body: "Jadwal kontrol pasien dipindahkan ke 10 Juli 2026 pukul 09.00.",
      icon: DEFAULT_ICON,
      url: "/jadwal/889",
      is_read: false,
      sent_at: "2026-07-04T11:05:00",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deletingItem, setDeletingItem] = useState<NotificationItem | null>(
    null,
  );

  const filteredNotifications = useMemo(() => {
    return notifications
      .filter((n) =>
        (n.title + n.body + n.userName)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
      .filter((n) => {
        if (statusFilter === "read") return n.is_read;
        if (statusFilter === "unread") return !n.is_read;
        return true;
      })
      .sort(
        (a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime(),
      );
  }, [notifications, searchQuery, statusFilter]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const resetForm = () => {
    setTitle("");
    setBody("");
    setIcon("");
    setUrl("");
  };

  const handleSend = () => {
    if (!title.trim() || !body.trim()) return;
    setSending(true);

    const newItem: NotificationItem = {
      id: `n-${Date.now()}`,
      user_id: "u1",
      userName: "Semua Pengguna",
      title: title.trim(),
      body: body.trim(),
      icon: icon.trim() || DEFAULT_ICON,
      url: url.trim() || "/",
      is_read: false,
      sent_at: new Date().toISOString(),
    };

    setTimeout(() => {
      setNotifications((prev) => [newItem, ...prev]);
      setSending(false);
      resetForm();
    }, 500);
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: !n.is_read } : n)),
    );
  };

  const handleDelete = () => {
    if (!deletingItem) return;
    setNotifications((prev) => prev.filter((n) => n.id !== deletingItem.id));
    setDeletingItem(null);
  };

  return (
    <div className="w-auto h-auto min-h-full font-sans text-gray-900 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <DashboardHeader
          title="Notification Setting"
          description="Kelola dan kirim notifikasi popup browser ke pengguna"
          isGreeting={false}
        />
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full w-fit">
            <Bell size={12} /> {unreadCount} belum dibaca
          </span>
          <Switch checked={pushEnabled} onChange={setPushEnabled} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* --- Form Compose --- */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900">
              Buat Notifikasi
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Konten yang akan dikirim sebagai popup notifikasi browser
            </p>
          </div>

          <div className="px-6 py-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Judul <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Rawat Inap Baru"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Isi Pesan <span className="text-red-500">*</span>
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tulis isi notifikasi..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Icon URL{" "}
                  <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="https://..."
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Target URL{" "}
                  <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <div className="relative">
                  <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="/pasien/1023"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-gray-100">
            <button
              onClick={resetForm}
              className="px-5 py-2.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 text-sm font-semibold rounded-xl transition-colors"
            >
              Reset
            </button>
            <Button
              onClick={handleSend}
              disabled={!title.trim() || !body.trim() || sending}
              className="bg-gradient font-semibold text-white hover:opacity-90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={16} /> {sending ? "Mengirim..." : "Kirim Notifikasi"}
            </Button>
          </div>
        </div>

        {/* --- Live Preview --- */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900">Pratinjau</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Tampilan popup di browser pengguna
            </p>
          </div>

          <div className="px-6 py-8 flex items-center justify-center bg-gray-50/60 min-h-[220px]">
            <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg border border-gray-100 p-3.5">
              <div className="flex items-start gap-3">
                <img
                  src={icon.trim() || DEFAULT_ICON}
                  alt="icon"
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Globe size={10} className="text-gray-400 flex-shrink-0" />
                    <p className="text-[11px] text-gray-400 truncate">
                      dahahusada.rsud.id
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {title.trim() || "Judul Notifikasi"}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                    {body.trim() || "Isi pesan notifikasi akan tampil di sini."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- History Table --- */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Riwayat Notifikasi
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {filteredNotifications.length} notifikasi ditemukan
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              {(["all", "unread", "read"] as StatusFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    statusFilter === f
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {f === "all"
                    ? "Semua"
                    : f === "unread"
                      ? "Belum Dibaca"
                      : "Dibaca"}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari notifikasi..."
                className="pl-10 pr-4 py-2 w-52 rounded-full border border-gray-200 bg-white text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                  Notifikasi
                </th>
                <th className="text-left font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                  Target URL
                </th>
                <th className="text-left font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                  Terkirim
                </th>
                <th className="text-center font-semibold text-gray-500 text-xs uppercase tracking-wide px-4 py-3.5">
                  Status
                </th>
                <th className="text-right font-semibold text-gray-500 text-xs uppercase tracking-wide px-6 py-3.5">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((n) => (
                  <tr
                    key={n.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3 max-w-xs">
                        <img
                          src={n.icon}
                          alt=""
                          className="w-9 h-9 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {n.body}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 max-w-[160px] truncate">
                        <Link2 size={12} className="flex-shrink-0" />
                        {n.url}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">
                      {formatDate(n.sent_at)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => toggleRead(n.id)}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                          n.is_read
                            ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            : "bg-blue-50 text-[#1e3a8a] hover:bg-blue-100"
                        }`}
                        title={
                          n.is_read ? "Tandai belum dibaca" : "Tandai dibaca"
                        }
                      >
                        {n.is_read ? (
                          <MailOpen size={12} />
                        ) : (
                          <Mail size={12} />
                        )}
                        {n.is_read ? "Dibaca" : "Belum Dibaca"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setDeletingItem(n)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                          title="Hapus notifikasi"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <p className="text-sm text-gray-400">
                      Tidak ada notifikasi yang ditemukan
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Delete Confirmation Modal --- */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDeletingItem(null)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 pt-6 pb-2 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Hapus Notifikasi?
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Notifikasi{" "}
                <span className="font-semibold text-gray-700">
                  "{deletingItem.title}"
                </span>{" "}
                akan dihapus permanen dan tidak bisa dikembalikan.
              </p>
            </div>

            <div className="flex items-center gap-3 px-6 py-5 mt-2">
              <button
                onClick={() => setDeletingItem(null)}
                className="flex-1 px-5 py-2.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 text-sm font-semibold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Custom Switch (master toggle) ---
function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
        checked ? "bg-[#1e3a8a]" : "bg-gray-200"
      }`}
      title={checked ? "Notifikasi aktif" : "Notifikasi nonaktif"}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform flex items-center justify-center ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {checked && (
          <Check size={10} className="text-[#1e3a8a]" strokeWidth={3} />
        )}
      </span>
    </button>
  );
}
