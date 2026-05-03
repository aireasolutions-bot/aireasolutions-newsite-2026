/* global React, ReactDOM */
const { useEffect, useState } = React;

const PILLAR_DATA = {
  amplify: {
    num: "01", name: "Amplify", kicker: "Paid Media",
    title: { l1: "Paid media,", l2: "engineered like", l3: "product." },
    intro: "Performance marketing across every channel that matters — Meta, Google, TikTok, programmatic. We don't run ads. We compound them.",
    stat: "+350%", statLabel: "Avg ROI · 2025",
    deepHead: { l1: "Creative volume is", l2: "the new ", italic: "media plan." },
    deepBody: [
      "Every winning account in 2025 has the same shape: a creative pipeline that produces 10× more variations than the agency next door, and a measurement stack that tells you which one to scale within 48 hours.",
      "AIREA × NOVA is engineered for exactly that. We ship 80–150 pieces of testable creative every month — across Meta, Google, TikTok and Programmatic — paired with attribution that honest operators can defend at a board meeting.",
    ],
    sub: [
      { num: "01", name: "Meta Ads",     desc: "Facebook + Instagram performance buying. Full-funnel, creative-first.", slug: "meta" },
      { num: "02", name: "Google Ads",   desc: "Search, YouTube, and Performance Max engineered for premium brands.", slug: "google" },
      { num: "03", name: "TikTok Ads",   desc: "Native creative buying. We make ads that don't look like ads.", slug: "tiktok" },
      { num: "04", name: "Programmatic", desc: "DSPs and retargeting at scale. Brand-safe inventory only.", slug: "programmatic" },
    ],
  },
  intelligence: {
    num: "02", name: "Intelligence", kicker: "AI Operations",
    title: { l1: "Operational AI", l2: "for revenue", l3: "ops." },
    intro: "Workflows, agents, attribution, and decision systems engineered for your stack. Move 10× faster without losing the rigor.",
    stat: "10×", statLabel: "Faster cycle time",
    deepHead: { l1: "Most agencies talk", l2: "about AI. We ship ", italic: "production pipelines." },
    deepBody: [
      "We build the AI plumbing your competitors can't — multi-step agents that handle reporting, creative iteration, audience research, and ops. Engineered, observable, and on your stack.",
      "Every workflow we ship comes with a measurement layer. You don't just run faster — you know exactly how much faster, and why.",
    ],
    sub: [
      { num: "01", name: "AI Workflows", desc: "Multi-step agents and automations on your stack — n8n, Make, custom.", slug: "workflows" },
      { num: "02", name: "Revenue Ops",  desc: "Attribution, lifecycle, and stack engineering for premium brands.", slug: "revops" },
      { num: "03", name: "Data + BI",    desc: "Operator-grade dashboards. Decision-ready in your inbox.", slug: "data" },
    ],
  },
  reach: {
    num: "03", name: "Reach", kicker: "Organic + Influence",
    title: { l1: "Organic, social,", l2: "and ", italic: "influence." },
    intro: "Build loyal followings on the platforms that matter. Native craft for Meta, TikTok, and the channels your customers actually live on.",
    stat: "+200%", statLabel: "Avg follower growth",
    deepHead: { l1: "We don't ", italic: "post.", l2: "We build cultural" , l3: "presence." },
    deepBody: [
      "Social is the only marketing channel where your taste compounds. We staff seasoned editors, motion designers, and cultural strategists who know how each platform actually works.",
      "Influence isn't a transaction — it's casting. We build the partner roster, the brief, and the measurement that makes every dollar earn brand equity, not just impressions.",
    ],
    sub: [
      { num: "01", name: "Organic Social", desc: "Native channel craft — Meta, TikTok, YouTube. Editorial, not stock.", slug: "social" },
      { num: "02", name: "Influencer",     desc: "Partner casting, briefs, and measurement engineered for premium ICPs.", slug: "influencer" },
      { num: "03", name: "PR · Editorial", desc: "Earned placement and editorial relationships in hospitality + retail.", slug: "pr" },
    ],
  },
  engage: {
    num: "04", name: "Engage", kicker: "Lifecycle · CRM",
    title: { l1: "Lifecycle, CRM,", l2: italic_token("retention.") },
    intro: "Turn casual browsers into lifelong customers. Email, SMS, and segmentation engineered around the ritual, not the discount.",
    stat: "89%", statLabel: "Avg open rate",
    deepHead: { l1: "Discount is a", l2: "tax on bad ", italic: "lifecycle." },
    deepBody: [
      "We rebuild your lifecycle around the customer ritual — what they do, when, and why — and design flows that show up at the exact moment they need you.",
      "The math: a 5% lift in email open rate is worth more than a 20% lift in paid CPM for any premium brand. We've delivered both.",
    ],
    sub: [
      { num: "01", name: "Email", desc: "Klaviyo, Customer.io, custom. Editorial flows that read like magazines.", slug: "email" },
      { num: "02", name: "SMS",   desc: "High-intent retention. Conversational, never spammy.", slug: "sms" },
      { num: "03", name: "CRM",   desc: "Segmentation, loyalty, and the operating system underneath.", slug: "crm" },
    ],
  },
  analyze: {
    num: "05", name: "Analyze", kicker: "Attribution · BI",
    title: { l1: "See what works.", l2: "Before " , italic: "anyone else." },
    intro: "Decision-grade attribution and dashboards. We don't ship reports — we ship operating systems.",
    stat: "Real-time", statLabel: "Decision data",
    deepHead: { l1: "Honest", l2: italic_token("measurement,"), l3: "as a discipline." },
    deepBody: [
      "Every operator we work with had a dashboard before we started. None of them trusted it. We rebuild measurement so that the numbers in your dashboard match the numbers in your bank account.",
      "MMM, click-based, and self-reported survey data — triangulated weekly, reviewed monthly, defended quarterly.",
    ],
    sub: [
      { num: "01", name: "Attribution",  desc: "MMM + click + survey, triangulated. The honest answer to 'what's working'.", slug: "attribution" },
      { num: "02", name: "Dashboards",   desc: "Operator-grade BI. Looker, Metabase, custom — your team's command center.", slug: "dashboards" },
      { num: "03", name: "Audits",       desc: "Performance diagnostics for your existing stack — agency or in-house.", slug: "audits" },
    ],
  },
  build: {
    num: "06", name: "Build", kicker: "Web · Product",
    title: { l1: "Web, product,", l2: italic_token("conversion.") },
    intro: "Editorial Shopify and bespoke platforms. Every pixel engineered to convert at premium scale.",
    stat: "+38%", statLabel: "Avg CVR lift",
    deepHead: { l1: "A premium", l2: "site converts ", italic: "premium." },
    deepBody: [
      "We build storefronts and product surfaces that look like editorial — and convert like performance pages. Headless Shopify, custom Next.js, and CRO programs run as a discipline.",
      "Every release ships with experiments wired in. Every experiment is paired to a hypothesis. Every hypothesis is tied to a revenue line.",
    ],
    sub: [
      { num: "01", name: "Shopify", desc: "Headless and custom theme builds for premium DTC and hospitality.", slug: "shopify" },
      { num: "02", name: "Web",     desc: "Editorial brand sites + custom Next.js. The site that wins the competitor RFP.", slug: "web" },
      { num: "03", name: "CRO",     desc: "Funnel optimization as a discipline. Hypotheses, experiments, revenue.", slug: "cro" },
    ],
  },
};

