"use client";

import { useEffect, useState } from "react";
import { getWorkout } from "@/lib/api";
import type { Workout } from "@/lib/types";
import { PLAN_CAP, usePlan } from "@/context/PlanContext";
import PlanItem from "@/components/PlanItem";
import EmptyState from "@/components/EmptyState";
import Spinner from "@/components/Spinner";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const { plan, saved, done, hydrated, addToPlan, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [items, setItems] = useState<Record<number, Workout>>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("plan");

  
  useEffect(() => {
    if (!hydrated) return;
    const ids = Array.from(new Set([...plan, ...saved]));
    const missing = ids.filter((id) => !items[id]);
    if (missing.length === 0) {
      setLoading(false);
      return;
    }
    Promise.all(missing.map((id) => getWorkout(String(id))))
      .then((results) =>
        setItems((prev) => {
          const next = { ...prev };
          results.forEach((w) => {
            if (w) next[w.id] = w;
          });
          return next;
        })
      )
      .finally(() => setLoading(false));
    
  }, [hydrated, plan, saved]);

  const pick = (ids: number[]) => ids.map((id) => items[id]).filter((w): w is Workout => !!w);

  const planItems = pick(plan);
  const savedItems = pick(saved);
  const list = tab === "plan" ? planItems : savedItems;

  const totals = {
    exercises: planItems.length,
    minutes: planItems.reduce((s, w) => s + w.duration, 0),
    calories: planItems.reduce((s, w) => s + w.caloriesBurned, 0),
  };

  const metrics = [
    { label: "Exercises", value: totals.exercises },
    { label: "Minutes", value: totals.minutes },
    { label: "Calories", value: totals.calories },
  ];

  const tabs: { key: Tab; label: string }[] = [
    { key: "plan", label: "Today's Plan" },
    { key: "saved", label: "Saved" },
  ];

  return (
    <div>
      <h1 className="font-display-tight text-3xl font-bold sm:text-4xl">My Plan</h1>
      <p className="mt-1 text-sm text-base-content/60">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-base-300 bg-base-200 p-4">
            <p className="font-display-tight text-2xl font-bold text-accent sm:text-3xl">{m.value}</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-base-content/55">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      <div role="tablist" className="mt-8 flex gap-2 border-b border-base-300">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t.key
                ? "border-accent text-accent"
                : "border-transparent text-base-content/55 hover:text-base-content"
            }`}
          >
            {t.label}
            <span className="ml-2 text-xs opacity-70">
              {t.key === "plan" ? `${plan.length}/${PLAN_CAP}` : saved.length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {loading || !hydrated ? (
          <Spinner />
        ) : list.length === 0 ? (
          <EmptyState />
        ) : tab === "plan" ? (
          list.map((w) => (
            <PlanItem
              key={w.id}
              workout={w}
              done={done.includes(w.id)}
              onDone={() => markDone(w.id)}
              onRemove={() => removeFromPlan(w.id)}
            />
          ))
        ) : (
          list.map((w) => (
            <PlanItem
              key={w.id}
              workout={w}
              onAddToPlan={plan.includes(w.id) ? undefined : () => addToPlan(w.id, w.name)}
              onRemove={() => removeFromSaved(w.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

