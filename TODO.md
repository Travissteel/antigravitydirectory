# Antigravity Directory - TODO

**Last Updated:** January 2026
**PRD Reference:** antigravity_directory_prd.pdf

---

## Phase 1: MVP Foundation ✅ COMPLETE

- [x] Initialize Next.js 14 project with TypeScript and Tailwind
- [x] Install Shadcn UI components and configure theme
- [x] Create type definitions (DirectoryItem, Rule, Workflow, MCPServer)
- [x] Create safety analyzer utility for automated scoring
- [x] Build layout components (Header, Footer)
- [x] Build directory components (SafetyBadge, DifficultyBadge, DirectoryCard, DirectoryGrid)
- [x] Create homepage with hero section and featured items
- [x] Create Prompts directory (/prompts, /prompts/[slug]) - 35 items
- [x] Create Rules directory (/rules, /rules/[slug]) - 21 items
- [x] Create Workflows directory (/workflows, /workflows/[slug]) - 15 items
- [x] Create MCP Servers directory (/mcp, /mcp/[slug]) - 15 items
- [x] Create Templates page (/templates)
- [x] Create SEO routes (/llms.txt, /sitemap.xml, /robots.txt)
- [x] Add JSON-LD structured data
- [x] Update navigation with all sections
- [x] Push to GitHub: https://github.com/Travissteel/antigravitydirectory

**Total: 88 resources created**

---

## Phase 2: Enhanced Discovery ✅ COMPLETE

### Search & Filtering (High Priority)
- [x] Implement advanced faceted search with predictive text
- [x] Add filters: category, tags, technology stack, difficulty, safety level
- [x] Add sort options: rating, date, views
- [x] Create dedicated /search page with results

### Navigation & UX
- [ ] Add breadcrumbs to all detail pages
- [ ] Create /blog section placeholder pages
- [x] Add "Copy to clipboard" feedback toast
- [ ] Improve mobile navigation
- [x] Implement official Antigravity UI & Branding
- [x] Center body content layout

### Testing
- [ ] Run full visual test with Playwright
- [ ] Verify all 86+ routes work (zero 404s)
- [ ] Test filtering on all directory pages
- [ ] Test search functionality

---

## Phase 3: Community Features (Post-MVP)

### Authentication (Supabase Auth)
- [ ] Set up Supabase project
- [ ] Implement GitHub OAuth login
- [ ] Implement Google OAuth login
- [ ] Create user sessions and JWT handling
- [ ] Add login/signup UI in header

### User Profiles
- [ ] Create /u/[username] profile pages
- [ ] Show user's submissions and contributions
- [ ] Add bio and social links
- [ ] Implement avatar upload

### Content Submission
- [ ] Create /submit page with form
- [ ] Build submission form for each content type
- [ ] Implement moderation queue (Draft → Pending → Published)
- [ ] Add email notifications for submission status
- [ ] Create admin dashboard for moderators

### Ratings & Reviews
- [ ] Add 5-star rating system to listings
- [ ] Implement threaded comments
- [ ] Add upvote/downvote on listings and comments
- [ ] Create "helpful" votes on comments

---

## Phase 4: Content & Growth

### Blog/Articles Section
- [ ] Create /blog listing page
- [ ] Create /blog/[slug] article pages
- [ ] Write initial articles:
  - [ ] "Getting Started with Antigravity IDE"
  - [ ] "Managing Rate Limits and Quotas"
  - [ ] "Mastering the Browser Subagent"
  - [ ] "Writing Effective Prompts"
  - [ ] "Safety Best Practices"

### SEO & Marketing
- [ ] Target long-tail keywords in content
- [ ] Add more Schema.org structured data
- [ ] Create social sharing images (OG images)
- [ ] Set up Google Search Console
- [ ] Submit to relevant directories and communities

### Additional Features
- [ ] Implement saved/bookmarked items
- [ ] Add "Featured" listings functionality
- [ ] Create collections/bundles of related items
- [ ] Add version history and changelogs to listings

---

## Phase 5: Monetization (Month 6+)

### Featured Listings
- [ ] Implement Stripe integration
- [ ] Create featured listing purchase flow
- [ ] Add "Featured" badge and priority placement
- [ ] Build analytics dashboard for featured listings

### Job Board
- [ ] Create /jobs listing page
- [ ] Build job posting form
- [ ] Implement paid job listings
- [ ] Add job alerts/notifications

### Premium Features
- [ ] Define premium tier benefits
- [ ] Implement subscription billing
- [ ] Add premium analytics for listing authors
- [ ] Create API access tier

---

## Technical Debt & Improvements

- [ ] Add error boundaries to all pages
- [ ] Implement proper loading states
- [ ] Add Suspense boundaries for streaming
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics (Vercel Analytics or Plausible)
- [ ] Optimize images with next/image
- [ ] Add PWA support
- [ ] Implement ISR for dynamic content

---

## Content Goals

| Type | Current | Target (MVP) | Target (V1) |
|------|---------|--------------|-------------|
| Prompts | 35 | 50 | 100+ |
| Rules | 21 | 30 | 50+ |
| Workflows | 17 | 20 | 40+ |
| MCPs | 15 | 25 | 50+ |
| Blog Posts | 0 | 5 | 20+ |

---

## Notes

- PRD emphasizes **execution excellence** over feature breadth
- Focus on **search and filtering** as highest priority feature
- Build **content moat** through quality and depth
- Maintain **trust** through transparent curation process
- Avoid competitor mistakes: over-ambition, 404 errors, empty shells
