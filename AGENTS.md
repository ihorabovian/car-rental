<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Documentation first

Every change — a new feature, a fix, a refactor, a config tweak — starts with reading the official documentation for the technology it touches. Do not rely on memory: versions in this project are newer than training data, and APIs change (e.g. `error.tsx` uses `retry`, not `reset`).

| Area | Source of truth |
|---|---|
| Next.js (routing, special files, caching, images, fonts, config) | `node_modules/next/dist/docs/` for the installed version |
| React | react.dev |
| GraphQL client, Codegen | `graphql-request` and GraphQL Codegen docs (via Context7 or official sites) |
| Backend API | live schema introspection at `${NEXT_PUBLIC_API_URL}/graphql`; verify queries against the real backend |
| UI components | shadcn/ui and Radix UI docs; Tailwind CSS v4 docs for utilities |
| Dates | `date-fns` docs; `Intl` on MDN |

- Read the docs **before** writing code, not after something breaks.
- When docs and existing code disagree, follow the docs and fix the code.
- When docs are missing or ambiguous, say so and ask instead of guessing.

## Follow established conventions

All work stays within the conventions already set for this project. Never invent a new pattern when one exists.

- **Project rules:** everything in this file (structure, GraphQL, formatting, env).
- **Skills:** the conventions they define are mandatory every time — `git-naming` for every commit, branch and PR; `js-conventions` for every JS/TS file; `vercel-react-best-practices` for React/Next code. See the table below.
- **Framework conventions:** Next.js file conventions (`page`, `layout`, `loading`, `error`, `not-found`, `icon`), shadcn component patterns, Tailwind design tokens from `app/globals.css`.
- **Existing code:** match the naming, file layout and style of neighbouring files.
- If a task seems to require breaking a convention, stop and ask first; do not break it silently.

## Skills — mandatory usage

Project skills live in `.agents/skills/` (symlinked into `.claude/skills/`). Invoking the matching skill is **required**, not optional. Load the skill before starting the task it covers, not after. When several apply, load all of them.

| Skill | When it is mandatory |
|---|---|
| `caveman` | **Always on.** Every reply to the user in this project uses caveman mode, from the first message of the session. Code, commit messages, PR bodies and file contents stay normal. |
| `js-conventions` | Before writing or editing any `.js`, `.mjs`, `.ts`, `.jsx`, `.tsx` file, or config written in JS/TS. |
| `vercel-react-best-practices` | Before writing, editing or reviewing any React component, Next.js page/layout/route, data fetching, Server/Client Component boundary, or anything that affects bundle size or performance. |
| `git-naming` | Before every `git commit` and before creating any PR or branch title. No exceptions, including small or "quick" commits. |
| `deslop` | After finishing any code change and before committing: run it over the diff and remove AI slop (redundant comments, needless defensive checks, `any` casts, style that breaks file conventions). |
| `caveman-review` | Whenever reviewing code: a diff, a PR, a branch, or when the user asks to "review" / "check" changes. |

### Standard workflow for a coding task

1. `caveman` is already active for replies.
2. Load `js-conventions` and `vercel-react-best-practices` before touching code.
3. Read the documentation for every technology the task touches (see "Documentation first").
4. Implement.
5. Run `deslop` on the changes.
6. Run `npm run lint` and `npm run build`; fix failures.
7. Commit using `git-naming`.

## Environment variables

- `.env.example` is committed and lists every variable; `.env.local` holds real values and is git-ignored.
- When adding a variable, add it to `.env.example` too.
- `NEXT_PUBLIC_API_URL` is the base URL for API fetches. Build request URLs from it; never hardcode hosts.
- Only `NEXT_PUBLIC_*` vars reach the browser. Secrets must not use that prefix.

## GraphQL

- Client: `graphql-request` in `lib/graphql-client.ts`, endpoint `${NEXT_PUBLIC_API_URL}/graphql`.
- One operation per file in `lib/graphql/queries/`, file and exported constant in UPPER_SNAKE_CASE (`GET_CARS.ts` → `export const GET_CARS = graphql(...)`), operation name in PascalCase (`query GetCars`).
- Request functions (`getCars`, `getCar`) live in `lib/api/<domain>-api.ts` and call `gqlClient.request(GET_CARS, ...)`.
- Types are generated by GraphQL Codegen (`codegen.ts`, client preset) into `lib/gql/`. Never edit `lib/gql/` by hand; it is committed so builds do not depend on the backend.
- After adding or changing an operation, run `npm run codegen`.
- Derive UI types from generated query types (see `lib/cars/types.ts`); do not hand-write API types.
- Backend crashes on explicit `null` variables: omit empty filters (`undefined`) instead.

## Formatting

- Money and dates are displayed only through `lib/format.ts` (`formatPrice`, `formatDate`, `formatDateRange`). Locale `en-CA` and currency `CAD` are constants inside that file; never hardcode them elsewhere.
- Dates travel in URLs and state as ISO `yyyy-MM-dd` strings (`toIsoDate`); date math uses `date-fns`.
- Car-specific helpers (media URLs, rental days) live in `lib/cars/format.ts`.
- Do not create files that only re-export or hold a single constant.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
