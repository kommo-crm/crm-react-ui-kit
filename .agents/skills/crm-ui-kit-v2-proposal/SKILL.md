---
name: crm-ui-kit-v2-proposal
description: 'Record a future breaking change for the next major version of crm-react-ui-kit — files a "UI-kit V2 proposal" GitHub Issue with the uikit-v2 label and leaves the matching `@uikit-v2 Issue: #N` code marker next to the affected logic. Use when a change cannot ship safely in the current version (API redesign, legacy removal, component/prop rename, architecture rework), when asked to "record a V2 change", "file a uikit-v2 proposal", or when you are about to write a TODO about an inconvenient API.'
---

# Record a UI-kit V2 Proposal

This skill produces **two artifacts that must always ship together**:

1. A GitHub Issue from the `UI-kit V2 proposal` form, labeled `uikit-v2`.
2. A `@uikit-v2 Issue: #<number>` code marker next to the affected logic.

The Issue holds the context; the marker binds that context to a concrete place in the code. One without the other is the failure mode this skill exists to prevent: a marker with no Issue is an orphan TODO, an Issue with no marker is unfindable during migration and cleanup work.

> **Monorepo:** the library is the **`packages/ui-kit`** workspace (`@kommo-crm/crm-react-ui-kit`); the Storybook app is `packages/storybook`. Markers live wherever the affected logic lives — component source, hooks, `.module.css`, or stories.

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

The gate is the **Major** list in `.github/CONTRIBUTING.md`. Read it and classify against it — do not substitute your own intuition about what "feels breaking".

```text
Major
- Removal of a component
- Removal of a prop from a component
- Change to the type accepted for a prop
- Breaking changes to minimum version of dependencies
- Breaking changes to public Sass variables, functions and mixins
```

**File a V2 proposal** when the change lands on one of those bullets:

| CONTRIBUTING → Major | What it looks like in this repo |
| --- | --- |
| Removal of a component | Drop a component from the public exports once another one covers its cases |
| Removal of a prop from a component | Remove `Button.showSuccessfulStateRef` / `showInvalidAnimationRef` in favour of an imperative handle on the component ref |
| Change to the type accepted for a prop | Make `Ribbon.children` required, dropping the childless standalone mode |
| Change to the type accepted for a prop | Rename `Label.text` to `label` to match `Ribbon.label` — a rename is a removal plus an addition, so it inherits the Major classification |
| Breaking changes to minimum version of dependencies | Raise the `react` peer range from `^18.0` to `^19.0` |
| Breaking changes to public Sass variables, functions and mixins | See the mapping below — read this bullet as **CSS custom properties and exported `*ThemeType` objects** |

### The one documented extension to the list

`CONTRIBUTING.md` predates this repo's styling stack: there is no Sass here at all (`find packages/ui-kit/src -name '*.scss'` comes back empty). The public styling surface is CSS custom properties — `--crm-ui-kit-button-hover-color` and friends — consumed through the `theme` prop and the `*ThemeType` objects each component exports.

So the "public Sass variables, functions and mixins" bullet is applied to that surface, and **only** to it: renaming or removing a token that a consumer's own theme object sets, or changing the keys of an exported `*ThemeType`, is Major. That is the single extension this skill makes, and it is a mapping of an existing bullet onto the stack actually in use, not a new criterion. Anything beyond it belongs in the table below.

**Do NOT file a V2 proposal** — use another channel instead:

