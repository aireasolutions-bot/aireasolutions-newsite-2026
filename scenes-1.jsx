/* global React */
const { useEffect, useRef, useState } = React;

// ============================================================
// HERO
// ============================================================
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-meta">
        <div className="col-3">
          [01] — Index<br/>
          Editorial Issue · 2026
        </div>
        <div className="col-3">
          Established Miami<br/>
          <span style={{color:"var(--ink)"}}>MMXXIV</span>
        </div>
        <div className="col-3">
          A Growth & Creative<br/>Atelier — Hospitality<br/>+ Retail
        </div>
        <div className="col-4" style={{textAlign:"right"}}>
          (Scroll) — to begin<br/>
          <span style={{color:"var(--ink)"}}>↓</span>
        </div>
      </div>

      <h1 className="hero-title">
        <span className="line"><span className="word">The&nbsp;growth</span>&nbsp;<span className="word">department</span></span>
        <span className="line"><span className="word ital">built for taste.</span></span>
      </h1>

      <div className="hero-foot">
        <p className="hero-desc">
          AIREA is a creative &amp; performance studio engineered for the world's
          most considered <strong>hospitality</strong> and <strong>retail</strong> brands —
          where strategy, AI, and editorial direction compound into measurable growth.
        </p>
        <div className="hero-cta">
          <Magnetic><a className="btn btn--solid" href="#contact">Book audit <span className="arrow">↗</span></a></Magnetic>
          <Magnetic><a className="btn" href="#nova">Meet NOVA <span className="arrow">↗</span></a></Magnetic>
        </div>
        <div className="hero-num">
          [N° 001 / 008]<br/>
          <span style={{color:"var(--ink)"}}>The Opening</span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MARQUEE — TRUSTED BY
// ============================================================
function Marquee() {
  const items = [
    "The DL — NYC", "Loulou", "Mission Ceviche", "Le Petit Village",
    "ONE40 Rooftop", "Le Jardin Bistro NYC", "The Delancey",
    "Bistro 29", "POGBA MDX", "Hotel Chantelle", "Sub-mission", "Adelaide Salon"
  ];
  return (
    <div className="marquee">
      {[0,1].map(k => (
        <div className="marquee-track" key={k}>
          {items.map((it, i) => <span key={i}>{it}</span>)}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// PILLARS
// ============================================================
const PILLARS = [
  { num: "01", name: "Amplify", href: "pillars/amplify.html", stat: "+350%", statLabel: "ROI", desc: "Supercharge marketing across every major ad platform — Meta, Google, TikTok, Programmatic — engineered like product.", trusted: "The DL · Loulou · Mission Ceviche" },
  { num: "02", name: "Intelligence", href: "pillars/intelligence.html", stat: "10×", statLabel: "Faster", desc: "Operational AI for revenue ops. Workflows, agents, attribution, and decision systems engineered for your stack.", trusted: "Le Petit Village · ONE40 · Le Jardin" },
  { num: "03", name: "Reach", href: "pillars/reach.html", stat: "+200%", statLabel: "Growth", desc: "Organic, social, and influence. Build loyal followings on the platforms that matter most to your audience.", trusted: "The Delancey · Bistro 29 · POGBA MDX" },
  { num: "04", name: "Engage", href: "pillars/engage.html", stat: "89%", statLabel: "Open Rate", desc: "Lifecycle, CRM, retention. Turn casual browsers into lifelong customers via email, SMS, and segmentation.", trusted: "Hotel Chantelle · Sub-mission · Adelaide" },
  { num: "05", name: "Analyze", href: "pillars/analyze.html", stat: "Real-time", statLabel: "Data", desc: "Attribution and decision-grade dashboards. See what's working before competitors notice the trend.", trusted: "Cross-portfolio operating system" },
  { num: "06", name: "Build", href: "pillars/build.html", stat: "+38%", statLabel: "CVR Lift", desc: "Web, product, conversion. Editorial Shopify and bespoke platforms engineered to convert at premium scale.", trusted: "Zenttu Skin · POGBA · Studio Maison" },
];

function Pillars() {
  return (
    <section className="section" id="pillars">
      <div className="section-head">
        <div className="label">
          <span className="num">[02] — Pillars</span>
          <span className="eyebrow">Five Disciplines · One Engine</span>
        </div>
        <h2>
          Industry-leading<br/>
          results, <span className="ital">powered by</span><br/>
          a new kind of agency.
        </h2>
      </div>
      <div className="pillars">
        {PILLARS.map((p, i) => (
          <a className="pillar" key={i} href={p.href}>
            <div className="num">{p.num}</div>
            <div>
              <div className="name">{p.name}</div>
              <span className="pillar-trusted">{p.trusted}</span>
            </div>
            <div className="desc">{p.desc}</div>
            <div className="stat">
              <span className="big">{p.stat}</span>
              <span className="stat-label">{p.statLabel}</span>
            </div>
            <div className="arrow">→</div>
          </a>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Marquee, Pillars });
