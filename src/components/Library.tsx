"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";
import WorkoutCard from "./WorkoutCard";
import Spinner from "./Spinner";

type SortKey = "duration" | "caloriesBurned" | "rating";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "caloriesBurned", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? workouts.filter(
        (w) =>
          w.name.toLowerCase().includes(q) || w.muscleGroups.some((m) => m.toLowerCase().includes(q))
      )
      : workouts;
    return [...filtered].sort((a, b) =>
      sortBy === "duration" ? a.duration - b.duration : b[sortBy] - a[sortBy]
    );
  }, [workouts, sortBy, query]);

  return (
    <section id="library" className="scroll-mt-20 pt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display-tight text-2xl font-bold">The Library</h2>
          <p className="mt-1 text-xs text-base-content/55">Twelve lifts covering every major muscle group.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="input input-sm input-bordered flex items-center gap-2 bg-base-200">
            <Search size={14} className="opacity-60" />
            <input
              type="text"
              placeholder="Search name or tag"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-36 grow"
            />
          </label>

          <label className="flex items-center gap-2 text-xs text-base-content/60">
            Sort By
            <span className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="select select-sm select-bordered appearance-none bg-base-200 pr-8 text-xs font-semibold text-base-content"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
            </span>
          </label>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="py-16 text-center text-sm text-error">Could not load workouts. Please refresh the page.</p>
      ) : visible.length === 0 ? (
        <p className="py-16 text-center text-sm text-base-content/60">No workouts match your search.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}
