"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const path = usePathname();

  const linkStyle = (href: string): React.CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: "8px 20px",
    borderRadius: 12,
    textDecoration: "none",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: path === href ? "var(--color-primary)" : "var(--color-muted)",
    background: path === href ? "rgba(124,111,255,0.12)" : "transparent",
    transition: "all 0.2s ease",
  });

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(9,9,15,0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--color-border)",
    }}>
      <div style={{
        maxWidth: 480,
        margin: "0 auto",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{
          fontSize: 18,
          fontWeight: 800,
          background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          💪 GymLog
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          <Link href="/" style={linkStyle("/")}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Today
          </Link>
          <Link href="/history" style={linkStyle("/history")}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            History
          </Link>
        </div>
      </div>
    </nav>
  );
}
