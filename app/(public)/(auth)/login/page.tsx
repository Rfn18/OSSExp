"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/app/services/api";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = email.trim() && password.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/login", {
        email: email.trim(),
        password: password,
      });
      const { token, user, expires_in, token_type } = response?.data?.data;

      login({ token, user, expires_in, token_type });

      router.push("/admin");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Email atau password salah. Silakan coba lagi.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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

      {/* Error Alert */}
      {error && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-800">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold">Login Gagal</p>
            <p className="text-sm mt-0.5 opacity-80">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null); // Clear error saat user mulai mengetik
              }}
              placeholder="nama@email.com"
              autoFocus
              disabled={loading}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] disabled:opacity-50"
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
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null); // Clear error saat user mulai mengetik
              }}
              placeholder="Masukkan password"
              disabled={loading}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
              disabled={loading}
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
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin w-4 h-4"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Memproses...
            </span>
          ) : (
            "Masuk"
          )}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400">atau</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <button
        disabled={loading}
        className="w-full flex items-center justify-center gap-2.5 h-11 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 disabled:opacity-50"
      >
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
