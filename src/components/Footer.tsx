export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-base-content/50 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-base-content">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="h-4 w-4 object-contain" />
          <span className="font-display-tight font-bold tracking-wider">FITLOG</span>
        </div>
        <p className="text-center">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
