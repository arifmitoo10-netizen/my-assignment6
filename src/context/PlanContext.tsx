"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

export const PLAN_CAP = 5;
const STORAGE_KEY = "fitlog:v1";

interface State {
  plan: number[]; // workout ids in today's plan
  saved: number[]; // workout ids saved for later
  done: number[]; // workout ids marked as done
}

interface PlanContextValue extends State {
  hydrated: boolean;
  addToPlan: (id: number, name?: string) => void;
  saveForLater: (id: number, name?: string) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  const [state, setState] = useState<State>({ plan: [], saved: [], done: [] });
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once on the client
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({
          plan: Array.isArray(parsed.plan) ? parsed.plan : [],
          saved: Array.isArray(parsed.saved) ? parsed.saved : [],
          done: Array.isArray(parsed.done) ? parsed.done : [],
        });
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable */
    }
  }, [state, hydrated]);

  const addToPlan = useCallback(
    (id: number, name = "Workout") => {
      if (state.plan.includes(id)) return showToast(`${name} is already in today's plan`, "info");
      if (state.plan.length >= PLAN_CAP)
        return showToast(`Today's plan is full (${PLAN_CAP} lifts max)`, "error");
      setState((s) => ({ ...s, plan: [...s.plan, id] }));
      showToast(`Added to today's plan: ${name}`);
    },
    [state.plan, showToast]
  );

  const saveForLater = useCallback(
    (id: number, name = "Workout") => {
      if (state.saved.includes(id)) return showToast(`${name} is already saved`, "info");
      setState((s) => ({ ...s, saved: [...s.saved, id] }));
      showToast(`Saved for later: ${name}`);
    },
    [state.saved, showToast]
  );

  const removeFromPlan = useCallback(
    (id: number) => {
      setState((s) => ({
        ...s,
        plan: s.plan.filter((x) => x !== id),
        done: s.done.filter((x) => x !== id),
      }));
      showToast("Removed from today's plan", "info");
    },
    [showToast]
  );

  const removeFromSaved = useCallback(
    (id: number) => {
      setState((s) => ({ ...s, saved: s.saved.filter((x) => x !== id) }));
      showToast("Removed from saved", "info");
    },
    [showToast]
  );

  const markDone = useCallback(
    (id: number) => {
      setState((s) => (s.done.includes(id) ? s : { ...s, done: [...s.done, id] }));
      showToast("Nice work! Workout marked as done");
    },
    [showToast]
  );

  return (
    <PlanContext.Provider
      value={{ ...state, hydrated, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
};
