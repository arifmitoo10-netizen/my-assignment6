"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bookmark, Plus } from "lucide-react";
import { getWorkout } from "@/lib/api";
import type { Workout } from "@/lib/types";
import { PLAN_CAP, usePlan } from "@/context/PlanContext";
import TagPills from "@/components/TagPills";
import Spinner from "@/components/Spinner";
import { getImage } from "@/lib/images";

export default function WorkoutDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { plan, saved, addToPlan, saveForLater } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWorkout(id)
      .then(setWorkout)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner label="Loading workout…" />;

  if (!workout) {
    return (
      <div className="py-24 text-center">
        <h1 className="font-display-tight text-3xl font-bold">Workout not found</h1>
        <p className="mt-2 text-sm text-base-content/60">We couldn&apos;t find that workout.</p>
        <Link href="/" className="btn btn-primary btn-sm mt-6 font-bold">
          Back to workouts
        </Link>
      </div>
    );
  }

  const inPlan = plan.includes(workout.id);
  const isSaved = saved.includes(workout.id);
  const planFull = !inPlan && plan.length >= PLAN_CAP;

  const specs: [string, string][] = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", String(workout.sets)],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", String(workout.rating)],
  ];

  return (
    <div>
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-xs text-base-content/60 hover:text-accent">
        <ArrowLeft size={14} /> Back to library
      </Link>

      <div className="grid gap-8 md:grid-cols-2">

        <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-200 md:self-start">
          <img src={getImage(workout)} alt={workout.name} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="font-display-tight text-3xl font-bold sm:text-4xl">{workout.name}</h1>
            <p className="text-sm leading-relaxed text-base-content/65">{workout.description}</p>
            <TagPills tags={workout.muscleGroups} />
          </div>

          <div className="rounded-xl border border-base-300 bg-base-200 p-4">
            <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Key Specs</h2>
            <dl className="divide-y divide-base-300">
              {specs.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-2 text-sm">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-base-content/50">
                    {label}
                  </dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Instructions</h2>
            <ol className="space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-base-content/75">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(workout.id, workout.name)}
              disabled={inPlan || planFull}
              className="btn btn-primary btn-sm gap-2 font-bold sm:btn-md"
            >
              <Plus size={16} />
              {inPlan ? "In today's plan" : planFull ? `Plan full (${PLAN_CAP}/${PLAN_CAP})` : "Add to today's plan"}
            </button>
            <button
              onClick={() => saveForLater(workout.id, workout.name)}
              className="btn btn-outline btn-sm gap-2 font-bold sm:btn-md"
            >
              <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
              {isSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
