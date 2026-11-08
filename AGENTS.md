<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

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
3. Read the relevant guide in `node_modules/next/dist/docs/` (see block above).
4. Implement.
5. Run `deslop` on the changes.
6. Run `npm run lint` and `npm run build`; fix failures.
7. Commit using `git-naming`.

## Environment variables

- `.env.example` is committed and lists every variable; `.env.local` holds real values and is git-ignored.
- When adding a variable, add it to `.env.example` too.
- `NEXT_PUBLIC_API_URL` is the base URL for API fetches. Build request URLs from it; never hardcode hosts.
- Only `NEXT_PUBLIC_*` vars reach the browser. Secrets must not use that prefix.
