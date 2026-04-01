"use client";
import { Workout, WorkoutEntry } from "@/types";
import WorkoutEntryCard from "./WorkoutEntry";

interface Props {
  workout: Workout;
  onDeleteEntry?: (entryIndex: number) => void;
  showTime?: boolean;
}

export default function WorkoutList({ workout, onDeleteEntry, showTime = true }: Props) {
  const time = workout.date.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (workout.entries.length === 0) return null;

  return (
    <div style={{
      background: "var(--color-surface)",
      borderRadius: 18,
      border: "1px solid var(--color-border)",
      overflow: "hidden",
    }}>
      {showTime && (
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 12, color: "var(--color-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Session · {time}
          </span>
          <span style={{ fontSize: 12, color: "var(--color-muted)" }}>
            {workout.entries.length} set{workout.entries.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: 8 }}>
        {workout.entries.map((entry: WorkoutEntry, i: number) => (
          <WorkoutEntryCard
            key={i}
            entry={entry}
            index={i}
            onDelete={onDeleteEntry ? () => onDeleteEntry(i) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
