"use client";

import { useState } from "react";
import {
  Lightbulb,
  MessageSquareWarning,
  Heart,
  AlertTriangle,
  Send,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = "kritik" | "saran" | "apresiasi" | "laporan";

const categories: {
  key: Category;
  label: string;
  icon: React.ReactNode;
  active: string;
}[] = [
  {
    key: "kritik",
    label: "Kritik",
    icon: <MessageSquareWarning size={16} />,
    active: "bg-red-50 border-red-200 text-red-600",
  },
  {
    key: "saran",
    label: "Saran",
    icon: <Lightbulb size={16} />,
    active: "bg-yellow-50 border-yellow-300 text-yellow-700",
  },
  {
    key: "apresiasi",
    label: "Apresiasi",
    icon: <Heart size={16} />,
    active: "bg-pink-50 border-pink-200 text-pink-600",
  },
  {
    key: "laporan",
    label: "Laporan Masalah",
    icon: <AlertTriangle size={16} />,
    active: "bg-blue-50 border-blue-200 text-[#1e3a8a]",
  },
];

const MAX_MESSAGE = 500;

export default function FeedbackPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValid = category !== null && message.trim().length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    // TODO: POST /api/feedback { category, message, name }
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setCategory(null);
    setMessage("");
    setName("");
    setSubmitted(false);
  };

  return (
    <div className="w-full font-sans dark:bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 pt-4">
        <div className="mb-8 sm:mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1e3a8a] mb-2">
            Kotak Kritik & Saran
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-foreground">
            Suaramu, kemajuan{" "}
            <span className="relative inline-block">
              <span className="absolute bottom-1 left-0 -z-10 h-3 w-full -rotate-1 bg-yellow-400/80 rounded" />
              kami
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
            Sampaikan kritik, saran, atau apresiasi untuk OSIS SMK Bhakti Wiyata
            &amp; SMK TI Pelita Nusantara. Setiap masukan jadi bahan evaluasi
            kami untuk terus berkembang.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-10">
          {/* ── Form Card ── */}
          <div className="flex-1 min-w-0 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-7 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10 sm:py-14">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                  <CheckCircle2 size={26} className="text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Terima kasih atas masukanmu!
                </h3>
                <p className="text-sm text-gray-500 mt-1.5 max-w-xs leading-relaxed">
                  Feedback kamu sudah kami terima dan akan ditinjau oleh
                  pengurus OSIS.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-5 py-2.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 text-sm font-semibold rounded-full transition-colors"
                >
                  Kirim Feedback Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Kategori */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2.5">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    {categories.map((c) => {
                      const isActive = category === c.key;
                      return (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => setCategory(c.key)}
                          className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-colors ${
                            isActive
                              ? c.active
                              : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {c.icon}
                          <span className="text-center leading-tight">
                            {c.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pesan */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                      Pesan <span className="text-red-500">*</span>
                    </label>
                    <span
                      className={`text-xs ${
                        message.length > MAX_MESSAGE
                          ? "text-red-500 font-semibold"
                          : "text-gray-400"
                      }`}
                    >
                      {message.length}/{MAX_MESSAGE}
                    </span>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value.slice(0, MAX_MESSAGE))
                    }
                    placeholder="Ceritakan kritik, saran, atau apresiasi kamu secara detail..."
                    rows={6}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">
                    Minimal 10 karakter agar pesan mudah dipahami.
                  </p>
                </div>

                {/* Nama */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nama Pengirim{" "}
                    <span className="text-gray-400 font-normal">
                      (opsional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Kosongkan jika ingin mengirim secara anonim"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!isValid || loading}
                  className="w-full sm:w-fit sm:self-end bg-gradient font-semibold text-white hover:opacity-90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed h-11 px-6 rounded-full"
                >
                  <Send size={16} />
                  {loading ? "Mengirim..." : "Kirim Feedback"}
                </Button>
              </form>
            )}
          </div>

          {/* ── Info Sidebar ── */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} className="text-[#1e3a8a]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Identitas aman
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Nama bersifat opsional, kamu bebas mengirim secara anonim.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[#1e3a8a]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Ditinjau berkala
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Setiap feedback dibahas dalam rapat evaluasi pengurus OSIS.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[#1e3a8a]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Butuh respons cepat?
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Hubungi kami langsung di{" "}
                    <span className="font-medium text-gray-700">
                      oss67@bhaktiwiyata.sch.id
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0f1e4d] via-[#1e3a8a] to-[#2b4fc0] p-5 sm:p-6 text-white">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-100/70 mb-1.5">
                Kenapa Penting
              </p>
              <p className="text-sm leading-relaxed text-white/90">
                Setiap masukan membantu kami menyusun program kerja yang lebih
                tepat sasaran dan sesuai kebutuhan siswa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
