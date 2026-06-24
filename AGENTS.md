# Agent Instructions

These instructions apply to the entire repository.

## Start with inspection, not a build

- Do not run `npm run build` as the first action.
- First inspect the requested file, its route, nearby sections, and any shared
  components it uses.
- Make the requested change before choosing a validation command.
- Do not automatically run a production build for small copy, style, metadata,
  asset, or documentation changes.
- Run `npm run build` only when the user asks for it or when a completed change
  needs production-level type and compilation verification.
- If a build is appropriate, run it after implementation, never before.

## Architecture: feature-aware layered frontend

This repository uses a feature-aware layered React architecture. Code is
organized first by responsibility and, where a feature has several files, by a
feature subdirectory inside that layer.

The allowed dependency direction is:

`data / utils -> hooks -> components -> sections -> app`

API route handlers may import `data` and server-safe `utils` directly. Lower
layers must not import higher layers.

### Layer responsibilities

- Keep `app/page.tsx` and other route files focused on page composition.
- Keep route handlers in `app/api/` focused on HTTP parsing, status codes, and
  response formatting. Move external-service calls and reusable server logic to
  `utils/`.
- Put substantial page blocks in `sections/`.
- Existing landing-page order is:
  `Header`, `Hero`, `Features`, `Networks`, `About`, `Footer`.
- Add a new landing-page block as `sections/DescriptiveName.tsx`, then import it
  into `app/page.tsx` in the intended visual order.
- Keep site-wide, reusable, or feature-specific presentational pieces in
  `components/`. Group feature-specific components under
  `components/feature-name/`.
- Keep reusable UI primitives in `components/ui/`.
- Put reusable state, effects, browser APIs, and event orchestration in
  `hooks/`. Hooks must start with `use` and may be grouped by feature.
- Put static display content, configuration arrays, mock records, and shared
  TypeScript data models in `data/`.
- Put pure formatting, validation, storage, API-client, and service functions
  in `utils/`. Utilities should not render React UI or own React state.
- Keep global styling, tokens, and shared animations in `app/globals.css`.
- Use `@/` aliases for imports across project directories.

### File naming

- Use `PascalCase.tsx` for React components and sections.
- Use `useDescriptiveName.ts` for hooks.
- Use lowercase kebab-case for utility and data filenames, for example
  `format-utc.ts`, `client-storage.ts`, and `google-sheets-service.ts`.
- Use one default-exported React component per component or section file.
- Prefer named exports for hooks, utilities, data, and shared types.

### Placement rules

- A section composes components and passes hook state into them. It should not
  contain API calls, storage access, large static arrays, or complex effects.
- A component renders UI. Move substantial reusable state/effect logic to a
  hook, but keep trivial local visual state in the component when extraction
  would make the code less clear.
- A hook owns client-side behavior and may import `data` and `utils`; it must
  not render JSX.
- Data modules must not access browser APIs, perform network requests, or own
  mutable state.
- Utilities should be deterministic when possible. Browser-only or server-only
  utilities must be named and imported so their runtime boundary is clear.
- Avoid generic dumping-ground filenames. Name modules after their purpose.

## Section conventions

- Use one default-exported React component per section file.
- Name the component and file after the section's purpose.
- Use a semantic root element, normally `<section>`.
- Add a stable lowercase `id` if the header or another control links to it.
- Match the existing `max-w`, spacing, color, border, and responsive patterns
  before introducing new visual conventions.
- Keep even section-specific display data in `data/` when it is a substantial
  array or configuration object.
- Add `"use client"` only at the lowest component or hook boundary that needs
  state, effects, event handlers, or browser APIs.

## Change discipline

- Keep edits scoped to the user's request.
- Preserve existing behavior and responsive layouts unless the task requires a
  change.
- Reuse current components and assets before adding dependencies.
- Do not edit generated output in `.next/`.
- Do not overwrite unrelated work.
- For documentation-only changes, review the files directly; no build is
  necessary.
