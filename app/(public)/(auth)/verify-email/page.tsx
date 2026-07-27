"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MailCheck, RotateCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/app/services/api";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export function VerifyEmailContent() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "nama@email.com";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const code = otp.join("");
  const isComplete = code.length === OTP_LENGTH;

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError(null);
    setSuccessMessage(null);
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!pasted) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill("");
    pasted
      .slice(0, OTP_LENGTH)
      .split("")
      .forEach((d, i) => (next[i] = d));
    setOtp(next);
    setError(null);
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    if (!isComplete) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // POST ke endpoint verify-email Laravel
      await api.post("/auth/verify-email", {
        email: email,
        code: code,
      });

      // Backend response format (sesuaikan dengan Laravel Anda):
      // {
      //   success: true,
      //   message: "Email berhasil diverifikasi"
      // }

      setSuccessMessage("Email berhasil diverifikasi!");

      // Delay sebentar untuk menampilkan success message, lalu redirect
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      // Handle error dari backend
      const errorMessage =
        err.response?.data?.message ||
        "Kode tidak valid. Periksa kembali dan coba lagi.";

      setError(errorMessage);

      // Jika kode salah, reset OTP input
      if (err.response?.status === 422 || err.response?.status === 400) {
        setOtp(Array(OTP_LENGTH).fill(""));
        inputsRef.current[0]?.focus();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0) return;

    setResending(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // POST ke endpoint resend-otp Laravel
      await api.post("/auth/resend-otp", {
        email: email,
      });

      // Backend response format (sesuaikan dengan Laravel Anda):
      // {
      //   success: true,
      //   message: "Kode OTP baru telah dikirim ke email Anda"
      // }

      setSuccessMessage("Kode OTP baru telah dikirim ke email Anda");
      setSecondsLeft(RESEND_SECONDS);
      setOtp(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Gagal mengirim ulang kode. Silakan coba lagi.";

      setError(errorMessage);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
          <MailCheck size={24} className="text-[#1e3a8a]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl font-bold text-gray-900">
            Verifikasi email kamu
          </h2>
          <p className="text-sm text-gray-500 max-w-xs">
            Kami telah mengirim kode 6 digit ke{" "}
            <span className="font-semibold text-gray-700">{email}</span>
          </p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-800">
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold">Berhasil!</p>
            <p className="text-sm mt-0.5 opacity-80">{successMessage}</p>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-green-600 hover:text-green-700 p-1"
          >
            <AlertCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-800">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold">Gagal!</p>
            <p className="text-sm mt-0.5 opacity-80">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-700 p-1"
          >
            <AlertCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              autoFocus={i === 0}
              disabled={loading}
              className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-lg font-bold rounded-xl border bg-white text-gray-900 focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 ${
                error
                  ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                  : "border-gray-200 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
              }`}
            />
          ))}
        </div>
      </div>

      <Button
        onClick={handleVerify}
        disabled={!isComplete || loading}
        className="w-full bg-gradient font-semibold text-white hover:opacity-90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed h-11 rounded-full"
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
            Memverifikasi...
          </span>
        ) : (
          "Verifikasi Email"
        )}
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-sm">
        <span className="text-gray-500">Tidak menerima kode?</span>
        <button
          onClick={handleResend}
          disabled={secondsLeft > 0 || resending}
          className="flex items-center gap-1 font-semibold text-[#1e3a8a] hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
        >
          <RotateCw size={12} className={resending ? "animate-spin" : ""} />
          {resending
            ? "Mengirim..."
            : secondsLeft > 0
              ? `Kirim ulang (${secondsLeft}s)`
              : "Kirim ulang"}
        </button>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
