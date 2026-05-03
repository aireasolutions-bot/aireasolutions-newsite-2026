/* global React */
const { useEffect, useRef, useState } = React;

// ============================================================
// PACKAGES
// ============================================================
const PACKAGES = [
  {
    tag: "Starter",
    name: "Atelier",
    desc: "For founders building category presence — entry into our world.",
    price: "$8K",
    cycle: "/ month",
    features: [
      "1 pillar engagement (Amplify or Reach)",
      "30 NOVA assets / month",
      "Bi-weekly strategy review",
      "Standard attribution stack",
      "Email support · 48h SLA",
    ],
  },
  {
    tag: "Most Popular",
    name: "Maison",
    desc: "The full creative + performance engine. The growth department, on tap.",
    price: "$22K",
    cycle: "/ month",
    featured: true,
    features: [
      "3 pillars + NOVA included",
      "100–150 NOVA assets / month",
      "Weekly strategy + creative review",
      "Custom attribution + dashboards",
      "Voice cloning · 1 founder identity",
      "Slack channel · 4h SLA",
    ],
  },
  {
    tag: "Bespoke",
    name: "Atelier Privée",
    desc: "Embedded growth team. Senior operators inside your business.",
    price: "From $48K",
    cycle: "/ month",
    features: [
      "All pillars + NOVA + Build",
      "Unlimited assets · custom pipelines",
      "Embedded fractional CMO",
      "On-site quarterly intensives",
      "Multi-brand portfolio operating",
      "Direct partner line",
    ],
  },
];

