# Notes for Claude

## GitHub account

This is a personal project owned by **`berruezo`** on GitHub. Every git, `gh`, or GitHub-related operation for this repo MUST use that personal account — never the owner's work account.

Before running any `gh` command or `git push`:

1. Check `gh auth status` and confirm the active account is `berruezo`. If it isn't, run `gh auth switch -u berruezo` first.
2. Do not change `origin` from HTTPS back to SSH on machines that may have other GitHub SSH keys loaded — the HTTPS + `gh auth git-credential` setup is what keeps pushes pinned to the active gh account.
3. Local `git config user.email` for this repo should be the personal address used by `berruezo`, never a work address.

This rule is permanent. Even small slips (a stray push, a `gh repo fork` under the wrong account) are considered mistakes to avoid, not minor.

## What goes into the repo

This is a public repository. Anything committed here ends up readable by the entire internet. Before adding, editing, or staging ANY file that will be committed, apply these rules:

1. **No credentials of any kind.** No app passwords, API keys, OAuth tokens, session secrets, database URLs with embedded creds, signed JWTs, SSH keys, GPG keys, `gh` tokens, `.env` files, `*.pem`, `*.key`, cloud-provider keys, service-account JSON — none of it. Not in source, not in comments, not in commit messages, not in fixture files, not in screenshots.
2. **No runtime user data.** The `data/` directory holds password hashes and per-user settings — it stays gitignored. Never commit a snapshot of it, even "scrubbed".
3. **No personal information beyond what's already public.** The public GitHub username (`berruezo`) and the personal email associated with commit authorship are already exposed by the commit log and the repo URL. Do not add new personal details: real-world location, full legal name beyond the existing commit author, phone numbers, other email addresses, family / coworker names, etc.
4. **No machine- or environment-specific paths or identifiers** that reveal who the developer is or where they work. Don't bake `/home/<username>/...` paths, work email domains, internal hostnames, VPN addresses, employer-internal URLs, or similar into source or docs.
5. **If there is the slightest doubt** — about whether a value is a secret, whether content is private, whether something is safe to be public, or whether a new file should even exist — STOP and ASK the user before committing or pushing. The user has explicitly asked for this. "I'll just be careful" is not an acceptable substitute for asking.

This rule is permanent and applies to every interaction in this repo.
