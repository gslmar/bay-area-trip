# Bay Area Family Trip

**Live site: https://gslmar.github.io/bay-area-trip/**

A 7-day family itinerary for Hong Kong, Shenzhen and Guangzhou: one day per page, rail times between the cities, and travel essentials.

The family diary, photos, votes and expenses are kept in a private, invite-only app and are not part of this site.

## Updating the itinerary

All trip data lives at the top of `app.js`: `CITIES`, `RAIL` and `DAYS`. The subtitle, route strip, rail table and day pages are built from it, so change a fact there once. Day numbers come from each day's position in `DAYS`, and each plan item is `["HH:MM", "Activity"]`. A mistyped time logs a warning in the browser console.

Layout and colours are in `style.css`. The fonts are self-hosted in `fonts/`. Noto Sans SC is cut down to the Chinese characters the page uses, and any new character falls back to the system font.

Pushes and pull requests run html-validate on `index.html` and ESLint on `app.js` (`.github/workflows/lint.yml`).

## Privacy

- This repo is public, and GitHub links to the site. The `noindex` tag keeps the page out of search results but doesn't hide it, so treat the page and the family-app link as public. Keep the app itself limited to invited family members in its Share settings.
- Don't add dates, hotel names, flight numbers or anything else that would show when the house is empty.
- The page loads nothing from other sites, sends no referrer, and sets a strict Content-Security-Policy.
