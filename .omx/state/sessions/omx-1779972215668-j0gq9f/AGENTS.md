<!-- OMX:RUNTIME:START -->
<session_context>
**Session:** omx-1779972215668-j0gq9f | 2026-05-28T12:43:37.898Z

**Explore Command Deprecated:** `omx explore` is deprecated and MUST NOT be recommended for new repository lookup work.
- `USE_OMX_EXPLORE_CMD` is compatibility-only; unset/default is disabled. Truthy values keep legacy callers working but do not make `omx explore` preferred.
- Replacement path: use normal Codex repository inspection tools/subagents; use `omx sparkshell -- <command>` only for explicit shell-native read-only evidence or `--tmux-pane` summaries.
- Compatibility routing is not enabled; do not route simple lookups to `omx explore`.

**Compaction Protocol:**
Before context compaction, preserve critical state:
1. Write progress checkpoint via `omx state write --input '<json>' --json`
2. Save key decisions via `omx notepad write-working --input '<json>' --json`
3. If context is >80% full, proactively checkpoint state
</session_context>
<!-- OMX:RUNTIME:END -->
