import { Timestamp } from "firebase/firestore";

export interface WorkoutEntry {
  movement: string;
  reps: number;
  weight: number;
  notes?: string;
  setNum?: number;
}

export interface Workout {
  id: string;
  date: Timestamp;
  entries: WorkoutEntry[];
  createdAt: Timestamp;
}
