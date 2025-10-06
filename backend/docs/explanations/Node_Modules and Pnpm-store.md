# Node_Modules and Pnpm-store

At project start there was only the node_modules folder, but runtime errors occurred due to pnpm's installation mechanism. This document explains the issue, the fix applied, and the achieved benefits.

## Initial problem

- Observed error: Cannot find module 'on-finished' (Express failing to resolve modules).
- Cause: pnpm uses a non-flat (symlinked) structure by default, which can break tools expecting hoisted dependencies.

## Implemented solution

- Added a `.npmrc` file with settings for compatibility and performance.

Example `.npmrc` used:

```properties
# filepath: c:\Users\Windows\movie-totem\backend\.npmrc
# pnpm optimized for Node + TypeScript + Express + TypeORM

# Use "hoisted" linking for compatibility with tools that don't handle deep symlinks
node-linker=hoisted

# Save exact dependency versions
save-exact=true

# Use a local store directory for cache and performance
store-dir=.pnpm-store

# Enable store integrity checks
verify-store-integrity=true
```

## Resulting structure

- node_modules/ (hoisted dependencies — compatibility)
- .pnpm-store/ (pnpm local cache)
- .npmrc (configuration)
- src/ (source code)
- package.json

## Benefits achieved

- Compatibility with Express and other libraries.
- Faster installs (cache / reuse).
- Reduced global disk usage across projects.
- Safer dependency resolution.

## Outcome

- Run locally:

```bash
pnpm run dev
# 🚀 Server running at http://localhost:4000
```

- "Module not found" issues were resolved after switching to node-linker=hoisted.
