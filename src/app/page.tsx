"use client";
import { useEffect, useState, useCallback } from "react";
import { Workout, WorkoutEntry } from "@/types";
import {
  addWorkout,
  getTodaysWorkouts,
  updateWorkoutEntries,
  getMovementNames,
} from "@/lib/firebase";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeWorkoutId, setActiveWorkoutId] = useState<string | null>(null);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long",
  });

  const load = useCallback(async () => {
    setLoading(true);
    const [ws, names] = await Promise.all([getTodaysWorkouts(), getMovementNames()]);
    setWorkouts(ws);
    setSuggestions(names);
    if (ws.length > 0 && !activeWorkoutId) setActiveWorkoutId(ws[0].id);
    setLoading(false);
  }, [activeWorkoutId]);

  useEffect(() => { load(); }, []); // eslint-disable-line

  const handleAddEntry = async (entry: WorkoutEntry) => {
    if (activeWorkoutId) {
      // Optimistically update
      setWorkouts((prev) =>
        prev.map((w) =>
          w.id === activeWorkoutId ? { ...w, entries: [...w.entries, entry] } : w
        )
      );
      const active = workouts.find((w) => w.id === activeWorkoutId);
      if (active) {
        await updateWorkoutEntries(activeWorkoutId, [...active.entries, entry]);
      }
    } else {
      // Create new workout session
      const id = await addWorkout([entry]);
      await load();
      setActiveWorkoutId(id);
    }
    // Update suggestions
    setSuggestions((prev) =>
      prev.includes(entry.movement) ? prev : [...prev, entry.movement].sort()
    );
  };

  const handleDeleteEntry = async (workoutId: string, entryIndex: number) => {
    const workout = workouts.find((w) => w.id === workoutId);
    if (!workout) return;
    const newEntries = workout.entries.filter((_, i) => i !== entryIndex);
    setWorkouts((prev) =>
      prev.map((w) => (w.id === workoutId ? { ...w, entries: newEntries } : w))
    );
    await updateWorkoutEntries(workoutId, newEntries);
  };

  const startNewSession = async () => {
    const id = await addWorkout([]);
    await load();
    setActiveWorkoutId(id);
  };

  const lastEntry =
    activeWorkoutId
      ? workouts.find((w) => w.id === activeWorkoutId)?.entries.slice(-1)[0]
      : undefined;

  const totalSets = workouts.reduce((sum, w) => sum + w.entries.length, 0);

  return (
    <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div>
        <p style={{ fontSize: 13, color: "var(--color-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {today}
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 4, lineHeight: 1.2, color: "var(--color-text)" }}>
          Today&apos;s Workout
        </h1>
        {totalSets > 0 && (
          <p style={{ fontSize: 14, color: "var(--color-accent)", marginTop: 6, fontWeight: 600 }}>
            {totalSets} set{totalSets !== 1 ? "s" : ""} logged 🔥
          </p>
        )}
      </div>

      {/* Form card */}
      <div style={{
        background: "var(--color-surface)",
        borderRadius: 20,
        padding: 20,
        border: "1px solid var(--color-border)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)" }}>Log a Set</h2>
          {workouts.length > 0 && (
            <button
              onClick={startNewSession}
              style={{
                fontSize: 12,
                color: "var(--color-accent)",
                background: "rgba(0,229,160,0.1)",
                border: "1px solid rgba(0,229,160,0.2)",
                borderRadius: 8,
                padding: "5px 10px",
                cursor: "pointer",
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
              }}
            >
              + New Session
            </button>
          )}
        </div>
        <WorkoutForm
          onAdd={handleAddEntry}
          lastEntry={lastEntry}
          suggestions={suggestions}
        />
      </div>

      {/* Today's workout lists */}
      {loading ? (
        <div style={{ textAlign: "center", color: "var(--color-muted)", padding: 40 }} className="animate-pulse-soft">
          Loading…
        </div>
      ) : workouts.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          background: "var(--color-surface)",
          borderRadius: 20,
          border: "1px dashed var(--color-border)",
          color: "var(--color-muted)",
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏋️‍♂️</div>
          <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>No sets yet today</p>
          <p style={{ fontSize: 14 }}>Log your first set above to get started!</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {workouts.map((workout) => (
            <WorkoutList
              key={workout.id}
              workout={workout}
              onDeleteEntry={
                workout.id === activeWorkoutId
                  ? (i) => handleDeleteEntry(workout.id, i)
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
