# Notes for Claude

## GitHub account

This is a personal project owned by **`berruezo`** on GitHub. Every git, `gh`, or GitHub-related operation for this repo MUST use that personal account — never the owner's work account.

Before running any `gh` command or `git push`:

1. Check `gh auth status` and confirm the active account is `berruezo`. If it isn't, run `gh auth switch -u berruezo` first.
2. Do not change `origin` from HTTPS back to SSH on machines that may have other GitHub SSH keys loaded — the HTTPS + `gh auth git-credential` setup is what keeps pushes pinned to the active gh account.
3. Local `git config user.email` for this repo should be the personal address used by `berruezo`, never a work address.

This rule is permanent. Even small slips (a stray push, a `gh repo fork` under the wrong account) are considered mistakes to avoid, not minor.
