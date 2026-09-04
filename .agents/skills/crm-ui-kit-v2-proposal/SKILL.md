---
name: crm-ui-kit-v2-proposal
description: 'Record a future breaking change for the next major version of crm-react-ui-kit — files a "UI-kit V2 proposal" GitHub Issue with the uikit-v2 label and leaves the matching `@uikit-v2 Issue: #N` code marker next to the affected logic. Use when a change cannot ship safely in the current version (API redesign, legacy removal, component/prop rename, architecture rework), when asked to "record a V2 change", "file a uikit-v2 proposal", or when you are about to write a TODO about an inconvenient API.'
---

# Record a UI-kit V2 Proposal

This skill produces **two artifacts that must always ship together**:

1. A GitHub Issue from the `UI-kit V2 proposal` form, labeled `uikit-v2`.
2. A `@uikit-v2 Issue: #<number>` code marker next to the affected logic.

The Issue holds the context; the marker binds that context to a concrete place in the code. One without the other is the failure mode this skill exists to prevent: a marker with no Issue is an orphan TODO, an Issue with no marker is unfindable during migration and cleanup work.

## Target repository (TESTING MODE — currently a fork)

Every `gh` command and every issue URL in this skill targets:

```text
Winterfulllll/crm-react-ui-kit
```

This is a **temporary testing setup**, not the real backlog. The production
repository is `kommo-crm/crm-react-ui-kit`. To switch back, do both steps, in
this order — the `sed` alone would leave this section contradicting itself:

1. Delete this whole `## Target repository` section, down to the `## Phase Order`
   heading.
2. From the repo root, point every remaining command at production:

   ```bash
   sed -i 's|Winterfulllll/crm-react-ui-kit|kommo-crm/crm-react-ui-kit|g' \
     .agents/skills/crm-ui-kit-v2-proposal/SKILL.md
   ```

While this section says TESTING MODE, do NOT file proposals against
`kommo-crm/crm-react-ui-kit` — an Issue in the wrong repository has to be
transferred by hand and loses its number, which breaks every code marker
pointing at it.

Fork-specific prerequisites, checked once before the first run:

- **Issues must be enabled.** Forks ship with the Issues tab **off**, so
  `gh issue create` fails and `/labels` returns 404. Fix: fork Settings →
  General → Features → check **Issues**.
- **The issue form must be on the fork's default branch.** GitHub reads
  `.github/ISSUE_TEMPLATE/` only from the default branch, so
  `UIKIT_V2_PROPOSAL.yml` has to be merged into the fork's `main` before
  `issues/new/choose` shows it.
- **The `uikit-v2` label must exist on the fork.** Labels are not inherited from
  the upstream repository — a fork starts with GitHub's default set only.

> **Monorepo:** the library is the **`packages/ui-kit`** workspace (`@Winterfulllll/crm-react-ui-kit`); the Storybook app is `packages/storybook`. Markers live wherever the affected logic lives — component source, hooks, `.module.css`, or stories.

## Phase Order (MANDATORY)

```text
Task Progress:
- [ ] Phase 3a: Preflight — how will the Issue be created? (run FIRST)
- [ ] Phase 0: Qualify — is this really a V2 change?
- [ ] Phase 1: Search the existing backlog for a duplicate
- [ ] Phase 2: Draft the Issue body
- [ ] Phase 2b: ASK what else belongs in Related links (blocking)
- [ ] Phase 3: Create the Issue (or hand over a prefilled form), get its number
- [ ] Phase 3e: Validate the Issue — needs no token, runs on every path
- [ ] Phase 4: Insert the code marker referencing that number
- [ ] Phase 5: Verify the pairing
```

Phase 3a runs **first**, out of numeric order: it decides whether you file the Issue yourself or hand the user a link, and the user must know that before you draft anything.

Phase 4 **cannot** run before Phase 3 — the marker needs the real Issue number. Never write `Issue: #TBD` or a placeholder.

## Phase 0 — Qualify

`.github/CONTRIBUTING.md` already defines what a major change is. Use that list as the gate — do NOT invent your own criteria.

**File a V2 proposal** when the change is on the Major list, or is otherwise unsafe to ship now:

