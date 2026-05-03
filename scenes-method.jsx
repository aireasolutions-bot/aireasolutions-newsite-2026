/* global React */
const { useEffect, useRef, useState } = React;

// ============================================================
// NOVA METHODOLOGY — visual deep-dive
// 10 stages, each with custom React visualization
// ============================================================

const METHOD_STAGES = [
  {
    num: "01", name: "Brand DNA", kicker: "Encoding",
    summary: "Style guide, palette, typography, motion grammar — encoded as a reference pack and embedded into every prompt.",
    viz: "BrandDNAViz"
  },
  {
    num: "02", name: "Strategy & Tone", kicker: "Direction",
    summary: "Tone, style, campaign goal, KPI tree — the strategy doc the entire production runs against.",
    viz: "StrategyViz"
  },
  {
    num: "03", name: "ICP Intelligence", kicker: "Audience",
    summary: "Pain points, solutions, desires. We map the customer in their own words before the camera turns on.",
    viz: "ICPViz"
  },
  {
    num: "04", name: "Reference Training", kicker: "Taste Engine",
    summary: "Mood-board curation and LLM training on editorial reference packs. Taste, made deterministic.",
    viz: "ReferenceViz"
  },
  {
    num: "05", name: "Brief Creation", kicker: "Spec",
    summary: "Director-level shot lists, beats, palettes, lighting cues — a brief no human director would be ashamed of.",
    viz: "BriefViz"
  },
  {
    num: "06", name: "Casting · Avatars", kicker: "Identity",
    summary: "Subject definition with identity-locked avatars. Multi-ethnicity, multi-context, single brief.",
    viz: "CastingViz"
  },
  {
    num: "07", name: "JSON Prompt Engineering", kicker: "Blueprint",
    summary: "Every scene written as structured JSON — scenes, cuts, lighting, motion, action beats.",
    viz: "JSONViz"
  },
  {
    num: "08", name: "Model Routing", kicker: "Selection",
    summary: "Image, video, voice — each beat routed to the model that renders it best. Best-in-class, never one-size.",
    viz: "ModelViz"
  },
  {
    num: "09", name: "Voice Cloning", kicker: "Audio Identity",
    summary: "Founder, narrator, or persona — voice-cloned with consent for deterministic audio identity at scale.",
    viz: "VoiceViz"
  },
  {
    num: "10", name: "Workflow Orchestration", kicker: "The Engine",
    summary: "Node-based pipeline. Each stage triggers the next; assets ship to your CMS, ad accounts, and email tools.",
    viz: "WorkflowViz"
  },
];

