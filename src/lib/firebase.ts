import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { WorkoutEntry, Workout } from "@/types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const workoutsRef = collection(db, "workouts");

export async function addWorkout(entries: WorkoutEntry[]): Promise<string> {
  try {
    const now = Timestamp.now();
    const ref = await addDoc(workoutsRef, { date: now, entries, createdAt: now });
    return ref.id;
  } catch (error) {
    console.error("Failed to add workout:", error);
    throw error;
  }
}

export async function updateWorkoutEntries(id: string, entries: WorkoutEntry[]) {
  try {
    await updateDoc(doc(db, "workouts", id), { entries });
  } catch (error) {
    console.error("Failed to update workout entries:", error);
    throw error;
  }
}

export async function deleteWorkout(id: string) {
  await deleteDoc(doc(db, "workouts", id));
}

export async function getTodaysWorkouts(): Promise<Workout[]> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const q = query(
      workoutsRef,
      where("date", ">=", Timestamp.fromDate(today)),
      where("date", "<", Timestamp.fromDate(tomorrow)),
      orderBy("date", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Workout[];
  } catch (error) {
    console.error("Failed to fetch today's workouts:", error);
    return [];
  }
}

export async function getAllWorkouts(): Promise<Workout[]> {
  try {
    const q = query(workoutsRef, orderBy("date", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Workout[];
  } catch (error) {
    console.error("Failed to fetch all workouts:", error);
    return [];
  }
}

export async function getMovementNames(): Promise<string[]> {
  const workouts = await getAllWorkouts();
  const movements = new Set<string>();
  workouts.forEach((w) => w.entries.forEach((e) => movements.add(e.movement)));
  return Array.from(movements).sort();
}

export { db };
