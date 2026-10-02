# Japan Trip Brain

Where to stay, what's on, and what to do in Japan for any city, month, and traveler type. Built for AI agents first, with a page for humans.

- Live: https://japan-trip-brain.vercel.app
- Agent docs: `/agents`, `/llms.txt`, `/openapi.json`
- API: `GET /api/plan?city=kyoto&month=11&traveler=couple`, `GET /api/cities`

Cities: Tokyo, Kyoto, Osaka, Sapporo, Hiroshima, Naha. Data is typical seasonal patterns, not live data; verify festival dates and bloom forecasts each year.

Optional env vars for affiliate tagging: `NEXT_PUBLIC_BOOKING_AID`, `NEXT_PUBLIC_GYG_PARTNER_ID`.

Dev: `npm ci && npm test && npm run dev`
