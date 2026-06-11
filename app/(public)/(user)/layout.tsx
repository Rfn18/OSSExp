"use client";

import Footer from "@/components/user/footer";
import Headers from "@/components/user/headers";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Headers />
      <main>{children}</main>
      <Footer />
    </>
  );
}
