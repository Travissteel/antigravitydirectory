# Antigravity Directory - Project Summary

**Version:** MVP 2.0 | **Updated:** January 2026
**Status:** Phase 2 Complete - Enhanced Discovery & Official Branding

## What It Is

The definitive community-driven directory for discovering, sharing, and safely deploying Antigravity IDE (Google's agent-first IDE) prompts, rules, workflows, and MCP server integrations. Positioned as "The Directory Developers Trust" with safety scoring as the critical differentiator.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn UI |
| Theme | Official Antigravity (Google 2025 Brighter Palette) |
| Deployment | Vercel-ready |

## Content Inventory

| Type | Count | Categories |
|------|-------|------------|
| **Prompts** | 35 | nextjs, react, python, typescript, devops, database, testing, multi-agent, security, api |
| **Rules** | 21 | coding-style, architectural-patterns, security-standards, performance |
| **Workflows** | 17 | automated-qa, ci-cd, database-migration, deployment, refactoring |
| **MCP Servers** | 15 | testing, database, devops, api |
| **Total** | **88 resources** | |

## Key Differentiators

| Feature | Competitors | Antigravity Directory |
|---------|-------------|----------------------|
| Safety Analysis | None | Safety Score on every item |
| Difficulty Levels | None | Beginner/Intermediate/Advanced |
| Content Types | Prompts only | Prompts + Rules + Workflows + MCPs |
| Versioning | None | Changelog + deprecation notices |

## Project Structure

```
antigravity-directory/
├── app/
│   ├── layout.tsx              # Root layout with dark theme
│   ├── page.tsx                # Homepage with hero + featured
│   ├── prompts/
│   │   ├── page.tsx            # Prompts directory (35 items)
│   │   └── [slug]/page.tsx     # Individual prompt pages
│   ├── rules/
│   │   ├── page.tsx            # Rules directory (21 items)
│   │   └── [slug]/page.tsx     # Individual rule pages
│   ├── workflows/
│   │   ├── page.tsx            # Workflows directory (17 items)
│   │   └── [slug]/page.tsx     # Individual workflow pages
│   ├── mcp/
│   │   ├── page.tsx            # MCP servers directory (15 items)
│   │   └── [slug]/page.tsx     # Individual MCP pages
│   ├── templates/page.tsx      # Workflow templates
│   ├── about/page.tsx          # About Antigravity Directory
│   ├── privacy/page.tsx        # Privacy Policy
│   ├── terms/page.tsx          # Terms of Service
│   ├── search/page.tsx         # Dedicated Search Page
│   ├── llms.txt/route.ts       # AI-friendly content export
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # Robots.txt
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Navigation with Search CMD+K
│   │   ├── Footer.tsx          # Links + disclaimer
│   │   └── AntigravityLogo.tsx # Official SVG Logo
│   ├── directory/
│   │   ├── SafetyBadge.tsx     # Safety indicators
│   │   ├── DifficultyBadge.tsx # Difficulty levels
│   │   ├── DirectoryCard.tsx   # Item card component
│   │   ├── DirectoryGrid.tsx   # Advanced Faceted Search
│   │   ├── CopyButton.tsx      # Feedback on copy
│   │   └── index.ts            # Components export
│   └── SearchCommand.tsx       # Global CMD+K Search
├── lib/
│   ├── data.ts                 # All content (86 items)
│   └── safety-analyzer.ts      # Automated safety scoring
└── types/
    └── index.ts                # TypeScript interfaces
```

## Safety Scoring System

Every item is analyzed for:

```typescript
SafetyFlags {
  hasFileSystemAccess: boolean;   // fs.readFile, writeFile, etc.
  hasNetworkAccess: boolean;      // fetch, axios, http
  hasShellCommands: boolean;      // exec, spawn, bash, cmd
  hasTurboMode: boolean;          // auto-run, SafeToAutoRun
  hasDeleteCommands: boolean;     // rm -rf, del, rmdir
  deletionRisk: 'none' | 'low' | 'medium' | 'high';
}
```

**Scoring:**
- 🟢 **Safe** (80-100): No destructive commands
- 🟡 **Caution** (50-79): Has file/network access
- 🔴 **Dangerous** (0-49): Shell commands, turbo-mode, deletion risks

## Commands

```bash
# Development
cd antigravity-directory
npm run dev

# Build
npm run build

# Start production
npm start
```

## Phase 2 Complete ✅

- [x] Advanced faceted search with filters
- [x] Dedicated /search page
- [x] Official Antigravity branding & logo integration
- [x] Balanced centered layout design
- [x] 88 high-quality resources (+2 agentic workflows)
- [x] Missing footer pages (/about, /privacy, /terms)
- [x] "Copy to clipboard" feedback UX

## Phase 3 TODO (Community Features)

- [ ] Breadcrumbs navigation
- [ ] Blog/articles section (MDX setup)
- [ ] Supabase Auth (GitHub, Google login)
- [ ] User profiles
- [ ] Ratings and comments
- [ ] Content submission system

## Phase 3 TODO (Growth)

- [ ] Featured listings
- [ ] Bookmarks/saved items
- [ ] Voting system
- [ ] Job board
- [ ] Premium listings

## Key Marketing Angle

> "Every prompt audited for safety. No more drive deletions."

References the incident where Antigravity deleted a developer's entire drive without permission.

---

**North Star:** Be the directory developers trust when Antigravity's power scares them.