| Case | Where it goes |
| --- | --- |
| New component, new prop, additional accepted type | [Feature request](https://github.com/kommo-crm/crm-react-ui-kit/issues/new?labels=Feature+request&template=FEATURE_REQUEST.yml) |
| Bug, wrong behavior, broken markup | [Issue](https://github.com/kommo-crm/crm-react-ui-kit/issues/new?template=ISSUE.yml) |
| Deprecation ahead of removal | Ships as a minor — do it now, then file the V2 proposal for the removal |
| Renaming, adding or removing the CSS classes a component emits | **Patch** in CONTRIBUTING — ships now, even though it breaks anyone selecting on those classes |
| Legacy logic removal with no public API change | **Patch** — "changes that do not impact public APIs" — ships now |
| Architecture or internal rework with no public API change | **Patch** — ships now |
| Code style, naming of private helpers, private CSS variables | Just do it in the current PR |

The three rows marked **Patch** are where this classification goes wrong most often. "Architecture rework" and "legacy logic removal" are not qualifying reasons in themselves — they qualify **only** when they take a component, a prop, a public token or a peer-dependency range with them. Reworking how theming is implemented internally, while every exported `*ThemeType` and every `--crm-ui-kit-*` token keeps its name and meaning, is a patch. Ask what a consumer would have to edit in their own code; if the answer is "nothing", it is not a V2 proposal.

If the change can ship safely today, **it is not a V2 proposal**. Say so and stop — do not file an Issue "just in case". A backlog padded with non-breaking items is worse than an empty one, because quarterly planning stops trusting it.

## Phase 1 — Search for a duplicate

The backlog is the single collection point, and duplicates split the discussion. Search before creating:

```bash
gh issue list --repo kommo-crm/crm-react-ui-kit \
  --label uikit-v2 --state all --limit 100 \
  --search "<component or keyword>" \
  --json number,title,state --jq '.[] | "\(.number)\t\(.state)\t\(.title)"'
```

Also check for markers already sitting in that area of the code:

```bash
git grep -n '@uikit-v2' -- ':/packages'
```

If a matching Issue exists: **do not create a second one.** Add a comment to the existing Issue with the new context, and point the new marker at that same number. Report to the user which Issue you reused.

## Phase 2 — Draft the Issue body

`gh issue create` does not understand issue forms; it posts free-form markdown. To make CLI-created Issues render identically to web-created ones, reproduce the form's own output format exactly: a `###` heading per field label, then a blank line, then the value.

Field labels and their order come from `.github/ISSUE_TEMPLATE/UIKIT_V2_PROPOSAL.yml` — read it if you are unsure, and keep the body in sync with it.

Write the body to a file (never inline a multi-line body into `--body` — the shell mangles backticks and `#`):

Every example below is written against the API that is actually in the repository. **Read the component's `*.props.ts` before drafting** — a proposal about a prop that does not exist wastes the reviewer's time and leaves Phase 4 with no line to anchor the marker to.

```bash
cat > /tmp/uikit-v2-body.md <<'EOF'
### Component / Area

Button

### Change type

API change (props / types / exports)

### Current problem

`Button` exposes its `saved` and `invalid` states through two writable refs,
`showSuccessfulStateRef` and `showInvalidAnimationRef`. The consumer has to
create a `MutableRefObject`, hand it to the component and wait for the
component to write a function into it before the state can be triggered.

### Why it cannot be fixed now

Both props are part of the public `ButtonProps`. Replacing them with an
imperative handle on the component ref removes them, which breaks every call
site that triggers those states today.

### Proposed change for V2

Expose `showSuccessfulState()` and `showInvalidAnimation()` on the component
ref via `useImperativeHandle`, and drop both `*Ref` props.

### Code marker location

packages/ui-kit/src/components/Button/Button.props.ts

### Related links

- PR: https://github.com/kommo-crm/crm-react-ui-kit/pull/98

### Checklist

- [X] I searched the [`uikit-v2` backlog](https://github.com/kommo-crm/crm-react-ui-kit/issues?q=is%3Aissue+label%3Auikit-v2) and this proposal is not a duplicate
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
from a file — and because nothing carries over, **a token file has to be read
inside the same command that uses it**:

Several lines inside **one** invocation share a shell, so this is fine:

```bash
# ✅ one invocation — the assignment and the request run in the same shell
TOKEN="$(cat ~/.config/uikit-v2-token)"
curl -sS -H "Authorization: Bearer $TOKEN" …
```

Splitting the very same two lines across **two** invocations is not:

```bash
# ❌ invocation 1
TOKEN="$(cat ~/.config/uikit-v2-token)"
```

```bash
# ❌ invocation 2 — a fresh shell, TOKEN is unset, so the header goes out as
#    "Authorization: Bearer " and GitHub answers 401, which reads like a bad token
curl -sS -H "Authorization: Bearer $TOKEN" …
```

Phase 3c keeps the assignment and the request together for exactly this reason.
Keep the token file outside the repository so it can never be committed. If the
user says "I exported it" but the preflight still sees nothing, this is why — ask
them to put it in the profile or the file rather than concluding the token is
invalid.

**An SSH remote is not a credential.** `git@github.com:...` remotes prove an SSH key exists, and an SSH key cannot authenticate the REST API. If every remote is SSH and there is no token, you are on path 3d — do not try `curl` without a token, and do not report the SSH key as usable auth.

### 3b. With `gh`

`uikit-v2` is the only label this skill applies, and it must already exist in the repository — check before creating, because `gh issue create --label` **fails the whole call** on an unknown label and creates nothing:

```bash
gh label list --repo kommo-crm/crm-react-ui-kit --search uikit-v2
```

If it is missing, stop and tell the user to create it — do not create labels in a shared repository on your own initiative.

```bash
gh issue create --repo kommo-crm/crm-react-ui-kit \
  --title "[uikit-v2] Button: replace the show*Ref props with an imperative handle" \
  --label uikit-v2 \
  --body-file /tmp/uikit-v2-body.md
```

**Pass no other label.** The issue form applies `uikit-v2` and nothing else; triage state is not tracked through labels in this repository.

The create command prints the Issue URL. **Capture the number from it** — that is the input to Phase 4.

Title convention: `[uikit-v2] <Component>: <what changes>`. Imperative, no trailing period.

### 3c. Without `gh`, with a token

`gh` is a convenience, not a requirement — the REST API is enough, and a token is far cheaper to obtain than a system package install. The token needs the `repo` scope (classic) or `Issues: write` (fine-grained).

Build the payload with a script, never by interpolating the body into an inline `-d '{...}'` string — the body contains backticks, quotes and newlines that break inline JSON.

```bash
python3 -c "
import json
print(json.dumps({
    'title': '[uikit-v2] Button: replace the show*Ref props with an imperative handle',
    'body': open('/tmp/uikit-v2-body.md').read(),
    'labels': ['uikit-v2'],
}))
" > /tmp/uikit-v2-payload.json

TOKEN="${GH_TOKEN:-${GITHUB_TOKEN:-$(cat ~/.config/uikit-v2-token 2>/dev/null)}}"
[ -n "$TOKEN" ] || { echo "no token — use path 3d instead"; exit 1; }

curl -sS -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -d @/tmp/uikit-v2-payload.json \
  https://api.github.com/repos/kommo-crm/crm-react-ui-kit/issues \
  | python3 -c "import sys, json; d = json.load(sys.stdin); print(d.get('number'), d.get('html_url'))"
```

The token is resolved **in the same command** as the `curl` — env first, then the
file. Splitting the assignment into its own step sends an empty
`Authorization: Bearer` and gets a 401 that looks like a bad token. The
`[ -n "$TOKEN" ]` guard is what turns that 401 into a readable message.

Unlike `gh`, the API **silently ignores** a label that does not exist, so listing `uikit-v2` here is safe even when it is missing — which also means a successful response does not prove the label was applied. Verify:

```bash
curl -sS \
  -H "Authorization: Bearer ${GH_TOKEN:-${GITHUB_TOKEN:-$(cat ~/.config/uikit-v2-token 2>/dev/null)}}" \
  https://api.github.com/repos/kommo-crm/crm-react-ui-kit/issues/<number> \
  | python3 -c "import sys, json; print([l['name'] for l in json.load(sys.stdin)['labels']])"
```

If `uikit-v2` is absent, the Issue exists but is not in the backlog. Tell the user to create the label, then re-apply it — do not open a second Issue.

### 3d. Neither — hand over a prefilled form

Issue forms accept query parameters named after each field's `id`, so the user
gets a form that is already filled in and only has to press **Create**.

**Build the URL with `urlencode`, never by hand.** Hand-encoding is what produced
`title=%5Bribbon+children+required` from `[uikit-v2] Ribbon: make children
required` — a mangled title and two shredded fields.

```bash
cat > /tmp/uikit-v2-fields.json <<'JSON'
{
  "title": "[uikit-v2] Ribbon: make children required",
  "component-area": "Ribbon",
  "change-type": "API change (props / types / exports)",
  "current-problem": "`Ribbon.children` is optional, so the component has two rendering modes: a `position: relative` wrapper around children, and a bare `position: absolute` element that relies on the parent being positioned. Both are documented and both have to be supported.",
  "why-not-now": "Making `children` required is a narrowing of an accepted prop type, so it stops type-checking every childless `<Ribbon />` call site.",
  "proposed-change": "Require `children` and drop the childless branch, leaving one rendering mode.",
  "code-marker": "packages/ui-kit/src/components/Ribbon/Ribbon.props.ts",
  "related-links": "- Code: packages/ui-kit/src/components/Ribbon/Ribbon.props.ts"
}
JSON

python3 -c "
import json, sys, urllib.parse
repo = 'kommo-crm/crm-react-ui-kit'
fields = json.load(open('/tmp/uikit-v2-fields.json'))
q = urllib.parse.urlencode({'template': 'UIKIT_V2_PROPOSAL.yml', **fields})
print(f'https://github.com/{repo}/issues/new?{q}')
" > /tmp/uikit-v2-url.txt
```

Then open it in the user's browser instead of printing it. The opener is
platform-specific — `xdg-open` does not exist on macOS, `open` does not exist on
Linux — so try both:

```bash
URL="$(cat /tmp/uikit-v2-url.txt)"
{ command -v xdg-open >/dev/null && xdg-open "$URL"; } \
  || { command -v open >/dev/null && open "$URL"; } \
  || echo "URL saved to: /tmp/uikit-v2-url.txt"
```

**Never paste the URL itself into your reply.** A prefilled proposal runs to
roughly a thousand characters; printed in a terminal it wraps, and a wrapped URL
loses characters when copied — the user then submits a truncated form. Open it,
or give the file path. Long values still belong in the URL, not trimmed away:
the whole point is that the user presses one button.

Two things the URL cannot do, so say them in one line:

- **Checkboxes cannot be prefilled.** The first Checklist item ("not a
  duplicate") is `required` in `UIKIT_V2_PROPOSAL.yml`, so the user has to tick
  it by hand before **Create** becomes available. The second (the code marker) is
  optional — the marker does not exist yet at this point, so leaving it unticked
  is correct.
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
python3 - "kommo-crm/crm-react-ui-kit" "<number>" <<'PY'
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

# A '###' inside a fenced block is code, not a heading — and "Current problem"
# routinely contains a fenced snippet. Track the fence, and never reset a
# section that was already seen: a repeated heading must not wipe a filled one.
sections, current, fence = {}, None, None
for line in (d.get('body') or '').split('\n'):
    stripped = line.lstrip()
    if fence:
        if stripped.startswith(fence):
            fence = None
    elif stripped.startswith('```') or stripped.startswith('~~~'):
        fence = stripped[:3]
    elif line.startswith('### '):
        current = line[4:].strip()
        sections.setdefault(current, [])
        continue
    if current:
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

One standardized tag: `@uikit-v2`, always in a **line comment** — `//` in TS/TSX, `/* … */` in CSS. Never inside a JSDoc block.

```ts
// @uikit-v2 Issue: #123
const legacyChildlessMode = children === undefined;
```

```css
/* @uikit-v2 Issue: #123 */
.legacy-standalone {
  position: absolute;
}
```

**Marking a public prop.** The marker goes *between* the prop's doc block and the
prop itself, so the doc block stays untouched:

```ts
  /**
   * Content to wrap with the ribbon.
   */
  // @uikit-v2 Issue: #123
  children?: ReactNode;
```

### Why the marker must never go inside a JSDoc block

`packages/ui-kit` ships `dist/index.d.ts` (`tsc -p tsconfig.build.json`), and
**`tsc` copies doc comments into the declarations verbatim**. Storybook reads the
same comments through `react-docgen-typescript` (`packages/storybook/.storybook/main.ts`).
So a marker written as

```ts
/**
 * Content to wrap with the ribbon.
 *
 * @uikit-v2
 * Issue: #123
 */
```

lands in `dist/components/Ribbon/Ribbon.props.d.ts` and shows up in every
consumer's IDE tooltip and in the public props table — an internal backlog
reference leaking into the published API surface.

A `//` comment does not: `tsc` strips it from the emitted `.d.ts`, and
`react-docgen-typescript` does not read it as documentation, so the prop's real
description is unchanged. That is why there is only one accepted form.

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

```ts
/**
 * ❌ Never in a doc comment — this ships to consumers in dist/index.d.ts.
 *
 * @uikit-v2
 * Issue: #123
 */
```

Do write:

```ts
// ✅ @uikit-v2 Issue: #123
```

ESLint needs no changes: there is no `no-warning-comments` rule in `eslint.config.mjs`, and `@stylistic/spaced-comment` is set to `'always'`, which the `// @uikit-v2 …` form satisfies.

## Phase 5 — Verify the pairing

```bash
git grep -n '@uikit-v2' -- ':/packages'
```

The `:/` prefix makes the pathspec repo-root-relative, so this works from any
directory in the monorepo — a plain `-- packages` matches nothing when you are
already inside `packages/ui-kit`.

Every marker you added must show an `Issue: #<number>` **on the same line** — the single-line form is the only accepted one, so a marker without a number on its own line is a defect. Then, from `packages/ui-kit/`:

```bash
yarn eslint --fix src/
```

Lint must stay green — a marker is a comment, so this is a formatting check only, but a mis-indented comment inside an interface will fail it.

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
- [ ] Marker uses the `//` form, not a JSDoc block — nothing leaks into `dist/index.d.ts`
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
- Do NOT pass any label other than `uikit-v2` to `gh issue create` — one unknown label aborts the whole call and no Issue is created. Check the label exists first (3b) instead of guessing.
- Do NOT put the marker in a JSDoc block. `tsc` copies doc comments into `dist/index.d.ts` and `react-docgen-typescript` shows them in the public props table, so the marker would ship to consumers. Use the `//` form.
- Do NOT invent props for the proposal. Read the component's `*.props.ts` first — `Button` has `isLoading`, `isDisabled`, `theme`, `before`, `after`, `showSuccessfulStateRef`, `showInvalidAnimationRef`, `successfulStateText`, `isClickableWhileDisabled`, and nothing else.
- Do NOT file a proposal for a CSS class rename, an internal refactor, or a legacy removal with no public API change. CONTRIBUTING classifies all three as **Patch** — they ship today.
- Do NOT read a token in one command and use it in the next. Shell state does not carry over; resolve the token inside the same command as the request.
- Do NOT assume `xdg-open` exists. It is Linux-only — fall back to `open` for macOS.
- Do NOT hand-encode the prefilled URL. Use `urlencode`; hand-encoding is what mangled a title into `%5Bribbon+children+required`.
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
