# Antigravity Directory - Project Summary

**Version:** MVP 1.5 | **Updated:** January 2026
**Status:** Phase 1 Complete - Core MVP with full content

## What It Is

The definitive community-driven directory for discovering, sharing, and safely deploying Antigravity IDE (Google's agent-first IDE) prompts, rules, workflows, and MCP server integrations. Positioned as "The Directory Developers Trust" with safety scoring as the critical differentiator.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn UI |
| Theme | Dark mode with neon purple accents |
| Deployment | Vercel-ready |

## Content Inventory

| Type | Count | Categories |
|------|-------|------------|
| **Prompts** | 35 | nextjs, react, python, typescript, devops, database, testing, multi-agent, security, api |
| **Rules** | 21 | coding-style, architectural-patterns, security-standards, performance |
| **Workflows** | 15 | automated-qa, ci-cd, database-migration, deployment, refactoring |
| **MCP Servers** | 15 | testing, database, devops, api |
| **Total** | **86 resources** | |

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
│   │   ├── page.tsx            # Workflows directory (15 items)
│   │   └── [slug]/page.tsx     # Individual workflow pages
│   ├── mcp/
│   │   ├── page.tsx            # MCP servers directory (15 items)
│   │   └── [slug]/page.tsx     # Individual MCP pages
│   ├── templates/page.tsx      # Workflow templates
│   ├── llms.txt/route.ts       # AI-friendly content export
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # Robots.txt
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Navigation with all sections
│   │   └── Footer.tsx          # Links + disclaimer
│   ├── directory/
│   │   ├── SafetyBadge.tsx     # Safety indicators
│   │   ├── DifficultyBadge.tsx # Difficulty levels
│   │   ├── DirectoryCard.tsx   # Item card component
│   │   └── DirectoryGrid.tsx   # Filterable grid
│   └── JsonLd.tsx              # Structured data
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

## Phase 1 Complete ✅

- [x] Core directories (Prompts, Rules, Workflows, MCPs)
- [x] 86 high-quality resources
- [x] Safety scoring on all items
- [x] Navigation with all sections
- [x] SEO routes (sitemap, robots, llms.txt)
- [x] JSON-LD structured data

## Phase 2 TODO (Community Features)

- [ ] Advanced faceted search with filters
- [ ] Breadcrumbs navigation
- [ ] Blog/articles section
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
