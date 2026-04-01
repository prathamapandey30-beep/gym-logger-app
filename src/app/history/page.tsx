"use client";
import { useEffect, useState } from "react";
import { Workout } from "@/types";
import { getAllWorkouts } from "@/lib/firebase";
import WorkoutList from "@/components/WorkoutList";

function groupByDate(workouts: Workout[]) {
  const groups: Record<string, Workout[]> = {};
  workouts.forEach((w) => {
    const date = w.date.toDate().toLocaleDateString("en-GB", {
      weekday: "short", day: "numeric", month: "long", year: "numeric",
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(w);
  });
  return groups;
}

export default function HistoryPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllWorkouts().then((ws) => {
      setWorkouts(ws);
      setLoading(false);
    });
  }, []);

  const grouped = groupByDate(workouts);
  const dates = Object.keys(grouped);
  const totalSets = workouts.reduce((s, w) => s + w.entries.length, 0);

  return (
    <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div>
        <p style={{ fontSize: 13, color: "var(--color-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          All Time
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 4, color: "var(--color-text)" }}>
          Workout History
        </h1>
        {totalSets > 0 && (
          <p style={{ fontSize: 14, color: "var(--color-primary)", marginTop: 6, fontWeight: 600 }}>
            {totalSets} total sets · {dates.length} session{dates.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", color: "var(--color-muted)", padding: 40 }} className="animate-pulse-soft">
          Loading…
        </div>
      ) : dates.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          background: "var(--color-surface)",
          borderRadius: 20,
          border: "1px dashed var(--color-border)",
          color: "var(--color-muted)",
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
          <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>No history yet</p>
          <p style={{ fontSize: 14 }}>Your logged workouts will appear here.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {dates.map((date) => (
            <div key={date} className="animate-fsu">
              {/* Date header */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}>
                <span style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--color-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}>
                  {date}
                </span>
                <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
              </div>

              {/* Sessions for that date */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {grouped[date].map((w) => (
                  <WorkoutList key={w.id} workout={w} showTime={grouped[date].length > 1} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
