import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Gym Logger",
  description: "A fast, minimal gym workout logger. Log sets in under 5 seconds.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "var(--color-bg)" }}>
        <NavBar />
        <main style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 80px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
