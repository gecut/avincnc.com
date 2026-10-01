# AGENTS.md — AVIN CNC (`avincnc.com`)

This file is an operating map for AI coding agents working on the **AVIN CNC** (آوین ماشین پاژ) industrial showcase and product catalog website.

## Context Map & Source of Truth

Consult these authoritative files on demand based on the task branch:

- **Domain data, categories, products & copy** → `src/config/site-config.ts` (single source of truth for all site copy, navigation, contact details, `categories`, `products`, and runtime slug validation via `validateSiteConfig`)
- **Local typography & font variables** → `src/config/fonts.ts` (`peyda` primary Persian font, `blackOpsOne` numeric display font, `changaOne`)
- **Theme tokens, animations & global layout rules** → `src/styles/globals.css` (Tailwind CSS v4 `@theme`, brand palette `--color-brand-*`, ink palette `--color-ink-*`, scroll/keyframe animations, and global 8px border-radius normalization)
- **App Router pages & static routes** → `src/app/page.tsx` (`/`), `src/app/products/page.tsx` (`/products`), `src/app/products/[productSlug]/page.tsx` (`/products/[productSlug]`), `src/app/sitemap.ts`, `src/app/robots.ts`
- **Reusable sections & interactive components** → `src/components/` (`page-shell.tsx`, section components, `products-catalog.tsx`, `shadcn/` primitives, `reactbits/` visual effects)
- **Static export & container delivery** → `next.config.ts`, `Dockerfile`, `compose.yaml`, `scripts/deploy.sh`, `scripts/verify-origin.sh`

## Operating Pipeline & Skill Map

Every task moves through these sequential phases. Trigger skills at branch points; satisfy each phase's completion criterion before advancing.

### 1. Ingestion & Triage
- **Incoming issues, raw requests & backlog items** → invoke `triage`. Categorize request type, assess clarity, resolve blockers, and produce an agent-ready brief.
- **Large, multi-session initiatives** → invoke `wayfinder`. Decompose broad or ambiguous scope into a directed graph of sequential decision tickets.
- *Completion criterion*: Task has an explicit scope, identified target files, and resolved entry prerequisites.

### 2. Alignment, Grilling & Domain Modeling
- **Ambiguous requirements, UX ideas, or underspecified features** → invoke `grill-me`. Run a relentless, decision-oriented interview to stress-test intent and close branching paths before touching code.
- **Architecture or content structure proposals needing recorded decisions** → invoke `grill-with-docs`. Interview deeply against the codebase and record resulting ADRs and domain definitions in project documentation.
- **Product catalog schema, category taxonomy, or nomenclature changes** → invoke `domain-modeling`. Maintain ubiquitous language across `SiteConfig`, `CategoryData`, and `ProductData` (e.g., `wood-cnc` vs. `fiber-laser`, `active-category` vs. `company-capability`).
- *Completion criterion*: Zero unresolved design dilemmas and consistent typed terminology across `src/config/site-config.ts`.

### 3. Architecture & Codebase Design
- **Component boundaries, props contracts & module seams** → invoke `codebase-design`. Design deep modules with narrow props interfaces, keeping data lookup/validation in `src/config/site-config.ts` and presentation isolated in `src/components/`.
- *Completion criterion*: Clear Server vs. Client Component boundaries, minimal prop surface area, and zero duplicated catalog logic.

### 4. Planning & Workspace Isolation
- **Multi-step features or refactors** → invoke `writing-plans`. Produce a bite-sized, checklist-driven plan (`- [ ]`) naming exact file paths, component signatures, and verification commands.
- **Feature work requiring workspace isolation** → invoke `using-git-worktrees`. Create or verify an isolated git worktree or branch before modifying source files.
- *Completion criterion*: Written implementation checklist and verified clean working tree.

### 5. Execution & Orchestration
- **Single-session sequential plan execution** → invoke `executing-plans`. Execute plan items step-by-step in the current session without scope drift.
- **Multi-task plans with independent workstreams** → invoke `subagent-driven-development`. Dispatch fresh subagents per task with narrow context and controller review between steps.
- **Concurrent independent research or non-overlapping tasks** → invoke `dispatching-parallel-agents`. Run parallel agents only when tasks share zero mutable state.
- *Completion criterion*: All planned items implemented cleanly with atomic, coherent changes.

