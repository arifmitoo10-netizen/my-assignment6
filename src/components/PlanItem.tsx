import Link from "next/link";
import { Check, Plus, X } from "lucide-react";
import type { Workout } from "@/lib/types";
import StatsRow from "./StatsRow";
import { getImage } from "@/lib/images";

interface Props {
  workout: Workout;
  done?: boolean;
  onRemove: () => void;
  onDone?: () => void;
  onAddToPlan?: () => void;
}

export default function PlanItem({ workout, done, onRemove, onDone, onAddToPlan }: Props) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-xl border bg-base-200 p-3 sm:flex-row sm:items-center ${done ? "border-accent/40" : "border-base-300"
        }`}
    >
      <img
        src={getImage(workout)}
        alt={workout.name}

        className="h-40 w-full rounded-lg object-cover sm:h-20 sm:w-28 sm:shrink-0"
      />

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display-tight truncate text-base font-semibold ${done ? "text-base-content/50 line-through" : ""
            }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-base-content/50">{workout.equipment}</p>
        <StatsRow workout={workout} className="mt-2" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link href={`/workouts/${workout.id}`} className="btn btn-outline btn-xs sm:btn-sm">
          View Details
        </Link>
        {onDone && (
          <button
            onClick={onDone}
            disabled={done}
            className="btn btn-primary btn-xs gap-1 sm:btn-sm"
          >
            <Check size={14} />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}
        {onAddToPlan && (
          <button onClick={onAddToPlan} className="btn btn-primary btn-xs gap-1 sm:btn-sm">
            <Plus size={14} />
            Add to Plan
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="btn btn-ghost btn-xs btn-square border border-base-300 sm:btn-sm"
        >
          <X size={14} />
        </button>
      </div>
    </article>
  );
}