| Case | Example |
| --- | --- |
| Removal of a component | Drop the legacy `Ribbon` standalone mode |
| Removal of a prop | Delete `Button.isRounded` |
| Change to the type accepted for a prop | `size: string` → `size: 'S' \| 'M' \| 'L'` |
| Component / prop rename | `text` → `label` |
| API redesign for consistency | Align `Select` API with `Input` |
| Legacy logic removal | Drop the pre-Radix focus fallback in `ContextMenu` |
| Architecture rework | Move theming off CSS-variable presets |
| Breaking change to public theme tokens | Rename `--crm-ui-kit-button-hover-*` |
| Breaking dependency bump | Require React 19 as a minimum |

**Do NOT file a V2 proposal** — use another channel instead:

| Case | Where it goes |
| --- | --- |
| New component, new prop, additional accepted type | [Feature request](https://github.com/Winterfulllll/crm-react-ui-kit/issues/new?labels=Feature+request&template=FEATURE_REQUEST.yml) |
| Bug, wrong behavior, broken markup | [Issue](https://github.com/Winterfulllll/crm-react-ui-kit/issues/new?template=ISSUE.yml) |
| Deprecation ahead of removal | Ships as a minor — do it now, then file the V2 proposal for the removal |
| Internal refactor with no public API impact | Just do it in the current PR |
| Code style, naming of private helpers | Just do it in the current PR |

If the change can ship safely today, **it is not a V2 proposal**. Say so and stop — do not file an Issue "just in case". A backlog padded with non-breaking items is worse than an empty one, because quarterly planning stops trusting it.

## Phase 1 — Search for a duplicate

The backlog is the single collection point, and duplicates split the discussion. Search before creating:

```bash
gh issue list --repo Winterfulllll/crm-react-ui-kit \
  --label uikit-v2 --state all --limit 100 \
  --search "<component or keyword>" \
  --json number,title,state --jq '.[] | "\(.number)\t\(.state)\t\(.title)"'
```

Also check for markers already sitting in that area of the code:

```bash
git grep -n '@uikit-v2' -- packages
```

If a matching Issue exists: **do not create a second one.** Add a comment to the existing Issue with the new context, and point the new marker at that same number. Report to the user which Issue you reused.

## Phase 2 — Draft the Issue body

`gh issue create` does not understand issue forms; it posts free-form markdown. To make CLI-created Issues render identically to web-created ones, reproduce the form's own output format exactly: a `###` heading per field label, then a blank line, then the value.

Field labels and their order come from `.github/ISSUE_TEMPLATE/UIKIT_V2_PROPOSAL.yml` — read it if you are unsure, and keep the body in sync with it.

Write the body to a file (never inline a multi-line body into `--body` — the shell mangles backticks and `#`):

```bash
cat > /tmp/uikit-v2-body.md <<'EOF'
### Component / Area

Button

### Change type

API change (props / types / exports), Legacy logic removal

### Current problem

`Button` accepts `size` as a free-form string, so every consumer spells the
scale differently and the component cannot validate it.

### Why it cannot be fixed now

Narrowing the prop type breaks every consumer passing an arbitrary string.

### Proposed change for V2

Narrow `size` to a union aligned with `Input`, and drop the string fallback.

### Code marker location

packages/ui-kit/src/components/Button/Button.props.ts

### Related links

- PR: https://github.com/Winterfulllll/crm-react-ui-kit/pull/98

### Checklist

- [X] I searched the [`uikit-v2` backlog](https://github.com/Winterfulllll/crm-react-ui-kit/issues?q=is%3Aissue+label%3Auikit-v2) and this proposal is not a duplicate
- [X] A `@uikit-v2 Issue: #<number>` marker is left in the code, or the change is not tied to a specific place
EOF
```

Rules for the content:

- **Current problem** — the pain as it exists today, 1–3 sentences. No roadmap.
- **Why it cannot be fixed now** — the concrete blocker, usually "breaks existing consumers" or "requires API redesign". If you cannot name a blocker, go back to Phase 0.
- **Proposed change for V2** — the intended shape, 1–2 sentences. **Not** a migration guide, not a step-by-step plan. Planning happens later, in the Issue.
- **Change type** — comma-separated values copied verbatim from the form's dropdown options.
- **Related links** — code permalinks plus everything from step 2b. Do NOT draft this field before asking.
- Omit an optional field's heading entirely if you have nothing for it, or write `_No response_` to match the form's own rendering.

### 2b. Ask what else belongs in Related links — MANDATORY

**You must ask the user this, and wait for the answer, before creating the
Issue.** This is one of the only two blocking questions in the whole skill (the
other is the Issue number on path 3d). Everything else you decide yourself.

The reason is a hard limit on what you can know. Code links you can derive; the
context that makes a proposal worth planning usually lives outside the
repository, and once the Issue is filed nobody goes back to enrich it.

First gather what you **can** derive, so you are not asking about those:

```bash
git rev-parse --abbrev-ref HEAD
git log -1 --format='%H %s' -- <affected file>
command -v gh >/dev/null && gh pr view --json url,title 2>/dev/null
```

Then ask one question, listing the categories explicitly rather than a bare
"anything else?" — a specific prompt is what makes the user remember the Jira
ticket:

> Кроме ссылок на код — есть что-то ещё для Related links? Тикет в Jira, PR, где
> это всплыло, обсуждение в Slack, дизайн-док, уже существующая связанная Issue?

Rules:

- **Ask even when you already found a PR.** A PR is not a Jira ticket, and a
  Jira ticket is not a discussion thread.
- **Accept "нет" as a complete answer** and move on with code links only. The
  requirement is that the question was asked, not that links exist.
- **Never fill the field with only self-derived code paths and call it done.**
  A `Related links` section holding nothing but the two files you just edited
  adds no information that `Code marker location` does not already carry.
- **Do not batch this with other questions to save a turn.** Ask it on its own,
  right before Phase 3, so the answer lands in the body you are about to submit.
- Put whatever the user gives you in verbatim. Do not reformat a Jira key into a
  guessed URL — `UIKIT-123` is enough if that is what they said.

## Phase 3 — Create the Issue

### 3a. Preflight — run this FIRST, before Phase 0

Creating the Issue needs an API credential. Find out which path is available **at the very start of the task** and say so in one sentence, so the user knows up front whether you will file the Issue yourself or hand them a link. Do NOT discover this after drafting everything — that is the one failure mode of this phase.

```bash
command -v gh >/dev/null && gh auth status 2>&1 | head -3 || echo "no gh"
[ -n "$GH_TOKEN$GITHUB_TOKEN" ] && echo "token in env" || echo "no token in env"
```

| Result | Path | Announce |
| --- | --- | --- |
| `gh` present and authenticated | 3b | "Создам Issue через `gh`." |
| No `gh`, but `GH_TOKEN`/`GITHUB_TOKEN` set | 3c | "`gh` нет, создам через API с токеном из env." |
| Neither | 3d | "Ни `gh`, ни токена — открою предзаполненную форму, останется нажать Create." |

**A token exported in an interactive shell does not reach these commands.** Each
command runs in a fresh shell initialised from the user's profile, so shell state
does not carry over between steps. For the token to be visible it has to come
from the profile itself (`export GH_TOKEN=…` in `~/.bashrc` / `~/.profile`) or
from a file the command reads:

```bash
GH_TOKEN=$(cat ~/.config/uikit-v2-token 2>/dev/null)
```

Keep that file outside the repository so it can never be committed. If the user
says "I exported it" but the preflight still sees nothing, this is why — ask them
to put it in the profile or the file rather than concluding the token is invalid.

**An SSH remote is not a credential.** `git@github.com:...` remotes prove an SSH key exists, and an SSH key cannot authenticate the REST API. If every remote is SSH and there is no token, you are on path 3d — do not try `curl` without a token, and do not report the SSH key as usable auth.

### 3b. With `gh`

The `uikit-v2` label must already exist in the target repository:

```bash
gh label list --repo Winterfulllll/crm-react-ui-kit --search uikit-v2
```

If it is missing, stop and tell the user to create it (see `UIKIT_V2_SETUP.md` §1) — do not create labels in someone else's repository on your own initiative.

```bash
gh issue create --repo Winterfulllll/crm-react-ui-kit \
  --title "[uikit-v2] Button: narrow the size prop to a union" \
  --label uikit-v2 \
  --body-file /tmp/uikit-v2-body.md
```

**Pass only `uikit-v2` here.** Unlike the issue form's `labels:` key, which silently drops a label that does not exist, `gh issue create --label` **fails the whole call** on an unknown label and creates nothing. `untriaged` exists upstream but not necessarily in a fork, so add it as a separate, non-fatal step:

```bash
gh issue edit <number> --repo Winterfulllll/crm-react-ui-kit --add-label untriaged || true
```

The create command prints the Issue URL. **Capture the number from it** — that is the input to Phase 4.

Title convention: `[uikit-v2] <Component>: <what changes>`. Imperative, no trailing period.

### 3c. Without `gh`, with a token

`gh` is a convenience, not a requirement — the REST API is enough, and a token is far cheaper to obtain than a system package install. The token needs the `repo` scope (classic) or `Issues: write` (fine-grained).

Build the payload with a script, never by interpolating the body into an inline `-d '{...}'` string — the body contains backticks, quotes and newlines that break inline JSON.

```bash
python3 -c "
import json
print(json.dumps({
    'title': '[uikit-v2] Button: narrow the size prop to a union',
    'body': open('/tmp/uikit-v2-body.md').read(),
    'labels': ['uikit-v2'],
}))
" > /tmp/uikit-v2-payload.json

curl -sS -X POST \
  -H "Authorization: Bearer ${GH_TOKEN:-$GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -d @/tmp/uikit-v2-payload.json \
  https://api.github.com/repos/Winterfulllll/crm-react-ui-kit/issues \
  | python3 -c "import sys, json; d = json.load(sys.stdin); print(d.get('number'), d.get('html_url'))"
```

Unlike `gh`, the API **silently ignores** a label that does not exist, so listing `uikit-v2` here is safe even when it is missing — which also means a successful response does not prove the label was applied. Verify:

```bash
curl -sS -H "Authorization: Bearer ${GH_TOKEN:-$GITHUB_TOKEN}" \
  https://api.github.com/repos/Winterfulllll/crm-react-ui-kit/issues/<number> \
  | python3 -c "import sys, json; print([l['name'] for l in json.load(sys.stdin)['labels']])"
```

If `uikit-v2` is absent, the Issue exists but is not in the backlog. Tell the user to create the label, then re-apply it — do not open a second Issue.

### 3d. Neither — hand over a prefilled form

Issue forms accept query parameters named after each field's `id`, so the user
gets a form that is already filled in and only has to press **Create**.

**Build the URL with `urlencode`, never by hand.** Hand-encoding is what produced
`title=%5Be+isTest+prop+required` from `[uikit-v2] Button: make the isTest prop
required` — a mangled title and two shredded fields.

```bash
cat > /tmp/uikit-v2-fields.json <<'JSON'
{
  "title": "[uikit-v2] Button: make the isTest prop required",
  "component-area": "Button",
  "change-type": "API change (props / types / exports)",
  "current-problem": "`Button` accepts `isTest` as an optional prop, so a button can render without the `data-is-test` attribute.",
  "why-not-now": "Making `isTest` required breaks every `<Button>` call site: it stops type-checking until the prop is passed.",
  "proposed-change": "Make `isTest` required in `ButtonProps`, so every rendered button carries `data-is-test`.",
  "code-marker": "packages/ui-kit/src/components/Button/Button.props.ts",
  "related-links": "- Code: packages/ui-kit/src/components/Button/Button.props.ts"
}
JSON

python3 -c "
import json, sys, urllib.parse
repo = 'Winterfulllll/crm-react-ui-kit'
fields = json.load(open('/tmp/uikit-v2-fields.json'))
q = urllib.parse.urlencode({'template': 'UIKIT_V2_PROPOSAL.yml', **fields})
print(f'https://github.com/{repo}/issues/new?{q}')
" > /tmp/uikit-v2-url.txt
```

Then open it in the user's browser instead of printing it:

```bash
xdg-open "$(cat /tmp/uikit-v2-url.txt)" 2>/dev/null \
  || echo "URL: /tmp/uikit-v2-url.txt"
```

**Never paste the URL itself into your reply.** A prefilled proposal runs to
roughly a thousand characters; printed in a terminal it wraps, and a wrapped URL
loses characters when copied — the user then submits a truncated form. Open it,
or give the file path. Long values still belong in the URL, not trimmed away:
the whole point is that the user presses one button.

Two things the URL cannot do, so say them in one line:

- **Checkboxes cannot be prefilled.** The Checklist items are `required`, so the
  user has to tick them by hand before **Create** becomes available.
- **A `change-type` value must match a dropdown option exactly**, or GitHub
  drops it silently.

Then ask for the Issue number.

### 3e. Validate the Issue — every path, before touching the code

Reading a public repository needs **no token**, so this check runs even on path
3d. It exists because the number you were handed can be wrong in ways that are
invisible until much later: a PR number instead of an issue number, an Issue
filed in the upstream repository by mistake, a missing label that keeps it out of
the backlog, or a prefill that arrived truncated.

```bash
python3 - "Winterfulllll/crm-react-ui-kit" "<number>" <<'PY'
import json, sys, urllib.request, urllib.error

REPO, NUM = sys.argv[1], sys.argv[2]
REQUIRED = ['Component / Area', 'Change type', 'Current problem',
            'Why it cannot be fixed now', 'Proposed change for V2']

try:
    with urllib.request.urlopen(
        f'https://api.github.com/repos/{REPO}/issues/{NUM}'
    ) as r:
        d = json.load(r)
except urllib.error.HTTPError as e:
    sys.exit(f'FAIL  #{NUM} not found in {REPO} (HTTP {e.code})')

problems = []

if 'pull_request' in d:
    problems.append(f'#{NUM} is a pull request — issue and PR numbers share one sequence')
if not d.get('repository_url', '').endswith(f'/{REPO}'):
    problems.append(f'lives in {d.get("repository_url")}, expected {REPO}')
if d.get('state') != 'open':
    problems.append(f'state is {d.get("state")}, expected open')

labels = [l['name'] for l in d.get('labels', [])]
if 'uikit-v2' not in labels:
    problems.append(f'label uikit-v2 missing (has: {labels or "none"}) — not in the backlog')
if not (d.get('title') or '').startswith('[uikit-v2]'):
    problems.append(f'title does not start with [uikit-v2]: {d.get("title")!r}')

sections, current = {}, None
for line in (d.get('body') or '').split('\n'):
    if line.startswith('### '):
        current = line[4:].strip()
        sections[current] = []
    elif current:
        sections[current].append(line)

for field in REQUIRED:
    if field not in sections:
        problems.append(f'no "### {field}" section — prefill truncated?')
    elif '\n'.join(sections[field]).strip() in ('', '_No response_'):
        problems.append(f'"{field}" is empty')

if problems:
    print(f'FAIL  {d["html_url"]}')
    for p in problems:
        print(f'  - {p}')
    sys.exit(1)

print(f'OK    #{NUM} {d["html_url"]}')
print(f'      marker: @uikit-v2 Issue: #{NUM}')
PY
```

On `FAIL`, **do not insert the marker** — a marker pointing at a PR or at an
Issue in the wrong repository is worse than no marker, because cleanup work will
trust it. Report which check failed and what fixes it:

| Failure | Fix |
| --- | --- |
| is a pull request | Ask for the Issue number, not the PR number |
| lives in another repo | The Issue must be transferred, or refiled in the target repo |
| label `uikit-v2` missing | Add the label to the existing Issue — never open a second one |
| a required section empty or missing | The prefill was truncated; the user edits the Issue to fill it in |
| state is closed | Confirm with the user whether this proposal was rejected |

On `OK`, go straight to Phase 4 and insert the marker in the same turn.

## Phase 4 — Insert the code marker

One standardized tag: `@uikit-v2`. Two accepted forms, chosen by context.

**JSDoc form** — when the target already has (or deserves) a doc block: a prop, an exported type, a component, a hook.

```ts
/**
 * Visual size of the button.
 *
 * @uikit-v2
 * Issue: #123
 */
size?: string;
```

**Single-line form** — for a statement, a branch, or a CSS rule.

```ts
// @uikit-v2 Issue: #123
const legacySize = typeof size === 'string' ? size : 'M';
```

```css
/* @uikit-v2 Issue: #123 */
.legacy-size-fallback {
  padding: 4px 8px;
}
```

Placement rules:

- Put the marker **on the logic the change touches**, not at the top of the file.
- One marker per place. If one Issue affects three files, leave three markers pointing at the same number.
- The marker is **short**. Problem description, rationale and migration steps live in the Issue.
- Never replace an existing marker's number — add a second marker if a second Issue applies.

Do NOT write:

```ts
// ❌ TODO потом переделать потому что API неудобный
// ❌ @uikit-v2 we should probably redesign this whole area, see the discussion
//    in the PR, roughly the plan is to first deprecate, then in 2.0 remove…
// ❌ @uikit-v2 Issue: #TBD
```

Do write:

```ts
// ✅ @uikit-v2 Issue: #123
```

ESLint needs no changes: there is no `no-warning-comments` rule in `eslint.config.mjs`, and `@stylistic/spaced-comment` is set to `'always'`, which both forms satisfy.

## Phase 5 — Verify the pairing

```bash
git grep -n '@uikit-v2' -- packages
```

Every marker you added must show an `Issue: #<number>` on the same line or within the next two lines (the JSDoc form puts it on the next line). Then, from `packages/ui-kit/`:

```bash
yarn eslint --fix src/
```

Lint must stay green — a marker is a comment, so this is a formatting check only, but a mis-indented JSDoc block will fail it.

If a PR is open for the work that surfaced the problem, add the Issue link to the PR description so the reviewer sees why the code has a marker.

## Final checklist

```text
- [ ] Phase 3a preflight run FIRST; the creation path was announced up front
- [ ] The change is genuinely unsafe to ship now (Phase 0 gate passed)
- [ ] Backlog searched — not a duplicate, or an existing Issue was reused
- [ ] User was asked about non-code Related links, and the answer is in the body
- [ ] Issue created from the UI-kit V2 proposal form, label uikit-v2 applied
- [ ] Body uses `### <Field label>` headings matching the form
- [ ] Issue validated (Phase 3e): real issue, right repo, uikit-v2 label, no empty fields
- [ ] Marker(s) inserted next to the affected logic, referencing the real number
- [ ] `git grep '@uikit-v2'` shows an Issue number for every marker
- [ ] yarn eslint passes
- [ ] Issue linked from the PR description, if a PR is open
```

## Anti-Patterns

- Do NOT create the Issue and stop there. Without the marker the backlog item is unfindable during cleanup — that is the whole point of the process.
- Do NOT insert a marker before the Issue exists. `Issue: #TBD`, `Issue: #?` and a bare `@uikit-v2` are all failures.
- Do NOT leave the credential check until the end. Discovering there is no token *after* drafting the whole proposal wastes the user's turn and reads as the skill failing, when the honest answer was available in one command at the start.
- Do NOT treat an SSH remote, an SSH key, or working `git push` as API authentication. None of them can create an Issue.
- Do NOT require `gh`. If a token is present, path 3c does the same job with `curl`.
- Do NOT pass `--label untriaged` (or any second label) to `gh issue create` — one unknown label aborts the whole call and no Issue is created. Add extra labels afterwards with `gh issue edit`.
- Do NOT hand-encode the prefilled URL. Use `urlencode`; hand-encoding is what mangled a title into `%5Be+isTest+prop+required`.
- Do NOT print the prefilled URL into your reply. Open it with `xdg-open` or give the file path — a wrapped URL loses characters when copied.
- Do NOT trim fields to shorten the URL. A thousand-character URL is fine when nobody has to copy it by hand.
- Do NOT trust a number you were handed. Validate it (Phase 3e) before inserting a marker: it may be a PR number, or an Issue in the wrong repository.
- Do NOT stop after the user supplies the Issue number. Insert the marker in the same turn.
- Do NOT file a proposal for something that can ship today. Feature requests and bugs have their own templates.
- Do NOT put roadmap, migration steps, or business context in the marker.
- Do NOT fill `Related links` with only the code paths you derived yourself. Ask the user for the Jira ticket, the PR and the discussion first — that context is not recoverable from the repository, and nobody enriches a filed Issue later.
- Do NOT skip the 2b question because you already found a PR, or because the user seems busy. It is one question, and it is the difference between a planable proposal and a note.
- Do NOT open a second Issue when one already covers the area — comment on the existing one and reuse its number.
- Do NOT create the `uikit-v2` label yourself if it is missing; report it and let the user decide.
- Do NOT push, open a PR, or comment on unrelated Issues as part of this skill. It files one Issue and edits code — nothing else.
