# Bay Area Family Trip

**Live site: https://gslmar.github.io/bay-area-trip/**

A 6-day family itinerary for Hong Kong, Shenzhen and Guangzhou: one day per page, rail times between the cities, and travel essentials.

The family diary, photos, votes and expenses are kept in a private, invite-only app and are not part of this site.

## Updating the itinerary

All trip data lives at the top of `app.js`: `CITIES`, `RAIL` and `DAYS`. The subtitle, route strip, rail table and day pages are built from it, so change a fact there once. Day numbers come from each day's position in `DAYS`, and each plan item is `["HH:MM", "Activity"]`. An optional `alt` list holds swap options for the day. A mistyped time logs a warning in the browser console.

`FOOD` (where to eat) and `CHECKLIST` (before you go) sit next to it. `sw.js` keeps an offline copy of the page; bump its `CACHE` name if you add or rename a file it lists.

Layout and colours are in `style.css`. The city photos are in `photos/` (a 640 px and a larger copy of each), with their Wikimedia Commons sources, authors and licences in `photos/credits.json`. The credits also appear in the page footer; keep them if you swap a photo, as CC BY-SA requires. The fonts are self-hosted in `fonts/`. Noto Sans SC is cut down to the Chinese characters the page uses, and any new character falls back to the system font.

Pushes and pull requests run html-validate on `index.html` and ESLint on `app.js` (`.github/workflows/lint.yml`).

## Privacy

- This repo is public, and GitHub links to the site. The `noindex` tag keeps the page out of search results but doesn't hide it, so treat the page and the family-app link as public. Keep the app itself limited to invited family members in its Share settings.
- Don't add dates, hotel names, flight numbers or anything else that would show when the house is empty.
- Apart from the weather forecast, the page loads nothing from other sites. Forecasts come from api.open-meteo.com, which sees only the three city coordinates and the visitor's IP address. The trip date is typed in by each family member and stays in their own browser, so it never appears on the page or in this repo. The page sends no referrer, and sets a strict Content-Security-Policy. Checklist ticks stay in each visitor's own browser.
