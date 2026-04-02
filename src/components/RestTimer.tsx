"use client";
import { useState, useEffect } from "react";

export default function RestTimer() {
  const [seconds, setSeconds] = useState(90);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      // Optional: Play a subtle sound or trigger a vibration
      if ("vibrate" in navigator) navigator.vibrate([200, 100, 200]);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => setIsActive(!isActive);
  const reset = (s: number) => { setSeconds(s); setIsActive(true); };

  const format = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      zIndex: 100,
      background: "var(--color-surface)",
      border: "1.5px solid var(--color-border)",
      borderRadius: 20,
      padding: "12px 16px",
      boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      gap: 12,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    }} className="animate-fsu">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          REST
        </span>
        <span style={{ fontSize: 20, fontWeight: 800, color: isActive ? "var(--color-accent)" : "var(--color-text)", fontFamily: "monospace" }}>
          {format(seconds)}
        </span>
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        {!isActive && seconds === 0 ? (
          <button onClick={() => reset(90)} style={{
            background: "var(--color-primary)",
            border: "none",
            borderRadius: 10,
            padding: "8px 12px",
            color: "white",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer"
          }}>Reset</button>
        ) : (
          <button onClick={toggle} style={{
            background: isActive ? "rgba(255,71,87,0.15)" : "rgba(0,229,160,0.15)",
            border: "none",
            borderRadius: 10,
            padding: "8px 12px",
            color: isActive ? "var(--color-danger)" : "var(--color-accent)",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            width: 60,
          }}>
            {isActive ? "Stop" : "Start"}
          </button>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <button onClick={() => reset(60)} style={{ background: "none", border: "1px solid var(--color-border)", borderRadius: 6, padding: "2px 6px", color: "var(--color-muted)", fontSize: 10, cursor: "pointer" }}>60s</button>
          <button onClick={() => reset(120)} style={{ background: "none", border: "1px solid var(--color-border)", borderRadius: 6, padding: "2px 6px", color: "var(--color-muted)", fontSize: 10, cursor: "pointer" }}>120s</button>
        </div>
      </div>
    </div>
  );
}
