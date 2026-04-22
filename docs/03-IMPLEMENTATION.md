# 🛠️ DOC 03 — IMPLEMENTATION & TECH ARCHITECTURE

**PT Waskita Cakrawarti Digital · Sovereign Ecosystem**
**Klasifikasi:** INTERNAL — FOUNDER LEVEL — CONFIDENTIAL
**Arsitek Utama:** Haidar Faras Maulia
**Versi Dokumen:** 1.0 · 22 April 2026

> *Arsitektur dulu, fitur belakangan. Boundary dulu, fleksibilitas belakangan.*

---

## 🏛️ 1. ARSITEKTUR SISTEM — MULTI-REPO ECOSYSTEM

```
                        ┌─────────────────────────────┐
                        │   SOVEREIGN COMMAND CENTER  │ ← HUB (v6)
                        │   sovereign-cmd-center.dev  │
                        │   25 halaman · SPA · Hono   │
                        └──────────────┬──────────────┘
                                       │ references
           ┌───────────────┬───────────┼───────────┬────────────────┐
           ▼               ▼           ▼           ▼                ▼
    ┌─────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
    │ SOVEREIGN   │ │ LANE ECO │ │ SOVEREIGN│ │ BARBER + │ │ MARKETPLACE  │
    │ OS PLATFORM │ │ BUDGET   │ │ ECO/TOWER│ │ COFFEE   │ │ (Future M5)  │
    │ Layer 1     │ │ Layer 2  │ │ Layer 3  │ │ Layer 4  │ │ Layer 1-4    │
    │ v2.2-P22    │ │ v1.6-H24 │ │ v0.0.1   │ │ v1.0.0   │ │ —            │
    │ LIVE ✅     │ │ LIVE ✅  │ │ INTERNAL │ │ LIVE ✅  │ │ planned      │
    └─────────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────────┘
```

---

## 📦 2. REPO INVENTORY

| Repo | Role | Status | URL Live | Layer |
|---|---|---|---|---|
| `webapp` (Command Center) | HUB · Orchestrator UI | ✅ LIVE v6 | sovereign-cmd-center.pages.dev | Hub |
| `pre-barber-and-coffee` | Entry Product · PoC | ✅ LIVE v1 | barber-coffee-pwt.pages.dev | L4 |
| `Lane-eco-budget-control-system` | Operational Governance | ✅ LIVE v1.6 | lane-eco-budget-control.pages.dev | L2 |
| `Sovereign-os-platform` | Enterprise Governance | ✅ LIVE v2.2 | sovereign-os-platform.pages.dev | L1 |
| `Sovereign-ecosystem` | Tower/Orchestrator | 🟠 Internal | sovereign-orchestrator.pages.dev | L3 |

**GitHub Owner:** `ganihypha`
**Namespace konvensi:** kebab-case, lowercase, tidak ada singkatan misleading.

---

## 🧱 3. TECH STACK PER LAYER

### **Hub / Command Center (L-Hub)**
| Komponen | Pilihan | Alasan |
|---|---|---|
| Backend Framework | **Hono v4.12.12** | Fast, TypeScript-first, edge-ready |
| Runtime | **Cloudflare Workers/Pages** | Zero cold-start, global edge, FREE tier generous |
| Build Tool | **Vite v6.4.2** | Fast HMR, Cloudflare plugin mature |
| Frontend | **Tailwind CDN + FontAwesome CDN** | Zero-build UI, rapid iteration |
| State | **Browser localStorage** | Client-side, no DB cost, privacy-friendly |
| Deployment | **Wrangler v4.84.1** | Native CF tooling, git-integrated |
| Process Mgr | **PM2** | Dev-mode daemonization (sandbox only) |

### **Layer 1 Enterprise (Sovereign OS)**
- Same stack + **Cloudflare D1** (SQLite) untuk governance events log
- **Hono JWT middleware** untuk auth
- **Cloudflare Queues** (roadmap) untuk async workflow
- **R2 Storage** untuk evidence/audit artifacts

### **Layer 2 Operational (Lane Eco)**
- Hono + D1 + **KV Namespace** untuk budget rules
- Webhook ingress + rate limiter custom
- Dashboard real-time via **Server-Sent Events** (bukan WebSocket — CF Workers limitation)

### **Layer 3 Private Tower**
- Hono + D1 + R2
- **Single-tenant deployment** per client (brand isolation canon)
- Custom subdomain per deployment: `tower-{client}.waskita.id`

