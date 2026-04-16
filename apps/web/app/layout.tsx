import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/syne/400.css";
import "@fontsource/syne/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Backend-first Fullstack",
  description: "Personal portfolio with a production-minded backend and a polished frontend experience.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
