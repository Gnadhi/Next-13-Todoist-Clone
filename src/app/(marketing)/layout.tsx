"use client";

import Header from "@/ui/marketing/Header";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
