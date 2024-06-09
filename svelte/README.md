# Development

## Running the Web Server

```bash
# Install the dependencies.
pnpm install

# Synchronize auto-generated files from SvelteKit.
pnpm run sync

# Start the development server with live reloading + hot module replacement.
pnpm run dev

# Compile the production build (i.e., with optimizations).
pnpm run build

# Start the production preview server.
pnpm run preview
```

## Linting the Codebase

```bash
# Check Formatting
pnpm run fmt # prettier

# Apply Formatting Auto-fix
pnpm run fmt:fix # prettier --write

# Check Linting Rules
pnpm run lint:html   # linthtml
pnpm run lint:css    # stylelint
pnpm run lint:js     # eslint
pnpm run lint:svelte # svelte-check

# Check All Lints
pnpm run lint
```
