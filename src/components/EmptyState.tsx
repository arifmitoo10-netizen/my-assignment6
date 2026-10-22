import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-base-300 bg-base-200/50 px-6 py-16 text-center">
      <h3 className="font-display-tight text-2xl font-bold">Nothing here yet</h3>
      <p className="mx-auto mt-2 max-w-xs text-sm text-base-content/60">
        Browse the library and add a lift to get today moving.
      </p>
      <Link href="/" className="btn btn-primary btn-sm mt-6 font-bold">
        Go to workouts
      </Link>
    </div>
  );
}
