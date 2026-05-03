/* global React */
const { useEffect, useRef, useState } = React;

// ============================================================
// NOVA HERO
// ============================================================
function NovaHero() {
  return (
    <section className="nova-hero">
      <div className="nova-meta">
        <div className="col-3">
          [03] — Featured<br/>
          New Vertical · 2026
        </div>
        <div className="col-3">
          AIREA × NOVA<br/>
          Editorial AI Production
        </div>
        <div className="col-3">
          For brands obsessed<br/>with creative volume<br/>that compounds.
        </div>
        <div className="col-4" style={{textAlign:"right"}}>
          v2.4 · Live<br/>
          <span style={{color:"#fff"}}>○ Operational</span>
        </div>
      </div>
      <h2 className="nova-title">
        NOVA<span className="star">✦</span>
      </h2>
      <div className="nova-foot">
        <p className="eyebrow" style={{color:"rgba(255,255,255,0.6)"}}>Introducing</p>
        <p className="desc">
          The AI Creative Engine — <i>engineered for your brand DNA.</i>
        </p>
        <p className="eyebrow" style={{color:"rgba(255,255,255,0.6)", textAlign:"right"}}>
          Scroll to descend ↓
        </p>
      </div>
    </section>
  );
}

// ============================================================
// NOVA NUMBERS
// ============================================================
function NovaNumbers() {
  const cells = [
    { label: "Assets / Month", val: "80", suffix: "–150" },
    { label: "UGC Batch", val: "5", suffix: "–7 days" },
    { label: "Cost / asset", val: "$40", suffix: "–120" },
    { label: "Variations / concept", val: "10", suffix: "–50+" },
  ];
  return (
    <div className="nova-numbers">
      {cells.map((c, i) => (
        <div className="nova-num-cell" key={i}>
          <span className="label">{c.label}</span>
          <span className="val">{c.val}<span className="ital">{c.suffix}</span></span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// NOVA TABLE
// ============================================================
function NovaTable() {
  const rows = [
    ["Time to deliver UGC batch", "4–6 weeks", "5–7 days"],
    ["Cost per UGC asset", "$400–$1,500", "$40–$120"],
    ["Variations per concept", "1–2", "10–50+"],
    ["Multi-ethnicity casting", "Multiple shoots required", "Built into a single brief"],
    ["Pre-sale product rendering", "Not feasible", "Standard deliverable"],
    ["Reshoots / iteration", "Re-book studio + models", "Re-render in hours"],
    ["Brand consistency at scale", "Variable across batches", "Locked via prompt + style frame"],
  ];
  return (
    <div className="nova-table">
      <div className="section-head">
        <div className="label">
          <span className="num">[03.1] — Comparative</span>
          <span className="eyebrow">Traditional vs. NOVA</span>
        </div>
        <h2>
          Where traditional gives<br/>
          you ten assets, <span className="ital">NOVA</span><br/>
          delivers one-fifty.
        </h2>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{width:"40%"}}>Dimension</th>
            <th>Traditional Production</th>
            <th className="nova-col">NOVA<sup>✦</sup></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="row-label">{r[0]}</td>
              <td className="dim">{r[1]}</td>
              <td className="nova-col">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// NOVA DELIVERABLES (8)
// ============================================================
const DELIVERABLES = [
  { num: "01", name: "Product Imagery", desc: "Editorial campaign imagery — Korean dewy minimalism, sun-soaked Latin warmth, clinical modernity.", items: ["Hero shots & lifestyle scenes","Texture macros & ingredient renders","Pre-sale renders for unreleased SKUs","On-brand art direction every frame"] },
  { num: "02", name: "UGC Library", desc: "Multi-ethnicity casting without commissioning eight separate shoots — each persona with distinct voice.", items: ["Korean, Latina, Black, Asian-American, mixed","Bathroom mirror, GRWM, ritual sequences","Bilingual scripting (English + Spanish)","Founder-style extensions when authorized"] },
  { num: "03", name: "Commercials & TV Spots", desc: "Cinematic spots ready for streaming, OOH, and broadcast — founder, ingredient, or ritual-led.", items: ["15s, 30s, 60s formats","Hero narrative cuts","Platform-native conforms","Multi-language voice-over & subs"] },
  { num: "04", name: "Product Videos", desc: "360° rotations, in-use macro shots, ingredient-drop slow motion. The ritual as a visual language.", items: ["Step-by-step tutorial assets","Ingredient hero drops","Texture & application macros","Ritual sequence edits"] },
  { num: "05", name: "Social Creatives & Ads", desc: "Meta, TikTok, and YouTube Shorts — native formats optimized for each algorithm.", items: ["Feed, Reels, Stories static + video","Before / after sets, transformation arcs","Carousel ads & DCO variants","50+ ad variations per month"] },
  { num: "06", name: "Pop-Up & Activation", desc: "Renders of pop-up retail concepts for partnerships and regional rollouts.", items: ["Environment renders for pitches","City-specific localized creatives","Influencer event packs","Esthetician training visuals"] },
  { num: "07", name: "Pre-Sale Rendering", desc: "Hyper-realistic photography and motion before production is finalized. Test demand before manufacturing.", items: ["Pre-launch teaser campaigns","Investor & retail buyer decks","Influencer seeding before samples","Low-cost concept validation"] },
  { num: "08", name: "Upsell & AOV Engine", desc: "Dedicated creative for ancillary products — ritual sets, bags, accessories — that move AOV.", items: ["Shopify cart cross-sell modules","'Complete the Ritual' variations","Email-embedded upsell modules","Bundle-focused TikTok & Reels"] },
];

function NovaDeliverables() {
  return (
    <section className="section" style={{background:"var(--ink)", color:"var(--paper)"}}>
      <div className="section-head">
        <div className="label">
          <span className="num" style={{color:"rgba(255,255,255,0.5)"}}>[03.2] — Output</span>
          <span className="eyebrow" style={{color:"rgba(255,255,255,0.5)"}}>Eight Deliverables · One Engine</span>
        </div>
        <h2 style={{color:"#fff"}}>
          Eight deliverables.<br/>
          <span className="ital" style={{color:"rgba(255,255,255,0.5)"}}>One creative engine.</span>
        </h2>
      </div>
      <div className="deliverables-grid">
        {DELIVERABLES.map((d, i) => (
          <div className="deliverable" key={i}>
            <span className="num">[{d.num}]</span>
            <h3>{d.name}</h3>
            <p className="summary">{d.desc}</p>
            <ul>{d.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// NOVA PIPELINE — 10 STAGES
// ============================================================
const STAGES = [
  ["01", "Foundation"],
  ["02", "Strategy"],
  ["03", "Taste Engine"],
  ["04", "Creative Direction"],
  ["05", "Casting"],
  ["06", "The Blueprint"],
  ["07", "Model Routing"],
  ["08", "Audio Identity"],
  ["09", "Orchestration"],
  ["10", "Ship It"],
];

function NovaPipeline() {
  const [active, setActive] = useState(5); // Stage 06
  return (
    <section className="pipeline">
      <div className="section-head">
        <div className="label">
          <span className="num" style={{color:"rgba(255,255,255,0.5)"}}>[03.3] — Methodology</span>
          <span className="eyebrow" style={{color:"rgba(255,255,255,0.5)"}}>Proprietary · Under the Hood</span>
        </div>
        <h2 style={{color:"#fff"}}>
          NOVA isn't a prompt.<br/>
          It's a <span className="ital" style={{color:"rgba(255,255,255,0.5)"}}>ten-stage</span> production pipeline.
        </h2>
      </div>
      <p className="muted" style={{maxWidth:"58ch", fontSize:"15px", lineHeight:1.6, color:"rgba(255,255,255,0.65)"}}>
        This is what sits between 'brief' and 'asset' — a disciplined chain of brand
        encoding, reference training, prompt engineering, model routing, and human
        direction. It's how we keep output editorial, on-brand, and indistinguishable
        from premium production.
      </p>

      <div className="pipeline-stages">
        {STAGES.map(([num, name], i) => (
          <div
            key={i}
            className={`stage ${i === active ? "active" : ""}`}
            onMouseEnter={() => setActive(i)}
          >
            <span className="stage-num">{num}</span>
            <span className="stage-name">{name}</span>
          </div>
        ))}
      </div>

      <Terminal />
    </section>
  );
}

// ============================================================
// JSON TERMINAL
// ============================================================
function Terminal() {
  const code = (
    <React.Fragment>
      {"{\n"}
      {"  "}<span className="key">"project"</span>: <span className="str">"zenttu_ritual_hero"</span>,{"\n"}
      {"  "}<span className="key">"aspect"</span>: <span className="str">"9:16"</span>,{"\n"}
      {"  "}<span className="key">"duration"</span>: <span className="str">"15s"</span>,{"\n"}
      {"  "}<span className="key">"subject"</span>: {"{"} <span className="key">"id"</span>: <span className="str">"roccibella_v2"</span>, <span className="key">"identity_lock"</span>: <span className="num">true</span> {"}"},{"\n"}
      {"  "}<span className="key">"scene"</span>: {"{"}{"\n"}
      {"    "}<span className="key">"setting"</span>: <span className="str">"minimalist korean bathroom, morning light"</span>,{"\n"}
      {"    "}<span className="key">"palette"</span>: [<span className="str">"#F4E9DC"</span>, <span className="str">"#C9A96A"</span>, <span className="str">"#2B2A28"</span>],{"\n"}
      {"    "}<span className="key">"lighting"</span>: <span className="str">"soft window-left, warm bounce, 5200K"</span>,{"\n"}
      {"    "}<span className="key">"camera"</span>: {"{"} <span className="key">"lens"</span>: <span className="str">"50mm"</span>, <span className="key">"movement"</span>: <span className="str">"slow push-in"</span>, <span className="key">"depth"</span>: <span className="str">"shallow"</span> {"}"}{"\n"}
      {"  "}{"}"},{"\n"}
      {"  "}<span className="key">"beats"</span>: [{"\n"}
      {"    "}{"{"} <span className="key">"t"</span>: <span className="str">"0.0s"</span>, <span className="key">"action"</span>: <span className="str">"bottle placed on marble"</span>, <span className="key">"emotion"</span>: <span className="str">"calm"</span> {"}"},{"\n"}
      {"    "}{"{"} <span className="key">"t"</span>: <span className="str">"3.5s"</span>, <span className="key">"action"</span>: <span className="str">"texture macro drop"</span>, <span className="key">"emotion"</span>: <span className="str">"sensory"</span> {"}"},{"\n"}
      {"    "}{"{"} <span className="key">"t"</span>: <span className="str">"8.0s"</span>, <span className="key">"action"</span>: <span className="str">"founder application, eye contact"</span>, <span className="key">"emotion"</span>: <span className="str">"confident"</span> {"}"},{"\n"}
      {"    "}{"{"} <span className="key">"t"</span>: <span className="str">"13.0s"</span>, <span className="key">"action"</span>: <span className="str">"logo reveal, ritual tagline"</span>, <span className="key">"emotion"</span>: <span className="str">"serene"</span> {"}"}{"\n"}
      {"  "}]{"\n"}
      {"}"}
    </React.Fragment>
  );
  return (
    <div className="terminal">
      <div className="terminal-l">
        <span className="stage-tag">Stage 06 · The Blueprint</span>
        <h3>Prompt engineering, <span className="ital">as JSON.</span></h3>
        <p className="blurb">
          Every scene is written as structured JSON — cuts, lighting, motion, actions,
          camera, emotion — so output is deterministic, editable, and repeatable at scale.
        </p>
        <div className="terminal-tags">
          <span>Scenes</span><span>Cuts</span><span>Lighting</span>
          <span>Movement</span><span>Action Beats</span><span>Identity Lock</span>
        </div>
      </div>
      <div className="terminal-r">
        <div className="terminal-bar">
          <div className="dots"><span></span><span></span><span></span></div>
          <span className="file">scene.prompt.json</span>
          <span className="ver">v2.4</span>
        </div>
        <pre className="terminal-code">{code}</pre>
      </div>
    </div>
  );
}

// ============================================================
// NOVA WRAPPER
// ============================================================
function Nova() {
  return (
    <section className="nova" id="nova">
      <NovaHero />
      <NovaNumbers />
      <NovaTable />
      <NovaDeliverables />
      <NovaMethodology />
    </section>
  );
}

Object.assign(window, { Nova });
