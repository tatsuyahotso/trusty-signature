# Trusty Signature

Trusty Signature is a Next.js wallet-security interface for reviewing Ethereum
signatures, token approvals, contracts, and other public on-chain activity.

## Tech stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- `next-themes`

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Do not begin development by running `npm run build`. Start the dev server,
inspect the relevant files, and make the scoped change first. Use a production
build only after the implementation is ready and the change needs full
verification.

## Project structure

```text
app/
  api/                                  API route handlers
  signature-approval-checker/allchain/  Wallet checker route
  globals.css                           Global styles and shared animations
  layout.tsx                            Root layout and SEO metadata
  page.tsx                              Landing-page composition

components/
  ui/                                   Reusable UI primitives
  Header.tsx                            Shared site header
  Footer.tsx                            Shared site footer
  ...                                   Small reusable components

sections/
  Hero.tsx                              Landing hero and wallet input
  Features.tsx                          Product feature content
  Networks.tsx                          Supported-network content
  About.tsx                             About content
  Search.tsx                            Checker search section
  Info.tsx                              Checker information section

public/                                 Static images and brand assets
lib/                                    Shared library helpers
utils/                                  Additional utilities
```

## Page composition

Route files should stay small and express the order of the page. Full-width
content blocks belong in `sections/`.

The landing page follows this pattern:

```tsx
export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Networks />
      <About />
      <Footer />
    </div>
  );
}
```

When adding a new landing-page block:

1. Create a named section component such as `sections/Security.tsx`.
2. Give its root element a stable section `id` when it is navigable.
3. Import it into `app/page.tsx`.
4. Place it in the intended visual order.
5. Keep small reusable controls in `components/`, not in `sections/`.

Use the `@/` import alias for project-root imports.

## Validation workflow

Use the lightest check that fits the change:

1. Inspect the affected route, section, and related shared components.
2. Make the scoped edit.
3. Review the changed files and test through `npm run dev`.
4. Run `npm run build` only when requested or when production-level
   verification is warranted.

## Available scripts

```bash
npm run dev      # Start the development server
npm run build    # Create and validate a production build
npm run start    # Serve the production build
```
