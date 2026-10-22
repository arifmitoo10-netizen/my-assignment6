import Link from "next/link";
import type { Workout } from "@/lib/types";
import TagPills from "./TagPills";
import StatsRow from "./StatsRow";
import { getImage } from "@/lib/images";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group overflow-hidden rounded-xl border border-base-300 bg-base-200 transition hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={getImage(workout)} alt={workout.name}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 p-4">
        <TagPills tags={workout.muscleGroups} />
        <h3 className="font-display-tight text-base font-semibold">{workout.name}</h3>
        <p className="text-xs text-base-content/50">{workout.equipment}</p>
        <StatsRow workout={workout} className="pt-1" />
      </div>
    </Link>
  );
}
