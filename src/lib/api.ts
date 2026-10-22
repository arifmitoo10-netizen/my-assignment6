import type { Workout } from "./types";

// Primary API first, alternative API as a fallback.
const BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function request<T>(suffix = ""): Promise<T> {
  let lastError: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${suffix}`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return (await res.json()) as T;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error("Unable to reach the API");
}

export const getWorkouts = () => request<Workout[]>();

export async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const data = await request<Workout | { error?: string }>(`/${id}`);
    if (!data || (data as Workout).id === undefined) return null;
    return data as Workout;
  } catch {
    return null;
  }
}
