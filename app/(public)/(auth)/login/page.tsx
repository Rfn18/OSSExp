"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = email.trim() && password.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    // TODO: POST /api/auth/login
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-bold text-gray-900">
          Selamat datang kembali
        </h2>
        <p className="text-sm text-gray-500">
          Masuk untuk melanjutkan ke dashboard OSS67 kamu.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              autoFocus
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[#1e3a8a] hover:underline"
            >
              Lupa password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
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
        </div>

        <Button
          type="submit"
          disabled={!isValid || loading}
          className="w-full bg-gradient font-semibold text-white hover:opacity-90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed h-11 rounded-full mt-2"
        >
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400">atau</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <button className="w-full flex items-center justify-center gap-2.5 h-11 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
          <path
            fill="#4285F4"
            d="M15.68 8.18c0-.56-.05-1.1-.14-1.62H8v3.07h4.3a3.68 3.68 0 0 1-1.6 2.42v2h2.58c1.51-1.39 2.4-3.44 2.4-5.87Z"
          />
          <path
            fill="#34A853"
            d="M8 16c2.16 0 3.97-.71 5.29-1.94l-2.58-2c-.72.48-1.63.76-2.71.76-2.08 0-3.85-1.4-4.48-3.29H.86v2.07A8 8 0 0 0 8 16Z"
          />
          <path
            fill="#FBBC05"
            d="M3.52 9.53a4.8 4.8 0 0 1 0-3.06V4.4H.86a8 8 0 0 0 0 7.2l2.66-2.07Z"
          />
          <path
            fill="#EA4335"
            d="M8 3.18c1.17 0 2.23.4 3.06 1.19l2.3-2.3A7.9 7.9 0 0 0 8 0 8 8 0 0 0 .86 4.4l2.66 2.07C4.15 4.58 5.92 3.18 8 3.18Z"
          />
        </svg>
        Masuk dengan Google
      </button>

      <p className="text-center text-sm text-gray-500">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#1e3a8a] hover:underline"
        >
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}
