# EduFund

A bursary and scholarship discovery portal for South African students. Search, filter, shortlist, and apply for corporate bursaries, NSFAS, and government funding in one place.

## Live Application

**[https://edufund-drab.vercel.app/]** *(replace with your actual Vercel production URL)*

No login or setup required; the app is fully usable immediately. Search and filters are bookmarkable (they live in the URL), and saved bursaries persist in your browser across sessions.



## What It Does

EduFund lets a student:

- **Search** bursaries by keyword (title, provider, or description)
- **Filter** by province, field of study, household income bracket, funding type (Corporate / NSFAS / Government / NGO), and study level (Undergraduate / Postgraduate / Both)
- **Shortlist** bursaries to a personal saved list, which persists across browser sessions
- **View full details** for any bursary, including eligibility, minimum academic average, required documents, work back obligations, benefits, and closing date
- **Apply directly** via a link to the provider's own official application page. EduFund is a discovery tool, not an application processor, so linking out to each provider's own process is the correct approach rather than building a universal form.
- See at a glance whether a bursary is still open or closed, based on its closing date

All 50 bursaries in the dataset are mock/sample data for demonstration purposes. See [Data Disclaimer](#data-disclaimer) below.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Server state | TanStack Query v5 |
| Global UI state | Zustand v5 |
| URL state | nuqs |
| Testing | Vitest, React Testing Library |
| Deployment | Vercel |

## Architecture: State Management

The app follows a strict separation of state by kind, rather than putting everything in one bucket.

- **Server data** (the bursary list itself) is owned by **TanStack Query**. It handles caching, loading/error states, and refetching whenever filters change.
- **Global UI state** that isn't server data and shouldn't live in the URL (the shortlist) is owned by **Zustand**, persisted to `localStorage` so it survives a closed tab or browser restart.
- **Navigation relevant state** (search term, every filter, current page) lives in **the URL itself**, via `nuqs`. This is deliberate: it means every filtered view is bookmarkable, shareable, and correctly restored by the browser's back button. A search for "NSFAS bursaries in Gauteng, page 2" is a real, linkable URL, not just in memory React state that vanishes on refresh.

This separation means each piece of state has exactly one owner. Swapping the mock API for a real backend later would only require changing the fetch layer (`src/lib/api.ts`); nothing else in the app depends on how the data arrives, only on the shape it arrives in.

## Design Decisions

### Visual identity

The interface intentionally avoids a generic "AI generated app" look. Specific choices:

- **Color palette**: a warm, neutral mix of nude, greige, and brown, rather than a stock blue/white SaaS palette, reflecting a calmer, more considered tone appropriate for a funding and paperwork context.
- **Typography**: Lora (a lower contrast, warm serif) for headings, chosen specifically over a sharp editorial serif to stay easy to read rather than decorative; Inter for body text; a separate italic serif (Fraunces) used only in the logo wordmark, so the brand mark reads distinctly from regular headings.
- **Signature elements**: the hero section uses a subtle ruled paper background texture and a rotated "stamp" showing the live bursary count, a deliberate nod to the physical paperwork of a bursary application rather than a generic hero banner.
- **Layout**: a dark navbar and footer bookend a light nude body, giving the page a clear, intentional structure rather than a flat single tone page.

### Apply button

Styled as a solid black pill (not the default blue CTA) with a hover lift and a nudging arrow, a deliberate move away from a generic looking button.

### Card grid over a vertical list

Bursaries are shown in a responsive 2 to 3 column grid rather than a stacked list, since a grid allows scanning and comparing more bursaries at once, closer to how real bursary listing sites present results.

### Login: deliberately not built

A login system was considered and explicitly decided against. The problem it would solve, not losing saved bursaries or your search when you leave, is already solved by `localStorage` persisted Zustand state and URL based filters, which survive closing the browser entirely. Login would only add value for syncing across different devices, which is a meaningfully larger feature (real user accounts, a database, auth) for a comparatively narrow benefit, and was outside the original project scope.

### Dark mode: deliberately not built

Given the amount of intentional work in the specific nude/brown palette, a dark mode toggle would mean either designing and maintaining a full second color system, or falling back to a generic auto inverted dark mode likely to clash with the deliberate warmth of the current design. Not part of the original brief; skipped as added scope without a clear corresponding benefit.

## Performance

Built to meet a target of LCP under 2.5s (Lighthouse, production deployment).

- **LCP:** approximately 0.5 to 0.7s
- **FCP:** approximately 0.3 to 0.5s
- **CLS:** 0, achieved by giving skeleton loading states and their corresponding real content identical fixed heights, so nothing shifts as data loads in. This was diagnosed by identifying that layout shift reports were pointing at the footer, not because the footer itself was broken, but because it visually absorbs any height change that happens above it on the page (a Suspense fallback swapping to full content, and mismatched skeleton/card heights, were the two actual causes).
- **Performance score:** typically 85 to 99 depending on run to run system noise. Lighthouse's Total Blocking Time metric has natural variance from background CPU load and isn't a code regression between runs on identical code.

Other performance work: hover/focus based prefetching on bursary cards so clicking a previously hovered card feels instant, route level `loading.tsx` skeletons for slower connections, bundle analysis via `@next/bundle-analyzer`, and lazy loading the shortlist page's content via `next/dynamic`.

## Error Handling

- A global `error.tsx` React error boundary catches unexpected render time crashes, showing a styled recovery screen with a working "Try again" button, instead of a blank page.
- A custom `not-found.tsx` replaces Next's default 404 page.
- Failed data fetches show a dedicated error state with a "Try again" button that re triggers the request, rather than a dead end.
- Empty states are handled distinctly from error states (for example, "no bursaries match your filters" versus "something went wrong").

## Testing

The project has a layered automated test suite.

- **Unit tests** cover pure logic: date helpers, and the mock API's filtering, search, and pagination logic. These are the highest value tests in the app, since every UI feature depends on this being correct.
- **Component tests** cover individual components in isolation: debounced search input, filter sidebar, shortlist button, error boundary, card prefetching behavior.
- **Integration tests** render the full page with real providers (TanStack Query and nuqs), verifying search, filtering, and the shortlist flow work together end to end, not just in isolation.

**Known limitation:** 3 integration tests are intentionally marked as skipped (`it.skip`), not deleted. They cover interactive filter changes (typing in search, clicking "Clear all") inside the full page tree. Investigation traced this to a test environment specific issue: `nuqs`'s testing adapter doesn't reliably propagate URL state updates when combined with TanStack Query inside a jsdom rendered tree, even though:

- The underlying hook (`useBursaryFilters`) is independently tested and passes
- The same interactions are verified working correctly in the real browser, extensively, throughout development

This is documented in the test file itself as a known harness limitation rather than a product bug.

## Project Structure

```
src/
├── app/                    Next.js App Router pages
│   ├── page.tsx             Home: search, filters, results grid
│   ├── shortlist/            Saved bursaries page
│   ├── bursary/[id]/         Bursary detail page
│   ├── error.tsx             Global error boundary
│   └── not-found.tsx         Custom 404
├── components/              Reusable UI components
├── hooks/                   useBursaryFilters (URL state), useBursaries (TanStack Query)
├── store/                   useShortlistStore (Zustand)
├── lib/                     Mock API, constants, date helpers
├── data/                    Mock bursary dataset (50 entries)
└── types/                   Shared TypeScript types
```

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Other scripts

```bash
npm run build        Production build
npm run test:run     Run the full test suite once
npm test              Run tests in watch mode
npm run analyze       Build with bundle analyzer
```

## Data Disclaimer

All 50 bursaries in this app are mock data created for demonstration purposes. While a few entries reference real organizations, the specific details, deadlines, and especially the "Apply" links are illustrative and not verified live application pages; some are guessed URLs based on a provider's likely domain, not confirmed real links. This project is a technical demonstration, not a live bursary aggregator, so anyone using it for real bursary research should verify all details directly with the provider.

## Possible Future Enhancements

Beyond the current scope:

- Real backend/API instead of the mock in memory dataset
- Multi device sync (would require the login system discussed and deliberately deferred above)
- Server persisted "open/closed" status derived from provider data instead of a static closing date
- Full WCAG accessibility audit beyond Lighthouse's automated checks (Lighthouse currently reports 96/100 on Accessibility, with one flagged text contrast pairing)