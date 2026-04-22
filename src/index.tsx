import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

// API: Get live status (mock — in production would ping actual URLs)
app.get('/api/status', (c) => {
  return c.json({
    timestamp: new Date().toISOString(),
    platforms: [
      { id: 'sovereign-os', name: 'Sovereign OS Platform', url: 'https://sovereign-os-platform.pages.dev', layer: 1, status: 'live', version: 'v2.2.0-P22' },
      { id: 'lane-eco', name: 'Lane Eco Budget Control', url: 'https://lane-eco-budget-control.pages.dev', layer: 2, status: 'live', version: 'v1.6.0-HUB24' },
      { id: 'sovereign-eco', name: 'Sovereign Ecosystem / Tower', url: 'https://sovereign-orchestrator.pages.dev', layer: 3, status: 'internal', version: 'v0.0.1' },
      { id: 'barber-coffee', name: 'Barber + Coffee PWT', url: 'https://barber-coffee-pwt.pages.dev', layer: 4, status: 'live', version: 'v1.0.0' },
    ],
    overall: 'P5 LIVE-VERIFIED / HUB-24 MATURE',
    lastUpdate: '21 April 2026'
  })
})

// API: Catalog data
app.get('/api/catalog', (c) => {
  const catalog = [
    { code: 'A', name: 'Sovereign Governance Core', layer: 'L1', category: 'Enterprise Governance', desc: 'Sistem tata kelola AI: approval, proof, canon, live state, audit trail', market: 'Enterprise, Holding', model: 'Annual license', priceFrom: 50000000 },
    { code: 'B', name: 'AI Governance Operating Layer', layer: 'L1', category: 'Enterprise Governance', desc: 'Lapisan operasi AI: compliance SLA, role boundary, workflow discipline', market: 'Internal platform team', model: 'Deploy + SLA', priceFrom: 25000000 },
    { code: 'C', name: 'Multi-Tenant Control Platform', layer: 'L1', category: 'Enterprise Governance', desc: 'Platform B2B: tenant isolation, keamanan data, multi-brand governance', market: 'Enterprise B2B', model: 'Enterprise license', priceFrom: 50000000 },
    { code: 'D', name: 'Lane Control Pack', layer: 'L2', category: 'Operational Control', desc: 'Gateway: budget, lane control, session boundary, blocker logic', market: 'Operator multi-brand', model: 'Impl. + monthly fee', priceFrom: 15000000 },
    { code: 'E', name: 'Prompt Budget Governance Pack', layer: 'L2', category: 'Operational Control', desc: 'Mengunci konteks AI agar tidak halusinasi di luar logic bisnis', market: 'AI-heavy team', model: 'Monthly fee', priceFrom: 5000000 },
    { code: 'F', name: 'Master Architect Context Pack', layer: 'L2', category: 'Operational Control', desc: 'Paket arsitektur kendali siap pakai untuk tim operations', market: 'Founder/Ops lead', model: 'Setup + retainer', priceFrom: 10000000 },
    { code: 'G', name: 'Founder Command Center', layer: 'L3', category: 'Command Center', desc: 'Ruang komando privat: orkestrasi workflow, CEO decision', market: 'Founder/Venture Builder', model: 'High-ticket + managed', priceFrom: 35000000 },
    { code: 'H', name: 'Private Sovereign Tower', layer: 'L3', category: 'Command Center', desc: 'Infrastruktur privat untuk eksperimen bisnis terisolasi', market: 'Holding, Internal Lab', model: 'Private deployment', priceFrom: 50000000 },
    { code: 'I', name: 'Revenue Intelligence Chamber', layer: 'L3', category: 'Command Center', desc: 'Analisis validasi pendapatan real-time berbasis data riil', market: 'Operator inti', model: 'Setup + advisory', priceFrom: 20000000 },
    { code: 'J', name: 'Barber + Coffee Business Planner', layer: 'L4', category: 'Vertical Business', desc: 'Alat bantu UMKM: modal, BEP, simulasi, timeline buka usaha', market: 'UMKM, Calon owner', model: 'Setup + maintenance', priceFrom: 3000000 },
    { code: 'K', name: 'Vertical Dashboard White-Label Pack', layer: 'L4', category: 'White-Label System', desc: 'Template dashboard per sektor — bisa dilabeli merek sendiri', market: 'Agency, Konsultan', model: 'Impl. + license', priceFrom: 10000000 },
    { code: 'L', name: 'Sector Playbook Pack', layer: 'L4', category: 'White-Label System', desc: 'Sistem duplikasi sukses operasional lintas sektor', market: 'Multi-brand operator', model: 'Pack + retainer', priceFrom: 15000000 },
    { code: 'M', name: 'Custom Verticalization Sprint', layer: 'L4', category: 'White-Label System', desc: 'Adaptasi cepat engine ke industri baru dalam 2-4 minggu', market: 'Holding UMKM, Mentor', model: 'Sprint fee', priceFrom: 20000000 },
    { code: 'N', name: 'FashionKas Commerce Engine', layer: 'L4', category: 'Vertical Business', desc: 'Mesin validasi transaksi ritel berbasis AI + reseller ops', market: 'Fashion owner', model: 'Setup + subscription', priceFrom: 5000000 },
    { code: 'O', name: 'ResellerKas Distribution Layer', layer: 'L4', category: 'Vertical Business', desc: 'Sistem manajemen agen dan reseller dengan otomasi WA', market: 'Reseller network owner', model: 'Monthly + API fee', priceFrom: 3000000 },
    { code: 'P', name: 'Connector/Template Marketplace', layer: 'L1-4', category: 'Marketplace', desc: 'Ekosistem modular plug-and-play komponen Sovereign', market: 'Self-serve, Partner', model: 'One-time + bundle', priceFrom: 500000 },
  ]
  return c.json(catalog)
})

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sovereign Productization Command Center v3.0 — PT Waskita Cakrawarti Digital</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<style>
  :root {
    --navy: #0a1628;
    --navy-mid: #112038;
    --navy-light: #1a2d42;
    --navy-card: #0f1e35;
    --gold: #c9a84c;
    --gold-light: #e8c97e;
    --gold-pale: #f5e6bb;
    --gold-dark: #9a7a2e;
    --ivory: #faf8f3;
    --text-main: #e2ddd0;
    --text-muted: #8a9bb0;
    --green: #27ae60;
    --green-bright: #2ecc71;
    --red: #e74c3c;
    --blue: #2980b9;
    --blue-bright: #3498db;
    --purple: #8e44ad;
    --orange: #d35400;
    --orange-bright: #e67e22;
    --teal: #16a085;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: var(--navy);
    color: var(--text-main);
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ---- ANIMATED BACKGROUND ---- */
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0;
    background: radial-gradient(ellipse 800px 600px at 10% 20%, rgba(201,168,76,0.04) 0%, transparent 60%),
                radial-gradient(ellipse 600px 500px at 90% 80%, rgba(52,152,219,0.04) 0%, transparent 60%);
    pointer-events: none;
  }

  /* ---- SIDEBAR ---- */
  .sidebar {
    position: fixed; top: 0; left: 0;
    width: 268px; height: 100vh;
    background: var(--navy-mid);
    border-right: 1px solid rgba(201,168,76,0.12);
    display: flex; flex-direction: column;
    z-index: 100; overflow-y: auto;
    transition: transform 0.3s ease;
    backdrop-filter: blur(10px);
  }
  .sidebar-logo {
    padding: 22px 18px 16px;
    border-bottom: 1px solid rgba(201,168,76,0.12);
    background: linear-gradient(180deg, rgba(201,168,76,0.06) 0%, transparent 100%);
  }
  .logo-badge {
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: var(--navy);
    font-size: 9px; font-weight: 900;
    letter-spacing: 2px; text-transform: uppercase;
    padding: 3px 8px; border-radius: 3px; display: inline-block;
    margin-bottom: 8px;
  }
  .logo-title {
    font-size: 14px; font-weight: 800;
    color: var(--gold-light); line-height: 1.35;
    letter-spacing: -0.3px;
  }
  .logo-sub {
    font-size: 9.5px; color: var(--text-muted);
    margin-top: 4px; letter-spacing: 0.5px;
  }
  .logo-version {
    display: inline-block;
    background: rgba(46,204,113,0.15); border: 1px solid rgba(46,204,113,0.3);
    color: var(--green-bright); font-size: 8.5px; font-weight: 700;
    padding: 1px 7px; border-radius: 10px; margin-top: 6px;
  }
  .nav-section { padding: 12px 10px 6px; }
  .nav-section-label {
    font-size: 8.5px; font-weight: 800;
    color: var(--text-muted); letter-spacing: 2px;
    text-transform: uppercase; padding: 0 8px 7px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 12px; border-radius: 7px;
    cursor: pointer; transition: all 0.2s;
    color: var(--text-muted); font-size: 12.5px;
    font-weight: 500; margin-bottom: 1px;
    text-decoration: none; position: relative;
  }
  .nav-item:hover { background: rgba(201,168,76,0.09); color: var(--gold-light); }
  .nav-item.active {
    background: rgba(201,168,76,0.14);
    color: var(--gold-light);
    border-left: 2px solid var(--gold);
  }
  .nav-item i { width: 15px; text-align: center; font-size: 11px; flex-shrink: 0; }
  .nav-badge {
    margin-left: auto; font-size: 9px;
    padding: 1px 7px; border-radius: 10px; font-weight: 800;
    letter-spacing: 0.5px;
  }
  .nb-gold { background: rgba(201,168,76,0.25); color: var(--gold-light); }
  .nb-green { background: rgba(46,204,113,0.2); color: var(--green-bright); }
  .nb-red { background: rgba(231,76,60,0.2); color: var(--red); }
  .nb-blue { background: rgba(52,152,219,0.2); color: var(--blue-bright); }
  .nb-orange { background: rgba(230,126,34,0.2); color: var(--orange-bright); }

  /* ---- MAIN ---- */
  .main-content { margin-left: 268px; min-height: 100vh; padding: 0 0 80px; position: relative; z-index: 1; }

  /* ---- TOPBAR ---- */
  .topbar {
    background: rgba(17,32,56,0.95);
    border-bottom: 1px solid rgba(201,168,76,0.12);
    padding: 12px 26px;
    display: flex; align-items: center;
    justify-content: space-between;
    position: sticky; top: 0; z-index: 50;
    backdrop-filter: blur(12px);
  }
  .topbar-title { font-size: 15px; font-weight: 800; color: var(--gold-light); letter-spacing: -0.3px; }
  .topbar-sub { font-size: 10.5px; color: var(--text-muted); margin-top: 1px; }
  .status-live {
    display: flex; align-items: center; gap: 6px;
    background: rgba(39,174,96,0.12);
    border: 1px solid rgba(39,174,96,0.3);
    padding: 4px 12px; border-radius: 20px;
    font-size: 10px; font-weight: 700; color: var(--green-bright);
    letter-spacing: 0.5px;
  }
  .status-live::before {
    content: ''; width: 6px; height: 6px;
    background: var(--green-bright); border-radius: 50%;
    animation: pulse-dot 2s infinite;
  }
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }

  /* ---- PAGES ---- */
  .page { display: none; padding: 22px 26px; animation: fadeInPage 0.3s ease; }
  .page.active { display: block; }
  @keyframes fadeInPage { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

  /* ---- CARDS ---- */
  .card {
    background: var(--navy-card);
    border: 1px solid rgba(201,168,76,0.1);
    border-radius: 12px; padding: 18px;
    transition: border-color 0.2s;
  }
  .card:hover { border-color: rgba(201,168,76,0.2); }
  .card-gold {
    background: linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04));
    border: 1px solid rgba(201,168,76,0.28);
    border-radius: 12px; padding: 18px;
  }
  .card-header {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 14px;
  }
  .card-icon {
    width: 34px; height: 34px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
  }
  .card-title { font-size: 13.5px; font-weight: 700; color: var(--gold-light); }
  .card-sub { font-size: 10.5px; color: var(--text-muted); margin-top: 2px; }

  /* ---- METRIC CARDS ---- */
  .metric-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 22px; }
  .metric-card {
    background: var(--navy-card);
    border: 1px solid rgba(201,168,76,0.1);
    border-radius: 10px; padding: 15px;
    transition: all 0.2s; cursor: default;
    position: relative; overflow: hidden;
  }
  .metric-card::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
  }
  .metric-card:hover { border-color: rgba(201,168,76,0.25); transform: translateY(-1px); }
  .metric-label { font-size: 9.5px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 7px; }
  .metric-value { font-size: 24px; font-weight: 900; color: var(--gold-light); letter-spacing: -1px; }
  .metric-sub { font-size: 10px; color: var(--text-muted); margin-top: 3px; }
  .metric-trend { font-size: 9.5px; font-weight: 700; margin-top: 5px; }
  .trend-up { color: var(--green-bright); }
  .trend-pending { color: var(--orange-bright); }

  /* ---- TABLE ---- */
  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th {
    font-size: 9.5px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 1.2px;
    color: var(--text-muted); padding: 9px 11px;
    border-bottom: 1px solid rgba(201,168,76,0.1);
    text-align: left;
  }
  .data-table td {
    padding: 10px 11px; font-size: 11.5px;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    vertical-align: top;
  }
  .data-table tr:hover td { background: rgba(255,255,255,0.025); }

  /* ---- TAGS ---- */
  .tag {
    display: inline-block; padding: 2px 8px;
    border-radius: 4px; font-size: 9.5px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;
  }
  .tag-gold { background: rgba(201,168,76,0.18); color: var(--gold-light); border: 1px solid rgba(201,168,76,0.35); }
  .tag-green { background: rgba(39,174,96,0.15); color: var(--green-bright); border: 1px solid rgba(39,174,96,0.3); }
  .tag-red { background: rgba(231,76,60,0.15); color: #f08080; border: 1px solid rgba(231,76,60,0.3); }
  .tag-blue { background: rgba(41,128,185,0.15); color: var(--blue-bright); border: 1px solid rgba(41,128,185,0.3); }
  .tag-purple { background: rgba(142,68,173,0.15); color: #c39bd3; border: 1px solid rgba(142,68,173,0.3); }
  .tag-orange { background: rgba(211,84,0,0.15); color: var(--orange-bright); border: 1px solid rgba(211,84,0,0.3); }
  .tag-teal { background: rgba(22,160,133,0.15); color: #58d6c0; border: 1px solid rgba(22,160,133,0.3); }

  /* ---- PROGRESS ---- */
  .progress-bar { height: 5px; background: rgba(255,255,255,0.07); border-radius: 3px; overflow: hidden; margin-top: 6px; }
  .progress-fill {
    height: 100%; border-radius: 3px;
    background: linear-gradient(90deg, var(--gold-dark), var(--gold-light));
    transition: width 1s ease;
  }
  .progress-fill.green { background: linear-gradient(90deg, var(--green), var(--green-bright)); }

  /* ---- WEEK CARDS ---- */
  .week-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .week-card {
    background: var(--navy-card);
    border: 1px solid rgba(201,168,76,0.1);
    border-radius: 10px; padding: 16px;
  }
  .week-number { font-size: 9.5px; font-weight: 900; text-transform: uppercase; letter-spacing: 2.5px; color: var(--gold); margin-bottom: 5px; }
  .week-title { font-size: 14px; font-weight: 800; color: var(--text-main); margin-bottom: 3px; }
  .week-sub { font-size: 10.5px; color: var(--text-muted); margin-bottom: 12px; line-height: 1.5; }
  .checklist-item {
    display: flex; align-items: flex-start; gap: 8px;
    padding: 5px 0; font-size: 11.5px; color: var(--text-muted);
    border-bottom: 1px solid rgba(255,255,255,0.03);
    cursor: pointer; transition: color 0.15s;
  }
  .checklist-item:last-child { border-bottom: none; }
  .checklist-item:hover { color: var(--text-main); }
  .checklist-item.done > span { color: var(--text-muted); text-decoration: line-through; opacity: 0.7; }
  .check-box {
    width: 16px; height: 16px; border-radius: 3px;
    background: rgba(201,168,76,0.08); border: 1.5px solid rgba(201,168,76,0.25);
    flex-shrink: 0; display: flex; align-items: center; justify-content: center;
    font-size: 8px; color: var(--gold); margin-top: 2px;
    cursor: pointer; transition: all 0.15s; user-select: none;
  }
  .check-box.done { background: var(--green); border-color: var(--green); color: white; }
  .check-box.risk { background: rgba(231,76,60,0.15); border-color: rgba(231,76,60,0.35); color: var(--red); cursor: default; }

  /* ---- SECTION HEADERS ---- */
  .section-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 18px; justify-content: space-between; }
  .section-title { font-size: 18px; font-weight: 900; color: var(--gold-light); letter-spacing: -0.5px; }
  .section-sub { font-size: 11.5px; color: var(--text-muted); margin-top: 3px; line-height: 1.5; }

  /* ---- OFFER CARDS ---- */
  .offer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .offer-card {
    background: var(--navy-card);
    border: 1px solid rgba(201,168,76,0.12);
    border-radius: 12px; padding: 18px;
    transition: all 0.25s; position: relative; overflow: hidden;
  }
  .offer-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    transition: opacity 0.2s;
  }
  .offer-card:hover { transform: translateY(-3px); border-color: rgba(201,168,76,0.3); box-shadow: 0 8px 30px rgba(0,0,0,0.3); }
  .offer-tier { font-size: 9.5px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 7px; }
  .offer-name { font-size: 15px; font-weight: 900; color: var(--text-main); margin-bottom: 3px; letter-spacing: -0.3px; }
  .offer-tagline { font-size: 11px; color: var(--text-muted); margin-bottom: 14px; line-height: 1.55; }
  .offer-features { list-style: none; margin-bottom: 14px; }
  .offer-features li { display: flex; align-items: flex-start; gap: 7px; font-size: 11px; color: var(--text-muted); padding: 3.5px 0; }
  .offer-features li i { color: var(--green-bright); font-size: 9px; margin-top: 3px; flex-shrink: 0; }

  /* ---- ALERT BOX ---- */
  .alert { border-radius: 8px; padding: 11px 14px; font-size: 11.5px; line-height: 1.6; margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px; }
  .alert-gold { background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.25); color: var(--gold-pale); }
  .alert-green { background: rgba(39,174,96,0.07); border: 1px solid rgba(39,174,96,0.25); color: #9de4c0; }
  .alert-red { background: rgba(231,76,60,0.07); border: 1px solid rgba(231,76,60,0.25); color: #f5a89e; }
  .alert-blue { background: rgba(41,128,185,0.07); border: 1px solid rgba(41,128,185,0.25); color: #9ecfed; }

  /* ---- TIMELINE ---- */
  .timeline { position: relative; padding-left: 22px; }
  .timeline::before { content: ''; position: absolute; left: 7px; top: 6px; bottom: 0; width: 2px; background: rgba(201,168,76,0.18); }
  .timeline-item { position: relative; padding-bottom: 22px; }
  .timeline-item::before { content: ''; position: absolute; left: -19px; top: 5px; width: 9px; height: 9px; border-radius: 50%; background: var(--navy-mid); border: 2px solid rgba(201,168,76,0.3); }
  .timeline-item.done::before { background: var(--green); border-color: var(--green); box-shadow: 0 0 8px rgba(39,174,96,0.4); }
  .timeline-item.next::before { background: var(--gold); border-color: var(--gold); animation: pulse-dot 2s infinite; }
  .timeline-phase { font-size: 9.5px; color: var(--gold); font-weight: 800; letter-spacing: 1px; margin-bottom: 3px; text-transform: uppercase; }
  .timeline-title { font-size: 12.5px; font-weight: 700; color: var(--text-main); margin-bottom: 3px; }
  .timeline-sub { font-size: 10.5px; color: var(--text-muted); line-height: 1.55; }

  /* ---- DIVIDERS ---- */
  hr.divider { border: none; border-top: 1px solid rgba(201,168,76,0.1); margin: 16px 0; }

  /* ---- REPO CARDS ---- */
  .repo-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .repo-card { background: var(--navy-card); border: 1px solid rgba(201,168,76,0.1); border-radius: 10px; padding: 16px; transition: border-color 0.2s; }
  .repo-card:hover { border-color: rgba(201,168,76,0.22); }

  /* ---- SEARCH INPUT ---- */
  .search-input {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(201,168,76,0.18);
    border-radius: 8px; padding: 8px 14px; color: var(--text-main);
    font-size: 12px; outline: none; width: 280px; transition: border-color 0.2s;
  }
  .search-input:focus { border-color: rgba(201,168,76,0.4); background: rgba(255,255,255,0.07); }
  .search-input::placeholder { color: var(--text-muted); }

  /* ---- FILTER BUTTONS ---- */
  .filter-btn {
    padding: 5px 12px; border-radius: 6px; font-size: 10.5px; font-weight: 700;
    cursor: pointer; border: 1px solid rgba(201,168,76,0.18); background: transparent;
    color: var(--text-muted); transition: all 0.15s; letter-spacing: 0.5px;
  }
  .filter-btn:hover { border-color: rgba(201,168,76,0.3); color: var(--text-main); }
  .filter-btn.active-filter { background: rgba(201,168,76,0.18); border-color: rgba(201,168,76,0.4); color: var(--gold-light); }

  /* ---- PLATFORM STATUS CARDS ---- */
  .platform-card {
    background: var(--navy-card); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px; padding: 14px 16px;
    display: flex; align-items: center; gap: 14px;
    transition: all 0.2s; text-decoration: none;
  }
  .platform-card:hover { border-color: rgba(201,168,76,0.22); transform: translateX(3px); }
  .platform-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .platform-dot.live { background: var(--green-bright); box-shadow: 0 0 6px rgba(46,204,113,0.5); animation: pulse-dot 2s infinite; }
  .platform-dot.internal { background: var(--orange-bright); box-shadow: 0 0 6px rgba(230,126,34,0.4); }

  /* ---- COMMAND TERMINAL ---- */
  .terminal {
    background: #0d1117; border: 1px solid rgba(39,174,96,0.3);
    border-radius: 10px; padding: 0; font-family: 'Fira Code', 'Courier New', monospace;
    overflow: hidden;
  }
  .terminal-header {
    background: rgba(39,174,96,0.1); padding: 8px 14px;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid rgba(39,174,96,0.2);
  }
  .terminal-dot { width: 10px; height: 10px; border-radius: 50%; }
  .terminal-body { padding: 16px; min-height: 200px; max-height: 380px; overflow-y: auto; }
  .terminal-line { font-size: 12px; line-height: 1.7; margin-bottom: 2px; }
  .t-prompt { color: var(--green-bright); }
  .t-cmd { color: var(--gold-light); }
  .t-output { color: #a8b4c8; }
  .t-success { color: var(--green-bright); }
  .t-warn { color: var(--orange-bright); }
  .t-error { color: var(--red); }
  .t-gold { color: var(--gold); }
  .terminal-input-row { padding: 8px 16px; border-top: 1px solid rgba(39,174,96,0.15); display: flex; align-items: center; gap: 8px; }
  .terminal-input {
    background: transparent; border: none; outline: none;
    color: var(--gold-light); font-family: inherit; font-size: 12px; flex: 1;
  }
  .terminal-input::placeholder { color: rgba(168,180,200,0.4); }

  /* ---- SPRINT TRACKER BADGE ---- */
  .sprint-progress-section { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .sprint-badge {
    padding: 5px 12px; border-radius: 20px; font-size: 10px; font-weight: 700;
    letter-spacing: 0.5px; cursor: pointer; transition: all 0.2s; border: 1px solid;
  }
  .sprint-badge.w1 { background: rgba(201,168,76,0.15); border-color: rgba(201,168,76,0.35); color: var(--gold-light); }
  .sprint-badge.w2 { background: rgba(41,128,185,0.1); border-color: rgba(41,128,185,0.25); color: var(--blue-bright); }
  .sprint-badge.w3 { background: rgba(142,68,173,0.1); border-color: rgba(142,68,173,0.25); color: #c39bd3; }
  .sprint-badge.w4 { background: rgba(231,76,60,0.1); border-color: rgba(231,76,60,0.25); color: #f08080; }

  /* ---- MOBILE ---- */
  @media (max-width: 1024px) {
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .main-content { margin-left: 0; }
    .metric-grid { grid-template-columns: repeat(2, 1fr); }
    .offer-grid { grid-template-columns: 1fr; }
    .week-grid { grid-template-columns: 1fr; }
    .repo-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .metric-grid { grid-template-columns: repeat(2, 1fr); }
    .page { padding: 14px; }
    .topbar { padding: 10px 14px; }
  }

  /* ---- HAMBURGER ---- */
  .hamburger { display: none; background: none; border: none; color: var(--gold-light); font-size: 19px; cursor: pointer; padding: 4px; }
  @media (max-width: 1024px) { .hamburger { display: block; } }
  .overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 99; }
  .overlay.active { display: block; }

  /* ---- SCROLL ---- */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--navy); }
  ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(201,168,76,0.4); }

  /* ---- UTILITY ---- */
  .text-gold { color: var(--gold-light); }
  .text-muted { color: var(--text-muted); }
  .fw-800 { font-weight: 800; }
  .badge-new { background: rgba(231,76,60,0.2); border: 1px solid rgba(231,76,60,0.4); color: #f08080; font-size: 8px; font-weight: 800; padding: 1px 5px; border-radius: 3px; letter-spacing: 0.5px; margin-left: 4px; vertical-align: middle; }

  /* ---- TOOLTIP ---- */
  [data-tip] { position: relative; cursor: help; }
  [data-tip]::after {
    content: attr(data-tip);
    position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%);
    background: #0d1117; border: 1px solid rgba(201,168,76,0.3);
    color: var(--text-main); font-size: 10px; padding: 4px 8px; border-radius: 5px;
    white-space: nowrap; pointer-events: none; opacity: 0; transition: opacity 0.15s;
    z-index: 200;
  }
  [data-tip]:hover::after { opacity: 1; }

  /* ---- GLOWING LINE SEPARATOR ---- */
  .glow-line {
    height: 1px; width: 100%;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent);
    margin: 18px 0;
  }

  /* ---- LAYER BOX VISUAL ---- */
  .layer-box {
    border-radius: 9px; padding: 14px 16px;
    margin-bottom: 8px; transition: all 0.2s; cursor: default;
  }
  .layer-box:hover { filter: brightness(1.05); }
  .layer-box.l1 { background: rgba(142,68,173,0.09); border: 1px solid rgba(142,68,173,0.3); }
  .layer-box.l2 { background: rgba(41,128,185,0.08); border: 1px solid rgba(41,128,185,0.3); }
  .layer-box.l3 { background: rgba(211,84,0,0.07); border: 1px solid rgba(211,84,0,0.28); }
  .layer-box.l4 { background: rgba(39,174,96,0.06); border: 1px solid rgba(39,174,96,0.28); }

  /* ---- EXPORT BUTTON ---- */
  .btn-export {
    background: rgba(201,168,76,0.14); border: 1px solid rgba(201,168,76,0.3);
    color: var(--gold-light); font-size: 11px; font-weight: 700;
    padding: 6px 14px; border-radius: 7px; cursor: pointer; transition: all 0.2s;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .btn-export:hover { background: rgba(201,168,76,0.22); border-color: rgba(201,168,76,0.5); }
</style>
</head>
<body>

<div class="overlay" id="overlay" onclick="closeSidebar()"></div>

<!-- SIDEBAR -->
<nav class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-badge">Founder Level · v3.0</div>
    <div class="logo-title">Sovereign Productization<br>Command Center</div>
    <div class="logo-sub">PT WASKITA CAKRAWARTI DIGITAL · 2026</div>
    <div class="logo-version">● P5 LIVE-VERIFIED / HUB-24 MATURE · v3.0</div>
  </div>

  <div class="nav-section">
    <div class="nav-section-label">Overview</div>
    <a class="nav-item active" onclick="showPage('dashboard')" href="#">
      <i class="fas fa-th-large"></i> Dashboard Utama
    </a>
    <a class="nav-item" onclick="showPage('ecosystem')" href="#">
      <i class="fas fa-layer-group"></i> Arsitektur Ekosistem
    </a>
    <a class="nav-item" onclick="showPage('repomap')" href="#">
      <i class="fas fa-sitemap"></i> Repo-to-Product Map
      <span class="nav-badge nb-green">5</span>
    </a>
    <a class="nav-item" onclick="showPage('status')" href="#">
      <i class="fas fa-broadcast-tower"></i> Platform Status Live
      <span class="nav-badge nb-green">LIVE</span>
    </a>
  </div>

  <div class="nav-section">
    <div class="nav-section-label">Sprint 4 Minggu</div>
    <a class="nav-item" onclick="showPage('week1')" href="#">
      <i class="fas fa-flag"></i> Minggu 1 — Decisions
      <span class="nav-badge nb-gold" id="w1-badge">NOW</span>
    </a>
    <a class="nav-item" onclick="showPage('week2')" href="#">
      <i class="fas fa-box-open"></i> Minggu 2 — Packaging
    </a>
    <a class="nav-item" onclick="showPage('week3')" href="#">
      <i class="fas fa-shield-alt"></i> Minggu 3 — Proof
    </a>
    <a class="nav-item" onclick="showPage('week4')" href="#">
      <i class="fas fa-rocket"></i> Minggu 4 — Closeout
    </a>
  </div>

  <div class="nav-section">
    <div class="nav-section-label">Katalog Komersial</div>
    <a class="nav-item" onclick="showPage('mastercatalog')" href="#">
      <i class="fas fa-book"></i> Master Catalog
      <span class="nav-badge nb-blue">16</span>
    </a>
    <a class="nav-item" onclick="showPage('offers')" href="#">
      <i class="fas fa-tag"></i> Offer Stack (6 Stack)
    </a>
    <a class="nav-item" onclick="showPage('pricing')" href="#">
      <i class="fas fa-dollar-sign"></i> Price Architecture
    </a>
    <a class="nav-item" onclick="showPage('salessheet')" href="#">
      <i class="fas fa-file-alt"></i> Sales One-Liner Sheet
    </a>
  </div>

  <div class="nav-section">
    <div class="nav-section-label">Monetisasi & Strategi</div>
    <a class="nav-item" onclick="showPage('roadmap')" href="#">
      <i class="fas fa-road"></i> Roadmap Monetisasi
    </a>
    <a class="nav-item" onclick="showPage('buyermap')" href="#">
      <i class="fas fa-users"></i> Buyer Segment Map
    </a>
    <a class="nav-item" onclick="showPage('governance')" href="#">
      <i class="fas fa-balance-scale"></i> Governance Laws
    </a>
  </div>

  <div class="nav-section">
    <div class="nav-section-label">Execution Tools</div>
    <a class="nav-item" onclick="showPage('tracker90')" href="#">
      <i class="fas fa-calendar-check"></i> 90-Day Tracker <span class="nav-badge nb-gold">NEW</span>
    </a>
    <a class="nav-item" onclick="showPage('pilotpack')" href="#">
      <i class="fas fa-briefcase"></i> Pilot Pack Generator <span class="nav-badge nb-blue">NEW</span>
    </a>
    <a class="nav-item" onclick="showPage('comparator')" href="#">
      <i class="fas fa-balance-scale"></i> Product Comparator <span class="nav-badge nb-orange">NEW</span>
    </a>
    <a class="nav-item" onclick="showPage('terminal')" href="#">
      <i class="fas fa-terminal"></i> Sovereign Command
    </a>
    <a class="nav-item" onclick="showPage('masterarchitect')" href="#">
      <i class="fas fa-chess-queen"></i> Master Architect Prompt
    </a>
  </div>

  <div class="nav-section">
    <div class="nav-section-label">Progress Stats</div>
    <div style="padding:8px 12px;">
      <div style="font-size:9.5px;color:var(--text-muted);margin-bottom:5px;">Sprint 4 Minggu</div>
      <div class="progress-bar" style="height:5px;"><div class="progress-fill" id="sidebar-progress" style="width:0%;"></div></div>
      <div style="font-size:9px;color:var(--text-muted);margin-top:3px;"><span id="sidebar-pct">0%</span> complete</div>
    </div>
  </div>

  <div class="nav-section" style="margin-top: auto; padding-bottom: 12px;">
    <div style="padding: 10px 12px; font-size: 9.5px; color: var(--text-muted); line-height: 1.7; border-top: 1px solid rgba(201,168,76,0.08); margin-top: 4px;">
      <div style="color: var(--gold); font-weight: 800; margin-bottom: 3px; font-size: 10.5px;">Haidar Faras Maulia</div>
      <div>Arsitek Utama · PT Waskita Cakrawarti Digital</div>
      <div style="margin-top: 3px; color: rgba(138,155,176,0.6);">21 April 2026 · CONFIDENTIAL</div>
      <div style="margin-top:6px;display:flex;gap:5px;">
        <span style="background:rgba(46,204,113,0.15);border:1px solid rgba(46,204,113,0.3);color:var(--green-bright);font-size:8px;font-weight:800;padding:2px 6px;border-radius:10px;">● P5 LIVE</span>
        <span style="background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.3);color:var(--gold);font-size:8px;font-weight:800;padding:2px 6px;border-radius:10px;">v3.0</span>
      </div>
    </div>
  </div>
</nav>

<!-- MAIN CONTENT -->
<main class="main-content">
  <!-- TOPBAR -->
  <div class="topbar">
    <div style="display:flex;align-items:center;gap:10px;">
      <button class="hamburger" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
      <div>
        <div class="topbar-title" id="page-title">Dashboard Utama</div>
        <div class="topbar-sub" id="page-sub">Sovereign Ecosystem · PT Waskita Cakrawarti Digital</div>
      </div>
    </div>
    <div style="display:flex;gap:10px;align-items:center;">
      <div id="global-progress-text" style="font-size:10px;color:var(--text-muted);"></div>
      <div class="status-live" style="cursor:pointer;" onclick="showPage('tracker90')" title="Klik untuk lihat 90-Day Tracker">P5 LIVE-VERIFIED</div>
    </div>
  </div>

  <!-- ========================= DASHBOARD ========================= -->
  <div class="page active" id="page-dashboard">
    <div class="alert alert-gold" style="margin-bottom:18px;">
      <i class="fas fa-crown" style="color:var(--gold);margin-top:2px;flex-shrink:0;"></i>
      <div><strong>Sovereign Engineer Mode Aktif.</strong> "Bukan pedagang. Bukan pengguna AI. Sovereign Engineer." — Haidar Faras Maulia · 21 April 2026</div>
    </div>

    <!-- METRICS -->
    <div class="metric-grid">
      <div class="metric-card">
        <div class="metric-label">Platform Status</div>
        <div class="metric-value" style="font-size:16px;color:var(--green-bright);">P5 LIVE</div>
        <div class="metric-sub">HUB-24 MATURE</div>
        <div class="metric-trend trend-up"><i class="fas fa-check"></i> VERIFIED</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Active Surfaces</div>
        <div class="metric-value">22<span style="font-size:14px;">+</span></div>
        <div class="metric-sub">Sovereign OS Platform</div>
        <div class="metric-trend trend-up"><i class="fas fa-arrow-up"></i> All LIVE</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Sprint Progress</div>
        <div class="metric-value" id="dash-progress">0<span style="font-size:14px;">%</span></div>
        <div class="metric-sub" id="dash-progress-label">Sprint 4 Minggu</div>
        <div class="metric-trend trend-pending"><i class="fas fa-clock"></i> In Progress</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Produk di Katalog</div>
        <div class="metric-value">16</div>
        <div class="metric-sub">6 Offer Stack · 5 Buyer Tiers</div>
        <div class="metric-trend trend-up"><i class="fas fa-box"></i> Pilot Target: 30hr</div>
      </div>
    </div>

    <!-- SPRINT OVERVIEW -->
    <div class="card" style="margin-bottom:18px;">
      <div class="card-header">
        <div class="card-icon" style="background:rgba(201,168,76,0.12)"><i class="fas fa-calendar-alt" style="color:var(--gold)"></i></div>
        <div>
          <div class="card-title">Sprint 4 Minggu — Productization Roadmap</div>
          <div class="card-sub">Klik sprint card untuk navigasi · Progress tersimpan otomatis</div>
        </div>
        <div style="margin-left:auto;" id="overall-progress-display"></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">
        <div onclick="showPage('week1')" style="border:1px solid rgba(201,168,76,0.35);border-radius:8px;padding:12px;background:rgba(201,168,76,0.05);cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='rgba(201,168,76,0.6)'" onmouseout="this.style.borderColor='rgba(201,168,76,0.35)'">
          <div style="font-size:8.5px;color:var(--gold);font-weight:900;letter-spacing:2px;margin-bottom:5px;">MINGGU 1 · NOW</div>
          <div style="font-size:11.5px;font-weight:800;color:var(--text-main);margin-bottom:3px;">Product Decision Foundation</div>
          <div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;">Decision board · Buyer map · Repo boundary</div>
          <div class="progress-bar"><div class="progress-fill" id="w1-prog-dash" style="width:0%"></div></div>
          <div style="font-size:9.5px;color:var(--gold);margin-top:4px;" id="w1-pct-dash">0% — Pending</div>
        </div>
        <div onclick="showPage('week2')" style="border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:12px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='rgba(41,128,185,0.35)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.07)'">
          <div style="font-size:8.5px;color:var(--text-muted);font-weight:900;letter-spacing:2px;margin-bottom:5px;">MINGGU 2 · NEXT</div>
          <div style="font-size:11.5px;font-weight:800;color:var(--text-main);margin-bottom:3px;">Offer & Demo Packaging</div>
          <div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;">Offer sheet · Demo flow · Onboarding</div>
          <div class="progress-bar"><div class="progress-fill" id="w2-prog-dash" style="width:0%"></div></div>
          <div style="font-size:9.5px;color:var(--text-muted);margin-top:4px;" id="w2-pct-dash">0% — Pending</div>
        </div>
        <div onclick="showPage('week3')" style="border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:12px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='rgba(142,68,173,0.35)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.07)'">
          <div style="font-size:8.5px;color:var(--text-muted);font-weight:900;letter-spacing:2px;margin-bottom:5px;">MINGGU 3 · LATER</div>
          <div style="font-size:11.5px;font-weight:800;color:var(--text-main);margin-bottom:3px;">Proof & Pilot Readiness</div>
          <div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;">Proof checklist · QA · Canon map</div>
          <div class="progress-bar"><div class="progress-fill" id="w3-prog-dash" style="width:0%"></div></div>
          <div style="font-size:9.5px;color:var(--text-muted);margin-top:4px;" id="w3-pct-dash">0% — Pending</div>
        </div>
        <div onclick="showPage('week4')" style="border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:12px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='rgba(231,76,60,0.35)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.07)'">
          <div style="font-size:8.5px;color:var(--text-muted);font-weight:900;letter-spacing:2px;margin-bottom:5px;">MINGGU 4 · FUTURE</div>
          <div style="font-size:11.5px;font-weight:800;color:var(--text-main);margin-bottom:3px;">Commercial Closeout</div>
          <div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;">Sales assets · Pilot-ready · Memo</div>
          <div class="progress-bar"><div class="progress-fill" id="w4-prog-dash" style="width:0%"></div></div>
          <div style="font-size:9.5px;color:var(--text-muted);margin-top:4px;" id="w4-pct-dash">0% — Pending</div>
        </div>
      </div>
    </div>

    <!-- BOTTOM GRID: Product Stack + Canon -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <div class="card">
        <div class="card-header">
          <div class="card-icon" style="background:rgba(201,168,76,0.12)"><i class="fas fa-layer-group" style="color:var(--gold)"></i></div>
          <div><div class="card-title">Canon Product Stack</div><div class="card-sub">4 Layer · Governance ke Market</div></div>
        </div>
        <div class="layer-box l1">
          <div style="font-size:8.5px;color:#c39bd3;font-weight:900;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:3px;">LAYER 1 · GOVERNANCE CORE</div>
          <div style="font-size:12.5px;font-weight:800;color:var(--text-main)">Sovereign OS Platform</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:2px">Multi-tenant · Audit · API Gateway · Canon Law</div>
          <a href="https://sovereign-os-platform.pages.dev" target="_blank" style="font-size:9.5px;color:var(--blue-bright);margin-top:4px;display:block;">↗ sovereign-os-platform.pages.dev</a>
        </div>
        <div style="text-align:center;color:rgba(201,168,76,0.3);font-size:10px;padding:1px 0;">▼ feeds into</div>
        <div class="layer-box l2" style="margin-top:4px;">
          <div style="font-size:8.5px;color:var(--blue-bright);font-weight:900;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:3px;">LAYER 2 · CONTROL GATEWAY</div>
          <div style="font-size:12.5px;font-weight:800;color:var(--text-main)">Lane Eco Budget Control</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:2px">Prompt governance · Budget lock · Session</div>
          <a href="https://lane-eco-budget-control.pages.dev" target="_blank" style="font-size:9.5px;color:var(--blue-bright);margin-top:4px;display:block;">↗ lane-eco-budget-control.pages.dev</a>
        </div>
        <div style="text-align:center;color:rgba(201,168,76,0.3);font-size:10px;padding:1px 0;">▼ orchestrates</div>
        <div class="layer-box l3" style="margin-top:4px;">
          <div style="font-size:8.5px;color:var(--orange-bright);font-weight:900;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:3px;">LAYER 3 · COMMAND CENTER</div>
          <div style="font-size:12.5px;font-weight:800;color:var(--text-main)">Sovereign Ecosystem / Tower</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:2px">Founder dashboard · Orchestration · Market intel</div>
          <a href="https://sovereign-orchestrator.pages.dev" target="_blank" style="font-size:9.5px;color:var(--blue-bright);margin-top:4px;display:block;">↗ sovereign-orchestrator.pages.dev</a>
        </div>
        <div style="text-align:center;color:rgba(201,168,76,0.3);font-size:10px;padding:1px 0;">▼ proves via</div>
        <div class="layer-box l4" style="margin-top:4px;">
          <div style="font-size:8.5px;color:var(--green-bright);font-weight:900;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:3px;">LAYER 4 · VERTICAL PROOF</div>
          <div style="font-size:12.5px;font-weight:800;color:var(--text-main)">Barber + Coffee / Market Labs</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:2px">Entry offer · PoC · White-label template</div>
          <a href="https://barber-coffee-pwt.pages.dev" target="_blank" style="font-size:9.5px;color:var(--blue-bright);margin-top:4px;display:block;">↗ barber-coffee-pwt.pages.dev</a>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px;">
        <div class="card">
          <div class="card-header">
            <div class="card-icon" style="background:rgba(39,174,96,0.12)"><i class="fas fa-check-double" style="color:var(--green-bright)"></i></div>
            <div><div class="card-title">Kalimat Canon Bisnis</div><div class="card-sub">Formula paling tajam — wajib diingat</div></div>
          </div>
          <div style="display:grid;gap:7px;">
            <div style="background:rgba(39,174,96,0.06);border:1px solid rgba(39,174,96,0.15);border-radius:6px;padding:9px;">
              <div style="font-size:9px;color:var(--green-bright);font-weight:800;text-transform:uppercase;margin-bottom:2px;">BARBER / MARKET LABS</div>
              <div style="font-size:11.5px;color:var(--text-main);">Menjual <strong>hasil</strong> yang langsung dirasakan pasar</div>
            </div>
            <div style="background:rgba(41,128,185,0.06);border:1px solid rgba(41,128,185,0.15);border-radius:6px;padding:9px;">
              <div style="font-size:9px;color:var(--blue-bright);font-weight:800;text-transform:uppercase;margin-bottom:2px;">LANE ECO CONTROL</div>
              <div style="font-size:11.5px;color:var(--text-main);">Menjual <strong>kontrol</strong> operasional AI</div>
            </div>
            <div style="background:rgba(211,84,0,0.06);border:1px solid rgba(211,84,0,0.15);border-radius:6px;padding:9px;">
              <div style="font-size:9px;color:var(--orange-bright);font-weight:800;text-transform:uppercase;margin-bottom:2px;">SOVEREIGN TOWER</div>
              <div style="font-size:11.5px;color:var(--text-main);">Menjual <strong>orkestrasi</strong> founder command</div>
            </div>
            <div style="background:rgba(142,68,173,0.06);border:1px solid rgba(142,68,173,0.15);border-radius:6px;padding:9px;">
              <div style="font-size:9px;color:#c39bd3;font-weight:800;text-transform:uppercase;margin-bottom:2px;">SOVEREIGN OS</div>
              <div style="font-size:11.5px;color:var(--text-main);">Menjual <strong>sistem governance</strong> enterprise</div>
            </div>
          </div>
        </div>

        <div class="card-gold">
          <div style="font-size:10px;color:var(--gold);font-weight:800;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;">Master One-Liner</div>
          <div style="font-size:12.5px;color:var(--ivory);line-height:1.75;font-style:italic;">
            "Kami tidak menjual AI tools. Kami membangun mesin bisnis yang bisa divalidasi, dikendalikan, diaudit, dan dinaikkan menjadi governance platform."
          </div>
          <div class="glow-line"></div>
          <div style="font-size:10.5px;color:var(--text-muted);">
            Canon: <span style="color:var(--gold-light);font-weight:700;">Governance-first business operating engine</span>
          </div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:6px;font-style:italic;">
            "Bukan pedagang. Bukan pengguna AI. Sovereign Engineer."
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================= PLATFORM STATUS ========================= -->
  <div class="page" id="page-status">
    <div class="section-header">
      <div>
        <div class="section-title">Platform Status Live</div>
        <div class="section-sub">Status real-time semua platform Sovereign Ecosystem yang sudah deployed</div>
      </div>
      <button class="btn-export" onclick="refreshStatus()"><i class="fas fa-sync-alt"></i> Refresh</button>
    </div>

    <div class="alert alert-blue" style="margin-bottom:18px;">
      <i class="fas fa-info-circle" style="margin-top:2px;flex-shrink:0;"></i>
      <div><strong>Live Check:</strong> Semua platform sudah live di Cloudflare Pages. Status ditampilkan dari API internal. Klik nama platform untuk membuka langsung.</div>
    </div>

    <div style="display:grid;gap:12px;margin-bottom:20px;" id="status-cards">
      <a class="platform-card" href="https://sovereign-os-platform.pages.dev" target="_blank">
        <div class="platform-dot live" data-tip="200 OK - Live"></div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:800;color:var(--text-main);">Sovereign OS Platform</div>
          <div style="font-size:10.5px;color:var(--text-muted);">sovereign-os-platform.pages.dev · v2.2.0-P22 · 22+ surfaces</div>
        </div>
        <div style="text-align:right;">
          <div><span class="tag tag-purple">Layer 1</span> <span class="tag tag-green">LIVE</span></div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px;">P5 LIVE-VERIFIED</div>
        </div>
      </a>
      <a class="platform-card" href="https://lane-eco-budget-control.pages.dev" target="_blank">
        <div class="platform-dot live"></div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:800;color:var(--text-main);">Lane Eco Budget Control</div>
          <div style="font-size:10.5px;color:var(--text-muted);">lane-eco-budget-control.pages.dev · v1.6.0 · D1: lane-eco-sovereign-store</div>
        </div>
        <div style="text-align:right;">
          <div><span class="tag tag-blue">Layer 2</span> <span class="tag tag-green">HUB-24 LIVE</span></div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px;">Platform Mature</div>
        </div>
      </a>
      <a class="platform-card" href="https://sovereign-orchestrator.pages.dev" target="_blank">
        <div class="platform-dot internal"></div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:800;color:var(--text-main);">Sovereign Ecosystem / Tower</div>
          <div style="font-size:10.5px;color:var(--text-muted);">sovereign-orchestrator.pages.dev · Mother repo · Founder access only</div>
        </div>
        <div style="text-align:right;">
          <div><span class="tag tag-orange">Layer 3</span> <span class="tag tag-orange">INTERNAL</span></div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px;">Private layer</div>
        </div>
      </a>
      <a class="platform-card" href="https://barber-coffee-pwt.pages.dev" target="_blank">
        <div class="platform-dot live"></div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:800;color:var(--text-main);">Barber + Coffee PWT</div>
          <div style="font-size:10.5px;color:var(--text-muted);">barber-coffee-pwt.pages.dev · v1.0.0 · RAB Calculator · BEP Simulator</div>
        </div>
        <div style="text-align:right;">
          <div><span class="tag tag-green">Layer 4</span> <span class="tag tag-green">LIVE</span></div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px;">Entry Offer</div>
        </div>
      </a>
      <a class="platform-card" href="https://github.com/ganihypha/Sovereign-os-platform" target="_blank">
        <div style="width:8px;height:8px;border-radius:50%;background:#8b949e;flex-shrink:0;"></div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:800;color:var(--text-main);">GitHub: Sovereign-os-platform</div>
          <div style="font-size:10.5px;color:var(--text-muted);">github.com/ganihypha/Sovereign-os-platform · Source repository</div>
        </div>
        <div style="text-align:right;">
          <div><span class="tag tag-purple">L1 Source</span></div>
        </div>
      </a>
      <a class="platform-card" href="https://github.com/ganihypha/pre-barber-and-coffee" target="_blank">
        <div style="width:8px;height:8px;border-radius:50%;background:#8b949e;flex-shrink:0;"></div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:800;color:var(--text-main);">GitHub: pre-barber-and-coffee</div>
          <div style="font-size:10.5px;color:var(--text-muted);">github.com/ganihypha/pre-barber-and-coffee · Source repository</div>
        </div>
        <div style="text-align:right;">
          <div><span class="tag tag-green">L4 Source</span></div>
        </div>
      </a>
    </div>

    <div class="card-gold">
      <div style="font-size:11px;font-weight:800;color:var(--gold);margin-bottom:10px;">Tech Stack Ringkasan</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
        <div style="font-size:11px;color:var(--text-muted);"><i class="fas fa-cloud" style="color:var(--blue-bright);margin-right:5px;"></i><span style="color:var(--text-main);">Runtime:</span> Cloudflare Workers/Pages</div>
        <div style="font-size:11px;color:var(--text-muted);"><i class="fas fa-code" style="color:var(--blue-bright);margin-right:5px;"></i><span style="color:var(--text-main);">Framework:</span> Hono + TypeScript</div>
        <div style="font-size:11px;color:var(--text-muted);"><i class="fas fa-database" style="color:var(--blue-bright);margin-right:5px;"></i><span style="color:var(--text-main);">DB:</span> Cloudflare D1 (SQLite)</div>
        <div style="font-size:11px;color:var(--text-muted);"><i class="fas fa-key" style="color:var(--blue-bright);margin-right:5px;"></i><span style="color:var(--text-main);">Storage:</span> KV + R2</div>
        <div style="font-size:11px;color:var(--text-muted);"><i class="fas fa-robot" style="color:var(--blue-bright);margin-right:5px;"></i><span style="color:var(--text-main);">AI:</span> LangGraph.js + CrewAI</div>
        <div style="font-size:11px;color:var(--text-muted);"><i class="fas fa-comments" style="color:var(--blue-bright);margin-right:5px;"></i><span style="color:var(--text-main);">WA:</span> Fonnte API Bridge</div>
      </div>
    </div>
  </div>

  <!-- ========================= ECOSYSTEM ========================= -->
  <div class="page" id="page-ecosystem">
    <div class="section-header">
      <div>
        <div class="section-title">Arsitektur Ekosistem Sovereign</div>
        <div class="section-sub">Hierarki 4 layer — dari governance core ke market-facing proof</div>
      </div>
    </div>

    <div class="alert alert-gold" style="margin-bottom:18px;">
      <i class="fas fa-info-circle" style="color:var(--gold);margin-top:2px;flex-shrink:0;"></i>
      <div><strong>Prinsip Canon:</strong> Manusia tetap Layer 1. AI hanya Layer 2 Assist. Governance lebih penting dari gimmick AI. Jangan jual seluruh ekosistem sekaligus — jual per layer sesuai pain buyer.</div>
    </div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:20px;">
      <div>
        <div style="background:rgba(142,68,173,0.09);border:1px solid rgba(142,68,173,0.35);border-radius:10px;padding:18px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
            <div style="background:rgba(142,68,173,0.2);width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:900;color:#c39bd3;">1</div>
            <div style="flex:1;">
              <div style="font-size:8.5px;color:#c39bd3;font-weight:900;letter-spacing:2px;text-transform:uppercase;">LAYER 1 — GOVERNANCE CORE</div>
              <div style="font-size:15px;font-weight:900;color:var(--text-main);">Sovereign OS Platform</div>
            </div>
            <span class="tag tag-green">P5 LIVE</span>
          </div>
          <div style="font-size:11.5px;color:var(--text-muted);line-height:1.7;margin-bottom:10px;">Platform tata kelola berlapis dengan enforced role boundaries, approval gates, proof requirements, multi-tenant isolation, dan audit trail. Ini bukan aplikasi biasa — ia adalah operating system untuk governed execution.</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
            <span class="tag tag-purple">Multi-tenant</span><span class="tag tag-purple">API Gateway</span><span class="tag tag-purple">Audit Trail</span><span class="tag tag-purple">Canon Law</span><span class="tag tag-purple">22 Surfaces</span>
          </div>
          <table class="data-table" style="font-size:10.5px;">
            <tr><td style="color:var(--text-muted);width:120px;">URL Live</td><td><a href="https://sovereign-os-platform.pages.dev" target="_blank" style="color:var(--blue-bright);">sovereign-os-platform.pages.dev</a></td></tr>
            <tr><td style="color:var(--text-muted);">Version</td><td>v2.2.0-P22 / P5 LIVE-VERIFIED</td></tr>
            <tr><td style="color:var(--text-muted);">Database</td><td>Cloudflare D1 — sovereign-os-production</td></tr>
            <tr><td style="color:var(--text-muted);">GitHub</td><td><a href="https://github.com/ganihypha/Sovereign-os-platform" target="_blank" style="color:var(--blue-bright);">github.com/ganihypha/Sovereign-os-platform</a></td></tr>
            <tr><td style="color:var(--text-muted);">Sales Angle</td><td style="color:var(--gold-light);">Sell the <strong>system</strong> — enterprise governance license</td></tr>
          </table>
        </div>

        <div style="background:rgba(41,128,185,0.07);border:1px solid rgba(41,128,185,0.28);border-radius:10px;padding:18px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
            <div style="background:rgba(41,128,185,0.2);width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:900;color:var(--blue-bright);">2</div>
            <div style="flex:1;">
              <div style="font-size:8.5px;color:var(--blue-bright);font-weight:900;letter-spacing:2px;text-transform:uppercase;">LAYER 2 — CONTROL GATEWAY</div>
              <div style="font-size:15px;font-weight:900;color:var(--text-main);">Lane Eco Budget Control</div>
            </div>
            <span class="tag tag-green">HUB-24 LIVE</span>
          </div>
          <div style="font-size:11.5px;color:var(--text-muted);line-height:1.7;margin-bottom:10px;">Sovereign-grounded operational prompt gateway dengan budget control sebagai inti. Arsitektur: Sovereign Source Intake → Budget Controller → Prompt Bridge → Master Architect / AI Dev execution consumer.</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
            <span class="tag tag-blue">Prompt Gov</span><span class="tag tag-blue">Budget Lock</span><span class="tag tag-blue">Session Control</span><span class="tag tag-blue">D1 Webhook</span>
          </div>
          <table class="data-table" style="font-size:10.5px;">
            <tr><td style="color:var(--text-muted);width:120px;">URL Live</td><td><a href="https://lane-eco-budget-control.pages.dev" target="_blank" style="color:var(--blue-bright);">lane-eco-budget-control.pages.dev</a></td></tr>
            <tr><td style="color:var(--text-muted);">Version</td><td>v1.6.0 — HUB-24 PLATFORM MATURE</td></tr>
            <tr><td style="color:var(--text-muted);">Sales Angle</td><td style="color:var(--gold-light);">Sell the <strong>control</strong> — AI berhenti jalan liar</td></tr>
          </table>
        </div>

        <div style="background:rgba(211,84,0,0.07);border:1px solid rgba(211,84,0,0.28);border-radius:10px;padding:18px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
            <div style="background:rgba(211,84,0,0.2);width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:900;color:var(--orange-bright);">3</div>
            <div style="flex:1;">
              <div style="font-size:8.5px;color:var(--orange-bright);font-weight:900;letter-spacing:2px;text-transform:uppercase;">LAYER 3 — COMMAND CENTER</div>
              <div style="font-size:15px;font-weight:900;color:var(--text-main);">Sovereign Ecosystem / Tower</div>
            </div>
            <span class="tag tag-orange">Mother Repo</span>
          </div>
          <div style="font-size:11.5px;color:var(--text-muted);line-height:1.7;margin-bottom:10px;">Private founder command center dengan AI agents (LangGraph.js) dan AI crews (CrewAI). Ruang kendali privat untuk orkestrasi validasi pasar, market intelligence, counterpart protocol, dan business engine.</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
            <span class="tag tag-orange">AI Orchestration</span><span class="tag tag-orange">Market Intel</span><span class="tag tag-orange">Revenue Engine</span><span class="tag tag-orange">Founder Only</span>
          </div>
          <table class="data-table" style="font-size:10.5px;">
            <tr><td style="color:var(--text-muted);width:120px;">URL Live</td><td><a href="https://sovereign-orchestrator.pages.dev" target="_blank" style="color:var(--blue-bright);">sovereign-orchestrator.pages.dev</a></td></tr>
            <tr><td style="color:var(--text-muted);">Sub-Apps</td><td>sovereign-tower, docs, activation-guide</td></tr>
            <tr><td style="color:var(--text-muted);">Sales Angle</td><td style="color:var(--gold-light);">Sell the <strong>orchestration</strong> — private command center</td></tr>
          </table>
        </div>

        <div style="background:rgba(39,174,96,0.06);border:1px solid rgba(39,174,96,0.28);border-radius:10px;padding:18px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
            <div style="background:rgba(39,174,96,0.2);width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:900;color:var(--green-bright);">4</div>
            <div style="flex:1;">
              <div style="font-size:8.5px;color:var(--green-bright);font-weight:900;letter-spacing:2px;text-transform:uppercase;">LAYER 4 — VERTICAL PROOF</div>
              <div style="font-size:15px;font-weight:900;color:var(--text-main);">Barber + Coffee / Market Labs</div>
            </div>
            <span class="tag tag-green">Entry Offer</span>
          </div>
          <div style="font-size:11.5px;color:var(--text-muted);line-height:1.7;margin-bottom:10px;">Produk vertikal yang membuktikan engine bisa turun ke domain nyata. Dashboard RAB interaktif, simulasi modal, BEP, analisis risiko, dan timeline buka usaha untuk UMKM Purwokerto/Banyumas.</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
            <span class="tag tag-green">RAB Calculator</span><span class="tag tag-green">BEP Simulator</span><span class="tag tag-green">Risk Matrix</span><span class="tag tag-green">White-label Ready</span>
          </div>
          <table class="data-table" style="font-size:10.5px;">
            <tr><td style="color:var(--text-muted);width:120px;">URL Live</td><td><a href="https://barber-coffee-pwt.pages.dev" target="_blank" style="color:var(--blue-bright);">barber-coffee-pwt.pages.dev</a></td></tr>
            <tr><td style="color:var(--text-muted);">GitHub</td><td><a href="https://github.com/ganihypha/pre-barber-and-coffee" target="_blank" style="color:var(--blue-bright);">github.com/ganihypha/pre-barber-and-coffee</a></td></tr>
            <tr><td style="color:var(--text-muted);">Sales Angle</td><td style="color:var(--gold-light);">Sell the <strong>result</strong> — buka bisnis dengan kepastian</td></tr>
          </table>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px;">
        <div class="card-gold">
          <div style="font-size:10px;color:var(--gold);font-weight:800;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;">12 Governance Laws</div>
          <div style="display:grid;gap:5px;">
            ${['Intent manusia selalu Layer 1','AI hanya boleh Layer 2 Assist','No role collapse, ever','Canon harus earned, bukan claimed','Live state dari database, bukan memori','Status harus jujur / terverifikasi','Governance lebih penting dari gimmick','Proof sebelum scale','Tenant isolation non-negotiable','Jual per layer, bukan all-in-one','Boundary produk sebelum build fitur','Human confirmation gate mandatory'].map((law, i) => `
            <div style="display:flex;align-items:flex-start;gap:7px;font-size:10.5px;color:var(--text-muted);padding:3.5px 0;border-bottom:1px solid rgba(255,255,255,0.03);">
              <span style="color:var(--gold);font-weight:900;min-width:16px;">${i+1}.</span>
              <span>${law}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================= REPO MAP ========================= -->
  <div class="page" id="page-repomap">
    <div class="section-header">
      <div>
        <div class="section-title">Repo-to-Product Map</div>
        <div class="section-sub">Pemetaan teknis ke komersial — setiap repo punya posisi bisnis yang jelas</div>
      </div>
    </div>

    <div class="alert alert-green" style="margin-bottom:18px;">
      <i class="fas fa-check-circle" style="flex-shrink:0;margin-top:2px;"></i>
      <div><strong>Canon Map Final:</strong> Barber/Coffee membuktikan value → Ecosystem mengorkestrasi → Lane mengendalikan → OS melisensikan governance.</div>
    </div>

    <div class="card" style="margin-bottom:18px;">
      <table class="data-table">
        <thead>
          <tr><th>Repo / Artefak</th><th>Layer</th><th>Fungsi Bisnis</th><th>Cara Menjual</th><th>Buyer</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><div style="font-size:12px;font-weight:700;color:var(--text-main);">pre-barber-and-coffee-main</div><div style="font-size:9.5px;color:var(--text-muted);">barber-coffee-pwt.pages.dev</div></td>
            <td><span class="tag tag-green">Layer 4</span></td>
            <td style="font-size:10.5px;color:var(--text-muted);">Vertical PoC · RAB · BEP · Simulasi · Template bisnis sektor jasa</td>
            <td style="font-size:10.5px;color:var(--text-muted);">Entry offer · Demo lead magnet · White-label starter</td>
            <td><span class="tag tag-green">UMKM</span></td>
            <td><span class="tag tag-green">LIVE</span></td>
          </tr>
          <tr>
            <td><div style="font-size:12px;font-weight:700;color:var(--text-main);">Sovereign-ecosystem-main</div><div style="font-size:9.5px;color:var(--text-muted);">sovereign-orchestrator.pages.dev</div></td>
            <td><span class="tag tag-orange">Layer 3</span></td>
            <td style="font-size:10.5px;color:var(--text-muted);">Business engine · AI agent orchestration · Founder command · Mother repo</td>
            <td style="font-size:10.5px;color:var(--text-muted);">High-ticket private implementation</td>
            <td><span class="tag tag-orange">Founder</span></td>
            <td><span class="tag tag-orange">Internal</span></td>
          </tr>
          <tr>
            <td><div style="font-size:12px;font-weight:700;color:var(--text-main);">Lane-eco-budget-control-system-main</div><div style="font-size:9.5px;color:var(--text-muted);">lane-eco-budget-control.pages.dev</div></td>
            <td><span class="tag tag-blue">Layer 2</span></td>
            <td style="font-size:10.5px;color:var(--text-muted);">Prompt gateway · Budget governance · Session control · Webhook D1</td>
            <td style="font-size:10.5px;color:var(--text-muted);">Operational control pack · AI ops subscription</td>
            <td><span class="tag tag-blue">Operator</span></td>
            <td><span class="tag tag-green">HUB-24</span></td>
          </tr>
          <tr>
            <td><div style="font-size:12px;font-weight:700;color:var(--text-main);">Sovereign-os-platform-main</div><div style="font-size:9.5px;color:var(--text-muted);">sovereign-os-platform.pages.dev</div></td>
            <td><span class="tag tag-purple">Layer 1</span></td>
            <td style="font-size:10.5px;color:var(--text-muted);">Governance core · Multi-tenant · API gateway · Audit · Canon law</td>
            <td style="font-size:10.5px;color:var(--text-muted);">Enterprise governance license · Annual SLA</td>
            <td><span class="tag tag-purple">Enterprise</span></td>
            <td><span class="tag tag-green">P5 LIVE</span></td>
          </tr>
          <tr>
            <td><div style="font-size:12px;font-weight:700;color:var(--text-main);">webapp.zip</div><div style="font-size:9.5px;color:var(--text-muted);">Barber-Coffee frontend build · name: barber-coffee</div></td>
            <td><span class="tag tag-gold">Layer 4</span></td>
            <td style="font-size:10.5px;color:var(--text-muted);">Frontend app shell · Upgraded Barber-Coffee dashboard</td>
            <td style="font-size:10.5px;color:var(--text-muted);">Merge ke pre-barber sebagai v2 upgrade</td>
            <td><span class="tag tag-green">UMKM</span></td>
            <td><span class="tag tag-gold">→ L4 Merge</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-gold">
      <div style="font-size:11.5px;font-weight:800;color:var(--gold);margin-bottom:10px;">Keputusan Canon Repo — FINAL</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
        <div>
          <div style="font-size:10.5px;color:var(--text-muted);margin-bottom:7px;font-weight:700;">Keputusan yang sudah final:</div>
          <div class="checklist-item done"><div class="check-box done"><i class="fas fa-check"></i></div><span>pre-barber = ENTRY OFFER + DEMO · Layer 4</span></div>
          <div class="checklist-item done"><div class="check-box done"><i class="fas fa-check"></i></div><span>Sovereign Ecosystem = MOTHER REPO + INTERNAL · Layer 3</span></div>
          <div class="checklist-item done"><div class="check-box done"><i class="fas fa-check"></i></div><span>Lane Eco = CONTROL LAYER · Layer 2</span></div>
          <div class="checklist-item done"><div class="check-box done"><i class="fas fa-check"></i></div><span>Sovereign OS = GOVERNANCE PLATFORM · Layer 1</span></div>
        </div>
        <div>
          <div style="font-size:10.5px;color:var(--text-muted);margin-bottom:7px;font-weight:700;">Keputusan founder yang perlu dikunci:</div>
          <div class="checklist-item" onclick="toggleItem(this,'repo-w1')"><div class="check-box" id="repo-w1"><i class="fas fa-check" style="display:none;"></i></div><span>webapp.zip → merge ke pre-barber sebagai v2 upgrade?</span></div>
          <div class="checklist-item" onclick="toggleItem(this,'repo-w2')"><div class="check-box" id="repo-w2"><i class="fas fa-check" style="display:none;"></i></div><span>FashionKas / ResellerKas → masuk Layer 4 market lab kedua?</span></div>
          <div class="checklist-item" onclick="toggleItem(this,'repo-w3')"><div class="check-box" id="repo-w3"><i class="fas fa-check" style="display:none;"></i></div><span>Sovereign Tower → standalone atau stay embedded?</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================= WEEK 1 ========================= -->
  <div class="page" id="page-week1">
    <div class="section-header">
      <div>
        <div class="section-title">Minggu 1 — Product Decision Foundation</div>
        <div class="section-sub">Objective: Kunci semua keputusan posisi produk, buyer, dan boundary repo sebelum build apapun</div>
      </div>
      <span class="tag tag-gold" style="font-size:11px;padding:4px 12px;">NOW · AKTIF</span>
    </div>

    <div class="alert alert-gold">
      <i class="fas fa-crown" style="color:var(--gold);margin-top:2px;flex-shrink:0;"></i>
      <div><strong>Prinsip Minggu 1:</strong> JANGAN build duluan. Kunci keputusan canon dulu. Salah posisi di minggu ini = 3 minggu berikutnya buang energi.</div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;">
      <div class="card">
        <div class="card-header">
          <div class="card-icon" style="background:rgba(201,168,76,0.12)"><i class="fas fa-clipboard-check" style="color:var(--gold)"></i></div>
          <div><div class="card-title">Product Decision Board</div><div class="card-sub">Posisi final tiap repo</div></div>
        </div>
        <table class="data-table">
          <tr><th>Produk</th><th>Posisi Final</th><th>Status</th></tr>
          <tr><td style="font-size:11px;font-weight:600;">Lane Eco Budget Control</td><td style="font-size:11px;color:var(--gold-light);">Operational Control Pack</td><td><span class="tag tag-green">FINAL ✓</span></td></tr>
          <tr><td style="font-size:11px;font-weight:600;">pre-barber-and-coffee</td><td style="font-size:11px;color:var(--gold-light);">Vertical Proof / Entry Offer</td><td><span class="tag tag-green">FINAL ✓</span></td></tr>
          <tr><td style="font-size:11px;font-weight:600;">Sovereign OS Platform</td><td style="font-size:11px;color:var(--gold-light);">Governance Platform / High-ticket</td><td><span class="tag tag-green">FINAL ✓</span></td></tr>
          <tr><td style="font-size:11px;font-weight:600;">Sovereign Ecosystem</td><td style="font-size:11px;color:var(--gold-light);">Mother Repo / Integration Home</td><td><span class="tag tag-green">FINAL ✓</span></td></tr>
          <tr><td style="font-size:11px;font-weight:600;">webapp.zip</td><td style="font-size:11px;color:var(--orange-bright);">Merge ke Layer 4 / Decision Pending</td><td><span class="tag tag-orange">FOUNDER →</span></td></tr>
        </table>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-icon" style="background:rgba(211,84,0,0.12)"><i class="fas fa-file-alt" style="color:var(--orange-bright)"></i></div>
          <div><div class="card-title">Webapp Decision Memo</div><div class="card-sub">4 opsi untuk webapp.zip</div></div>
        </div>
        <div style="display:grid;gap:6px;">
          <label style="display:flex;align-items:flex-start;gap:9px;cursor:pointer;padding:9px;border-radius:6px;border:1px solid rgba(255,255,255,0.06);transition:all 0.15s;" onmouseover="this.style.borderColor='rgba(201,168,76,0.25)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)'">
            <input type="radio" name="webapp-decision" value="a" style="margin-top:3px;accent-color:var(--gold);">
            <div><div style="font-size:11.5px;font-weight:700;color:var(--text-main);">A — Shell Presentasi</div><div style="font-size:10px;color:var(--text-muted);">Landing page / showcase semua layer</div></div>
          </label>
          <label style="display:flex;align-items:flex-start;gap:9px;cursor:pointer;padding:9px;border-radius:6px;border:1px solid rgba(201,168,76,0.3);background:rgba(201,168,76,0.05);transition:all 0.15s;">
            <input type="radio" name="webapp-decision" value="b" checked style="margin-top:3px;accent-color:var(--gold);">
            <div><div style="font-size:11.5px;font-weight:700;color:var(--gold-light);">B — Merge ke Layer 4 ⭐ Rekomendasi</div><div style="font-size:10px;color:var(--text-muted);">Upgrade pre-barber menjadi Barber Coffee v2</div></div>
          </label>
          <label style="display:flex;align-items:flex-start;gap:9px;cursor:pointer;padding:9px;border-radius:6px;border:1px solid rgba(255,255,255,0.06);transition:all 0.15s;" onmouseover="this.style.borderColor='rgba(201,168,76,0.25)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)'">
            <input type="radio" name="webapp-decision" value="c" style="margin-top:3px;accent-color:var(--gold);">
            <div><div style="font-size:11.5px;font-weight:700;color:var(--text-main);">C — Demo Vertical Frontend</div><div style="font-size:10px;color:var(--text-muted);">Frontend khusus demo pitching Layer 4</div></div>
          </label>
          <label style="display:flex;align-items:flex-start;gap:9px;cursor:pointer;padding:9px;border-radius:6px;border:1px solid rgba(255,255,255,0.06);transition:all 0.15s;" onmouseover="this.style.borderColor='rgba(201,168,76,0.25)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)'">
            <input type="radio" name="webapp-decision" value="d" style="margin-top:3px;accent-color:var(--gold);">
            <div><div style="font-size:11.5px;font-weight:700;color:var(--text-main);">D — Archive / Deprecated</div><div style="font-size:10px;color:var(--text-muted);">Arsipkan, tidak perlu dipakai lagi</div></div>
          </label>
        </div>
      </div>
    </div>

    <div class="card" style="margin-bottom:14px;">
      <div class="card-header">
        <div class="card-icon" style="background:rgba(39,174,96,0.1)"><i class="fas fa-tasks" style="color:var(--green-bright)"></i></div>
        <div><div class="card-title">Checklist Eksekusi Minggu 1</div><div class="card-sub">Klik checkbox untuk track progress — tersimpan otomatis</div></div>
        <div style="margin-left:auto;font-size:11px;color:var(--text-muted);">Progress: <span id="w1-pct-label" style="color:var(--gold-light);font-weight:700;">0/10</span></div>
      </div>
      <table class="data-table">
        <thead><tr><th style="width:28px;"></th><th>Task</th><th>Prioritas</th><th>Owner</th><th>Output</th></tr></thead>
        <tbody id="w1-tasks">
          ${[
            ['w1t1','Tetapkan positioning final Lane → "Operational Control Pack"','P1','L1 + L2','Positioning doc'],
            ['w1t2','Tetapkan positioning final Barber → "Vertical Proof / Entry Offer"','P1','L1 + L2','Positioning doc'],
            ['w1t3','Tetapkan Sovereign OS → "Governance Platform"','P1','L1 + L2','Platform packaging'],
            ['w1t4','Tetapkan Sovereign Eco → Mother Repo, bukan app jualan','P1','L1 + L2','Boundary doc'],
            ['w1t5','Audit fungsi webapp.zip dan putuskan merge / repurpose / archive','P1','L2 + L3','Decision memo'],
            ['w1t6','Buat ICP dan buyer problem untuk tiap repo','P1','GTM + L2','Buyer map'],
            ['w1t7','Buat sales one-liner per repo','P1','GTM','One-liner set'],
            ['w1t8','Tetapkan scope boundary (apa yang BUKAN produk) tiap repo','P1','L1 + L2','Scope boundary'],
            ['w1t9','Buat readiness baseline: green/yellow/red per repo','P2','QA + L3','Readiness doc'],
            ['w1t10','Susun gap register terbesar per repo','P2','L2 + QA','Gap register'],
          ].map(([id, task, pri, owner, output]) => `
          <tr>
            <td><div class="check-box" id="${id}" onclick="toggleTask('${id}','w1',10)"></div></td>
            <td style="font-size:11.5px;">${task}</td>
            <td><span class="tag ${pri==='P1'?'tag-red':'tag-orange'}" style="font-size:9px;">${pri}</span></td>
            <td style="font-size:10.5px;color:var(--text-muted);">${owner}</td>
            <td style="font-size:10.5px;color:var(--text-muted);">${output}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="margin-top:10px;">
        <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:4px;"><span>Progress Minggu 1</span><span id="w1-pct-pct">0%</span></div>
        <div class="progress-bar" style="height:7px;"><div class="progress-fill" id="w1-prog-bar" style="width:0%;"></div></div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
      <div class="card">
        <div style="font-size:11.5px;font-weight:800;color:var(--gold);margin-bottom:10px;">Acceptance Criteria Minggu 1</div>
        <div class="checklist-item done"><div class="check-box done"><i class="fas fa-check"></i></div><span>Jelas mana entry offer, control layer, governance core</span></div>
        <div class="checklist-item done"><div class="check-box done"><i class="fas fa-check"></i></div><span>Jelas buyer per layer — tidak ada ambiguitas</span></div>
        <div class="checklist-item done"><div class="check-box done"><i class="fas fa-check"></i></div><span>Tidak ada overlap fungsi utama antar repo</span></div>
        <div class="checklist-item" onclick="toggleItem(this,'ac-w1-1')"><div class="check-box" id="ac-w1-1"></div><span>Keputusan webapp sudah final (A/B/C/D)</span></div>
        <div class="checklist-item" onclick="toggleItem(this,'ac-w1-2')"><div class="check-box" id="ac-w1-2"></div><span>Product Decision Board disetujui Founder</span></div>
      </div>
      <div class="card">
        <div style="font-size:11.5px;font-weight:800;color:var(--red);margin-bottom:10px;"><i class="fas fa-exclamation-triangle" style="margin-right:5px;"></i>Risiko & Pertanyaan Founder</div>
        <div class="checklist-item"><div class="check-box risk"><i class="fas fa-exclamation" style="font-size:7px;"></i></div><span>Webapp decision terlalu lama → hambat Minggu 2</span></div>
        <div class="checklist-item"><div class="check-box risk"><i class="fas fa-exclamation" style="font-size:7px;"></i></div><span>Terlalu banyak repo baru sebelum boundary final</span></div>
        <div class="checklist-item"><div class="check-box risk" style="background:rgba(230,126,34,0.15);border-color:rgba(230,126,34,0.35);color:var(--orange-bright);"><i class="fas fa-exclamation" style="font-size:7px;"></i></div><span>Product naming dan repo naming tercampur</span></div>
        <div style="font-size:10.5px;font-weight:800;color:var(--gold);margin:10px 0 5px;">Founder Review Questions</div>
        <div style="font-size:10.5px;color:var(--text-muted);line-height:1.85;">
          1. Apakah webapp.zip ada fitur unik yang belum di pre-barber?<br>
          2. Apakah FashionKas masuk scope 30 hari ini atau defer?<br>
          3. Siapa buyer pertama di Minggu 2?
        </div>
      </div>
    </div>
  </div>

  <!-- ========================= WEEK 2 ========================= -->
  <div class="page" id="page-week2">
    <div class="section-header">
      <div>
        <div class="section-title">Minggu 2 — Offer & Demo Packaging</div>
        <div class="section-sub">Objective: Ubah arsitektur jadi penawaran yang bisa dipahami pasar</div>
      </div>
      <span class="tag tag-blue" style="font-size:11px;padding:4px 12px;">NEXT</span>
    </div>
    <div class="alert alert-gold">
      <i class="fas fa-box-open" style="color:var(--gold);margin-top:2px;flex-shrink:0;"></i>
      <div><strong>Prinsip Minggu 2:</strong> Package before polish. Pasar tidak membeli "ekosistem besar" — mereka membeli solusi yang menyelesaikan problem hari ini.</div>
    </div>
    <div class="week-grid">
      <div class="week-card">
        <div class="week-number">Offer Sheet per Layer</div>
        <div class="week-title">Kemasan Penawaran Resmi</div>
        <div class="week-sub">SKU + Feature boundary + Harga per layer</div>
        ${['Offer Sheet Lane (Operational Control Pack)','Offer Sheet Barber (Vertical Proof Kit)','Offer Sheet Sovereign OS (Governance Platform)','SKU naming final semua produk'].map((t,i) => `<div class="checklist-item" onclick="toggleTask('w2t${i+1}','w2',16)"><div class="check-box" id="w2t${i+1}"></div><span>${t}</span></div>`).join('')}
      </div>
      <div class="week-card">
        <div class="week-number">Demo Flow Narrative</div>
        <div class="week-title">Alur Demo 3–5 Menit</div>
        <div class="week-sub">Dari problem ke proof — bisa dipresentasikan</div>
        ${['Demo script Barber + Coffee (UMKM buyer)','Demo script Lane (Operator buyer)','Demo script Sovereign OS (Enterprise buyer)','Route plan untuk demo live'].map((t,i) => `<div class="checklist-item" onclick="toggleTask('w2t${i+5}','w2',16)"><div class="check-box" id="w2t${i+5}"></div><span>${t}</span></div>`).join('')}
      </div>
      <div class="week-card">
        <div class="week-number">Onboarding Dasar</div>
        <div class="week-title">Customer Onboarding Flow</div>
        <div class="week-sub">Bisa dipakai user/pilot awal — tanpa bingung</div>
        ${['Onboarding checklist Barber Kit','Onboarding checklist Lane Control Pack','Setup guide dengan env/secret discipline','Screenshot evidence / proof assets'].map((t,i) => `<div class="checklist-item" onclick="toggleTask('w2t${i+9}','w2',16)"><div class="check-box" id="w2t${i+9}"></div><span>${t}</span></div>`).join('')}
      </div>
      <div class="week-card">
        <div class="week-number">Deploy / Env Checklist</div>
        <div class="week-title">Deployment Discipline</div>
        <div class="week-sub">Jelas untuk execution — tidak ada ambiguitas</div>
        ${['Deploy checklist per repo (Cloudflare)','Secret / env discipline (jangan expose)','README komersial singkat per repo','README internal technical appendix'].map((t,i) => `<div class="checklist-item" onclick="toggleTask('w2t${i+13}','w2',16)"><div class="check-box" id="w2t${i+13}"></div><span>${t}</span></div>`).join('')}
      </div>
    </div>
    <div style="margin-top:12px;">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:4px;"><span>Progress Minggu 2</span><span id="w2-pct-pct">0%</span></div>
      <div class="progress-bar" style="height:7px;"><div class="progress-fill" id="w2-prog-bar" style="width:0%;"></div></div>
    </div>
  </div>

  <!-- ========================= WEEK 3 ========================= -->
  <div class="page" id="page-week3">
    <div class="section-header">
      <div>
        <div class="section-title">Minggu 3 — Proof & Pilot Readiness</div>
        <div class="section-sub">Objective: Buat semua terlihat nyata, konsisten, dan terhubung ke produk layer lain</div>
      </div>
      <span class="tag tag-purple" style="font-size:11px;padding:4px 12px;">LATER</span>
    </div>
    <div class="alert alert-gold">
      <i class="fas fa-shield-alt" style="color:var(--gold);margin-top:2px;flex-shrink:0;"></i>
      <div><strong>Prinsip Minggu 3:</strong> Proof before scaling. Setiap layer harus punya bukti fungsi yang jelas. Canon map harus dibekukan sebelum pilot.</div>
    </div>
    <div class="week-grid">
      <div class="week-card">
        <div class="week-number">Proof Checklist</div>
        <div class="week-title">Bukti per Layer</div>
        <div class="week-sub">Fitur, deploy, log, screenshot, walkthrough</div>
        ${['Proof Lane: webhook live, budget log, prompt bridge','Proof Barber: kalkulator, BEP, risk matrix aktif','Proof Sovereign OS: 22 surfaces, tenant isolation','Deployment aktif merespons 200 OK semua platform'].map((t,i) => `<div class="checklist-item" onclick="toggleTask('w3t${i+1}','w3',16)"><div class="check-box" id="w3t${i+1}"></div><span>${t}</span></div>`).join('')}
      </div>
      <div class="week-card">
        <div class="week-number">QA Review</div>
        <div class="week-title">Quality Assurance Summary</div>
        <div class="week-sub">Pass/fail dan catat blocker</div>
        ${['QA pass/fail review Lane Eco (functional test)','QA pass/fail review Barber Coffee (all calculators)','QA pass/fail Sovereign OS (core surfaces)','Daftar gap yang harus ditutup sebelum pilot'].map((t,i) => `<div class="checklist-item" onclick="toggleTask('w3t${i+5}','w3',16)"><div class="check-box" id="w3t${i+5}"></div><span>${t}</span></div>`).join('')}
      </div>
      <div class="week-card">
        <div class="week-number">Canon Map</div>
        <div class="week-title">Bekukan Repo-Product Canon</div>
        <div class="week-sub">Integration map final di mother repo</div>
        ${['Finalkan repo-to-product map di Sovereign Eco','Hubungkan Lane ke narasi buyer 3 (operator)','Hubungkan Sovereign OS ke narasi buyer 4–5','Semua repo punya posisi bisnis tidak ambigu'].map((t,i) => `<div class="checklist-item" onclick="toggleTask('w3t${i+9}','w3',16)"><div class="check-box" id="w3t${i+9}"></div><span>${t}</span></div>`).join('')}
      </div>
      <div class="week-card">
        <div class="week-number">Pilot Pack</div>
        <div class="week-title">Paket Pilot Siap Pakai</div>
        <div class="week-sub">Bisa dipakai untuk validasi nyata</div>
        ${['Pilot pack buyer 3 (operator — Lane Control)','Pilot pack buyer 4 (founder — Sovereign OS)','Handoff internal untuk tim penjualan','Pilot invite deck / onboarding card'].map((t,i) => `<div class="checklist-item" onclick="toggleTask('w3t${i+13}','w3',16)"><div class="check-box" id="w3t${i+13}"></div><span>${t}</span></div>`).join('')}
      </div>
    </div>
    <div style="margin-top:12px;">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:4px;"><span>Progress Minggu 3</span><span id="w3-pct-pct">0%</span></div>
      <div class="progress-bar" style="height:7px;"><div class="progress-fill" id="w3-prog-bar" style="width:0%;"></div></div>
    </div>
  </div>

  <!-- ========================= WEEK 4 ========================= -->
  <div class="page" id="page-week4">
    <div class="section-header">
      <div>
        <div class="section-title">Minggu 4 — Commercial Closeout</div>
        <div class="section-sub">Objective: Semua output menjadi material siap jual dan pilot-ready</div>
      </div>
      <span class="tag tag-red" style="font-size:11px;padding:4px 12px;">FUTURE</span>
    </div>
    <div class="alert alert-green">
      <i class="fas fa-rocket" style="margin-top:2px;flex-shrink:0;"></i>
      <div><strong>Target Minggu 4:</strong> Sellable before expansion. Founder bisa langsung pakai material untuk jualan/pilot.</div>
    </div>
    <div class="week-grid">
      <div class="week-card">
        <div class="week-number">Final Sales Assets</div>
        <div class="week-title">Materi Jual Final</div>
        <div class="week-sub">Siap dipakai untuk pitching dan closing</div>
        ${['Sales one-liner sheet semua produk (final)','Product card / one-pager per repo utama','Price architecture + ROI calculator','Objection handler sheet'].map((t,i) => `<div class="checklist-item" onclick="toggleTask('w4t${i+1}','w4',16)"><div class="check-box" id="w4t${i+1}"></div><span>${t}</span></div>`).join('')}
      </div>
      <div class="week-card">
        <div class="week-number">Master Repo Map</div>
        <div class="week-title">Peta Repo Final</div>
        <div class="week-sub">Lampiran master document — konsisten</div>
        ${['Finalkan repo-to-product map versi master doc','Ecosystem narrative untuk internal/investor','Mother repo overview yang rapi','Hubungan antar repo dijelaskan dengan jelas'].map((t,i) => `<div class="checklist-item" onclick="toggleTask('w4t${i+5}','w4',16)"><div class="check-box" id="w4t${i+5}"></div><span>${t}</span></div>`).join('')}
      </div>
      <div class="week-card">
        <div class="week-number">Pilot-Ready Checklist</div>
        <div class="week-title">Checklist Siap Pilot</div>
        <div class="week-sub">Untuk Lane (buyer 3) dan Sovereign OS (buyer 4)</div>
        ${['Lane pilot-ready: buyer 3 bisa jalan','Sovereign OS pilot-ready: founder buyer','Tutup semua blocker merah','Turunkan scope item non-kritis'].map((t,i) => `<div class="checklist-item" onclick="toggleTask('w4t${i+9}','w4',16)"><div class="check-box" id="w4t${i+9}"></div><span>${t}</span></div>`).join('')}
      </div>
      <div class="week-card">
        <div class="week-number">Closeout Memo</div>
        <div class="week-title">Memo 30 Hari Final</div>
        <div class="week-sub">Apa yang siap, apa yang belum, langkah lanjut</div>
        ${['30-day closeout memo final','Backlog 31–60 hari (next sprint roadmap)','Next 30/60/90 day recommendations','Sovereign narrative → investor/partner ready'].map((t,i) => `<div class="checklist-item" onclick="toggleTask('w4t${i+13}','w4',16)"><div class="check-box" id="w4t${i+13}"></div><span>${t}</span></div>`).join('')}
      </div>
    </div>
    <div style="margin-top:12px;">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:4px;"><span>Progress Minggu 4</span><span id="w4-pct-pct">0%</span></div>
      <div class="progress-bar" style="height:7px;"><div class="progress-fill" id="w4-prog-bar" style="width:0%;"></div></div>
    </div>
  </div>

  <!-- ========================= MASTER CATALOG ========================= -->
  <div class="page" id="page-mastercatalog">
    <div class="section-header">
      <div>
        <div class="section-title">Master Catalog — Sovereign Ecosystem</div>
        <div class="section-sub">16 produk formal dalam hierarki yang jelas</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <input type="text" class="search-input" id="catalog-search" placeholder="Cari produk..." oninput="filterCatalog()">
        <button class="btn-export" onclick="exportCatalog()"><i class="fas fa-download"></i> Export CSV</button>
      </div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;" id="catalog-filters">
      <button class="filter-btn active-filter" onclick="setCatalogFilter('all', this)">Semua (16)</button>
      <button class="filter-btn" onclick="setCatalogFilter('L1', this)">Layer 1 — Enterprise (3)</button>
      <button class="filter-btn" onclick="setCatalogFilter('L2', this)">Layer 2 — Control (3)</button>
      <button class="filter-btn" onclick="setCatalogFilter('L3', this)">Layer 3 — Command (3)</button>
      <button class="filter-btn" onclick="setCatalogFilter('L4', this)">Layer 4 — Vertical (6)</button>
      <button class="filter-btn" onclick="setCatalogFilter('L1-4', this)">Marketplace (1)</button>
    </div>

    <div class="card">
      <table class="data-table" id="catalog-table">
        <thead>
          <tr><th>Kode</th><th>Nama Produk</th><th>Layer</th><th>Kategori</th><th>Target Market</th><th>Model Jual</th><th>Harga Mulai</th></tr>
        </thead>
        <tbody>
          ${[
            ['A','Sovereign Governance Core','L1','Enterprise Governance','Enterprise, Holding','Annual license','Rp 50 jt'],
            ['B','AI Governance Operating Layer','L1','Enterprise Governance','Internal platform team','Deploy + SLA','Rp 25 jt'],
            ['C','Multi-Tenant Control Platform','L1','Enterprise Governance','Enterprise B2B','Enterprise license','Rp 50 jt'],
            ['D','Lane Control Pack','L2','Operational Control','Operator multi-brand','Impl. + monthly fee','Rp 15 jt'],
            ['E','Prompt Budget Governance Pack','L2','Operational Control','AI-heavy team','Monthly fee','Rp 5 jt'],
            ['F','Master Architect Context Pack','L2','Operational Control','Founder/Ops lead','Setup + retainer','Rp 10 jt'],
            ['G','Founder Command Center','L3','Command Center','Founder/Venture Builder','High-ticket + managed','Rp 35 jt'],
            ['H','Private Sovereign Tower','L3','Command Center','Holding, Internal Lab','Private deployment','Rp 50 jt'],
            ['I','Revenue Intelligence Chamber','L3','Command Center','Operator inti','Setup + advisory','Rp 20 jt'],
            ['J','Barber + Coffee Business Planner','L4','Vertical Business','UMKM, Calon owner','Setup + maintenance','Rp 3 jt'],
            ['K','Vertical Dashboard White-Label Pack','L4','White-Label System','Agency, Konsultan','Impl. + license','Rp 10 jt'],
            ['L','Sector Playbook Pack','L4','White-Label System','Multi-brand operator','Pack + retainer','Rp 15 jt'],
            ['M','Custom Verticalization Sprint','L4','White-Label System','Holding UMKM, Mentor','Sprint fee','Rp 20 jt'],
            ['N','FashionKas Commerce Engine','L4','Vertical Business','Fashion owner','Setup + subscription','Rp 5 jt'],
            ['O','ResellerKas Distribution Layer','L4','Vertical Business','Reseller network owner','Monthly + API fee','Rp 3 jt'],
            ['P','Connector/Template Marketplace','L1-4','Marketplace','Self-serve, Partner','One-time + bundle','Rp 500 rb'],
          ].map(([code, name, layer, cat, market, model, price]) => `
          <tr data-layer="${layer}" data-name="${name.toLowerCase()} ${cat.toLowerCase()} ${market.toLowerCase()}">
            <td><span style="font-size:13px;font-weight:900;color:var(--gold-light);">${code}</span></td>
            <td style="font-size:12px;font-weight:700;color:var(--text-main);">${name}</td>
            <td><span class="tag ${layer==='L1'?'tag-purple':layer==='L2'?'tag-blue':layer==='L3'?'tag-orange':layer==='L4'?'tag-green':'tag-gold'}">${layer}</span></td>
            <td style="font-size:10.5px;color:var(--text-muted);">${cat}</td>
            <td style="font-size:10.5px;color:var(--text-muted);">${market}</td>
            <td style="font-size:10.5px;color:var(--text-muted);">${model}</td>
            <td style="font-size:11px;font-weight:700;color:var(--gold-light);">${price}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- ========================= OFFERS ========================= -->
  <div class="page" id="page-offers">
    <div class="section-header">
      <div>
        <div class="section-title">Offer Stack — 6 Kategori Penawaran</div>
        <div class="section-sub">Setiap stack menjual value berbeda ke buyer yang berbeda</div>
      </div>
    </div>
    <div class="offer-grid">
      ${[
        {num:'01',c:'green',name:'Vertical Business Offers',tagline:'Jual hasil yang langsung dipahami pasar',buyer:'UMKM, Calon owner, Konsultan',items:['Barber + Coffee Business Planner','Salon / Laundry / FnB Planner','Reseller Growth Planner'],liner:'"Bukan spreadsheet. Dashboard keputusan usaha yang bantu hitung modal, BEP, pricing, dan langkah buka bisnis."'},
        {num:'02',c:'blue',name:'White-Label Vertical System',tagline:'Jual mesin yang bisa direplikasi',buyer:'Agency, Konsultan, Inkubator',items:['Vertical Dashboard White-Label Pack','Sector Playbook Pack','Custom Verticalization Sprint'],liner:'"Kami tidak jual satu dashboard; kami jual template mesin bisnis yang bisa Anda cap merek sendiri."'},
        {num:'03',c:'orange',name:'Operational Control Offers',tagline:'Jual disiplin operasional AI',buyer:'Operator multi-brand, AI-heavy team',items:['Lane Control Pack','Prompt Budget Governance Pack','Master Architect Context Pack'],liner:'"AI Anda tidak lagi jalan liar. Semua prompt, budget, context, dan eksekusi dibatasi dan dilacak."'},
        {num:'04',c:'purple',name:'Private Command Center',tagline:'Jual ruang kendali founder',buyer:'Founder, CEO, Venture Builder',items:['Founder Command Center','Private Sovereign Tower','Revenue Intelligence Chamber'],liner:'"Ini bukan dashboard publik. Ini ruang kendali privat untuk validasi pasar, orkestrasi agen, dan keputusan founder."'},
        {num:'05',c:'red',name:'Enterprise Governance Offers',tagline:'Jual governance platform institusional',buyer:'Enterprise, Holding, Regulated',items:['Sovereign Governance Core','AI Governance Operating Layer','Multi-Tenant Control Platform'],liner:'"Masalah enterprise bukan punya AI atau tidak, tapi bagaimana AI itu dibatasi, dibuktikan, dan dioperasikan serius."'},
        {num:'06',c:'gold',name:'Marketplace & Templates',tagline:'Jual modul siap pakai — passive revenue',buyer:'Self-serve, Partner, Consultant',items:['Connector Packs','Governance Rule Packs','Sector Templates & Prompt Packs'],liner:'"Bukan mulai dari nol — pilih modul, pasang, adaptasi, lalu jalan."'},
      ].map(o => `
      <div class="offer-card">
        <div class="offer-tier" style="color:var(--${o.c==='gold'?'gold-light':o.c==='red'?'red':o.c+'-bright'})">${'OFFER STACK 0'+o.num} · ${o.name}</div>
        <div class="offer-tagline">${o.tagline}</div>
        <div style="font-size:9.5px;color:var(--text-muted);margin-bottom:7px;">Target: <span style="color:var(--text-main);">${o.buyer}</span></div>
        <ul class="offer-features">
          ${o.items.map(i => `<li><i class="fas fa-check-circle"></i> ${i}</li>`).join('')}
        </ul>
        <div style="background:rgba(255,255,255,0.035);border-radius:6px;padding:9px;border:1px solid rgba(255,255,255,0.06);">
          <div style="font-size:8.5px;color:var(--text-muted);margin-bottom:3px;text-transform:uppercase;letter-spacing:1px;">Sales One-Liner</div>
          <div style="font-size:11px;color:var(--ivory);font-style:italic;line-height:1.6;">${o.liner}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- ========================= PRICING ========================= -->
  <div class="page" id="page-pricing">
    <div class="section-header">
      <div>
        <div class="section-title">Price Architecture</div>
        <div class="section-sub">5 tier harga — dari entry product ke enterprise governance license</div>
      </div>
    </div>
    <div style="display:grid;gap:10px;">
      ${[
        {tier:'Tier 1',c:'green',name:'Fast Cash / Entry Product',tag:'Vertical Business Kit',setup:'Rp 3 jt – Rp 7,5 jt',monthly:'Rp 300rb – Rp 750rb / bln',extra:'Custom sektor: +Rp 1,5-4 jt · White-label: +Rp 2-5 jt',note:'Barber, Salon, Laundry, FnB kecil, UMKM'},
        {tier:'Tier 2',c:'blue',name:'Repeatable White-Label',tag:'White-Label Vertical Builder',setup:'Rp 10 jt – Rp 25 jt',monthly:'Rp 1 jt – Rp 3 jt / bln license',extra:'Custom flow: +Rp 3-10 jt · Multi-branch: +Rp 500rb/cabang/bln',note:'Agency, mentor bisnis, inkubator, holding UMKM'},
        {tier:'Tier 3',c:'orange',name:'Control Layer',tag:'Lane Control Pack',setup:'Rp 15 jt – Rp 40 jt',monthly:'Rp 2 jt – Rp 6 jt / bln',extra:'Integration/webhook: +Rp 2-8 jt · Governance retainer: +Rp 1,5-5 jt/bln',note:'Buyer yang punya aktivitas AI dan butuh kontrol'},
        {tier:'Tier 4',c:'purple',name:'Premium Founder System',tag:'Founder Command Center / Tower',setup:'Rp 35 jt – Rp 90 jt',monthly:'Rp 5 jt – Rp 15 jt / bln managed',extra:'Strategic advisory: +Rp 5-20 jt/bln · Private deployment: mulai Rp 15 jt',note:'Founder, operator inti, venture builder, multi-brand owner'},
        {tier:'Tier 5',c:'red',name:'Enterprise Governance',tag:'Sovereign Governance Platform',setup:'Discovery Rp 25-75 jt · Deploy Rp 50-200 jt',monthly:'Rp 5 jt – Rp 15 jt / bln license',extra:'SLA/support premium: +Rp 3-20 jt/bln',note:'Holding, enterprise, operasi regulated'},
      ].map(p => `
      <div style="background:var(--navy-card);border:1px solid rgba(201,168,76,0.1);border-left:3px solid var(--${p.c==='red'?'red':p.c+'-bright'});border-radius:8px;padding:14px 16px;">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="min-width:70px;"><span class="tag tag-${p.c==='red'?'red':p.c}">${p.tier}</span></div>
          <div style="flex:1;">
            <div style="font-size:12.5px;font-weight:800;color:var(--text-main);">${p.name} — <span style="color:var(--gold-light);">${p.tag}</span></div>
            <div style="font-size:10.5px;color:var(--text-muted);margin-top:2px;">Cocok untuk: ${p.note}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:13px;font-weight:900;color:var(--gold-light);">${p.setup}</div>
            <div style="font-size:10.5px;color:var(--text-muted);">${p.monthly}</div>
          </div>
        </div>
        <div style="font-size:10px;color:var(--text-muted);margin-top:7px;padding-top:7px;border-top:1px solid rgba(255,255,255,0.035);">${p.extra}</div>
      </div>`).join('')}
    </div>

    <div class="card-gold" style="margin-top:14px;">
      <div style="font-size:10.5px;color:var(--gold);font-weight:800;margin-bottom:10px;">Target Revenue B2B (dari Strategic Dossier)</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">
        <div style="text-align:center;padding:10px;background:rgba(0,0,0,0.2);border-radius:7px;">
          <div style="font-size:14px;font-weight:900;color:var(--gold-light);">Rp 500rb</div>
          <div style="font-size:9px;color:var(--text-muted);margin-top:3px;">/bulan · Starter</div>
        </div>
        <div style="text-align:center;padding:10px;background:rgba(0,0,0,0.2);border-radius:7px;">
          <div style="font-size:14px;font-weight:900;color:var(--gold-light);">Rp 1,5 jt</div>
          <div style="font-size:9px;color:var(--text-muted);margin-top:3px;">/bulan · Growth</div>
        </div>
        <div style="text-align:center;padding:10px;background:rgba(0,0,0,0.2);border-radius:7px;">
          <div style="font-size:14px;font-weight:900;color:var(--gold-light);">Rp 5-15 jt</div>
          <div style="font-size:9px;color:var(--text-muted);margin-top:3px;">/bulan · Enterprise</div>
        </div>
        <div style="text-align:center;padding:10px;background:rgba(0,0,0,0.2);border-radius:7px;">
          <div style="font-size:14px;font-weight:900;color:var(--gold-light);">Rp 50-75 jt</div>
          <div style="font-size:9px;color:var(--text-muted);margin-top:3px;">/bulan · Fase 3 Target</div>
        </div>
      </div>
      <div style="font-size:10.5px;color:var(--text-muted);margin-top:10px;">Target Q1-Q2 2027: Rp 50-75 jt/bulan dari 35 klien aktif</div>
    </div>
  </div>

  <!-- ========================= SALES SHEET ========================= -->
  <div class="page" id="page-salessheet">
    <div class="section-header">
      <div>
        <div class="section-title">Sales One-Liner Sheet</div>
        <div class="section-sub">Kalimat jual per layer, per buyer, per offer stack — siap pakai</div>
      </div>
      <button class="btn-export" onclick="exportSalesSheet()"><i class="fas fa-copy"></i> Copy All</button>
    </div>
    <div style="display:grid;gap:14px;">
      <div class="card">
        <div class="card-header">
          <div class="card-icon" style="background:rgba(201,168,76,0.12)"><i class="fas fa-bullhorn" style="color:var(--gold)"></i></div>
          <div><div class="card-title">Master One-Liner</div><div class="card-sub">Positioning inti — selalu dipakai sebagai pembuka</div></div>
        </div>
        <div style="background:rgba(201,168,76,0.07);border:1px solid rgba(201,168,76,0.22);border-radius:8px;padding:14px;">
          <div style="font-size:14px;font-style:italic;color:var(--ivory);line-height:1.75;">"Kami tidak menjual AI tools. Kami membangun mesin bisnis yang bisa divalidasi, dikendalikan, diaudit, dan dinaikkan menjadi governance platform."</div>
        </div>
      </div>

      <div class="card">
        <div style="font-size:11.5px;font-weight:800;color:var(--gold);margin-bottom:12px;">One-Liner per Layer Produk</div>
        <table class="data-table">
          <thead><tr><th>Layer</th><th>Produk</th><th>Sales One-Liner</th></tr></thead>
          <tbody>
            <tr><td><span class="tag tag-green">L4</span></td><td style="font-size:11px;font-weight:700;">Vertical Products</td><td style="font-size:11.5px;font-style:italic;color:var(--ivory);">"Kami bantu buyer mengambil keputusan bisnis dengan engine vertikal yang langsung terasa hasilnya."</td></tr>
            <tr><td><span class="tag tag-orange">L3</span></td><td style="font-size:11px;font-weight:700;">Sovereign Tower / Command Center</td><td style="font-size:11.5px;font-style:italic;color:var(--ivory);">"Kami beri founder ruang kendali privat untuk memantau, mengarahkan, dan mengorkestrasi mesin bisnisnya."</td></tr>
            <tr><td><span class="tag tag-blue">L2</span></td><td style="font-size:11px;font-weight:700;">Lane Eco Budget Control</td><td style="font-size:11.5px;font-style:italic;color:var(--ivory);">"Kami kunci prompt, biaya, dan boundary operasional AI agar tim tidak boros dan tidak liar."</td></tr>
            <tr><td><span class="tag tag-purple">L1</span></td><td style="font-size:11px;font-weight:700;">Sovereign OS Platform</td><td style="font-size:11.5px;font-style:italic;color:var(--ivory);">"Kami melisensikan governance core agar AI enterprise berjalan aman, patuh, terisolasi, dan dapat diaudit."</td></tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <div style="font-size:11.5px;font-weight:800;color:var(--gold);margin-bottom:12px;">One-Liner per Segmen Buyer</div>
        <table class="data-table">
          <thead><tr><th>Segmen</th><th>Pain Utama</th><th>Sales One-Liner</th></tr></thead>
          <tbody>
            ${[
              ['UMKM / Calon Owner','Bingung hitung modal, BEP, risiko','"Kami bantu Anda menghitung dan menjalankan keputusan usaha dengan lebih pasti, bukan kira-kira."'],
              ['Agency / Konsultan','Sulit punya sistem sendiri untuk klien','"Gunakan engine kami sebagai sistem white-label agar Anda tidak membangun semuanya dari nol."'],
              ['Operator Multi-Brand','Tim AI boros, tidak disiplin, tidak terkontrol','"Satukan prompt, budget, dan alur kerja tim Anda dalam satu gateway operasional."'],
              ['Founder / Venture Builder','Butuh ruang kendali privat untuk eksekusi','"Kami bangun command center privat agar eksperimen dan eksekusi bisnis tetap dalam satu komando."'],
              ['Enterprise / Holding','Risiko audit, compliance, kebocoran data','"Kami melisensikan governance layer agar operasi AI korporat aman, patuh, dan terisolasi."'],
            ].map(([seg, pain, liner]) => `<tr><td style="font-size:11px;font-weight:700;">${seg}</td><td style="font-size:10.5px;color:var(--text-muted);">${pain}</td><td style="font-size:11.5px;font-style:italic;color:var(--ivory);">${liner}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ========================= ROADMAP ========================= -->
  <div class="page" id="page-roadmap">
    <div class="section-header">
      <div>
        <div class="section-title">Roadmap Monetisasi</div>
        <div class="section-sub">Dari vertical proof ke enterprise governance — jalur komersialisasi bertahap</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px;">
      <div>
        <div style="font-size:11.5px;font-weight:800;color:var(--gold);margin-bottom:12px;">Product Ladder — 6 Level</div>
        <div class="timeline">
          ${[
            {done:true,next:false,phase:'Level 1 — Sell the Result',title:'Vertical Products (Barber, Salon, FnB)',sub:'Entry product, lead magnet, demo case. Jual hasil yang mudah dipahami pasar.'},
            {done:true,next:false,phase:'Level 2 — Sell the Repeatability',title:'White-Label Vertical Systems',sub:'Pola satu vertical berhasil direplikasi ke sektor lain. Template bisnis.'},
            {done:false,next:true,phase:'Level 3 — Sell the Control',title:'Lane Control Pack (Operational AI)',sub:'Prompt-governed control system. Buyer beli disiplin, bukan fitur AI.'},
            {done:false,next:false,phase:'Level 4 — Sell the Command',title:'Founder Command Center',sub:'Private command center untuk orkestrasi. Buyer beli ruang kendali.'},
            {done:false,next:false,phase:'Level 5 — Sell the Platform',title:'Sovereign OS Governance Platform',sub:'Annual license. Governance-first moat. Enterprise positioning.'},
            {done:false,next:false,phase:'Level 6 — Sell the Ecosystem',title:'Marketplace + Template Revenue',sub:'Passive revenue dari connectors, templates, governance packs.'},
          ].map(t => `<div class="timeline-item ${t.done?'done':t.next?'next':''}">
            <div class="timeline-phase">${t.phase}</div>
            <div class="timeline-title">${t.title}</div>
            <div class="timeline-sub">${t.sub}</div>
          </div>`).join('')}
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        <div class="card">
          <div style="font-size:11.5px;font-weight:800;color:var(--gold);margin-bottom:10px;">Fase Monetisasi (Strategic Dossier)</div>
          <table class="data-table">
            <thead><tr><th>Fase</th><th>Timeline</th><th>Model</th><th>Target</th></tr></thead>
            <tbody>
              <tr><td><span class="tag tag-green">Fase 1</span></td><td style="font-size:10.5px;">Now–3 bln</td><td style="font-size:10.5px;">Fashion/vertical sales</td><td style="font-size:10.5px;color:var(--gold-light);">Rp 15 jt/minggu</td></tr>
              <tr><td><span class="tag tag-blue">Fase 2</span></td><td style="font-size:10.5px;">3–12 bln</td><td style="font-size:10.5px;">Scale automation</td><td style="font-size:10.5px;color:var(--gold-light);">Rp 70 jt/minggu</td></tr>
              <tr><td><span class="tag tag-orange">Fase 3</span></td><td style="font-size:10.5px;">12–24 bln</td><td style="font-size:10.5px;">SaaS Licensing</td><td style="font-size:10.5px;color:var(--gold-light);">Rp 50-75 jt/bulan</td></tr>
              <tr><td><span class="tag tag-purple">P7+</span></td><td style="font-size:10.5px;">2027+</td><td style="font-size:10.5px;">White-label + Marketplace</td><td style="font-size:10.5px;color:var(--gold-light);">Rp 1M+/bulan horizon</td></tr>
            </tbody>
          </table>
        </div>

        <div class="card-gold">
          <div style="font-size:10.5px;color:var(--gold);font-weight:800;margin-bottom:8px;">Roadmap 90 Hari</div>
          <div style="display:grid;gap:6px;">
            <div style="padding:8px;background:rgba(0,0,0,0.2);border-radius:6px;border-left:2px solid var(--green-bright);">
              <div style="font-size:9.5px;color:var(--green-bright);font-weight:800;">HARI 1–30 · Hardening + Decisions</div>
              <div style="font-size:10.5px;color:var(--text-muted);margin-top:2px;">Product decision · Repo boundary · Packaging Minggu 1-2</div>
            </div>
            <div style="padding:8px;background:rgba(0,0,0,0.2);border-radius:6px;border-left:2px solid var(--blue-bright);">
              <div style="font-size:9.5px;color:var(--blue-bright);font-weight:800;">HARI 31–60 · Validation Scale</div>
              <div style="font-size:10.5px;color:var(--text-muted);margin-top:2px;">Proof · QA · Pilot pack · Validasi scale trigger</div>
            </div>
            <div style="padding:8px;background:rgba(0,0,0,0.2);border-radius:6px;border-left:2px solid var(--orange-bright);">
              <div style="font-size:9.5px;color:var(--orange-bright);font-weight:800;">HARI 61–90 · Packaging B2B</div>
              <div style="font-size:10.5px;color:var(--text-muted);margin-top:2px;">Sales assets · Onboarding · Pitch deck · Go-to-market</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================= BUYER MAP ========================= -->
  <div class="page" id="page-buyermap">
    <div class="section-header">
      <div>
        <div class="section-title">Buyer Segment Map</div>
        <div class="section-sub">Setiap buyer masuk dari pain yang berbeda — jual layer yang menyelesaikan masalahnya sekarang</div>
      </div>
    </div>
    <div style="display:grid;gap:12px;">
      ${[
        {num:1,c:'green',seg:'UMKM / Calon Owner',pain:'Bingung hitung modal, BEP, risiko, dan langkah buka usaha',product:'Barber + Coffee Business Planner / Vertical Kit',stack:'Offer Stack 01 — Vertical Business',entry:'L4',exit:'L2',liner:'"Kami bantu Anda menghitung dan menjalankan keputusan usaha dengan lebih pasti, bukan kira-kira."',price:'Rp 3-7,5 jt setup + Rp 300-750rb/bulan'},
        {num:2,c:'blue',seg:'Agency / Konsultan',pain:'Sulit punya sistem sendiri untuk klien — butuh mesin yang bisa direplikasi',product:'White-Label Vertical Builder / Sector Playbook Pack',stack:'Offer Stack 02 — White-Label System',entry:'L4→L2',exit:'L3',liner:'"Gunakan engine kami sebagai sistem white-label agar Anda tidak membangun semuanya dari nol."',price:'Rp 10-25 jt setup + license/bulan'},
        {num:3,c:'orange',seg:'Operator Multi-Brand',pain:'Tim AI boros, tidak disiplin, prompt tidak terkontrol',product:'Lane Control Pack / Prompt Budget Governance Pack',stack:'Offer Stack 03 — Operational Control',entry:'L2',exit:'L3',liner:'"Satukan prompt, budget, dan alur kerja tim Anda dalam satu gateway operasional."',price:'Rp 15-40 jt setup + Rp 2-6 jt/bulan'},
        {num:4,c:'purple',seg:'Founder / Venture Builder',pain:'Butuh ruang kendali privat untuk validasi pasar',product:'Founder Command Center / Private Sovereign Tower',stack:'Offer Stack 04 — Command Center',entry:'L3+L2',exit:'L1',liner:'"Kami bangun command center privat agar eksperimen dan eksekusi bisnis tetap dalam satu komando."',price:'Rp 35-90 jt setup + Rp 5-15 jt/bulan'},
        {num:5,c:'red',seg:'Enterprise / Holding',pain:'Risiko audit, compliance, kebocoran data',product:'Sovereign Governance Core / Multi-Tenant Control Platform',stack:'Offer Stack 05 — Enterprise Governance',entry:'L1',exit:'L1',liner:'"Kami melisensikan governance layer agar operasi AI korporat aman, patuh, dan terisolasi."',price:'Rp 50-200 jt deploy + Rp 5-15 jt/bulan license'},
      ].map(b => `
      <div style="background:var(--navy-card);border:1px solid rgba(201,168,76,0.08);border-left:3px solid var(--${b.c==='red'?'red':b.c+'-bright'});border-radius:8px;padding:14px 16px;">
        <div style="display:flex;align-items:flex-start;gap:14px;flex-wrap:wrap;">
          <div style="width:26px;height:26px;border-radius:50%;background:rgba(201,168,76,0.15);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:var(--gold);flex-shrink:0;">${b.num}</div>
          <div style="flex:1;">
            <div style="font-size:13.5px;font-weight:900;color:var(--text-main);margin-bottom:3px;">${b.seg}</div>
            <div style="font-size:10.5px;color:var(--text-muted);margin-bottom:7px;line-height:1.55;">Pain: ${b.pain}</div>
            <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:6px;">
              <span class="tag ${b.c==='red'?'tag-red':'tag-'+b.c}">${b.stack}</span>
              <span style="font-size:9.5px;color:var(--text-muted);">Entry: <strong style="color:var(--gold);">${b.entry}</strong> → Upgrade: <strong style="color:var(--gold);">${b.exit}</strong></span>
            </div>
            <div style="font-size:11.5px;font-style:italic;color:var(--ivory);margin-bottom:5px;">${b.liner}</div>
            <div style="font-size:10px;color:var(--gold-light);font-weight:600;">${b.price}</div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- ========================= GOVERNANCE ========================= -->
  <div class="page" id="page-governance">
    <div class="section-header">
      <div>
        <div class="section-title">Sovereign Governance Laws</div>
        <div class="section-sub">12 hukum tidak bisa dilanggar dalam operasi Sovereign Ecosystem</div>
      </div>
    </div>
    <div class="alert alert-gold" style="margin-bottom:18px;">
      <i class="fas fa-balance-scale" style="color:var(--gold);margin-top:2px;flex-shrink:0;"></i>
      <div><strong>Canon Utama:</strong> Manusia tetap Layer 1. AI hanya Layer 2 Assist. Governance lebih penting dari gimmick AI. Ini bukan aturan teknis — ini hukum operasional yang tidak bisa di-override.</div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
      ${[
        {n:1,c:'purple',law:'Intent manusia selalu Layer 1',desc:'Setiap keputusan harus berasal dari intent yang jelas dari founder/operator. AI tidak boleh membuat keputusan tanpa trigger manusia.'},
        {n:2,c:'blue',law:'AI hanya boleh Layer 2 Assist',desc:'AI diposisikan sebagai alat bantu, bukan pengambil keputusan. Setiap output AI harus bisa dioverride manusia.'},
        {n:3,c:'red',law:'No role collapse, ever',desc:'Peran dalam sistem tidak boleh overlap atau collapse. Developer ≠ Founder ≠ AI ≠ User. Boundaries harus tegas.'},
        {n:4,c:'gold',law:'Canon harus earned, bukan claimed',desc:'Status canon hanya bisa diperoleh melalui proof dan validasi, bukan hanya klaim atau deklarasi sepihak.'},
        {n:5,c:'teal',law:'Live state dari database, bukan memori',desc:'Source of truth harus selalu dari database (D1). Bukan dari cache, memory, atau asumsi AI tentang state sistem.'},
        {n:6,c:'green',law:'Status harus jujur / terverifikasi',desc:'Setiap status yang ditampilkan harus benar-benar mencerminkan kondisi nyata, bukan wishful thinking.'},
        {n:7,c:'orange',law:'Governance lebih penting dari gimmick',desc:'Jangan buat fitur AI yang terlihat canggih tapi tidak punya governance. Governance adalah nilai jual utama.'},
        {n:8,c:'blue',law:'Proof sebelum scale',desc:'Setiap layer harus punya bukti fungsi yang jelas sebelum di-scale ke lebih banyak user atau tenant.'},
        {n:9,c:'purple',law:'Tenant isolation non-negotiable',desc:'Data antar tenant tidak boleh bercampur. Isolasi adalah syarat minimum untuk platform multi-tenant enterprise.'},
        {n:10,c:'gold',law:'Jual per layer, bukan all-in-one',desc:'Setiap buyer masuk dari layer yang menyelesaikan masalahnya. Jangan paksa semua buyer beli full ecosystem.'},
        {n:11,c:'red',law:'Boundary produk sebelum build fitur',desc:'Tentukan dulu apa yang bukan bagian dari produk, sebelum membangun fitur baru.'},
        {n:12,c:'green',law:'Human confirmation gate mandatory',desc:'Setiap aksi yang berdampak signifikan harus melalui confirmation gate dari manusia. Tidak ada auto-execute tanpa consent.'},
      ].map(g => `
      <div style="background:var(--navy-card);border:1px solid rgba(201,168,76,0.08);border-left:3px solid var(--${g.c==='gold'?'gold':g.c==='teal'?'teal':g.c+'-bright'});border-radius:8px;padding:14px;">
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <div style="width:24px;height:24px;border-radius:50%;background:rgba(201,168,76,0.15);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:var(--gold);flex-shrink:0;">${g.n}</div>
          <div>
            <div style="font-size:12.5px;font-weight:800;color:var(--text-main);margin-bottom:4px;">${g.law}</div>
            <div style="font-size:10.5px;color:var(--text-muted);line-height:1.6;">${g.desc}</div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- ========================= TERMINAL ========================= -->
  <div class="page" id="page-terminal">
    <div class="section-header">
      <div>
        <div class="section-title">Sovereign Command Terminal</div>
        <div class="section-sub">Interface command center untuk navigasi & informasi cepat · Ketik "help" untuk daftar perintah</div>
      </div>
      <span class="tag tag-green" style="font-size:11px;padding:4px 12px;"><span class="badge-new" style="margin-left:0;margin-right:4px;">NEW</span>v2.0</span>
    </div>

    <div class="terminal">
      <div class="terminal-header">
        <div class="terminal-dot" style="background:#ff5f57;"></div>
        <div class="terminal-dot" style="background:#febc2e;"></div>
        <div class="terminal-dot" style="background:#28c840;"></div>
        <span style="font-size:11px;color:rgba(168,180,200,0.6);margin-left:8px;">sovereign@pt-waskita-digital:~$</span>
      </div>
      <div class="terminal-body" id="terminal-body">
        <div class="terminal-line"><span class="t-gold">╔══════════════════════════════════════════════════════╗</span></div>
        <div class="terminal-line"><span class="t-gold">║  SOVEREIGN PRODUCTIZATION COMMAND CENTER v2.0        ║</span></div>
        <div class="terminal-line"><span class="t-gold">║  PT Waskita Cakrawarti Digital · 21 April 2026       ║</span></div>
        <div class="terminal-line"><span class="t-gold">║  Status: P5 LIVE-VERIFIED / HUB-24 MATURE            ║</span></div>
        <div class="terminal-line"><span class="t-gold">╚══════════════════════════════════════════════════════╝</span></div>
        <div class="terminal-line" style="margin-top:8px;"><span class="t-success">✓</span> <span class="t-output">System initialized. Type <span class="t-cmd">help</span> to see available commands.</span></div>
        <div class="terminal-line"><span class="t-output">"Bukan pedagang. Bukan pengguna AI. Sovereign Engineer."</span></div>
        <div style="margin-top:8px;"></div>
      </div>
      <div class="terminal-input-row">
        <span class="t-prompt">sovereign@wcd:~$</span>
        <input type="text" class="terminal-input" id="terminal-input" placeholder="Ketik perintah..." onkeydown="handleTerminalInput(event)" autocomplete="off" spellcheck="false">
      </div>
    </div>

    <div class="card" style="margin-top:14px;">
      <div style="font-size:11.5px;font-weight:800;color:var(--gold);margin-bottom:10px;">Quick Commands</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${['help','status','layers','catalog','buyers','pricing','sprint','tracker','canon','roadmap','links','pilot','compare','clear'].map(cmd => `
        <button onclick="runCommand('${cmd}')" style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.2);color:var(--gold-light);font-size:10.5px;font-weight:700;padding:4px 12px;border-radius:5px;cursor:pointer;font-family:'Fira Code','Courier New',monospace;transition:all 0.15s;" onmouseover="this.style.background='rgba(201,168,76,0.2)'" onmouseout="this.style.background='rgba(201,168,76,0.1)'">${cmd}</button>`).join('')}
      </div>
    </div>
  </div>

  <!-- ========================= MASTER ARCHITECT PROMPT ========================= -->
  <div class="page" id="page-masterarchitect">
    <div class="section-header">
      <div>
        <div class="section-title">Master Architect Prompt</div>
        <div class="section-sub">Prompt final untuk AI Developer Architect-Executor — siap pakai langsung</div>
      </div>
      <button class="btn-export" onclick="copyPrompt()"><i class="fas fa-copy"></i> Copy Prompt</button>
    </div>

    <div class="alert alert-gold" style="margin-bottom:18px;">
      <i class="fas fa-chess-queen" style="color:var(--gold);margin-top:2px;flex-shrink:0;"></i>
      <div><strong>Cara Pakai:</strong> Copy prompt ini dan tempel sebagai system prompt / instruksi utama untuk AI Developer. Prompt ini memaksa AI bekerja sebagai architect-executor, bukan sekadar coder.</div>
    </div>

    <div id="prompt-container" style="background:#0d1117;border:1px solid rgba(39,174,96,0.25);border-radius:10px;padding:20px;font-family:'Fira Code','Courier New',monospace;font-size:11.5px;line-height:1.85;color:#a8b4c8;white-space:pre-wrap;max-height:600px;overflow-y:auto;">
<span style="color:#58d6c0;">Anda adalah AI Developer Architect-Executor untuk Sovereign Ecosystem</span>
<span style="color:#58d6c0;">milik PT Waskita Cakrawarti Digital.</span>

<span style="color:var(--gold-light);">PERAN ANDA</span>
Anda bukan sekadar pembuat fitur. Anda bertugas menerjemahkan
arsitektur Sovereign menjadi keputusan produk, boundary repo,
struktur app, flow demo, checklist implementasi, dan paket pilot
yang siap dipakai founder untuk validasi pasar dan penjualan.

<span style="color:var(--gold-light);">PRINSIP CANON</span>
1. Jangan perlakukan seluruh Sovereign Ecosystem sebagai satu produk tunggal.
2. Jual dan bangun per layer sesuai pain buyer saat ini.
3. Manusia tetap Layer 1. AI hanya Layer 2 Assist.
4. Governance lebih penting daripada gimmick AI.
5. Semua keputusan harus menjaga perbedaan antara:
   - governance core (L1)
   - prompt/budget control (L2)
   - orchestration/command center (L3)
   - vertical proof / market labs (L4)

<span style="color:var(--gold-light);">CANON PRODUCT STACK</span>
- Layer 1: Sovereign OS Platform = governance core / tenant isolation / auditability
- Layer 2: Lane Eco Budget Control = prompt-budget boundary / session governance
- Layer 3: Sovereign Ecosystem / Tower = orchestration hub / founder command center
- Layer 4: Vertical Products = market-facing proof (Barber+Coffee, FashionKas, dll)

<span style="color:var(--gold-light);">KALIMAT CANON BISNIS</span>
- Barber menjual HASIL.
- Lane menjual KONTROL.
- Tower menjual ORKESTRASI.
- OS menjual SISTEM.

<span style="color:var(--gold-light);">RENCANA 4 MINGGU</span>
MINGGU 1 — PRODUCT DECISION FOUNDATION
Output: Product Decision Board · Buyer Segment Map · Repo Boundary Matrix
        · Webapp Decision Memo · Founder Decision Summary

MINGGU 2 — OFFER & DEMO PACKAGING
Output: Offer Sheet per layer · Sales One-Liner per buyer
        · Demo Flow Narrative · Onboarding Dasar · Deploy Checklist

MINGGU 3 — PROOF & PILOT READINESS
Output: Proof Checklist · QA Review · Repo-Product Canon Map
        · Pilot Pack · Pilot Readiness Notes

MINGGU 4 — COMMERCIAL CLOSEOUT
Output: Final Sales Assets · Master Repo Map · Pilot-Ready Checklist
        · Closeout Memo · Next 30/60/90 Day Recommendations

<span style="color:var(--gold-light);">ATURAN OUTPUT SETIAP MINGGU</span>
Format: A. Objective | B. Decisions | C. Deliverables | D. Tasks
        E. Dependencies | F. Risks | G. Acceptance Criteria | H. Founder Questions

<span style="color:var(--gold-light);">PRINSIP EKSEKUSI</span>
- Decision before build
- Package before polish
- Proof before scaling
- Sellable before expansion
- JANGAN tambah fitur sebelum boundary produk final
    </div>
  </div>


  <!-- ========================= 90-DAY TRACKER ========================= -->
  <div class="page" id="page-tracker90">
    <div class="section-header">
      <div>
        <div class="section-title">90-Day Execution Tracker</div>
        <div class="section-sub">Tracker harian produktisasi Sovereign — klik hari untuk mark selesai</div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn-export" onclick="resetTracker()"><i class="fas fa-redo"></i> Reset</button>
        <button class="btn-export" onclick="exportTracker()"><i class="fas fa-download"></i> Export</button>
      </div>
    </div>

    <div class="alert alert-gold" style="margin-bottom:16px;">
      <i class="fas fa-calendar-alt" style="color:var(--gold);margin-top:2px;flex-shrink:0;"></i>
      <div><strong>Panduan Tracker:</strong> Klik hari untuk mark selesai (hijau). Fase 1 = Hardening &amp; Decision, Fase 2 = Validation Scale, Fase 3 = Packaging B2B. Progress tersimpan otomatis.</div>
    </div>

    <!-- Stats Bar -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px;" id="tracker-stats">
      <div class="metric-card" style="text-align:center;">
        <div class="metric-label">Total Progress</div>
        <div class="metric-value" id="t90-pct" style="font-size:22px;">0%</div>
        <div class="metric-sub" id="t90-done">0/90 hari</div>
      </div>
      <div class="metric-card" style="text-align:center;">
        <div class="metric-label">Fase 1 (H1-30)</div>
        <div class="metric-value" id="t90-f1" style="font-size:22px;color:var(--green-bright);">0%</div>
        <div class="metric-sub">Hardening + Decisions</div>
      </div>
      <div class="metric-card" style="text-align:center;">
        <div class="metric-label">Fase 2 (H31-60)</div>
        <div class="metric-value" id="t90-f2" style="font-size:22px;color:var(--blue-bright);">0%</div>
        <div class="metric-sub">Validation Scale</div>
      </div>
      <div class="metric-card" style="text-align:center;">
        <div class="metric-label">Fase 3 (H61-90)</div>
        <div class="metric-value" id="t90-f3" style="font-size:22px;color:var(--orange-bright);">0%</div>
        <div class="metric-sub">Packaging B2B</div>
      </div>
    </div>

    <!-- Phase 1 -->
    <div class="card" style="margin-bottom:14px;">
      <div class="card-header">
        <div class="card-icon" style="background:rgba(39,174,96,0.12)"><i class="fas fa-tools" style="color:var(--green-bright)"></i></div>
        <div>
          <div class="card-title" style="color:var(--green-bright);">FASE 1 — Hari 1–30 · Hardening + Product Decision</div>
          <div class="card-sub">Product boundary · Packaging · Deploy discipline</div>
        </div>
        <div style="margin-left:auto;font-size:10px;color:var(--text-muted);"><span id="f1-done">0</span>/30 hari</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:5px;" id="phase1-grid"></div>
      <div class="progress-bar" style="margin-top:10px;height:6px;"><div class="progress-fill green" id="f1-bar" style="width:0%;"></div></div>
    </div>

    <!-- Phase 2 -->
    <div class="card" style="margin-bottom:14px;">
      <div class="card-header">
        <div class="card-icon" style="background:rgba(41,128,185,0.12)"><i class="fas fa-chart-line" style="color:var(--blue-bright)"></i></div>
        <div>
          <div class="card-title" style="color:var(--blue-bright);">FASE 2 — Hari 31–60 · Validation Scale</div>
          <div class="card-sub">Proof · QA pass · Pilot pack · Scale trigger</div>
        </div>
        <div style="margin-left:auto;font-size:10px;color:var(--text-muted);"><span id="f2-done">0</span>/30 hari</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:5px;" id="phase2-grid"></div>
      <div class="progress-bar" style="margin-top:10px;height:6px;"><div class="progress-fill" id="f2-bar" style="width:0%;background:linear-gradient(90deg,var(--blue),var(--blue-bright));"></div></div>
    </div>

    <!-- Phase 3 -->
    <div class="card" style="margin-bottom:14px;">
      <div class="card-header">
        <div class="card-icon" style="background:rgba(211,84,0,0.12)"><i class="fas fa-rocket" style="color:var(--orange-bright)"></i></div>
        <div>
          <div class="card-title" style="color:var(--orange-bright);">FASE 3 — Hari 61–90 · Packaging B2B</div>
          <div class="card-sub">Sales assets · Onboarding · Pitch · Go-to-market</div>
        </div>
        <div style="margin-left:auto;font-size:10px;color:var(--text-muted);"><span id="f3-done">0</span>/30 hari</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:5px;" id="phase3-grid"></div>
      <div class="progress-bar" style="margin-top:10px;height:6px;"><div class="progress-fill" id="f3-bar" style="width:0%;background:linear-gradient(90deg,var(--orange),var(--orange-bright));"></div></div>
    </div>

    <!-- Milestone Checklist -->
    <div class="card-gold">
      <div style="font-size:11px;font-weight:800;color:var(--gold);margin-bottom:12px;">Key Milestones 90 Hari</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div>
          <div style="font-size:9.5px;color:var(--green-bright);font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:7px;">Fase 1 Milestones</div>
          ${['Product Decision Board final','Repo boundary semua dikunci','Webapp decision final','Offer sheet Lane selesai','Demo flow Barber selesai'].map((m,i) => `
          <div class="checklist-item" onclick="toggleItem(this,'m1-${i}')"><div class="check-box" id="m1-${i}"></div><span>${m}</span></div>`).join('')}
        </div>
        <div>
          <div style="font-size:9.5px;color:var(--blue-bright);font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:7px;">Fase 2-3 Milestones</div>
          ${['QA pass/fail semua platform','Pilot pack buyer 3 selesai','Sales sheet final siap','Master repo map dibekukan','Go-to-market materials ready'].map((m,i) => `
          <div class="checklist-item" onclick="toggleItem(this,'m2-${i}')"><div class="check-box" id="m2-${i}"></div><span>${m}</span></div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- ========================= PILOT PACK GENERATOR ========================= -->
  <div class="page" id="page-pilotpack">
    <div class="section-header">
      <div>
        <div class="section-title">Pilot Pack Generator</div>
        <div class="section-sub">Generate dokumen pilot siap pakai per buyer segment — copy langsung</div>
      </div>
    </div>

    <div class="alert alert-blue" style="margin-bottom:16px;">
      <i class="fas fa-file-medical-alt" style="margin-top:2px;flex-shrink:0;"></i>
      <div><strong>Pilot Pack</strong> adalah paket dokumen minimum yang diperlukan untuk membawa satu buyer ke sesi validasi nyata. Pilih buyer segment lalu generate.</div>
    </div>

    <!-- Buyer Selector -->
    <div class="card" style="margin-bottom:16px;">
      <div style="font-size:11.5px;font-weight:800;color:var(--gold);margin-bottom:12px;">Pilih Target Buyer Segment</div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;" id="buyer-selector">
        ${[
          {id:'b1',label:'Buyer 1',name:'UMKM / Calon Owner',c:'green',icon:'fa-store'},
          {id:'b2',label:'Buyer 2',name:'Agency / Konsultan',c:'blue',icon:'fa-handshake'},
          {id:'b3',label:'Buyer 3',name:'Operator Multi-Brand',c:'orange',icon:'fa-cogs'},
          {id:'b4',label:'Buyer 4',name:'Founder / Venture Builder',c:'purple',icon:'fa-chess-king'},
          {id:'b5',label:'Buyer 5',name:'Enterprise / Holding',c:'red',icon:'fa-building'},
        ].map(b => `
        <div onclick="selectBuyer('${b.id}')" id="bcard-${b.id}" style="border:1px solid rgba(255,255,255,0.08);border-radius:9px;padding:12px;text-align:center;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='rgba(201,168,76,0.3)'" onmouseout="if(selectedBuyer!=='${b.id}') this.style.borderColor='rgba(255,255,255,0.08)'">
          <div style="font-size:20px;margin-bottom:6px;"><i class="fas ${b.icon}" style="color:var(--${b.c}-bright,var(--${b.c}));"></i></div>
          <div style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:3px;">${b.label}</div>
          <div style="font-size:10.5px;font-weight:700;color:var(--text-main);">${b.name}</div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Generated Pilot Pack Output -->
    <div id="pilot-output" style="display:none;">
      <div class="card" style="margin-bottom:14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <div>
            <div class="card-title" id="pilot-title">Pilot Pack — Buyer X</div>
            <div class="card-sub" id="pilot-sub">Pack siap pakai untuk validasi pilot</div>
          </div>
          <button class="btn-export" onclick="copyPilotPack()"><i class="fas fa-copy"></i> Copy Pack</button>
        </div>
        <div id="pilot-content" style="display:grid;gap:10px;"></div>
      </div>
    </div>

    <div id="pilot-placeholder" class="card-gold" style="text-align:center;padding:30px;">
      <i class="fas fa-arrow-up" style="color:var(--gold);font-size:24px;margin-bottom:10px;display:block;"></i>
      <div style="font-size:13px;font-weight:700;color:var(--gold-light);">Pilih buyer segment di atas</div>
      <div style="font-size:10.5px;color:var(--text-muted);margin-top:5px;">Pilot pack akan digenerate otomatis sesuai layer produk</div>
    </div>
  </div>

  <!-- ========================= PRODUCT COMPARATOR ========================= -->
  <div class="page" id="page-comparator">
    <div class="section-header">
      <div>
        <div class="section-title">Product Comparator</div>
        <div class="section-sub">Bandingkan tier/offer side-by-side untuk mempermudah keputusan buyer</div>
      </div>
    </div>

    <div class="alert alert-gold" style="margin-bottom:16px;">
      <i class="fas fa-balance-scale" style="color:var(--gold);margin-top:2px;flex-shrink:0;"></i>
      <div><strong>Gunakan comparator</strong> ini untuk membantu buyer memilih antara 2-3 tier produk yang paling relevan. Cocok untuk sales conversation dan pitching.</div>
    </div>

    <!-- Compare Selector -->
    <div class="card" style="margin-bottom:16px;">
      <div style="font-size:11.5px;font-weight:800;color:var(--gold);margin-bottom:12px;">Pilih 2 Tier untuk Dibandingkan</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        ${[
          {id:'t1',name:'Tier 1 — Entry Product',tag:'Vertical Business Kit'},
          {id:'t2',name:'Tier 2 — White-Label',tag:'White-Label Vertical Builder'},
          {id:'t3',name:'Tier 3 — Control Layer',tag:'Lane Control Pack'},
          {id:'t4',name:'Tier 4 — Founder System',tag:'Founder Command Center'},
          {id:'t5',name:'Tier 5 — Enterprise',tag:'Sovereign Governance Platform'},
        ].map(t => `
        <label style="display:flex;align-items:center;gap:7px;padding:7px 12px;border-radius:6px;border:1px solid rgba(201,168,76,0.15);cursor:pointer;transition:all 0.15s;" onmouseover="this.style.borderColor='rgba(201,168,76,0.4)'" onmouseout="this.style.borderColor='rgba(201,168,76,0.15)'">
          <input type="checkbox" id="cmp-${t.id}" name="compare-tier" value="${t.id}" onchange="updateComparator()" style="accent-color:var(--gold);">
          <div><div style="font-size:11px;font-weight:700;color:var(--text-main);">${t.name}</div><div style="font-size:9.5px;color:var(--text-muted);">${t.tag}</div></div>
        </label>`).join('')}
      </div>
    </div>

    <!-- Comparison Table -->
    <div id="comparator-output" style="display:none;" class="card">
      <table class="data-table" id="comp-table">
        <thead id="comp-head"></thead>
        <tbody id="comp-body"></tbody>
      </table>
    </div>

    <div id="comparator-placeholder" class="card-gold" style="text-align:center;padding:30px;">
      <i class="fas fa-compress-arrows-alt" style="color:var(--gold);font-size:24px;margin-bottom:10px;display:block;"></i>
      <div style="font-size:13px;font-weight:700;color:var(--gold-light);">Centang minimal 2 tier</div>
      <div style="font-size:10.5px;color:var(--text-muted);margin-top:5px;">Tabel perbandingan akan muncul otomatis</div>
    </div>
  </div>

</main><!-- end main-content -->

<script>
// ========================= STATE MANAGEMENT =========================
const STATE_KEY = 'sovereign_sprint_v2';
let state = JSON.parse(localStorage.getItem(STATE_KEY) || '{}');

function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

// ========================= TASK MANAGEMENT =========================
function toggleTask(id, week, total) {
  const el = document.getElementById(id);
  if (!el) return;
  state[id] = !state[id];
  if (state[id]) {
    el.classList.add('done');
    el.innerHTML = '<i class="fas fa-check"></i>';
    el.parentElement.classList.add('done');
  } else {
    el.classList.remove('done');
    el.innerHTML = '';
    el.parentElement.classList.remove('done');
  }
  saveState();
  updateWeekProgress(week, total);
  updateDashboardProgress();
}

function toggleItem(row, id) {
  const el = document.getElementById(id);
  if (!el || el.classList.contains('risk')) return;
  state[id] = !state[id];
  if (state[id]) {
    el.classList.add('done');
    el.innerHTML = '<i class="fas fa-check"></i>';
    row.classList.add('done');
  } else {
    el.classList.remove('done');
    el.innerHTML = '';
    row.classList.remove('done');
  }
  saveState();
}

function updateWeekProgress(week, total) {
  let count = 0;
  for (let i = 1; i <= total; i++) {
    if (state[week + 't' + i]) count++;
  }
  const pct = Math.round((count / total) * 100);
  const pctEl = document.getElementById(week + '-pct-pct');
  const barEl = document.getElementById(week + '-prog-bar');
  const labelEl = document.getElementById(week + '-pct-label');
  if (pctEl) pctEl.textContent = pct + '%';
  if (barEl) barEl.style.width = pct + '%';
  if (labelEl) labelEl.textContent = count + '/' + total;
  return { count, total, pct };
}

function updateDashboardProgress() {
  const weeks = [
    updateWeekProgress('w1', 10),
    updateWeekProgress('w2', 16),
    updateWeekProgress('w3', 16),
    updateWeekProgress('w4', 16),
  ];
  const labels = ['MINGGU 1', 'MINGGU 2', 'MINGGU 3', 'MINGGU 4'];
  weeks.forEach((w, i) => {
    const progEl = document.getElementById('w'+(i+1)+'-prog-dash');
    const pctEl = document.getElementById('w'+(i+1)+'-pct-dash');
    if (progEl) progEl.style.width = w.pct + '%';
    if (pctEl) {
      pctEl.textContent = w.pct === 0 ? '0% — Pending' : w.pct === 100 ? '100% — Selesai ✓' : w.pct + '% — In Progress';
      pctEl.style.color = w.pct === 100 ? 'var(--green-bright)' : w.pct > 0 ? 'var(--gold-light)' : '';
    }
  });
  const totalDone = weeks.reduce((a, b) => a + b.count, 0);
  const totalAll = weeks.reduce((a, b) => a + b.total, 0);
  const overallPct = Math.round((totalDone / totalAll) * 100);
  const dashProg = document.getElementById('dash-progress');
  if (dashProg) {
    dashProg.innerHTML = overallPct + '<span style="font-size:14px;">%</span>';
  }
  const dashLabel = document.getElementById('dash-progress-label');
  if (dashLabel) dashLabel.textContent = totalDone + '/' + totalAll + ' tasks done';
  const globalText = document.getElementById('global-progress-text');
  if (globalText) globalText.textContent = overallPct + '% Sprint Complete';
  // Update sidebar progress
  const sidebarProg = document.getElementById('sidebar-progress');
  const sidebarPct = document.getElementById('sidebar-pct');
  if (sidebarProg) sidebarProg.style.width = overallPct + '%';
  if (sidebarPct) sidebarPct.textContent = overallPct + '%';
}

function restoreState() {
  Object.keys(state).forEach(id => {
    if (!state[id]) return;
    const el = document.getElementById(id);
    if (el && !el.classList.contains('risk')) {
      el.classList.add('done');
      el.innerHTML = '<i class="fas fa-check"></i>';
      if (el.parentElement && el.parentElement.classList.contains('checklist-item')) {
        el.parentElement.classList.add('done');
      }
    }
  });
  updateDashboardProgress();
}

// ========================= NAVIGATION =========================
const pageMap = {
  'dashboard': ['Dashboard Utama','Overview ekosistem dan sprint progress'],
  'status': ['Platform Status Live','Live monitoring semua platform Sovereign'],
  'ecosystem': ['Arsitektur Ekosistem','Hierarki 4 layer — governance ke market'],
  'repomap': ['Repo-to-Product Map','Pemetaan teknis ke komersial'],
  'week1': ['Minggu 1 — Product Decision Foundation','Kunci keputusan posisi produk'],
  'week2': ['Minggu 2 — Offer & Demo Packaging','Ubah arsitektur jadi penawaran'],
  'week3': ['Minggu 3 — Proof & Pilot Readiness','Proof dan pilot pack'],
  'week4': ['Minggu 4 — Commercial Closeout','Semua jadi material siap jual'],
  'mastercatalog': ['Master Catalog','16 produk formal dalam hierarki'],
  'offers': ['Offer Stack (6 Kategori)','6 kategori penawaran Sovereign'],
  'pricing': ['Price Architecture','5 tier harga komersial'],
  'salessheet': ['Sales One-Liner Sheet','Kalimat jual per layer dan buyer'],
  'roadmap': ['Roadmap Monetisasi','Jalur komersialisasi bertahap'],
  'buyermap': ['Buyer Segment Map','5 segmen buyer dengan pain & one-liner'],
  'governance': ['Sovereign Governance Laws','12 hukum operasional Sovereign'],
  'terminal': ['Sovereign Command Terminal','Interface command center interaktif'],
  'masterarchitect': ['Master Architect Prompt','Prompt AI Developer siap pakai'],
  'tracker90': ['90-Day Execution Tracker','Tracker harian progress 90 hari'],
  'pilotpack': ['Pilot Pack Generator','Generate pilot doc per buyer'],
  'comparator': ['Product Comparator','Bandingkan tier/offer side-by-side'],
};

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick') && n.getAttribute('onclick').includes("'"+id+"'")) {
      n.classList.add('active');
    }
  });
  const info = pageMap[id] || [id, ''];
  document.getElementById('page-title').textContent = info[0];
  document.getElementById('page-sub').textContent = info[1] || 'Sovereign Ecosystem · PT Waskita Cakrawarti Digital';
  if (window.innerWidth <= 1024) closeSidebar();
}

// ========================= SIDEBAR =========================
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('active');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

// ========================= CATALOG FILTER =========================
let currentFilter = 'all';
let currentSearch = '';

function filterCatalog() {
  currentSearch = document.getElementById('catalog-search').value.toLowerCase();
  applyFilters();
}

function setCatalogFilter(layer, btn) {
  currentFilter = layer;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active-filter'));
  btn.classList.add('active-filter');
  applyFilters();
}

function applyFilters() {
  const rows = document.querySelectorAll('#catalog-table tbody tr');
  rows.forEach(row => {
    const layer = row.getAttribute('data-layer');
    const name = row.getAttribute('data-name') || '';
    const layerMatch = currentFilter === 'all' || layer === currentFilter;
    const searchMatch = !currentSearch || name.includes(currentSearch);
    row.style.display = (layerMatch && searchMatch) ? '' : 'none';
  });
}

// ========================= EXPORT FUNCTIONS =========================
function exportCatalog() {
  const rows = document.querySelectorAll('#catalog-table tbody tr');
  let csv = 'Kode,Nama Produk,Layer,Kategori,Target Market,Model Jual,Harga Mulai\\n';
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length > 0 && row.style.display !== 'none') {
      const rowData = Array.from(cells).map(c => '"' + c.textContent.trim().replace(/"/g,'""') + '"').join(',');
      csv += rowData + '\\n';
    }
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'sovereign_master_catalog_' + new Date().toISOString().slice(0,10) + '.csv';
  link.click();
}

function exportSalesSheet() {
  const lines = [
    'SOVEREIGN ECOSYSTEM — SALES ONE-LINER SHEET',
    'PT Waskita Cakrawarti Digital · ' + new Date().toLocaleDateString('id-ID'),
    '',
    'MASTER ONE-LINER:',
    '"Kami tidak menjual AI tools. Kami membangun mesin bisnis yang bisa divalidasi, dikendalikan, diaudit, dan dinaikkan menjadi governance platform."',
    '',
    'PER LAYER:',
    'L4: "Kami bantu buyer mengambil keputusan bisnis dengan engine vertikal yang langsung terasa hasilnya."',
    'L3: "Kami beri founder ruang kendali privat untuk memantau, mengarahkan, dan mengorkestrasi mesin bisnisnya."',
    'L2: "Kami kunci prompt, biaya, dan boundary operasional AI agar tim tidak boros dan tidak liar."',
    'L1: "Kami melisensikan governance core agar AI enterprise berjalan aman, patuh, terisolasi, dan dapat diaudit."',
    '',
    'PER BUYER:',
    'UMKM: "Kami bantu Anda menghitung dan menjalankan keputusan usaha dengan lebih pasti, bukan kira-kira."',
    'Agency: "Gunakan engine kami sebagai sistem white-label agar Anda tidak membangun semuanya dari nol."',
    'Operator: "Satukan prompt, budget, dan alur kerja tim Anda dalam satu gateway operasional."',
    'Founder: "Kami bangun command center privat agar eksperimen dan eksekusi bisnis tetap dalam satu komando."',
    'Enterprise: "Kami melisensikan governance layer agar operasi AI korporat aman, patuh, dan terisolasi."',
  ].join('\\n');
  navigator.clipboard.writeText(lines).then(() => {
    alert('Sales One-Liner Sheet berhasil dicopy ke clipboard!');
  });
}

function copyPrompt() {
  const text = document.getElementById('prompt-container').innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Master Architect Prompt berhasil dicopy ke clipboard!');
  });
}

function refreshStatus() {
  const dots = document.querySelectorAll('.platform-dot.live');
  dots.forEach(d => { d.style.background = '#f39c12'; });
  setTimeout(() => {
    dots.forEach(d => { d.style.background = 'var(--green-bright)'; });
  }, 1500);
}

// ========================= TERMINAL =========================
const termCmds = {
  help: () => [
    {t:'t-success',v:'═══ SOVEREIGN COMMAND TERMINAL — Help ═══'},
    {t:'t-output',v:'Tersedia perintah berikut:'},
    {t:'t-cmd',v:'  status    → Status semua platform live'},
    {t:'t-cmd',v:'  layers    → Tampilkan 4 layer canon stack'},
    {t:'t-cmd',v:'  catalog   → Ringkasan master catalog (16 produk)'},
    {t:'t-cmd',v:'  buyers    → Daftar 5 segmen buyer'},
    {t:'t-cmd',v:'  pricing   → Ringkasan price architecture'},
    {t:'t-cmd',v:'  sprint    → Progress sprint 4 minggu'},
    {t:'t-cmd',v:'  tracker   → Progress 90-day tracker'},
    {t:'t-cmd',v:'  canon     → Kalimat canon bisnis'},
    {t:'t-cmd',v:'  roadmap   → Roadmap 90 hari'},
    {t:'t-cmd',v:'  links     → Semua URL live platform'},
    {t:'t-cmd',v:'  pilot     → Buka Pilot Pack Generator'},
    {t:'t-cmd',v:'  compare   → Buka Product Comparator'},
    {t:'t-cmd',v:'  clear     → Bersihkan terminal'},
    {t:'t-cmd',v:'  nav <page>→ Navigasi halaman (mis: nav tracker90)'},
  ],
  status: () => [
    {t:'t-success',v:'═══ PLATFORM STATUS ═══'},
    {t:'t-success',v:'[LIVE]  sovereign-os-platform.pages.dev — v2.2.0-P22 / P5 LIVE'},
    {t:'t-success',v:'[LIVE]  lane-eco-budget-control.pages.dev — v1.6.0 / HUB-24 MATURE'},
    {t:'t-warn',v:'[INT.]  sovereign-orchestrator.pages.dev — Internal Only'},
    {t:'t-success',v:'[LIVE]  barber-coffee-pwt.pages.dev — v1.0.0 / Entry Offer'},
    {t:'t-output',v:'Overall: P5 LIVE-VERIFIED / HUB-24 MATURE'},
  ],
  layers: () => [
    {t:'t-success',v:'═══ SOVEREIGN 4-LAYER CANON STACK ═══'},
    {t:'t-gold',v:'[L1] Sovereign OS Platform = GOVERNANCE CORE'},
    {t:'t-output',v:'     Multi-tenant · Audit trail · API gateway · Canon law · 22+ surfaces'},
    {t:'t-cmd',v:'[L2] Lane Eco Budget Control = CONTROL GATEWAY'},
    {t:'t-output',v:'     Prompt governance · Budget lock · Session control · Webhook D1'},
    {t:'t-warn',v:'[L3] Sovereign Ecosystem / Tower = COMMAND CENTER'},
    {t:'t-output',v:'     AI orchestration · Market intel · Revenue engine · Founder only'},
    {t:'t-success',v:'[L4] Barber + Coffee / Market Labs = VERTICAL PROOF'},
    {t:'t-output',v:'     RAB calculator · BEP simulator · Risk matrix · White-label ready'},
  ],
  catalog: () => [
    {t:'t-success',v:'═══ MASTER CATALOG RINGKASAN ═══'},
    {t:'t-gold',v:'L1 (3 produk): Governance Core · AI Gov Layer · Multi-Tenant Platform'},
    {t:'t-cmd',v:'L2 (3 produk): Lane Control Pack · Prompt Budget Pack · Context Pack'},
    {t:'t-warn',v:'L3 (3 produk): Founder Command · Private Tower · Revenue Intelligence'},
    {t:'t-success',v:'L4 (6 produk): Barber Planner · White-Label · Sector Pack · Sprint · FashionKas · ResellerKas'},
    {t:'t-output',v:'Marketplace (1): Connector/Template Marketplace'},
    {t:'t-output',v:'Total: 16 produk formal · 6 Offer Stack · 5 Buyer Tiers'},
  ],
  buyers: () => [
    {t:'t-success',v:'═══ 5 BUYER SEGMENT ═══'},
    {t:'t-success',v:'1. UMKM / Calon Owner → Barber Kit (L4) → Rp 3-7,5 jt'},
    {t:'t-cmd',v:'2. Agency / Konsultan → White-Label (L4) → Rp 10-25 jt'},
    {t:'t-warn',v:'3. Operator Multi-Brand → Lane Control (L2) → Rp 15-40 jt'},
    {t:'t-gold',v:'4. Founder / Venture Builder → Command Center (L3) → Rp 35-90 jt'},
    {t:'t-error',v:'5. Enterprise / Holding → Governance Platform (L1) → Rp 50-200 jt'},
  ],
  pricing: () => [
    {t:'t-success',v:'═══ PRICE ARCHITECTURE ═══'},
    {t:'t-success',v:'Tier 1 (Entry)      : Rp 3-7,5 jt setup · Rp 300-750rb/bln'},
    {t:'t-cmd',v:'Tier 2 (White-Label): Rp 10-25 jt setup · Rp 1-3 jt/bln'},
    {t:'t-warn',v:'Tier 3 (Control)    : Rp 15-40 jt setup · Rp 2-6 jt/bln'},
    {t:'t-gold',v:'Tier 4 (Founder)    : Rp 35-90 jt setup · Rp 5-15 jt/bln'},
    {t:'t-error',v:'Tier 5 (Enterprise) : Rp 50-200 jt deploy · Rp 5-15 jt/bln license'},
    {t:'t-output',v:'Target Fase 3 (Q1-Q2 2027): Rp 50-75 jt/bulan dari 35 klien'},
  ],
  sprint: () => {
    const weeks = ['w1','w2','w3','w4'];
    const totals = [10,16,16,16];
    return [
      {t:'t-success',v:'═══ SPRINT PROGRESS ═══'},
      ...weeks.map((w,i) => {
        let c = 0;
        for(let j=1;j<=totals[i];j++) if(state[w+'t'+j]) c++;
        const pct = Math.round(c/totals[i]*100);
        const bar = '█'.repeat(Math.floor(pct/10)) + '░'.repeat(10-Math.floor(pct/10));
        return {t: pct===100?'t-success':pct>0?'t-warn':'t-output',v:'Minggu '+(i+1)+': ['+bar+'] '+pct+'% ('+c+'/'+totals[i]+')'};
      }),
    ];
  },
  canon: () => [
    {t:'t-success',v:'═══ KALIMAT CANON BISNIS ═══'},
    {t:'t-success',v:'Barber  → menjual HASIL yang langsung dirasakan pasar'},
    {t:'t-cmd',v:'Lane    → menjual KONTROL operasional AI'},
    {t:'t-warn',v:'Tower   → menjual ORKESTRASI founder command'},
    {t:'t-gold',v:'OS      → menjual SISTEM governance enterprise'},
    {t:'t-output',v:''},
    {t:'t-gold',v:'Master: "Kami tidak menjual AI tools. Kami membangun mesin bisnis'},
    {t:'t-gold',v:'         yang bisa divalidasi, dikendalikan, diaudit, dan dinaikkan'},
    {t:'t-gold',v:'         menjadi governance platform."'},
  ],
  roadmap: () => [
    {t:'t-success',v:'═══ ROADMAP 90 HARI ═══'},
    {t:'t-success',v:'HARI 1-30  : Hardening + Decisions · Product boundary · Packaging'},
    {t:'t-cmd',v:'HARI 31-60 : Validation Scale · Proof · QA · Pilot pack'},
    {t:'t-warn',v:'HARI 61-90 : Packaging B2B · Sales assets · Pitch deck'},
    {t:'t-output',v:''},
    {t:'t-gold',v:'Fase 1 (Now-3bln): Fashion/vertical → Rp 15jt/minggu'},
    {t:'t-gold',v:'Fase 2 (3-12bln) : Scale automation → Rp 70jt/minggu'},
    {t:'t-gold',v:'Fase 3 (12-24bln): SaaS licensing → Rp 50-75jt/bulan'},
  ],
  tracker: () => {
    let total = 0, f1 = 0, f2 = 0, f3 = 0;
    for (let i = 1; i <= 30; i++) { if (tracker90['d' + i]) { f1++; total++; } }
    for (let i = 31; i <= 60; i++) { if (tracker90['d' + i]) { f2++; total++; } }
    for (let i = 61; i <= 90; i++) { if (tracker90['d' + i]) { f3++; total++; } }
    const bF = (n,t) => Array(Math.floor(n/t*10)).fill('█').join('') + Array(10-Math.floor(n/t*10)).fill('░').join('');
    return [
      {t:'t-success',v:'═══ 90-DAY TRACKER PROGRESS ═══'},
      {t:'t-success',v:'Fase 1 (H1-30) : ['+bF(f1,30)+'] '+f1+'/30 ('+Math.round(f1/30*100)+'%)'},
      {t:'t-cmd',v:'Fase 2 (H31-60): ['+bF(f2,30)+'] '+f2+'/30 ('+Math.round(f2/30*100)+'%)'},
      {t:'t-warn',v:'Fase 3 (H61-90): ['+bF(f3,30)+'] '+f3+'/30 ('+Math.round(f3/30*100)+'%)'},
      {t:'t-output',v:'Total: '+total+'/90 hari ('+Math.round(total/90*100)+'%)'},
      {t:'t-output',v:'Ketik "nav tracker90" untuk buka full tracker.'},
    ];
  },
  pilot: () => { showPage('pilotpack'); return [{t:'t-success',v:'Membuka Pilot Pack Generator...'}]; },
  compare: () => { showPage('comparator'); return [{t:'t-success',v:'Membuka Product Comparator...'}]; },
  links: () => [
    {t:'t-success',v:'═══ ALL PLATFORM LINKS ═══'},
    {t:'t-cmd',v:'[L1] https://sovereign-os-platform.pages.dev'},
    {t:'t-cmd',v:'[L2] https://lane-eco-budget-control.pages.dev'},
    {t:'t-cmd',v:'[L3] https://sovereign-orchestrator.pages.dev'},
    {t:'t-cmd',v:'[L4] https://barber-coffee-pwt.pages.dev'},
    {t:'t-output',v:''},
    {t:'t-cmd',v:'[GH] https://github.com/ganihypha/Sovereign-os-platform'},
    {t:'t-cmd',v:'[GH] https://github.com/ganihypha/pre-barber-and-coffee'},
  ],
};

let termHistory = [];
let histIdx = -1;

function handleTerminalInput(e) {
  const input = document.getElementById('terminal-input');
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (histIdx < termHistory.length - 1) histIdx++;
    input.value = termHistory[termHistory.length - 1 - histIdx] || '';
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histIdx > 0) histIdx--;
    else histIdx = -1;
    input.value = histIdx >= 0 ? termHistory[termHistory.length - 1 - histIdx] : '';
    return;
  }
  if (e.key !== 'Enter') return;
  const cmd = input.value.trim();
  if (!cmd) return;
  input.value = '';
  histIdx = -1;
  termHistory.push(cmd);
  if (termHistory.length > 50) termHistory.shift();
  runCommand(cmd);
}

function runCommand(cmd) {
  const body = document.getElementById('terminal-body');
  const parts = cmd.trim().toLowerCase().split(' ');
  const mainCmd = parts[0];
  
  const promptLine = document.createElement('div');
  promptLine.className = 'terminal-line';
  promptLine.innerHTML = '<span class="t-prompt">sovereign@wcd:~$</span> <span class="t-cmd">' + cmd + '</span>';
  body.appendChild(promptLine);

  if (mainCmd === 'clear') {
    body.innerHTML = '<div class="terminal-line"><span class="t-success">Terminal cleared. Type <span class="t-cmd">help</span> for commands.</span></div>';
    return;
  }

  if (mainCmd === 'nav' && parts[1]) {
    const pg = parts[1];
    if (pageMap[pg]) {
      showPage(pg);
      addTermLines(body, [{t:'t-success',v:'Navigating to: ' + pageMap[pg][0]}]);
    } else {
      addTermLines(body, [{t:'t-error',v:'Page not found: ' + pg + '. Try: ' + Object.keys(pageMap).slice(0,5).join(', ') + '...'}]);
    }
    return;
  }

  const fn = termCmds[mainCmd];
  if (fn) {
    addTermLines(body, typeof fn === 'function' ? fn() : fn);
  } else {
    addTermLines(body, [
      {t:'t-error',v:'Command not found: ' + mainCmd},
      {t:'t-output',v:'Type "help" to see available commands.'},
    ]);
  }
  body.scrollTop = body.scrollHeight;
}

function addTermLines(body, lines) {
  lines.forEach(l => {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = '<span class="' + l.t + '">' + l.v + '</span>';
    body.appendChild(div);
  });
  body.scrollTop = body.scrollHeight;
}

// ========================= 90-DAY TRACKER =========================
const TRACKER_KEY = 'sovereign_90day_v3';
let tracker90 = JSON.parse(localStorage.getItem(TRACKER_KEY) || '{}');

const phase1Focus = [
  'Audit semua repo, buat inventory',
  'Tetapkan positioning Lane → Control Pack',
  'Tetapkan positioning Barber → Entry Offer',
  'Tetapkan Sovereign OS → Governance Platform',
  'Keputusan webapp: merge/repurpose/archive',
  'Buat ICP dan buyer map per repo',
  'Buat sales one-liner per repo',
  'Buat readiness baseline (red/yellow/green)',
  'Susun gap register per repo',
  'Finalisasi Product Decision Board',
  'Ubah README Lane jadi product-facing',
  'Bungkus Barber sebagai use-case bisnis',
  'Packaging Sovereign OS → 3 tier value',
  'Setup deploy checklist per repo',
  'Buat env/secret checklist',
  'Demo script Barber (UMKM buyer)',
  'Demo script Lane (Operator buyer)',
  'Demo script Sovereign OS (Enterprise)',
  'Onboarding checklist Barber Kit',
  'Onboarding checklist Lane Control',
  'README komersial Lane selesai',
  'Screenshot evidence per produk',
  'Deploy Barber ke Cloudflare (stable)',
  'Deploy Lane ke Cloudflare (stable)',
  'Deploy Sovereign OS ke Cloudflare',
  'Test semua endpoint 200 OK',
  'Scope boundary per repo terdokumentasi',
  'SKU naming final semua produk',
  'Product Decision Board disetujui',
  'Sprint Minggu 1-2 milestone selesai',
];
const phase2Focus = [
  'Proof Lane: webhook live, budget log aktif',
  'Proof Barber: kalkulator BEP, risk matrix',
  'Proof Sovereign OS: 22 surfaces response',
  'QA pass/fail review Lane (functional test)',
  'QA pass/fail review Barber Coffee',
  'QA pass/fail Sovereign OS core surfaces',
  'Daftar gap ditutup sebelum pilot',
  'Hubungkan Lane → narasi buyer 3',
  'Hubungkan Sovereign OS → narasi buyer 4-5',
  'Finalkan repo-to-product map di mother repo',
  'Proof checklist per repo selesai',
  'Pilot pack buyer 3 (Lane — Operator)',
  'Pilot pack buyer 4 (Sovereign OS — Founder)',
  'Onboarding pack pilot buyer 3 selesai',
  'Onboarding pack pilot buyer 4 selesai',
  'Integration map final di Sovereign Eco',
  'Sales sheet + proof sheet buyer 3',
  'Sales sheet + proof sheet buyer 4',
  'Internal handoff pack penjualan',
  'Pilot invite deck buyer 3',
  'Pilot invite deck buyer 4',
  'Identifikasi 3 prospect nyata (buyer 3)',
  'Identifikasi 2 prospect nyata (buyer 4)',
  'KV rate limiting diimplementasikan',
  'Tenant namespace routing dirapikan',
  'Observability/logging diaktifkan',
  'Truth lock & governance penguatan',
  'Mother repo jadi integration hub',
  'Canon map final dibekukan',
  'Sprint Minggu 3 milestone selesai',
];
const phase3Focus = [
  'Sales one-liner sheet semua produk (final)',
  'Product card / one-pager per repo utama',
  'Price architecture + ROI calculator',
  'Objection handler sheet',
  'Ecosystem narrative untuk internal/investor',
  'Repo-to-product map versi master document',
  'Hubungan antar repo dijelaskan jelas',
  'Lane pilot-ready: buyer 3 bisa jalan',
  'Sovereign OS pilot-ready: founder buyer',
  'Tutup semua blocker merah',
  'Final sales assets list siap',
  '30-day closeout memo ditulis',
  'Backlog 31-60 hari disusun',
  'Next 30/60/90 day recommendations',
  'Sovereign narrative investor/partner ready',
  'Pitch deck versi investor draft 1',
  'Pitch deck versi klien draft 1',
  'White-label mode dipersiapkan',
  'Template/connector marketplace konsep',
  'Upgrade path enterprise didokumentasikan',
  'FashionKas/ResellerKas roadmap diputuskan',
  'Official pilot dimulai (buyer 3)',
  'Official pilot dimulai (buyer 4)',
  'First revenue dari entry product',
  'Case study dari pilot dibuat',
  'Testimonial/proof dari buyer pertama',
  'Packaging B2B selesai secara formal',
  'Sprint Minggu 4 milestone selesai',
  'Sovereign Ecosystem v1.0 commercial launch',
  '90-day closeout memo final selesai',
];

function buildTrackerGrid(phase, focus, containerId, key) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';
  for (let i = 0; i < 30; i++) {
    const dayNum = (phase - 1) * 30 + i + 1;
    const done = tracker90['d' + dayNum];
    const tooltip = focus[i] || 'Hari ' + dayNum;
    const btn = document.createElement('div');
    btn.setAttribute('data-tip', 'H' + dayNum + ': ' + tooltip);
    btn.style.cssText = 'aspect-ratio:1;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:800;cursor:pointer;transition:all 0.15s;border:1px solid;';
    if (done) {
      btn.style.background = 'rgba(39,174,96,0.25)';
      btn.style.borderColor = 'rgba(39,174,96,0.5)';
      btn.style.color = 'var(--green-bright)';
    } else {
      btn.style.background = 'rgba(255,255,255,0.03)';
      btn.style.borderColor = 'rgba(255,255,255,0.08)';
      btn.style.color = 'var(--text-muted)';
    }
    btn.textContent = dayNum;
    btn.onclick = () => toggleDay(dayNum, btn, phase);
    grid.appendChild(btn);
  }
  updateTrackerStats();
}

function toggleDay(dayNum, btn, phase) {
  tracker90['d' + dayNum] = !tracker90['d' + dayNum];
  localStorage.setItem(TRACKER_KEY, JSON.stringify(tracker90));
  if (tracker90['d' + dayNum]) {
    btn.style.background = 'rgba(39,174,96,0.25)';
    btn.style.borderColor = 'rgba(39,174,96,0.5)';
    btn.style.color = 'var(--green-bright)';
  } else {
    btn.style.background = 'rgba(255,255,255,0.03)';
    btn.style.borderColor = 'rgba(255,255,255,0.08)';
    btn.style.color = 'var(--text-muted)';
  }
  updateTrackerStats();
}

function updateTrackerStats() {
  let total = 0, f1 = 0, f2 = 0, f3 = 0;
  for (let i = 1; i <= 30; i++) { if (tracker90['d' + i]) { f1++; total++; } }
  for (let i = 31; i <= 60; i++) { if (tracker90['d' + i]) { f2++; total++; } }
  for (let i = 61; i <= 90; i++) { if (tracker90['d' + i]) { f3++; total++; } }

  const el = (id) => document.getElementById(id);
  if (el('t90-pct')) el('t90-pct').textContent = Math.round(total/90*100) + '%';
  if (el('t90-done')) el('t90-done').textContent = total + '/90 hari';
  if (el('t90-f1')) el('t90-f1').textContent = Math.round(f1/30*100) + '%';
  if (el('t90-f2')) el('t90-f2').textContent = Math.round(f2/30*100) + '%';
  if (el('t90-f3')) el('t90-f3').textContent = Math.round(f3/30*100) + '%';
  if (el('f1-done')) el('f1-done').textContent = f1;
  if (el('f2-done')) el('f2-done').textContent = f2;
  if (el('f3-done')) el('f3-done').textContent = f3;
  if (el('f1-bar')) el('f1-bar').style.width = Math.round(f1/30*100) + '%';
  if (el('f2-bar')) el('f2-bar').style.width = Math.round(f2/30*100) + '%';
  if (el('f3-bar')) el('f3-bar').style.width = Math.round(f3/30*100) + '%';
}

function resetTracker() {
  if (!confirm('Reset semua progress 90 hari? Tindakan ini tidak bisa dibatalkan.')) return;
  tracker90 = {};
  localStorage.setItem(TRACKER_KEY, JSON.stringify(tracker90));
  buildTrackerGrid(1, phase1Focus, 'phase1-grid', 'p1');
  buildTrackerGrid(2, phase2Focus, 'phase2-grid', 'p2');
  buildTrackerGrid(3, phase3Focus, 'phase3-grid', 'p3');
  updateTrackerStats();
}

function exportTracker() {
  let csv = 'Hari,Fase,Fokus,Status\\n';
  for (let i = 1; i <= 90; i++) {
    const fase = i <= 30 ? 'Fase 1 - Hardening' : i <= 60 ? 'Fase 2 - Validation' : 'Fase 3 - Packaging';
    const focusArr = i <= 30 ? phase1Focus : i <= 60 ? phase2Focus : phase3Focus;
    const focusIdx = (i - 1) % 30;
    const status = tracker90['d' + i] ? 'SELESAI' : 'Pending';
    csv += i + ',' + fase + ',"' + (focusArr[focusIdx] || 'Hari ' + i) + '",' + status + '\\n';
  }
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'sovereign_90day_tracker_' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
}

// ========================= PILOT PACK GENERATOR =========================
let selectedBuyer = null;

const pilotPacks = {
  b1: {
    title: 'Pilot Pack — Buyer 1: UMKM / Calon Owner',
    sub: 'Entry offer vertical — Barber + Coffee Business Planner',
    color: 'var(--green-bright)',
    sections: [
      {
        title: '1. Positioning & Value Proposition',
        content: 'Produk: Barber + Coffee Business Planner (Layer 4)\\n\\nNilai utama untuk UMKM / Calon Owner:\\n• Hitung modal buka usaha dengan tepat, bukan kira-kira\\n• Simulasi BEP (Break Even Point) interaktif\\n• Analisis risiko lokasi dan pasar\\n• Timeline pembukaan usaha yang realistis\\n• Checklist operasional siap pakai\\n\\nSales one-liner: "Kami bantu Anda menghitung dan menjalankan keputusan usaha dengan lebih pasti, bukan kira-kira."'
      },
      {
        title: '2. Demo Flow (5 menit)',
        content: 'Menit 1: Tampilkan dashboard utama — tunjukkan input modal\\nMenit 2: Isi simulasi RAB dan OPEX bulanan\\nMenit 3: Lihat hasil BEP dan pricing recommendation\\nMenit 4: Tampilkan risk matrix dan analisis lokasi\\nMenit 5: Tunjukkan timeline dan checklist operasional'
      },
      {
        title: '3. Paket Harga',
        content: 'Setup awal: Rp 3.000.000 – Rp 7.500.000\\nCustom sektor lain: + Rp 1.500.000 – Rp 4.000.000\\nWhite-label sederhana: + Rp 2.000.000 – Rp 5.000.000\\nMaintenance bulanan (opsional): Rp 300.000 – Rp 750.000/bulan'
      },
      {
        title: '4. Deliverables Pilot',
        content: '• Akses dashboard Barber + Coffee PWT (live)\\n• 1x sesi demo + walkthrough (30-45 menit)\\n• Panduan penggunaan (PDF/WhatsApp)\\n• Support WhatsApp selama 7 hari pilot\\n• 1x iterasi minor berdasarkan feedback'
      },
      {
        title: '5. Acceptance Criteria',
        content: '• Buyer bisa hitung modal dan BEP sendiri tanpa bingung\\n• Output dashboard bisa dipakai untuk keputusan nyata\\n• Buyer paham cara customize ke sektor mereka\\n• Tidak ada bug kritis selama demo'
      },
      {
        title: '6. Next Step setelah Pilot',
        content: 'Setelah pilot berhasil, buyer bisa naik ke:\\n→ White-Label Vertical Builder (Layer 4 upgrade) — Rp 10-25 jt\\n→ Lane Control Pack (Layer 2) jika sudah ada aktivitas AI\\n→ Custom Verticalization Sprint untuk sektor lain'
      }
    ]
  },
  b2: {
    title: 'Pilot Pack — Buyer 2: Agency / Konsultan',
    sub: 'White-label vertical system — Sector Playbook Pack',
    color: 'var(--blue-bright)',
    sections: [
      {
        title: '1. Positioning & Value Proposition',
        content: 'Produk: White-Label Vertical Builder / Sector Playbook Pack (Layer 4)\\n\\nNilai utama untuk Agency / Konsultan:\\n• Template mesin bisnis yang bisa di-white-label untuk klien\\n• Deploy ke banyak klien tanpa bangun dari nol\\n• Branding custom per klien — terlihat eksklusif\\n• Support teknis dari tim Sovereign\\n\\nSales one-liner: "Gunakan engine kami sebagai sistem white-label agar Anda tidak membangun semuanya dari nol."'
      },
      {
        title: '2. Demo Flow (5 menit)',
        content: 'Menit 1: Tampilkan template vertical Barber sebagai base\\nMenit 2: Tunjukkan cara customisasi branding dan konten\\nMenit 3: Demo deploy ke subdomain custom\\nMenit 4: Tampilkan panel admin untuk manage konten\\nMenit 5: Tunjukkan potensi replikasi ke 5-10 klien'
      },
      {
        title: '3. Paket Harga',
        content: 'Setup white-label dasar: Rp 10.000.000 – Rp 25.000.000\\nCustom flow/data per klien: + Rp 3.000.000 – Rp 10.000.000\\nLicense fee: Rp 1.000.000 – Rp 3.000.000/bulan\\nMulti-cabang: + Rp 500.000/cabang/bulan\\nSupport retainer: negosiasi'
      },
      {
        title: '4. Deliverables Pilot',
        content: '• Akses white-label template framework\\n• 1 domain/subdomain custom dikonfigurasi\\n• Dokumentasi customisasi (panduan lengkap)\\n• 2x sesi onboarding (setup + training)\\n• Support 14 hari pilot period'
      },
      {
        title: '5. Acceptance Criteria',
        content: '• Agency bisa deploy ke 1 klien percobaan dalam 3 hari\\n• Branding custom berhasil diterapkan tanpa kendala teknis\\n• Agency bisa mengoperasikan panel admin secara mandiri\\n• ROI potential terlihat jelas dari demo klien'
      },
      {
        title: '6. Next Step setelah Pilot',
        content: 'Setelah pilot berhasil, agency bisa naik ke:\\n→ Sector Playbook Pack untuk 5+ sektor berbeda\\n→ Lane Control Pack jika klien butuh AI ops control\\n→ Founder Command Center jika agency berkembang ke holding'
      }
    ]
  },
  b3: {
    title: 'Pilot Pack — Buyer 3: Operator Multi-Brand',
    sub: 'Operational control layer — Lane Eco Budget Control',
    color: 'var(--orange-bright)',
    sections: [
      {
        title: '1. Positioning & Value Proposition',
        content: 'Produk: Lane Control Pack (Layer 2)\\n\\nNilai utama untuk Operator Multi-Brand:\\n• Prompt AI terkunci — tidak bisa over-budget atau out-of-scope\\n• Semua sesi AI terdokumentasi dan bisa diaudit\\n• Budget per tim / per brand dipisah secara ketat\\n• Webhook integration ke workflow existing\\n\\nSales one-liner: "Satukan prompt, budget, dan alur kerja tim Anda dalam satu gateway operasional."'
      },
      {
        title: '2. Demo Flow (7 menit)',
        content: 'Menit 1-2: Tampilkan dashboard Lane — budget meter, lane status\\nMenit 3: Demo budget lock — AI berhenti ketika budget habis\\nMenit 4: Tampilkan session log — semua aktivitas tercatat\\nMenit 5: Tunjukkan webhook trigger ke sistem external\\nMenit 6-7: Tampilkan laporan penggunaan per brand/tim'
      },
      {
        title: '3. Paket Harga',
        content: 'Initial implementation: Rp 15.000.000 – Rp 40.000.000\\nPlatform fee bulanan: Rp 2.000.000 – Rp 6.000.000/bulan\\nIntegration/webhook setup: + Rp 2.000.000 – Rp 8.000.000\\nGovernance tuning retainer: Rp 1.500.000 – Rp 5.000.000/bulan'
      },
      {
        title: '4. Deliverables Pilot',
        content: '• Akses Lane Eco Budget Control platform (live)\\n• Konfigurasi untuk 1 brand / 1 tim dalam pilot\\n• Budget rules dikonfigurasi sesuai kebutuhan\\n• 1 webhook integration (jika diperlukan)\\n• 2x sesi training tim operasional\\n• Support 30 hari pilot + laporan usage'
      },
      {
        title: '5. Acceptance Criteria',
        content: '• AI prompt tidak bisa melebihi budget yang ditetapkan\\n• Tim bisa monitor penggunaan secara real-time\\n• Log eksekusi dapat diakses dan dipahami oleh ops lead\\n• Integrasi webhook berjalan tanpa error selama 7 hari'
      },
      {
        title: '6. Next Step setelah Pilot',
        content: 'Setelah pilot berhasil, operator bisa naik ke:\\n→ Full deployment multi-brand/multi-tim\\n→ Master Architect Context Pack untuk advanced governance\\n→ Founder Command Center (Layer 3) untuk visibility lebih tinggi\\n→ Sovereign OS Platform (Layer 1) untuk enterprise governance'
      }
    ]
  },
  b4: {
    title: 'Pilot Pack — Buyer 4: Founder / Venture Builder',
    sub: 'Private command center — Founder Command Center (Layer 3)',
    color: '#c39bd3',
    sections: [
      {
        title: '1. Positioning & Value Proposition',
        content: 'Produk: Founder Command Center / Private Sovereign Tower (Layer 3)\\n\\nNilai utama untuk Founder / Venture Builder:\\n• Ruang kendali privat — orkestrasi semua agen bisnis\\n• Market intelligence dan revenue insight real-time\\n• Human confirmation gate untuk semua keputusan krusial\\n• Counterpart protocol untuk validasi bisnis terstruktur\\n\\nSales one-liner: "Kami bangun command center privat agar eksperimen dan eksekusi bisnis tetap dalam satu komando."'
      },
      {
        title: '2. Demo Flow (10 menit)',
        content: 'Menit 1-2: Tampilkan founder dashboard — overview semua aktivitas\\nMenit 3-4: Demo orchestration view — lihat semua agen/workflow\\nMenit 5: Tampilkan market intelligence snapshot\\nMenit 6-7: Demo counterpart protocol — structured decision flow\\nMenit 8: Human confirmation gate untuk aksi krusial\\nMenit 9-10: Anomaly detection + revenue tracking view'
      },
      {
        title: '3. Paket Harga',
        content: 'Setup private command center: Rp 35.000.000 – Rp 90.000.000\\nManaged orchestration bulanan: Rp 5.000.000 – Rp 15.000.000/bulan\\nStrategic advisory: + Rp 5.000.000 – Rp 20.000.000/bulan\\nPrivate deployment premium: mulai Rp 15.000.000'
      },
      {
        title: '4. Deliverables Pilot',
        content: '• Private deployment Sovereign Tower untuk 1 founder\\n• Konfigurasi 3-5 workflow inti bisnis founder\\n• Dashboard dengan minimal 4 data view\\n• Counterpart protocol untuk 2 decision category\\n• 3x sesi deep-work bersama (architecture + config)\\n• Support 30 hari pilot + weekly review'
      },
      {
        title: '5. Acceptance Criteria',
        content: '• Founder bisa melihat status seluruh operasi bisnis dalam 1 layar\\n• Minimal 1 keputusan krusial ter-validasi lewat system\\n• Tidak ada data bocor antar workspace\\n• Founder merasa "lebih terkendali" setelah 2 minggu pemakaian'
      },
      {
        title: '6. Next Step setelah Pilot',
        content: 'Setelah pilot berhasil, founder bisa naik ke:\\n→ Full enterprise deployment untuk semua portfolio\\n→ Revenue Intelligence Chamber untuk analytics lanjutan\\n→ Sovereign OS Platform (Layer 1) untuk enterprise governance\\n→ White-label Sovereign Tower ke venture lain'
      }
    ]
  },
  b5: {
    title: 'Pilot Pack — Buyer 5: Enterprise / Holding',
    sub: 'Enterprise governance platform — Sovereign OS Platform (Layer 1)',
    color: '#f08080',
    sections: [
      {
        title: '1. Positioning & Value Proposition',
        content: 'Produk: Sovereign Governance Core / Multi-Tenant Control Platform (Layer 1)\\n\\nNilai utama untuk Enterprise / Holding:\\n• Governance atas AI — bukan hanya implementasi AI\\n• Tenant isolation ketat — data tidak bisa tercampur\\n• Audit trail lengkap untuk kepatuhan compliance\\n• Role-based access control yang tidak bisa di-override\\n• Multi-tenant untuk seluruh portfolio bisnis\\n\\nSales one-liner: "Kami melisensikan governance layer agar operasi AI korporat aman, patuh, dan terisolasi."'
      },
      {
        title: '2. Demo Flow (15-20 menit)',
        content: 'Menit 1-3: Tampilkan Sovereign OS Platform overview\\nMenit 4-6: Demo tenant isolation — 2 tenant tidak bisa akses data satu sama lain\\nMenit 7-9: Demo approval gate — aksi krusial harus disetujui\\nMenit 10-12: Audit trail — semua aksi tercatat dan bisa di-query\\nMenit 13-15: Role model — developer ≠ ops ≠ enterprise owner\\nMenit 16-20: API governance — rate limiting, policy enforcement'
      },
      {
        title: '3. Paket Harga',
        content: 'Discovery & architecture engagement: Rp 25.000.000 – Rp 75.000.000\\nDeployment & implementation: Rp 50.000.000 – Rp 200.000.000\\nRecurring platform license: Rp 5.000.000 – Rp 15.000.000/bulan\\nSLA / support premium: Rp 3.000.000 – Rp 20.000.000/bulan\\nSecurity/governance consulting: sesuai kebutuhan'
      },
      {
        title: '4. Deliverables Pilot',
        content: '• POC deployment Sovereign OS di environment enterprise\\n• Konfigurasi 2-3 tenant awal\\n• 5 governance rules dikonfigurasi dan ditest\\n• Audit trail demo dengan 30-day data retention\\n• Architecture document + governance blueprint\\n• 4x sesi engagement (discovery, design, deploy, review)'
      },
      {
        title: '5. Acceptance Criteria',
        content: '• Tenant isolation 100% — cross-tenant data access = 0\\n• Approval gate berfungsi untuk semua aksi kritis\\n• Audit trail dapat diquery dan diexport untuk compliance\\n• Platform tahan beban dengan SLA 99.5% uptime\\n• Legal/compliance team approve governance model'
      },
      {
        title: '6. Next Step setelah Pilot',
        content: 'Setelah pilot berhasil:\\n→ Full enterprise license negotiation\\n→ Rollout ke seluruh portfolio bisnis holding\\n→ Custom connector/integration ke sistem existing\\n→ Dedicated SLA + security audit\\n→ Potential for strategic partnership / equity conversation'
      }
    ]
  }
};

function selectBuyer(id) {
  selectedBuyer = id;
  // Update card styles
  document.querySelectorAll('#buyer-selector > div').forEach(c => {
    c.style.borderColor = 'rgba(255,255,255,0.08)';
    c.style.background = 'transparent';
  });
  const selected = document.getElementById('bcard-' + id);
  if (selected) {
    selected.style.borderColor = 'rgba(201,168,76,0.5)';
    selected.style.background = 'rgba(201,168,76,0.06)';
  }
  // Generate pack
  const pack = pilotPacks[id];
  if (!pack) return;
  document.getElementById('pilot-placeholder').style.display = 'none';
  document.getElementById('pilot-output').style.display = 'block';
  document.getElementById('pilot-title').textContent = pack.title;
  document.getElementById('pilot-sub').textContent = pack.sub;
  const content = document.getElementById('pilot-content');
  content.innerHTML = pack.sections.map(s =>
    '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(201,168,76,0.12);border-radius:8px;padding:14px;">' +
    '<div style="font-size:11px;font-weight:800;color:' + pack.color + ';margin-bottom:8px;">' + s.title + '</div>' +
    '<div style="font-size:11px;color:var(--text-muted);white-space:pre-line;line-height:1.75;">' + s.content + '</div>' +
    '</div>'
  ).join('');
}

function copyPilotPack() {
  if (!selectedBuyer) return;
  const pack = pilotPacks[selectedBuyer];
  const text = pack.title + '\\n' + pack.sub + '\\n\\n' +
    pack.sections.map(s => s.title + '\\n' + s.content).join('\\n\\n===\\n\\n');
  navigator.clipboard.writeText(text).then(() => {
    alert('Pilot Pack berhasil dicopy ke clipboard!');
  });
}

// ========================= PRODUCT COMPARATOR =========================
const tierData = {
  t1: {name:'Tier 1 — Entry Product',tag:'Vertical Business Kit',target:'UMKM, Calon Owner',setup:'Rp 3-7,5 jt',monthly:'Rp 300-750rb/bln',repo:'pre-barber-and-coffee',layer:'L4',sales:'Jual HASIL langsung',time:'1-2 minggu',onboard:'Mandiri / async',sla:'Tidak termasuk',whitelabel:'+ Rp 2-5 jt',ai:'AI assist only (L2)',moat:'Rendah',upsell:'→ Tier 2 atau Lane'},
  t2: {name:'Tier 2 — White-Label',tag:'White-Label Vertical Builder',target:'Agency, Konsultan, Inkubator',setup:'Rp 10-25 jt',monthly:'Rp 1-3 jt/bln license',repo:'Barber + framework',layer:'L4',sales:'Jual REPLIKASI',time:'2-3 minggu',onboard:'2 sesi onboarding',sla:'Tidak termasuk',whitelabel:'Included',ai:'AI assist only (L2)',moat:'Sedang',upsell:'→ Tier 3 Lane'},
  t3: {name:'Tier 3 — Control Layer',tag:'Lane Control Pack',target:'Operator Multi-Brand, AI-heavy team',setup:'Rp 15-40 jt',monthly:'Rp 2-6 jt/bln',repo:'Lane-eco-budget-control',layer:'L2',sales:'Jual KONTROL',time:'3-4 minggu',onboard:'3 sesi + training tim',sla:'Opsional +fee',whitelabel:'Tidak termasuk',ai:'AI governed (L2)',moat:'Tinggi',upsell:'→ Tier 4 Command Center'},
  t4: {name:'Tier 4 — Founder System',tag:'Founder Command Center',target:'Founder, CEO, Venture Builder',setup:'Rp 35-90 jt',monthly:'Rp 5-15 jt/bln',repo:'Sovereign-ecosystem',layer:'L3',sales:'Jual ORKESTRASI',time:'4-6 minggu',onboard:'Deep-work 3 sesi',sla:'Included 30 hari',whitelabel:'Private deploy',ai:'AI orchestrated (L2+L3)',moat:'Sangat tinggi',upsell:'→ Tier 5 Enterprise'},
  t5: {name:'Tier 5 — Enterprise',tag:'Sovereign Governance Platform',target:'Enterprise, Holding, Regulated',setup:'Rp 50-200 jt',monthly:'Rp 5-15 jt/bln license',repo:'Sovereign-os-platform',layer:'L1',sales:'Jual SISTEM',time:'6-12 minggu',onboard:'4 sesi engagement',sla:'SLA premium included',whitelabel:'Multi-tenant isolated',ai:'Governed AI (L1+L2)',moat:'Enterprise moat',upsell:'Marketplace + Ecosystem'}
};

const compRows = [
  {key:'target',label:'Target Buyer'},
  {key:'layer',label:'Layer Produk'},
  {key:'sales',label:'Value Utama'},
  {key:'repo',label:'Repo Utama'},
  {key:'setup',label:'Harga Setup'},
  {key:'monthly',label:'Biaya Bulanan'},
  {key:'time',label:'Waktu Deploy'},
  {key:'onboard',label:'Onboarding'},
  {key:'sla',label:'SLA'},
  {key:'whitelabel',label:'White-label'},
  {key:'ai',label:'AI Model'},
  {key:'moat',label:'Kompetitive Moat'},
  {key:'upsell',label:'Upgrade Path'},
];

function updateComparator() {
  const checked = Array.from(document.querySelectorAll('input[name="compare-tier"]:checked')).map(c => c.value);
  if (checked.length < 2) {
    document.getElementById('comparator-output').style.display = 'none';
    document.getElementById('comparator-placeholder').style.display = 'block';
    return;
  }
  document.getElementById('comparator-placeholder').style.display = 'none';
  document.getElementById('comparator-output').style.display = 'block';

  const colors = ['tag-green','tag-blue','tag-orange','tag-purple','tag-red'];
  const tierColors = {t1:'tag-green',t2:'tag-blue',t3:'tag-orange',t4:'tag-purple',t5:'tag-red'};

  // Build head
  const head = document.getElementById('comp-head');
  head.innerHTML = '<tr><th>Aspek</th>' + checked.map(t => {
    const d = tierData[t];
    return '<th><div style="font-size:11px;font-weight:800;color:var(--text-main);">' + d.name + '</div><div style="font-size:9.5px;color:var(--text-muted);">' + d.tag + '</div></th>';
  }).join('') + '</tr>';

  // Build body
  const body = document.getElementById('comp-body');
  body.innerHTML = compRows.map(row => {
    const cells = checked.map(t => {
      const val = tierData[t][row.key] || '-';
      const isHighlight = row.key === 'setup' || row.key === 'monthly' || row.key === 'moat' || row.key === 'sales';
      return '<td style="font-size:11.5px;' + (isHighlight ? 'color:var(--gold-light);font-weight:700;' : 'color:var(--text-muted);') + '">' + val + '</td>';
    }).join('');
    return '<tr><td style="font-size:10.5px;font-weight:700;color:var(--text-main);">' + row.label + '</td>' + cells + '</tr>';
  }).join('');
}

// ========================= INIT =========================
document.addEventListener('DOMContentLoaded', () => {
  restoreState();
  // Build 90-day tracker grids
  buildTrackerGrid(1, phase1Focus, 'phase1-grid', 'p1');
  buildTrackerGrid(2, phase2Focus, 'phase2-grid', 'p2');
  buildTrackerGrid(3, phase3Focus, 'phase3-grid', 'p3');
  // Focus terminal input when on terminal page
  const termInput = document.getElementById('terminal-input');
  if (termInput) termInput.addEventListener('focus', () => {});
});
</script>

</body>
</html>`)
})

export default app