// ---------- VIZ COMPONENTS ----------
function BrandDNAViz() {
  const swatches = ["#F4E9DC","#C9A96A","#2B2A28","#8B5A3C","#E8DCC4"];
  return (
    <div className="viz viz-brand">
      <div className="viz-grid-3">
        <div className="brand-card">
          <div className="brand-card-label">Palette</div>
          <div className="swatches">
            {swatches.map((c, i) => (
              <div key={i} className="swatch" style={{background: c}}>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="brand-card">
          <div className="brand-card-label">Typography</div>
          <div className="brand-type">
            <div style={{fontFamily:"var(--serif)", fontSize:"56px", lineHeight:1, letterSpacing:"-0.03em"}}>
              Aa<i style={{color:"rgba(255,255,255,0.5)"}}>Aa</i>
            </div>
            <div className="brand-type-meta">
              <span>Display · Instrument Serif</span>
              <span>Body · Inter Tight</span>
              <span>Mono · JetBrains</span>
            </div>
          </div>
        </div>
        <div className="brand-card">
          <div className="brand-card-label">Voice</div>
          <div className="brand-voice">
            <div className="voice-row"><span>Tone</span><b>Considered, never breathy</b></div>
            <div className="voice-row"><span>Pace</span><b>Deliberate</b></div>
            <div className="voice-row"><span>Pronouns</span><b>Inclusive · "we"</b></div>
            <div className="voice-row"><span>Avoid</span><b>Hype · superlatives</b></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StrategyViz() {
  return (
    <div className="viz viz-strategy">
      <div className="strategy-tree">
        <div className="tree-root">
          <span className="tree-kicker">Goal</span>
          <span className="tree-val">+200% AOV in 90 days</span>
        </div>
        <div className="tree-branches">
          {[
            { k: "Hypothesis", v: "Pre-sale renders unlock test demand before manufacture." },
            { k: "Channel", v: "Meta + TikTok + Email primary; YouTube remarketing." },
            { k: "Creative pillars", v: "Ritual · Founder · Ingredient · Result." },
            { k: "Cadence", v: "Weekly creative drops · biweekly arc." },
          ].map((b, i) => (
            <div key={i} className="tree-branch">
              <div className="tree-stem"></div>
              <div className="tree-leaf">
                <span className="leaf-k">{b.k}</span>
                <span className="leaf-v">{b.v}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ICPViz() {
  const cohorts = [
    { name: "Roccibella", age: "32", loc: "Brooklyn", pain: "Hyperpigmentation, hormonal", desire: "Founder-led, ritual-based skincare" },
    { name: "Inés", age: "38", loc: "CDMX", pain: "Sun damage, dryness", desire: "Editorial luxury at indie price" },
    { name: "Ji-yeon", age: "29", loc: "LA", pain: "Texture, dullness", desire: "Korean science, Latin warmth" },
  ];
  return (
    <div className="viz viz-icp">
      <div className="icp-cards">
        {cohorts.map((c, i) => (
          <div className="icp-card" key={i}>
            <div className="icp-portrait">
              <div className="icp-portrait-ph"><span>Avatar — {c.name}</span></div>
            </div>
            <div className="icp-meta">
              <div className="icp-name">{c.name} <span className="muted-50">· {c.age} · {c.loc}</span></div>
              <div className="icp-line"><span>Pain</span><b>{c.pain}</b></div>
              <div className="icp-line"><span>Desire</span><b>{c.desire}</b></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReferenceViz() {
  const refs = ["Editorial 1", "Lighting Ref", "Texture Macro", "Founder Pose", "Ritual Beat", "Color Study", "Composition", "Negative Space"];
  return (
    <div className="viz viz-refs">
      <div className="ref-grid">
        {refs.map((r, i) => (
          <div className="ref-tile" key={i} style={{animationDelay: `${i * 0.08}s`}}>
            <span className="ref-tile-num">[{String(i+1).padStart(2,"0")}]</span>
            <span className="ref-tile-name">{r}</span>
          </div>
        ))}
      </div>
      <div className="ref-foot">
        <span className="mono">Training · 240 references · Style-locked</span>
      </div>
    </div>
  );
}

function BriefViz() {
  return (
    <div className="viz viz-brief">
      <div className="brief-doc">
        <div className="brief-head">
          <span className="brief-tag">Director Brief</span>
          <span className="brief-id">ZNT-RIT-006 · v2.4</span>
        </div>
        <div className="brief-row"><span className="brief-k">Title</span><span className="brief-v">The Ritual — Hero 15s</span></div>
        <div className="brief-row"><span className="brief-k">Format</span><span className="brief-v">9:16 · 15s · Sound on</span></div>
        <div className="brief-row"><span className="brief-k">Setting</span><span className="brief-v">Minimalist Korean bathroom · morning</span></div>
        <div className="brief-row"><span className="brief-k">Beats</span><span className="brief-v">Place · Drop · Apply · Reveal</span></div>
        <div className="brief-row"><span className="brief-k">Lighting</span><span className="brief-v">Window-left, 5200K, soft bounce</span></div>
        <div className="brief-row"><span className="brief-k">Camera</span><span className="brief-v">50mm, slow push-in, shallow DoF</span></div>
        <div className="brief-row"><span className="brief-k">Emotion</span><span className="brief-v">Calm → Sensory → Confident → Serene</span></div>
      </div>
    </div>
  );
}

function CastingViz() {
  const avatars = [
    { name: "Roccibella v2", tag: "Founder · Identity-Lock", img: "https://i.imgur.com/JzNIP54.jpeg" },
    { name: "Inés", tag: "Latina · 38 · CDMX" },
    { name: "Ji-yeon", tag: "Korean · 29 · LA" },
    { name: "Maya", tag: "Mixed · 26 · Brooklyn" },
  ];
  return (
    <div className="viz viz-casting">
      <div className="casting-row">
        {avatars.map((a, i) => (
          <div className="cast-card" key={i}>
            <div className="cast-portrait">
              {a.img ? (
                <img src={a.img} alt={a.name} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
              ) : null}
              <div className="cast-portrait-ph" style={a.img ? {display:"none"} : {}}><span>Avatar — {a.name}</span></div>
              <div className="cast-lock">⌧ identity_lock</div>
            </div>
            <div className="cast-meta">
              <span className="cast-name">{a.name}</span>
              <span className="cast-tag">{a.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function JSONViz() {
  return (
    <div className="viz viz-json">
      <div className="terminal-r" style={{margin: 0}}>
        <div className="terminal-bar">
          <div className="dots"><span></span><span></span><span></span></div>
          <span className="file">scene.prompt.json</span>
          <span className="ver">v2.4</span>
        </div>
        <pre className="terminal-code" style={{maxHeight:"320px"}}>
{`{
  `}<span className="key">"project"</span>{`: `}<span className="str">"zenttu_ritual_hero"</span>{`,
  `}<span className="key">"aspect"</span>{`: `}<span className="str">"9:16"</span>{`,
  `}<span className="key">"subject"</span>{`: { `}<span className="key">"id"</span>{`: `}<span className="str">"roccibella_v2"</span>{`, `}<span className="key">"identity_lock"</span>{`: `}<span className="num">true</span>{` },
  `}<span className="key">"scene"</span>{`: {
    `}<span className="key">"setting"</span>{`: `}<span className="str">"minimalist korean bathroom"</span>{`,
    `}<span className="key">"camera"</span>{`: { `}<span className="key">"lens"</span>{`: `}<span className="str">"50mm"</span>{`, `}<span className="key">"move"</span>{`: `}<span className="str">"push-in"</span>{` }
  },
  `}<span className="key">"beats"</span>{`: [
    { `}<span className="key">"t"</span>{`: `}<span className="str">"0.0s"</span>{`, `}<span className="key">"action"</span>{`: `}<span className="str">"bottle on marble"</span>{` },
    { `}<span className="key">"t"</span>{`: `}<span className="str">"3.5s"</span>{`, `}<span className="key">"action"</span>{`: `}<span className="str">"texture macro"</span>{` },
    { `}<span className="key">"t"</span>{`: `}<span className="str">"8.0s"</span>{`, `}<span className="key">"action"</span>{`: `}<span className="str">"founder application"</span>{` }
  ]
}`}
        </pre>
      </div>
    </div>
  );
}

function ModelViz() {
  const models = [
    { kind: "Image", name: "Midjourney v7 · Flux Pro", use: "Hero stills · texture macros" },
    { kind: "Video", name: "Veo 3 · Runway Gen-4", use: "Cinematic motion · founder beats" },
    { kind: "Voice", name: "ElevenLabs v3", use: "Voice cloning · narration" },
    { kind: "Lip-sync", name: "HeyGen · Hedra", use: "Founder dubs · localization" },
    { kind: "Upscale", name: "Topaz · Magnific", use: "Print-grade fidelity" },
  ];
  return (
    <div className="viz viz-models">
      <div className="model-router">
        <div className="router-in">
          <span className="mono">Brief</span>
          <span className="router-arrow">→</span>
        </div>
        <div className="router-mesh">
          {models.map((m, i) => (
            <div className="model-pill" key={i} style={{animationDelay: `${i * 0.1}s`}}>
              <span className="model-kind">{m.kind}</span>
              <span className="model-name">{m.name}</span>
              <span className="model-use">{m.use}</span>
            </div>
          ))}
        </div>
        <div className="router-out">
          <span className="router-arrow">→</span>
          <span className="mono">Asset</span>
        </div>
      </div>
    </div>
  );
}

function VoiceViz() {
  return (
    <div className="viz viz-voice">
      <div className="voice-clone">
        <div className="voice-source">
          <span className="mono">Source · founder.wav · 8min</span>
          <div className="waveform">
            {Array.from({length: 60}).map((_, i) => (
              <span key={i} style={{height: `${20 + Math.abs(Math.sin(i * 0.4)) * 60}%`, animationDelay: `${i * 0.03}s`}}></span>
            ))}
          </div>
        </div>
        <div className="voice-arrow">⬇ Clone · Consent · Deterministic</div>
        <div className="voice-output">
          <span className="mono">Cloned · roccibella_voice_v2</span>
          <div className="waveform out">
            {Array.from({length: 60}).map((_, i) => (
              <span key={i} style={{height: `${15 + Math.abs(Math.sin(i * 0.3 + 1)) * 70}%`, animationDelay: `${i * 0.03}s`}}></span>
            ))}
          </div>
          <div className="voice-langs">
            <span>EN-US</span><span>ES-MX</span><span>FR</span><span>KO</span><span>PT-BR</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowViz() {
  const nodes = [
    { x: 8,  y: 50, label: "Brief", kind: "in" },
    { x: 28, y: 22, label: "Image · MJ" },
    { x: 28, y: 78, label: "Video · Veo" },
    { x: 50, y: 50, label: "Compose" },
    { x: 72, y: 22, label: "Voice · 11Labs" },
    { x: 72, y: 78, label: "Lip-sync · Hedra" },
    { x: 92, y: 50, label: "Ship", kind: "out" },
  ];
  const edges = [
    [0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[4,6],[5,6]
  ];
  return (
    <div className="viz viz-workflow">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="workflow-svg">
        {edges.map(([a,b], i) => {
          const A = nodes[a], B = nodes[b];
          return (
            <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
              stroke="rgba(255,255,255,0.25)" strokeWidth="0.2" strokeDasharray="0.8 0.6" className="wf-line" style={{animationDelay: `${i*0.15}s`}} />
          );
        })}
      </svg>
      {nodes.map((n, i) => (
        <div key={i} className={`wf-node ${n.kind || ""}`} style={{left:`${n.x}%`, top:`${n.y}%`, animationDelay: `${i*0.12}s`}}>
          <span className="wf-dot"></span>
          <span className="wf-label">{n.label}</span>
        </div>
      ))}
    </div>
  );
}

const VIZ_MAP = {
  BrandDNAViz, StrategyViz, ICPViz, ReferenceViz, BriefViz,
  CastingViz, JSONViz, ModelViz, VoiceViz, WorkflowViz,
};

// ============================================================
// METHODOLOGY SECTION
// ============================================================
function NovaMethodology() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  // Auto-advance hint on first view (gentle, stops on user interaction)
  const [userTouched, setUserTouched] = useState(false);
  useEffect(() => {
    if (userTouched) return;
    const id = setInterval(() => {
      setActive(a => (a + 1) % METHOD_STAGES.length);
    }, 2800);
    return () => clearInterval(id);
  }, [userTouched]);

  const handleHover = (i) => {
    setUserTouched(true);
    setActive(i);
  };

  // Scroll active card into view in the horizontal track
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(`[data-idx="${active}"]`);
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const offset = card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2;
    track.scrollTo({ left: offset, behavior: "smooth" });
  }, [active]);

  const ActiveViz = VIZ_MAP[METHOD_STAGES[active].viz];
  const stage = METHOD_STAGES[active];

  return (
    <section className="methodology" id="methodology">
      <div className="section-head">
        <div className="label">
          <span className="num">[03.3] — Methodology</span>
          <span className="eyebrow">Proprietary · Ten Stages</span>
        </div>
        <h2>
          NOVA isn't a prompt.<br/>
          It's a <span className="ital">ten-stage</span> production pipeline.
        </h2>
      </div>

      <p className="method-intro">
        Hover or scroll any stage below — brand encoding, reference training, prompt
        engineering, model routing, voice cloning, orchestration. This is what sits
        between <em>brief</em> and <em>asset</em>.
      </p>

      <div className="method-stage-display">
        <div className="method-stage-info">
          <div className="msi-meta">
            <span className="method-stage-num">{stage.num} · {stage.kicker}</span>
            <span className="msi-counter">{String(active + 1).padStart(2,"0")} / {String(METHOD_STAGES.length).padStart(2,"0")}</span>
          </div>
          <h3 className="method-stage-name">{stage.name}</h3>
          <p className="method-stage-summary">{stage.summary}</p>
        </div>

        <div className="method-viz-frame">
          <div className="method-viz-bar">
            <div className="dots"><span></span><span></span><span></span></div>
            <span className="file mono">{stage.name.toLowerCase().replace(/[^a-z]/g,"_")}.viz</span>
            <span className="ver mono">stage / {String(active + 1).padStart(2,"0")}</span>
          </div>
          <div className="method-viz-body" key={active}>
            {ActiveViz && <ActiveViz />}
          </div>
        </div>
      </div>

      <div className="method-track-wrap">
        <div className="method-track-rail" aria-hidden="true">
          <div className="method-track-progress" style={{transform: `scaleX(${(active + 1) / METHOD_STAGES.length})`}}></div>
        </div>
        <div className="method-track" ref={trackRef}>
          {METHOD_STAGES.map((s, i) => (
            <button
              type="button"
              className={`method-card ${i === active ? "active" : ""}`}
              key={i}
              data-idx={i}
              onMouseEnter={() => handleHover(i)}
              onFocus={() => handleHover(i)}
              onClick={() => handleHover(i)}
            >
              <span className="method-card-num">{s.num}</span>
              <span className="method-card-kicker">{s.kicker}</span>
              <span className="method-card-name">{s.name}</span>
              <span className="method-card-dot"></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { NovaMethodology });
