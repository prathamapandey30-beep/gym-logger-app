"use client";
import { useState, useEffect, useRef } from "react";
import { WorkoutEntry } from "@/types";

interface Props {
  onAdd: (entry: WorkoutEntry) => void;
  lastEntry?: WorkoutEntry;
  suggestions: string[];
  currentEntries?: WorkoutEntry[];
}

export default function WorkoutForm({ onAdd, lastEntry, suggestions, currentEntries }: Props) {
  const [movement, setMovement] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [notes, setNotes] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = suggestions.filter(
    (s) => s.toLowerCase().includes(movement.toLowerCase()) && movement.length > 0
  );

  const setNum = (currentEntries?.filter(e => e.movement.toLowerCase() === movement.toLowerCase()).length || 0) + 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!movement.trim() || !reps || !weight) return;
    setLoading(true);
    const w = unit === "lbs" ? parseFloat(weight) * 0.453592 : parseFloat(weight);
    await onAdd({
      movement: movement.trim(),
      reps: parseInt(reps),
      weight: parseFloat(w.toFixed(1)),
      notes: notes.trim() || undefined,
      setNum,
    });
    setMovement("");
    setReps("");
    setWeight("");
    setNotes("");
    setLoading(false);
    inputRef.current?.focus();
  };

  const quickAdd = () => {
    if (!lastEntry) return;
    setMovement(lastEntry.movement);
    setReps(String(lastEntry.reps));
    const displayWeight = unit === "lbs"
      ? (lastEntry.weight * 2.20462).toFixed(1)
      : String(lastEntry.weight);
    setWeight(displayWeight);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--color-surface)",
    border: "1.5px solid var(--color-border)",
    borderRadius: 12,
    padding: "14px 16px",
    color: "var(--color-text)",
    fontSize: 16,
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "var(--font-sans)",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Movement input with autocomplete */}
      <div style={{ position: "relative" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Exercise (e.g. Bench Press)"
          value={movement}
          onChange={(e) => { setMovement(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          style={inputStyle}
          autoComplete="off"
        />
        {movement && (
          <div style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 12,
            fontWeight: 800,
            color: "var(--color-primary)",
            background: "rgba(124,111,255,0.1)",
            padding: "4px 8px",
            borderRadius: 6,
            pointerEvents: "none",
          }}>
            SET {setNum}
          </div>
        )}
        {showSuggestions && filtered.length > 0 && (
          <div style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            zIndex: 100,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }} className="animate-fade">
            {filtered.slice(0, 5).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { setMovement(s); setShowSuggestions(false); }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  background: "none",
                  border: "none",
                  color: "var(--color-text)",
                  fontSize: 15,
                  cursor: "pointer",
                  borderBottom: "1px solid var(--color-border)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reps + Weight row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, alignItems: "center" }}>
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          min={1}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder={`Weight (${unit})`}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          min={0}
          step={0.5}
          style={inputStyle}
        />
        {/* Unit toggle */}
        <button
          type="button"
          onClick={() => setUnit(u => u === "kg" ? "lbs" : "kg")}
          style={{
            padding: "14px 10px",
            background: "var(--color-surface)",
            border: "1.5px solid var(--color-border)",
            borderRadius: 12,
            color: "var(--color-muted)",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-sans)",
          }}
        >
          {unit}
        </button>
      </div>

      {/* Quick-add + Submit */}
      <div style={{ display: "flex", gap: 8 }}>
        {lastEntry && (
          <button
            type="button"
            onClick={quickAdd}
            title={`Quick-add: ${lastEntry.movement} ${lastEntry.reps}×${lastEntry.weight}kg`}
            style={{
              flex: "0 0 auto",
              padding: "14px 16px",
              background: "rgba(0,229,160,0.1)",
              border: "1.5px solid rgba(0,229,160,0.25)",
              borderRadius: 12,
              color: "var(--color-accent)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-sans)",
            }}
          >
            ↩ Last set
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !movement.trim() || !reps || !weight}
          style={{
            flex: 1,
            padding: "14px",
            background: loading || !movement.trim() || !reps || !weight
              ? "rgba(124,111,255,0.3)"
              : "var(--color-primary)",
            border: "none",
            borderRadius: 12,
            color: "white",
            fontSize: 16,
            fontWeight: 700,
            cursor: loading ? "wait" : "pointer",
            transition: "all 0.2s",
            fontFamily: "var(--font-sans)",
            boxShadow: !loading && movement && reps && weight
              ? "0 4px 20px rgba(124,111,255,0.35)"
              : "none",
          }}
        >
          {loading ? "Adding…" : "+ Log Set"}
        </button>
      </div>

      {/* Notes Field */}
      <input
        type="text"
        placeholder="Notes (optional, e.g. 'Paused reps')"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ ...inputStyle, padding: "10px 14px", fontSize: 14 }}
      />
    </form>
  );
}
