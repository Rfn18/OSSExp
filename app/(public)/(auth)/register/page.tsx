"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score; // 0-4
}

const STRENGTH_LABEL = [
  "Sangat lemah",
  "Lemah",
  "Cukup",
  "Kuat",
  "Sangat kuat",
];
const STRENGTH_COLOR = [
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-blue-500",
  "bg-emerald-500",
];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => getStrength(password), [password]);
  const isValid = name.trim() && email.trim() && password.length >= 8 && agree;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    // TODO: POST /api/auth/register lalu kirim OTP ke email
    setTimeout(() => {
      setLoading(false);
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-bold text-gray-900">Buat akun baru</h2>
        <p className="text-sm text-gray-500">
          Gabung dan mulai jelajahi dokumentasi event OSS67.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nama Lengkap
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Fasterino Rafael V."
              autoFocus
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Strength meter */}
          {password.length > 0 && (
            <div className="mt-2 flex flex-col gap-1.5">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i < strength ? STRENGTH_COLOR[strength] : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400">
                Kekuatan password:{" "}
                <span className="font-semibold text-gray-600">
                  {STRENGTH_LABEL[strength]}
                </span>
              </p>
            </div>
          )}
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer mt-1">
          <button
            type="button"
            onClick={() => setAgree((v) => !v)}
            className={`mt-0.5 w-4.5 h-4.5 w-[18px] h-[18px] flex-shrink-0 rounded-md border flex items-center justify-center transition-colors ${
              agree
                ? "bg-[#1e3a8a] border-[#1e3a8a]"
                : "bg-white border-gray-300 hover:border-gray-400"
            }`}
          >
            {agree && (
              <Check size={12} className="text-white" strokeWidth={3} />
            )}
          </button>
          <span className="text-xs text-gray-500 leading-relaxed">
            Saya menyetujui{" "}
            <Link
              href="/terms"
              className="font-semibold text-[#1e3a8a] hover:underline"
            >
              Syarat Layanan
            </Link>{" "}
            dan{" "}
            <Link
              href="/privacy"
              className="font-semibold text-[#1e3a8a] hover:underline"
            >
              Kebijakan Privasi
            </Link>{" "}
            OSS67.
          </span>
        </label>

        <Button
          type="submit"
          disabled={!isValid || loading}
          className="w-full bg-gradient font-semibold text-white hover:opacity-90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed h-11 rounded-full mt-2"
        >
          {loading ? "Membuat akun..." : "Daftar"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#1e3a8a] hover:underline"
        >
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
