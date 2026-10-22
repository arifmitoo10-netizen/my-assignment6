export default function Spinner({ label = "Loading workouts…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20" role="status">
      <span className="loading loading-bars loading-lg text-accent" />
      <p className="text-sm text-base-content/60">{label}</p>
    </div>
  );
}