function Packages() {
  return (
    <section className="section" id="packages">
      <div className="section-head">
        <div className="label">
          <span className="num">[06] — Engagements</span>
          <span className="eyebrow">Three Tiers · Compounding</span>
        </div>
        <h2>
          Built like a <span className="ital">retainer.</span><br/>
          Operates like a <span className="ital">department.</span>
        </h2>
      </div>
      <div className="packages">
        {PACKAGES.map((p, i) => (
          <div className={`pkg ${p.featured ? "featured" : ""}`} key={i}>
            <span className="pkg-tag">{p.tag}</span>
            <h3>{p.name}</h3>
            <p className="pkg-desc">{p.desc}</p>
            <div className="pkg-price">{p.price}<span className="ital">{p.cycle}</span></div>
            <span className="pkg-price-meta">3 mo. minimum · cancel anytime after</span>
            <ul className="pkg-feature">
              {p.features.map((f, j) => <li key={j}>{f}</li>)}
            </ul>
            <Magnetic><a className="btn" href="#contact">Begin engagement <span className="arrow">↗</span></a></Magnetic>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDIES
// ============================================================
const CASES = [
  { num: "01", brand: "The DL — NYC", category: "Hospitality · Hotel", stat: "+412%", statLabel: "Direct bookings, 9mo", tag: "Lifestyle hero · The DL Lobby" },
  { num: "02", brand: "Loulou", category: "Restaurant · French", stat: "+220%", statLabel: "Reservation revenue", tag: "Editorial — Loulou Garden" },
  { num: "03", brand: "Mission Ceviche", category: "F&B · QSR Premium", stat: "8.4×", statLabel: "ROAS, paid social", tag: "Product macro · Ceviche Bowl" },
  { num: "04", brand: "Hotel Chantelle", category: "Hospitality · Boutique", stat: "94%", statLabel: "Email open rate", tag: "Rooftop campaign · Chantelle" },
  { num: "05", brand: "POGBA MDX", category: "Retail · DTC Apparel", stat: "+560%", statLabel: "Net new revenue", tag: "Look-book hero · POGBA SS26" },
  { num: "06", brand: "Adelaide Salon", category: "Beauty · Service", stat: "+180%", statLabel: "Booked appointments", tag: "Founder portrait · Adelaide" },
];

function Cases() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".case");
    if (!els) return;
    const onScroll = () => {
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const center = window.innerHeight / 2 - (r.top + r.height/2);
        const offset = (i % 2 === 0 ? 1 : -1) * center * 0.04;
        const img = el.querySelector(".case-img, .case-placeholder");
        if (img) img.style.transform = `translateY(${offset}px) scale(1.04)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section className="section" id="work">
      <div className="section-head">
        <div className="label">
          <span className="num">[04] — Selected Work</span>
          <span className="eyebrow">Hospitality · Retail · F&B</span>
        </div>
        <h2>
          The growth department<br/>
          behind <span className="ital">100+</span><br/>
          premium brands.
        </h2>
      </div>
      <div className="cases" ref={ref}>
        {CASES.map((c, i) => (
          <article className="case" key={i}>
            <div className="case-placeholder parallax">
              <span>{c.tag}</span>
            </div>
            <div className="case-meta">
              <div className="case-top">
                <span>[Case {c.num}]</span>
                <span className="num">{c.category}</span>
              </div>
              <div className="case-bot">
                <h3>{c.brand}</h3>
                <div className="stat">
                  <span className="big">{c.stat}</span>
                  {c.statLabel}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// PROCESS
// ============================================================
const STEPS = [
  { num: "01", name: "Encounter", desc: "Diagnostic immersion. We map your brand DNA, audience cohorts, full-funnel economics, and the operator-level constraints most agencies never ask about." },
  { num: "02", name: "Architect", desc: "Strategy doc. Channel mix, hypothesis tree, creative pillars, KPI tree. The same artifact our team works against for the rest of the engagement." },
  { num: "03", name: "Build", desc: "Tracking, pixels, audiences, taste engine training, NOVA reference packs, asset library v0. We don't ship ads until measurement is honest." },
  { num: "04", name: "Launch", desc: "Coordinated go-live across paid, organic, email, SMS, and creative. Concept families, not single ads. Variance is the unit of work." },
  { num: "05", name: "Compound", desc: "Weekly creative refresh, monthly strategic review, quarterly arc. The system gets smarter every cycle — and so do we." },
];

function Process() {
  return (
    <section className="section" id="process">
      <div className="section-head">
        <div className="label">
          <span className="num">[05] — How We Work</span>
          <span className="eyebrow">Five Phases · Compounding</span>
        </div>
        <h2>
          A discipline of<br/>
          <span className="ital">obsessive</span> iteration.
        </h2>
      </div>
      <div className="process">
        <div className="process-list">
          {STEPS.map((s, i) => (
            <div className="process-step" key={i}>
              <span className="num">{s.num}</span>
              <div>
                <h4>{s.name}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="process-aside">
          We don't run campaigns.<br/>
          We build <span className="ital">growth engines</span> — measurable, defensible, compounding.
        </div>
      </div>
    </section>
  );
}

// ============================================================
// RESULTS / STATS
// ============================================================
const RESULTS = [
  { val: "100", suffix: "+", label: "Brands operated", desc: "Across hospitality, retail, beauty, and F&B." },
  { val: "$84", suffix: "M", label: "Managed annually", desc: "In paid media + ecosystem revenue." },
  { val: "8.4", suffix: "×", label: "Avg blended ROAS", desc: "Across active hospitality portfolio, 2025." },
  { val: "11", suffix: " yrs", label: "Operator experience", desc: "Founders are former operators, not generalists." },
];

function Results() {
  return (
    <section className="section" id="results">
      <div className="section-head">
        <div className="label">
          <span className="num">[06] — Results</span>
          <span className="eyebrow">By the Numbers · 2025</span>
        </div>
        <h2>
          Measurable.<br/>
          Defensible.<br/>
          <span className="ital">Compounding.</span>
        </h2>
      </div>
      <div className="results">
        {RESULTS.map((r, i) => (
          <div className="result-cell" key={i}>
            <span className="label">{r.label}</span>
            <span className="val">{r.val}<span className="ital">{r.suffix}</span></span>
            <span className="desc">{r.desc}</span>
          </div>
        ))}
      </div>
      <div className="press">
        <span className="eyebrow">As Seen In —</span>
        <span>Modern Luxury</span>
        <span>Resy Editorial</span>
        <span>Hospitality Net</span>
        <span>Miami Mag</span>
        <span>Ad Age</span>
        <span>Eater</span>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT / FOUNDERS
// ============================================================
function About() {
  return (
    <section className="section" id="about">
      <div className="section-head">
        <div className="label">
          <span className="num">[07] — Studio</span>
          <span className="eyebrow">Operators, Not Agency Lifers</span>
        </div>
        <h2>
          We've sat in <span className="ital">your seat.</span><br/>
          That's the whole<br/>thesis.
        </h2>
      </div>
      <div style={{maxWidth:"60ch", fontSize:"16px", lineHeight:1.6, color:"var(--muted)"}}>
        AIREA is built by operators who ran the kitchens, the floors, the line items —
        and got tired of agencies who couldn't read a P&L. We blend editorial-grade
        creative direction with the obsessive measurement of a CFO. Based in Miami,
        operating across NYC, LA, and Mexico City.
      </div>
      <div className="founders">
        <div className="founder">
          <div className="founder-photo">
            <div className="placeholder"><span>Founder portrait — A</span></div>
          </div>
          <div>
            <span className="role">Co-Founder · Strategy</span>
            <h4>[Founder Name]</h4>
            <p>11 years operating premium hospitality + retail. Former director of growth at a portfolio of nine boutique hotels. Builds the strategy that the rest of the team executes against.</p>
          </div>
        </div>
        <div className="founder">
          <div className="founder-photo">
            <div className="placeholder"><span>Founder portrait — B</span></div>
          </div>
          <div>
            <span className="role">Co-Founder · Creative + AI</span>
            <h4>[Founder Name]</h4>
            <p>Creative director turned AI-pipeline architect. Built NOVA from a spreadsheet of frustrations into a ten-stage production engine now used across the AIREA portfolio.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-head" style={{marginBottom:"40px"}}>
        <div className="label">
          <span className="num" style={{color:"rgba(255,255,255,0.5)"}}>[08] — Contact</span>
          <span className="eyebrow" style={{color:"rgba(255,255,255,0.5)"}}>Begin · Engagement</span>
        </div>
      </div>
      <h2 className="display">
        Let's build<br/>
        something <span className="ital">that compounds.</span>
      </h2>
      <div className="contact-grid">
        <div className="contact-cell">
          <span className="label">General Inquiries</span>
          <span className="val"><a href="mailto:hello@aireasolutions.com">hello@aireasolutions.com</a></span>
        </div>
        <div className="contact-cell">
          <span className="label">New Engagements</span>
          <span className="val"><a href="mailto:partnerships@aireasolutions.com">partnerships@aireasolutions.com</a></span>
        </div>
        <div className="contact-cell">
          <span className="label">Studio</span>
          <span className="val">Wynwood, Miami<br/>NYC · LA · CDMX</span>
        </div>
      </div>
      <div className="contact-cta">
        <Magnetic><a className="btn btn--solid" href="mailto:hello@aireasolutions.com">Book a 30-min audit <span className="arrow">↗</span></a></Magnetic>
        <Magnetic><a className="btn" href="#nova">Explore NOVA <span className="arrow">↗</span></a></Magnetic>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="footer">
      <div>© AIREA Solutions MMXXVI</div>
      <div className="center">An editorial agency · Hospitality + Retail</div>
      <div className="right">Index · 008 / 008 — End of issue</div>
    </footer>
  );
}

Object.assign(window, { Cases, Process, Results, About, Contact, Footer, Packages });