### 6. Investigation & Debugging
- **Build failures, hydration mismatches, layout shifts, or broken routes** → invoke `systematic-debugging`. Execute the strict loop: Reproduce → Gather evidence → Hypothesize → Test hypothesis → Fix root cause → Verify. Trial-and-error edits without root-cause evidence are forbidden.
- *Completion criterion*: Root cause proven by evidence and resolved with a targeted fix.

### 7. Review, Verification & Quality Gate
- **Pre-completion verification gate** → invoke `verification-before-completion`. Run the full verification suite and inspect live stdout and exit codes before claiming any task is complete:
  1. `pnpm lint`
  2. `pnpm typecheck`
  3. `pnpm build`
  4. `pnpm deploy:verify` (when container/origin delivery or routing is affected)
- **Two-axis post-implementation audit** → invoke `code-review`. Dispatch parallel reviews checking **Standards** (codebase conventions, RTL/typography rules, static-export safety) and **Spec** (exact fulfillment of user requirements).
- *Completion criterion*: Zero lint/typecheck/build errors, static export generated cleanly in `out/`, and both review axes passed.

### 8. Meta & System Evolution
- **Updating `AGENTS.md`, docs, or skill pointers** → invoke `writing-for-agents`. Prune context load, front-load leading words, state positive rules, and keep a single source of truth.
- **Creating or refining agent skills** → invoke `writing-skills`. Develop skills test-first against baseline agent behavior and close rationalizations.
- *Completion criterion*: Compact, high-signal instructions verified against agent execution.

## Core Architecture & Domain Constraints

- **Static-First Export (`output: "export"`)**: The entire application builds to static HTML/assets in `out/` with `trailingSlash: true` and `images: { unoptimized: true }`. Every route (`src/app/**`) must be statically generatable (`dynamic = "force-static"` or `generateStaticParams` with `dynamicParams = false`). Never introduce runtime server actions, dynamic SSR-only headers/cookies, or unguarded `useSearchParams()` outside a `<Suspense>` boundary.
- **Typed Single Source of Truth (`src/config/site-config.ts`)**: Keep all Persian marketing copy, contact numbers, WhatsApp links, categories, and product specifications inside `siteConfig`. Adding or editing products/categories must pass `validateSiteConfig(siteConfig)` without duplicate slugs or broken `categorySlug` references.
- **RTL-First & Local Typography**: Root `<html lang="fa" dir="rtl">` uses local WOFF2/TTF fonts (`peyda` for Persian body/headings, `blackOpsOne` via `font-number` for numeric callouts). Do not add external Google Fonts network requests. Use `toEnglishPaddedNumber` (`src/lib/persian-numbers.ts`) where numeric badges require formatted digits.
- **Styling & Visual System (`src/styles/globals.css`)**:
  - Tailwind CSS v4 with `@theme` tokens (`brand-50` through `brand-700`, `ink-900`, `ink-950`).
  - Global border-radius rule normalizes `.rounded*` classes to `8px` (`globals.css:59-71`), with explicit exceptions like `.nav-menu-pill`. Respect this visual language rather than fighting it with inline overrides.
  - Honor `prefers-reduced-motion: reduce` for all custom CSS keyframes, GSAP (`@gsap/react`), Motion, and OGL WebGL effects (`src/components/reactbits/`).
- **Icons**: Use `@/components/icons` (`Icon` component with typed `IconName`) or `@solar-icons/react` / `lucide-react` consistently with existing sections.
- **Container & CDN Origin Delivery**: Production serves `out/` from `/data/` inside `ghcr.io/gecut/nginx/cdn:2.0.0` on port `8080`. Origin health requires `GET /server-info` (`200`), `GET /` (`200` with `Cache-Control` and `ETag`), and `GET /missing-asset.js` (`404` with `Cache-Control: no-store`).
