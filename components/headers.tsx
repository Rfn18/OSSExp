"use client";

import { Outfit } from "next/font/google";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Headers() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`sticky left-0 right-0 mx-auto z-50 flex justify-between items-center gap-8 transition-all duration-500 ease-in-out ${
        scrolled
          ? "top-4 w-[90%] max-w-7xl rounded-full border border-zinc-200/50 bg-white/70 backdrop-blur-xl shadow-lg dark:border-zinc-800/50 dark:bg-zinc-900/70 py-3 px-8"
          : "top-0 w-full bg-transparent border-transparent py-6 px-10"
      }`}
    >
      <div className="flex items-center gap-2">
        <img src="icon.svg" alt="Icon" width="40" height="40" />
        <Link
          className={`${outfit.className} text-2xl font-bold text-gradient`}
          href="/"
        >
          OSSEXP
        </Link>
      </div>

      <div className="flex items-center gap-8 text-sm font-medium text-zinc-900 dark:text-white">
        <p className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200">
          About OSS67
        </p>
        <Link
          className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200"
          href="/event"
        >
          Events
        </Link>
        <Link
          className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200"
          href="/calendar"
        >
          Calendar
        </Link>
        <Link
          className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200"
          href="/feedback"
        >
          Feedback
        </Link>
      </div>

      <div className="flex items-center text-sm gap-2">
        <Button variant="outline" className="w-20 h-10">
          Sign In
        </Button>
        <Button className="bg-gradient w-20 h-10">Sign Up</Button>
      </div>
    </div>
  );
}
