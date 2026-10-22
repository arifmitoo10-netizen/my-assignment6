# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion: browse a library of lifts, lock them into today's plan, save others for later, and watch the day's exercises, minutes and calories add up.

## Technologies
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 3 + daisyUI 4 (custom `fitlog` theme)
- lucide-react icons
- React Context + localStorage for state

## Key Features
1. **Workout library** – responsive 3-column grid of cards (image, tags, equipment, duration / kcal / rating) fetched from the API with a loading animation.
2. **Detail page** – two-column layout with key specs, 4-step instructions, "Add to today's plan" and "Save for later" actions with toast feedback.
3. **My Plan page** – Today's Plan / Saved tabs, live Exercises / Minutes / Calories metrics, "Mark as Done" and remove (X) actions, and an empty state.
4. **Live navbar badges** – Plan and Saved counters that link to `/my-plan`, persisted in localStorage across reloads.
5. **Sort & search** – sort by Duration, Calories or Rating, and search by workout name or tag; plan is capped at 5 lifts.
6. Fully responsive, custom 404 page, and reload-safe routes.

