import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/types";

export default function StatsRow({ workout, className = "" }: { workout: Workout; className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-[11px] text-base-content/60 ${className}`}>
      <span className="flex items-center gap-1">
        <Clock size={12} /> {workout.duration} min
      </span>
      <span className="flex items-center gap-1">
        <Flame size={12} /> {workout.caloriesBurned} kcal
      </span>
      <span className="flex items-center gap-1">
        <Star size={12} /> {workout.rating}
      </span>
    </div>
  );
}
