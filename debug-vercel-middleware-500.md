# Debug Session: vercel-middleware-500
- **Status**: [OPEN]
- **Issue**: Production domain returns Vercel `500 MIDDLEWARE_INVOCATION_FAILED`; expected the localized site to load.
- **Debug Server**: Not started; production logs will be checked first.
- **Log File**: Not created; no production log access configured.

## Reproduction Steps
1. Open `https://hamzaweb-nine.vercel.app/`.
2. Observe Vercel's middleware failure page and `500 MIDDLEWARE_INVOCATION_FAILED`.

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | Vercel is deploying a different commit or project root than the locally verified app. | Medium | Low | GitHub reports the fix deployment completed for `57fa924`; exact production alias mapping is unavailable |
| B | Requests to application routes fail while invoking middleware in Vercel. | High | Medium | Confirmed: `/`, `/fr`, `/en`, and localized routes return 500 with `MIDDLEWARE_INVOCATION_FAILED`; `/logo.png` returns 200 |
| C | The existing matcher routes every normal application path through the failing middleware. | High | Low | Confirmed by source matcher; replacement build manifest matches only `/__next_intl_middleware_disabled__` |
| D | Vercel project is serving only the static output instead of the Next.js application. | High | Low | Confirmed by latest deployment behavior: `/logo.png` is 200 while `/fr`, `/en`, `/robots.txt`, and `/sitemap.xml` are 404 |

## Log Evidence
- User screenshot: `500 MIDDLEWARE_INVOCATION_FAILED`.
- Before fix: live requests `/`, `/fr`, `/en`, `/fr/projets`, and `/en/projects` returned 500; `/logo.png` returned 200.
- Local and GitHub `main` both point to `ddd15e78703f56d92d5441bc93347ba0429161d8`.
- Corrected production build: `/` redirects 307 to `/fr`; all intended FR/EN routes, `robots.txt`, and `sitemap.xml` return 200 on localhost:3001.
- Corrected middleware manifest only matches `/__next_intl_middleware_disabled__`.
- GitHub Vercel status for fix commit `57fa924` reports `Deployment has completed`.
- After commit `57fa924`, the public alias returned 404 for app routes and generated Next assets while still serving `/logo.png`, indicating static-only Vercel output.
- Commit `307d299` added `vercel.json` with `framework: nextjs`; GitHub Vercel status is `success`.
- Post-fix production: `/` -> 307 `/fr`; `/fr`, `/en`, `/fr/projets`, `/en/projects`, `/fr/processus`, `/en/process`, `/fr/a-propos`, `/en/about`, `/fr/services`, `/en/services`, `/fr/contact`, `/en/contact`, `/robots.txt`, `/sitemap.xml` -> 200.
- Browser verification: `/fr` renders the French hero/navigation and `/en` renders English content; document language is `fr`/`en`.

## Verification Conclusion
The root cause was Vercel serving only the static `public/` output instead of the Next.js app. The explicit framework override and middleware bypass are deployed and verified in production. Awaiting user confirmation before removing the debug record.