function italic_token(t) { return `_ITAL_${t}_/ITAL_`; }
function renderText(s) {
  if (!s) return null;
  if (s.startsWith("_ITAL_")) {
    return <i className="ital">{s.replace("_ITAL_","").replace("_/ITAL_","")}</i>;
  }
  return s;
}

function PillarPage() {
  const slug = (window.location.pathname.match(/pillars\/([^.]+)\.html/) || [])[1] || "amplify";
  const baseSlug = slug.split("-")[0];
  const data = PILLAR_DATA[baseSlug] || PILLAR_DATA.amplify;
  const subSlug = slug.includes("-") ? slug.split("-").slice(1).join("-") : null;
  const subFocus = subSlug ? data.sub.find(s => s.slug === subSlug) : null;

  return (
    <React.Fragment>
      <Cursor />
      <Nav />

      <section className="pillar-hero">
        <div className="hero-meta">
          <div className="col-3">
            [Pillar {data.num}] — {data.kicker}<br/>
            <a href="../index.html" style={{color:"var(--ink)"}}>← Back to AIREA</a>
          </div>
          <div className="col-3">{data.name}</div>
          <div className="col-3">Hospitality · Retail · F&B</div>
          <div className="col-4" style={{textAlign:"right"}}>
            (Scroll) — to enter<br/>
            <span style={{color:"var(--ink)"}}>↓</span>
          </div>
        </div>
        <h1>
          {subFocus ? (
            <React.Fragment>
              <span className="line"><span>{subFocus.name}.</span></span>
              <span className="line"><span><i className="ital">By AIREA.</i></span></span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className="line"><span>{renderText(data.title.l1)}</span></span>
              <span className="line"><span>{renderText(data.title.l2)}</span></span>
              {data.title.l3 && <span className="line"><span>{renderText(data.title.l3)}</span></span>}
              {data.title.italic && <span className="line"><span><i className="ital">{data.title.italic}</i></span></span>}
            </React.Fragment>
          )}
        </h1>
        <div className="hero-foot">
          <p className="hero-desc">{subFocus ? subFocus.desc : data.intro}</p>
          <div className="hero-cta">
            <Magnetic><a className="btn btn--solid" href="../index.html#contact">Book audit <span className="arrow">↗</span></a></Magnetic>
            <Magnetic><a className="btn" href="../index.html#nova">Meet NOVA <span className="arrow">↗</span></a></Magnetic>
          </div>
          <div className="hero-num">
            {data.stat}<br/>
            <span style={{color:"var(--ink)", fontFamily:"var(--mono)", fontSize:"11px", letterSpacing:"0.14em"}}>{data.statLabel}</span>
          </div>
        </div>
      </section>

      <Marquee />

      {!subFocus && (
        <section className="section">
          <div className="section-head">
            <div className="label">
              <span className="num">[{data.num}.1] — Sub-disciplines</span>
              <span className="eyebrow">{data.name} · Sub-pillars</span>
            </div>
            <h2>
              How we deliver<br/>
              <span className="ital">{data.name.toLowerCase()}</span> at premium scale.
            </h2>
          </div>
          <div className="subpillars">
            {data.sub.map((s, i) => (
              <a className="subpillar" key={i} href={`${baseSlug}-${s.slug}.html`}>
                <span className="subpillar-num">{s.num}</span>
                <h3>{s.name}</h3>
                <p className="subpillar-desc">{s.desc}</p>
                <span className="arrow">→</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="deepdive">
        <div>
          <span className="eyebrow">[{data.num}.2] — The Thesis</span>
          <h2 style={{marginTop:"12px"}}>
            {data.deepHead.l1 && <React.Fragment>{renderText(data.deepHead.l1)}<br/></React.Fragment>}
            {data.deepHead.l2 && <React.Fragment>{renderText(data.deepHead.l2)}{data.deepHead.italic && <i className="ital">{data.deepHead.italic}</i>}<br/></React.Fragment>}
            {data.deepHead.l3 && <React.Fragment>{renderText(data.deepHead.l3)}</React.Fragment>}
          </h2>
        </div>
        <div>
          {data.deepBody.map((p, i) => <p key={i}>{p}</p>)}
          <Magnetic><a className="btn" href="../index.html#contact" style={{marginTop:"24px"}}>Begin engagement <span className="arrow">↗</span></a></Magnetic>
        </div>
      </section>

      <Cases />
      <Contact />
      <Footer />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PillarPage />);
