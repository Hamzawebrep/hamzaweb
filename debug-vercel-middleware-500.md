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
| A | Vercel is deploying a different commit or project root than the locally verified app. | Medium | Low | Local `HEAD` and GitHub `main` both equal `ddd15e7`; the Vercel build's exact SHA is unavailable |
| B | Requests to application routes fail while invoking middleware in Vercel. | High | Medium | Confirmed: `/`, `/fr`, `/en`, and localized routes return 500 with `MIDDLEWARE_INVOCATION_FAILED`; `/logo.png` returns 200 |
| C | The existing matcher routes every normal application path through the failing middleware. | High | Low | Confirmed by source matcher; replacement build manifest matches only `/__next_intl_middleware_disabled__` |
| D | The exact runtime exception is identifiable from available Vercel logs. | Medium | Medium | Inconclusive: no Vercel CLI/project link/token or dashboard session is available |

## Log Evidence
- User screenshot: `500 MIDDLEWARE_INVOCATION_FAILED`.
- Live requests: `/`, `/fr`, `/en`, `/fr/projets`, and `/en/projects` return 500; `/logo.png` returns 200.
- Local and GitHub `main` both point to `ddd15e78703f56d92d5441bc93347ba0429161d8`.
- Corrected production build: `/` redirects 307 to `/fr`; all intended FR/EN routes, `robots.txt`, and `sitemap.xml` return 200 on localhost:3001.
- Corrected middleware manifest only matches `/__next_intl_middleware_disabled__`.

## Verification Conclusion
Workaround is verified locally. Production confirmation is pending the Vercel deployment from the fix commit.
