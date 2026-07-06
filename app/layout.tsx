import type { Metadata } from "next";
import { Poppins, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Providers } from "@/components/providers";
config.autoAddCss = false;

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OSSEXP - Website OSIS SMK Bhakta",
  description:
    "Explore the OSSEXP website, the official platform of OSIS SMK Bhakta, where you can find all the latest news, events, and activities related to our student organization. Stay connected and informed with OSSEXP!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${poppins.className} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col items-center">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
