---
name: crm-ui-kit-full-component
description: End-to-end scaffolding of a brand-new crm-react-ui-kit component — orchestrates source files, unit tests, Playwright e2e visual tests, and Storybook stories, then wires the component into package.json exports. Use when asked to "create a full component", "add a new component end to end", or to bootstrap everything (component + tests + e2e + stories) in one go.
---

# Full Component Creation (End-to-End)

This is a meta-skill that delegates to four specialized skills in a strict order. Read each sub-skill in turn — do NOT inline its instructions here.

## Self-Contained Workflow (MANDATORY — read first)

These skills are intentionally self-contained. They encode every convention you need: file layout, naming, theming, templates for `.tsx`/`.props.ts`/`.themes.ts`/`.module.css`/`index.ts`, unit-test patterns, e2e cartesian patterns, Storybook stories, and `package.json` wiring.

When you receive a task that activates this skill:

1. **Do NOT explore the codebase to "learn conventions".** All conventions are already in the sub-skills.
2. **Do NOT read `src/components/Spinner/`, `src/components/Text/`, `src/components/Button/`, etc. up-front.** They are NOT prerequisites. Templates in the sub-skills are the source of truth.
3. **Do NOT read `package.json`, `tsconfig.json`, `jest.config.ts`, `playwright-ct.config.ts`, theme palette files, Storybook config, or any other infrastructure file** before producing the component. The sub-skills tell you exactly what to add to `package.json` in Phase 5; you only need to read it AT THAT MOMENT, not before.
4. **The ONLY allowed reads before Phase 1 are the four sub-skill files themselves** (`crm-ui-kit-component/SKILL.md`, `crm-ui-kit-unit-test/SKILL.md`, `crm-ui-kit-stories/SKILL.md`, `crm-ui-kit-e2e-test/SKILL.md`). Read them lazily, just before each phase.
5. **You MAY consult a reference component file ONLY IF** a template in a sub-skill explicitly says "see `src/components/X/...` for an example of Y" AND the user's request needs that specific edge case. Even then, read ONE file, not a directory tour.
6. **If something is unknown, ASK the user — do NOT explore the project to infer it.** The Phase 0 questionnaire below is the contract.

Violation symptom (DO NOT do this): launching a `generalPurpose` / `explore` subagent at the start of the task to "study the project structure", "understand existing components", or "look up the theme palette". If you find yourself about to do this — STOP and re-read this section.

## Phase Order (MANDATORY)

```
Task Progress:
- [ ] Phase 0: Discovery & confirmation
- [ ] Phase 1: Component source files          → crm-ui-kit-component
- [ ] Phase 2: Unit tests                       → crm-ui-kit-unit-test
- [ ] Phase 3: Storybook stories + MDX          → crm-ui-kit-stories
- [ ] Phase 4: Playwright e2e + playground      → crm-ui-kit-e2e-test
- [ ] Phase 5: Wire into package.json + verify
- [ ] Phase 6: Generate snapshots
```

Phases 2–4 can be executed in parallel only if you have already completed Phase 1 — they all depend on the public API exposed by `index.ts`.

## Phase 0 — Inputs

Determine the component's parameters from the user's message. Do NOT open any file to guess them.

| Input              | Required | Example values                                       |
| ------------------ | -------- | ---------------------------------------------------- |
| Component name     | yes      | `Badge`, `Tooltip`, `Avatar`                         |
| Root HTML tag      | yes      | `span`, `div`, `button`, `input`                     |
| Component category | yes      | `display` \| `form-control` \| `composite`           |
| Theme presets      | yes      | `[Primary]`, `[Primary, Secondary, DangerPrimary]`   |
| Behavioral props   | yes      | `[isDisabled, size]`, `[isInvalid, isChecked]`, `[]` |
| Storybook section  | yes      | `Components` \| `Typography`                         |

### When to infer defaults (no confirmation needed)

If the component name clearly maps to one of these categories, **infer all defaults and proceed directly to Phase 1 without asking**:

- Display-like names (`Badge`, `Tag`, `Avatar`, `Chip`, `Label`, `Dot`) → `category: display`, `tag: span`, presets: `[Primary, Secondary]`, props: `[]`, section: `Components`.
- Control-like names (`Toggle`, `Radio`, `Switch`) → `category: form-control`, `tag: input`, presets: `[Primary]`, props: `[isDisabled, isInvalid]`, section: `Components`.
- Action-like names (`Button`, `IconButton`) → `category: composite`, `tag: button`, presets: `[Primary, Secondary]`, props: `[isDisabled, isLoading, size]`, section: `Components`.

Announce the inferred defaults in one sentence at the start, then immediately begin Phase 1.

### When to ask

Ask the user (one message, all questions at once) ONLY if:

- The name is ambiguous (e.g. "Indicator" could be display OR form-control).
- The user explicitly specified something that contradicts the defaults table.
- The component needs a non-standard HTML tag that can't be inferred from the name.

Do NOT open files while waiting for the user's answer.

## Phase 1 — Component source

Read `crm-ui-kit-component/SKILL.md` and produce:

```
src/components/<Name>/
├── index.ts
├── <Name>.tsx
├── <Name>.props.ts
├── <Name>.themes.ts
└── <Name>.module.css
```

After writing all 5 files, **run `yarn lint`** (eslint + tslint in parallel). Fix every error before moving to phases 2–4. Do NOT run only `yarn tslint`: prettier/eslint catches formatting violations that `tsc` cannot — e.g. a short `.themes.ts` `key: value` pair that prettier wants collapsed onto one line, or an MDX tag (`<ThemeVisualization>`) that exceeds 80 columns and must be wrapped. Skipping eslint here just moves the rework into Phase 5.

