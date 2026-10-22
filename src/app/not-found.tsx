import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-display-tight text-7xl font-bold text-accent sm:text-8xl">404</p>
      <h1 className="font-display-tight mt-2 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-base-content/60">
        This page skipped leg day and vanished. Let&apos;s get you back to the gym.
      </p>
      <Link href="/" className="btn btn-primary btn-sm mt-6 font-bold">
        Back to workouts
      </Link>
    </div>
  );
}
