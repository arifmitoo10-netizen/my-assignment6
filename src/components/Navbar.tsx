"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/workouts") : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav className="mx-auto grid h-14 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="FitLog home">
          <img src="/logo.png" alt="FitLog logo" className="h-6 w-6 object-contain" />
          <span className="font-display-tight hidden text-sm font-bold tracking-wider sm:inline">FITLOG</span>
        </Link>
        <ul className="flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                  isActive(l.href)
                    ? "bg-accent/15 text-accent"
                    : "text-base-content/60 hover:text-base-content"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-2 text-xs font-semibold">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-black"
          >
            Plan <span className="font-bold">{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-base-content/30 px-3 py-1 text-base-content/80 hover:border-accent"
          >
            Saved <span className="font-bold">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