### **Layer 4 Vertical (Barber+Coffee, FashionKas, ResellerKas)**
- Hono minimal + localStorage
- PWA-ready (offline-first untuk UMKM low-connectivity)
- QR/print-friendly dashboard

---

## 🗃️ 4. DATA MODEL (Overview)

### localStorage Keys (Hub v6)
```typescript
sovereign_sprint_v2      → Sprint 4-week checkboxes
sovereign_scorecard_v5   → Founder KPI weekly log
sovereign_canon_v5       → Canon freeze decisions
sovereign_notes_v5       → Quick notes with tags
sovereign_dailylog_v6    → Daily command log entries
sovereign_pipeline_v6    → CRM leads with stage
```

### D1 Schema (Planned — Fase 2+)
```sql
-- Multi-tenant isolation
CREATE TABLE tenants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tier INTEGER CHECK(tier BETWEEN 1 AND 5),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Governance events (audit trail canon)
CREATE TABLE governance_events (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  actor TEXT NOT NULL,
  payload TEXT,  -- JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Pipeline CRM (migration dari localStorage)
CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  name TEXT,
  tier INTEGER,
  stage TEXT,
  setup_fee INTEGER,
  monthly_fee INTEGER,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Daily log
CREATE TABLE daily_logs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  entry_date DATE,
  win TEXT, blocker TEXT, reflection TEXT,
  mood INTEGER, focus_hours REAL,
  phase INTEGER,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

---

## 🔐 5. SECURITY MODEL

| Layer | Policy |
|---|---|
| **Auth** | JWT-based (Hono middleware); Fase 3+: Clerk/Auth0 integration |
| **Tenant Isolation** | Non-negotiable canon — query always scoped by `tenant_id` |
| **Secrets** | `wrangler secret put` untuk production; `.dev.vars` untuk local (di `.gitignore`) |
| **CORS** | Whitelist per environment — no wildcard in production |
| **Rate Limit** | Cloudflare Turnstile + custom KV counter |
| **Audit Log** | All writes logged to `governance_events` (immutable) |
| **Backup** | D1 daily export → R2 (retention 30 hari) |

---

## 🚀 6. DEPLOYMENT PIPELINE

### Current (Manual)
```
local dev → git push → cloudflare pages auto-deploy → verify URL
                    └─ preview on branch
                    └─ production on main
```

### Target Fase 2 (CI/CD)
```
PR → GitHub Actions (lint + type-check + build) → preview deploy
   └─ merge main → production deploy → health check → Slack notify
   └─ tag v* → create release → update changelog