## Phases 2–4 — Tests + Stories (run in parallel)

After Phase 1 passes `yarn lint`, **read all three sub-skills in a single parallel batch**, then **write all three file groups in parallel** (they only depend on the `index.ts` public API, not on each other):

**Read in parallel:**

- `crm-ui-kit-unit-test/SKILL.md`
- `crm-ui-kit-stories/SKILL.md`
- `crm-ui-kit-e2e-test/SKILL.md`

**Phase 2 — Unit tests** — produce `src/components/<Name>/__tests__/<Name>.test.tsx`.
Run `yarn test <Name>` — fix failures before Phase 5.

**Phase 3 — Storybook stories** — produce:

```
src/components/<Name>/__stories__/
├── <Name>.stories.tsx
├── <Name>.mdx
└── Themes.mdx
```

Each `!dev`-tagged per-theme story must exist for every entry in `Themes.mdx`.

**Phase 4 — E2E visual tests** — produce:

```
src/components/<Name>/__tests__/
├── <Name>.e2e-playground.tsx
└── <Name>.e2e.test.tsx
```

One playground wrapper per theme preset.

## Phase 5 — Package wiring & lint

Read `package.json` ONCE, then make ALL four changes in a single editing session (do not re-read between edits — a formatter runs on save and will reject a stale edit):

1. `exports` — add component entry:

   ```json
   "./<Name>": "./dist/components/<Name>/index.js",
   ```

2. `exports` — add CSS entry in the assets block:

   ```json
   "./assets/<Name>.css": "./dist/assets/<Name>.css",
   ```

3. `typesVersions["*"]` — add types entry:

   ```json
   "<Name>": ["./dist/components/<Name>/index.d.ts"]
   ```

4. `version` — minor bump (adding a component is a new feature):

   ```json
   "version": "X.Y+1.0"
   ```

Then run:

```bash
yarn lint           # eslint + tslint in parallel
yarn test           # all unit tests
```

Fix any error introduced before moving on.

## Phase 6 — Generate snapshots

> **Requires Docker.** The command spins up containers defined in `docker-compose` to run Playwright. Make sure Docker is running before executing.

```bash
yarn test:e2e:update-snapshots -- -g "<Name>"
```

**Use `-g`, NOT `--grep`.** `scripts/generate_env.docker.sh` parses only `-g` — `--grep` is silently dropped and the run fans out to the full suite, which can abort with `unexpected EOF` partway and leave orphan PNGs for `<Name>` behind.

After the run, verify the snapshot set is COMPLETE:

```
expected = (number of test.describe blocks) × (appearances: 2) × (devices: 5)
```

For a display component with Primary + Secondary themes that's `2 × 2 × 5 = 20` PNGs under `src/components/<Name>/__image_snapshots__/`. If the count is lower, you have orphans from an aborted run — delete the whole `__image_snapshots__/` directory for `<Name>` and re-run the command, rather than committing a partial set.

Commit BOTH the source AND the snapshot files together in the same commit so reviewers can validate visually.

## Reference layouts (FALLBACK ONLY — do NOT read up-front)

The templates in the sub-skills already cover every standard component shape. The list below is a fallback for ONE specific situation: a sub-skill template explicitly points you to `src/components/<X>/` for an edge case (e.g. "see Button for a focus-visible theme key"). Only then, read that ONE file. Never tour these directories proactively, never read more than the single file that the template referenced.

| Reference                  | Read it ONLY if the template calls it out for…  |
| -------------------------- | ----------------------------------------------- |
| `src/components/Spinner/`  | Absolute-positioned content needing a wrapper   |
| `src/components/Text/`     | Ellipsis / line-clamp behavior                  |
| `src/components/Switcher/` | `Label` sub-component split for form controls   |
| `src/components/Checkbox/` | Invalid state combined with controlled toggling |
| `src/components/Button/`   | Internal hooks, ref-driven state, icon slots    |

## Final checklist

```
- [ ] All 5 source files created and `yarn lint`-clean (eslint + tslint)
- [ ] Unit tests cover handlers + state-transition props
- [ ] Stories include Default + variant stories + per-theme !dev stories
- [ ] <Name>.mdx and Themes.mdx render correctly
- [ ] Playground wraps every theme preset
- [ ] e2e cartesian covers behavioral props (no theme axis there)
- [ ] package.json exports + typesVersions updated
- [ ] yarn lint passes
- [ ] yarn test passes
- [ ] Snapshot count matches `describes × appearances × devices` — no orphans from an aborted run
```

## Anti-Patterns

- Do NOT inline the body of the sub-skills — they evolve independently. Always read them fresh.
- Do NOT explore the codebase before Phase 1. The sub-skills are self-contained. See "Self-Contained Workflow" at the top.
- Do NOT launch an `explore` / `generalPurpose` subagent to "understand the project". The skill IS the source of truth.
- Do NOT read more than the four sub-skill files before producing source code. Read other files only when a phase explicitly requires it (e.g. `package.json` in Phase 5).
- Do NOT skip Phase 5 — without it the component is invisible to consumers.
- Do NOT generate snapshots before all four file groups are in place; rerunning is cheap, but missing playground variants produces orphan snapshots.
- Do NOT commit snapshots without their producing source files (and vice versa).
