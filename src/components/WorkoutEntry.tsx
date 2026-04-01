"use client";
import { WorkoutEntry as Entry } from "@/types";

interface Props {
  entry: Entry;
  index: number;
  onDelete?: () => void;
}

export default function WorkoutEntryCard({ entry, index, onDelete }: Props) {
  return (
    <div
      className="animate-fsu"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        background: "var(--color-card)",
        borderRadius: 14,
        border: "1px solid var(--color-border)",
        animationDelay: `${index * 40}ms`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "rgba(124,111,255,0.15)",
          color: "var(--color-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
          flexShrink: 0,
        }}>
          {index + 1}
        </span>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, color: "var(--color-text)" }}>
            {entry.movement}
          </div>
          <div style={{ fontSize: 13, color: "var(--color-muted)", marginTop: 2 }}>
            {entry.reps} reps · {entry.weight} kg
          </div>
        </div>
      </div>
      {onDelete && (
        <button
          onClick={onDelete}
          style={{
            background: "none",
            border: "none",
            color: "var(--color-muted)",
            cursor: "pointer",
            padding: 8,
            borderRadius: 8,
            fontSize: 16,
            lineHeight: 1,
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--color-danger)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--color-muted)")}
          title="Remove entry"
        >
          ✕
        </button>
      )}
    </div>
  );
}
