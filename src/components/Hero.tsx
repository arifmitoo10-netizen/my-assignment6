import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-base-300 bg-base-200 px-6 py-10 sm:px-10 md:py-12">
      <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Workout Library</p>
          <h1 className="font-display-tight mt-3 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Train with intent. <br className="hidden sm:block" />
            Log every set.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-base-content/65">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch
            the week&apos;s work add up.
          </p>
          <a href="#library" className="btn btn-primary btn-sm mt-6 gap-2 font-bold uppercase tracking-wide">
            <Dumbbell size={14} />
            Browse workouts
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/banner.png"
            alt="Athlete training on a bike"
            className="max-h-56 w-auto object-contain md:max-h-72"
          />
        </div>
      </div>
    </section>
  );
}