```

### Environment Matrix
| Env | Branch | Deploy Target | DB |
|---|---|---|---|
| Local Dev | feature/* | `wrangler pages dev` | D1 --local |
| Preview | PR branches | `*-pr-N.pages.dev` | D1 preview |
| Staging | `staging` | `staging.pages.dev` | D1 staging |
| Production | `main` | `*.pages.dev` (live) | D1 production |

---

## 🔌 7. INTEGRATION INVENTORY

### Active (v6)
- ✅ Cloudflare Pages (deploy)
- ✅ GitHub (source + CI)
- ✅ Wrangler CLI (tooling)

### Planned Fase 1-2
- 📅 **Resend** — transactional email (trial signup, pilot invite)
- 📅 **Stripe** (atau **Xendit** / **Midtrans** untuk Indonesia) — payment
- 📅 **Sentry** — error tracking
- 📅 **PostHog** (self-host di Cloudflare) — product analytics
- 📅 **Slack** / **Discord** webhook — notifications

### Planned Fase 3+
- 📅 **Clerk** / **Auth0** — enterprise auth
- 📅 **Intercom** / **Crisp** — customer support
- 📅 **Segment** — event routing

---

## 📐 8. CODING STANDARDS

### Canon Teknis (Non-Negotiable)
1. **TypeScript strict mode** — no `any` unless annotated with comment
2. **Hono handlers < 50 lines** — split ke services/helpers kalau lebih
3. **No Node.js APIs** — hanya Web API (fetch, crypto.subtle, URL)
4. **Static files di `public/static/*`** — akses via `/static/*`
5. **Commit message format:** `<type>: <description>` (lihat DOC 02 §8)
6. **Branch:** `main` = production; feature branch format `feat/feature-name`
7. **PR wajib di-review** sebelum merge (kalau tim ≥ 2 orang)

### File Structure Standard
```
src/
├── index.tsx          # Main Hono entry
├── routes/            # Route handlers (split by domain)
│   ├── api/
│   ├── pages/
│   └── admin/
├── services/          # Business logic
├── db/                # D1 queries + migrations
├── middleware/        # Auth, logger, rate-limit
├── types/             # Shared TypeScript types
└── utils/             # Pure functions
public/
└── static/            # Assets served at /static/*
migrations/            # D1 SQL migrations
docs/                  # Strategic + technical docs
```

---

## 🧪 9. TESTING STRATEGY

| Level | Tool | Coverage Target | Fase |
|---|---|---|---|
| Unit | Vitest | 70% | Fase 2 |
| Integration | Vitest + Miniflare | Critical paths | Fase 2 |
| E2E | Playwright | Smoke tests | Fase 3 |
| Visual Regression | Percy/Chromatic | Landing + Key pages | Fase 3 |
| Load | k6 | 100 concurrent | Fase 4 |

---

## 📊 10. OBSERVABILITY & SLO

| SLO | Target | Measurement |
|---|---|---|
| Availability | 99.5% | Cloudflare Analytics |
| P95 Latency | <200ms | Cloudflare Analytics |
| Error Rate | <0.5% | Sentry |
| Incident Response | <15 min | PagerDuty (Fase 4) |

**Incident Playbook** (draft):
1. Detect (alert trigger)
2. Triage (severity P0/P1/P2)
3. Communicate (status page)
4. Mitigate (rollback/hotfix)
5. Post-mortem (within 48h)

---

## 🔄 11. MIGRATION ROADMAP (Tech Debt Plan)

| Item | Priority | Fase |
|---|---|---|
| Migrate Tailwind CDN → built-in | Medium | Fase 1 |
| localStorage → D1 cross-device sync | High | Fase 2 |
| Split `index.tsx` (4400 lines) into modules | High | Fase 2 |
| Add auth guard on founder pages | High | Fase 2 |
| Mobile-first responsive fix (Kanban) | Medium | Fase 1 |
| Chart.js integration (Health KPI trend) | Low | Fase 3 |
| D1 migration scripts | High | Fase 2 |
| PWA service worker | Low | Fase 3 |

---

## 🧭 12. ARCHITECTURE DECISION RECORDS (ADR)

### ADR-001: Choose Cloudflare over Vercel/Netlify
**Decision:** Cloudflare Workers/Pages
**Rationale:** Better edge, generous free tier, D1+KV+R2 built-in, lower cost at scale
**Date:** Jan 2026

### ADR-002: localStorage over Database (v1-v6)
**Decision:** Pure client-side state untuk Hub
**Rationale:** No auth complexity, founder-only tool, privacy
**Trade-off:** No cross-device sync (planned for Fase 2)

### ADR-003: Monorepo dengan Hono per Repo (bukan Turbo Monorepo)
**Decision:** Multi-repo, tiap layer punya repo sendiri
**Rationale:** Canon "jual per layer" — boundary harus ada di level repo
**Trade-off:** Code duplication minor, tapi independen deploy

### ADR-004: JSX Hono untuk SSR (bukan React/Next)
**Decision:** `hono/jsx` runtime
**Rationale:** Zero JS ship, edge-native, cepat
**Trade-off:** Tidak ada client framework → pakai vanilla JS di browser

### ADR-005: 5-Tier Price Architecture (Frozen Canon)
**Decision:** T1-T5 range, tidak bisa diubah sampai Bulan 6 review
**Rationale:** Hindari discount war, disiplin positioning
**Date:** 21 April 2026

---

## ✅ 13. DEFINITION OF DONE (DoD)

Fitur dianggap "selesai" jika:
- [ ] Code merged ke `main`
- [ ] Deployed ke production
- [ ] URL verified HTTP 200
- [ ] README.md updated
- [ ] Journal entry dibuat
- [ ] Commit message mengikuti format
- [ ] (Fase 2+) Test coverage ≥ 70%
- [ ] (Fase 2+) Changelog updated

---

**Dokumen terkait:**
- DOC 01 — Roadmap Master (fase & milestone)
- DOC 04 — Team Building (hiring teknis)
- DOC 05 — Estimasi Waktu

**Status Dokumen:** ✅ LIVE v1.0 · Review tiap akhir fase.
