# Bay Area Family Trip

**Live site: https://gslmar.github.io/bay-area-trip/**

A 6-day family itinerary for Hong Kong, Shenzhen and Guangzhou: one day per page, rail times between the cities, and travel essentials.

The family diary, photos, votes and expenses are kept in a private, invite-only app and are not part of this site.

## Updating the itinerary

All trip data lives at the top of `app.js`: `CITIES`, `RAIL`, `DAYS`, and for the rail guide `TRAINS`, `STATIONS` and `RAIL_NOTES`; flights, hotels and transfers are in `FLIGHTS`, `HOTELS` and `TRANSFERS`, and the trip start date is `TRIP_START`. Sample trains in `TRAINS` come from published timetables; check them against 12306 when the timetable changes. The subtitle, route strip, rail table and day pages are built from it, so change a fact there once. Day numbers come from each day's position in `DAYS`, and each plan item is `["HH:MM", "Activity"]`. An optional `alt` list holds swap options for the day. A mistyped time logs a warning in the browser console.

`FOOD` (where to eat) and `CHECKLIST` (before you go) sit next to it. `sw.js` keeps an offline copy of the page; bump its `CACHE` name if you add or rename a file it lists.

Layout and colours are in `style.css`: a full-bleed photo hero, then brochure-style day pages. Headlines use Big Shoulders, body text Instrument Sans, and the city names Noto Serif SC (cut to those six characters). The city photos are in `photos/` (a 640 px and a larger copy of each), with their Wikimedia Commons sources, authors and licences in `photos/credits.json`. The credits also appear in the page footer; keep them if you swap a photo, as CC BY-SA requires. The fonts are self-hosted in `fonts/`. Noto Sans SC is cut down to the Chinese characters the page uses, and any new character falls back to the system font.

Pushes and pull requests run html-validate on `index.html` and ESLint on `app.js` (`.github/workflows/lint.yml`).

## Privacy

- This repo is public, and GitHub links to the site. The `noindex` tag keeps the page out of search results but doesn't hide it, so treat the page and the family-app link as public. Keep the app itself limited to invited family members in its Share settings.
- By the family's choice, the page shows the trip dates, flight numbers, hotels and hotel contacts. They are public on the site and stay in this repo's history even if removed later.
- Apart from the weather forecast, the page loads nothing from other sites. Forecasts come from api.open-meteo.com, which sees only the three city coordinates and the visitor's IP address. The trip date is typed in by each family member and stays in their own browser, so it never appears on the page or in this repo. The page sends no referrer, and sets a strict Content-Security-Policy. Checklist ticks stay in each visitor's own browser.
