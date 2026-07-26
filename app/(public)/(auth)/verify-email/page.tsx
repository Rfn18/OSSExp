"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MailCheck, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export function VerifyEmailContent() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "nama@email.com";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setError(false);
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
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = () => {
    if (!isComplete) return;
    setLoading(true);
    // TODO: POST /api/auth/verify-email { email, code }
    setTimeout(() => {
      setLoading(false);
      const isValid = code !== "000000"; // contoh validasi mock
      if (!isValid) {
        setError(true);
        return;
      }
      router.push("/login");
    }, 800);
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    // TODO: POST /api/auth/resend-otp { email }
    setSecondsLeft(RESEND_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
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
              className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-lg font-bold rounded-xl border bg-white text-gray-900 focus:outline-none focus:ring-2 transition-colors ${
                error
                  ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                  : "border-gray-200 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
              }`}
            />
          ))}
        </div>
        {error && (
          <p className="text-center text-xs font-medium text-red-500">
            Kode tidak valid. Periksa kembali dan coba lagi.
          </p>
        )}
      </div>

      <Button
        onClick={handleVerify}
        disabled={!isComplete || loading}
        className="w-full bg-gradient font-semibold text-white hover:opacity-90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed h-11 rounded-full"
      >
        {loading ? "Memverifikasi..." : "Verifikasi Email"}
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-sm">
        <span className="text-gray-500">Tidak menerima kode?</span>
        <button
          onClick={handleResend}
          disabled={secondsLeft > 0}
          className="flex items-center gap-1 font-semibold text-[#1e3a8a] hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
        >
          <RotateCw size={12} />
          {secondsLeft > 0 ? `Kirim ulang (${secondsLeft}s)` : "Kirim ulang"}
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