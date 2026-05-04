/* global React */
const { useEffect, useRef, useState } = React;

// ============================================================
// NOVA REEL — Selected Output gallery
// 6 brand cases, each with a set of 9:16 reels.
// Hover to preview (muted autoplay). Click to open lightbox with sound.
// ============================================================

const REEL_BRANDS = [
  {
    slug: "roccibella",
    name: "Roccibella",
    kicker: "Korean Skincare · Hero",
    blurb: "Identity-locked founder avatar, ritual-led hero films, and pre-sale product motion. Editorial Korean dewy minimalism.",
    clips: [
      { src: "videos/roccibella-1.mp4", poster: "videos/posters/roccibella-1.jpg", tag: "Hero film" },
      { src: "videos/roccibella-2.mp4", poster: "videos/posters/roccibella-2.jpg", tag: "Avatar — Identity Lock" },
      { src: "videos/roccibella-3.mp4", poster: "videos/posters/roccibella-3.jpg", tag: "Avatar + Product" },
      { src: "videos/roccibella-4.mp4", poster: "videos/posters/roccibella-4.jpg", tag: "Creative concept" },
      { src: "videos/roccibella-5.mp4", poster: "videos/posters/roccibella-5.jpg", tag: "Final cut" },
      { src: "videos/roccibella-6.mp4", poster: "videos/posters/roccibella-6.jpg", tag: "Ritual beat" },
      { src: "videos/roccibella-7.mp4", poster: "videos/posters/roccibella-7.jpg", tag: "Ritual beat" },
      { src: "videos/roccibella-8.mp4", poster: "videos/posters/roccibella-8.jpg", tag: "Ritual beat" },
      { src: "videos/roccibella-9.mp4", poster: "videos/posters/roccibella-9.jpg", tag: "Ritual beat" },
    ],
  },
  {
    slug: "alamar",
    name: "Princesa del Caribe",
    kicker: "Beauty · Editorial",
    blurb: "Sun-soaked Caribbean lifestyle, swatch macros, and meta-ad cutdowns. Latin warmth, monochrome elegance.",
    clips: [
      { src: "videos/alamar-1.mp4", poster: "videos/posters/alamar-1.jpg", tag: "Lifestyle film" },
      { src: "videos/alamar-2.mp4", poster: "videos/posters/alamar-2.jpg", tag: "Lifestyle film" },
      { src: "videos/alamar-3.mp4", poster: "videos/posters/alamar-3.jpg", tag: "Swatch macro" },
      { src: "videos/alamar-4.mp4", poster: "videos/posters/alamar-4.jpg", tag: "Meta ad cut" },
    ],
  },
  {
    slug: "visionbody",
    name: "Vision Body",
    kicker: "Wellness · Performance",
    blurb: "EMS-suit performance loops, in-studio motion, and conversion-led ad cuts. Clinical modernity.",
    clips: [
      { src: "videos/visionbody-1.mp4", poster: "videos/posters/visionbody-1.jpg", tag: "Studio loop" },
      { src: "videos/visionbody-2.mp4", poster: "videos/posters/visionbody-2.jpg", tag: "Studio loop" },
      { src: "videos/visionbody-3.mp4", poster: "videos/posters/visionbody-3.jpg", tag: "Performance beat" },
      { src: "videos/visionbody-4.mp4", poster: "videos/posters/visionbody-4.jpg", tag: "Performance beat" },
      { src: "videos/visionbody-5.mp4", poster: "videos/posters/visionbody-5.jpg", tag: "Conversion cut" },
      { src: "videos/visionbody-6.mp4", poster: "videos/posters/visionbody-6.jpg", tag: "Conversion cut" },
    ],
  },
  {
    slug: "epc",
    name: "EPC",
    kicker: "DTC · Founder-led",
    blurb: "Founder-led storytelling. Three-cut social arc engineered for scroll-stop on Meta and TikTok.",
    clips: [
      { src: "videos/epc-1.mp4", poster: "videos/posters/epc-1.jpg", tag: "Cut 01" },
      { src: "videos/epc-2.mp4", poster: "videos/posters/epc-2.jpg", tag: "Cut 02" },
      { src: "videos/epc-3.mp4", poster: "videos/posters/epc-3.jpg", tag: "Cut 03" },
    ],
  },
  {
    slug: "crypto",
    name: "Crypto Brand",
    kicker: "Fintech · Brand Film",
    blurb: "Brand-first films for a fintech audience. Slow push, considered tone, no jargon.",
    clips: [
      { src: "videos/crypto-1.mp4", poster: "videos/posters/crypto-1.jpg", tag: "Brand film" },
      { src: "videos/crypto-2.mp4", poster: "videos/posters/crypto-2.jpg", tag: "Brand film" },
    ],
  },
  {
    slug: "ugc",
    name: "UGC Library",
    kicker: "Multi-brand · Native",
    blurb: "Native-feel UGC produced through NOVA's casting pipeline. Bilingual, multi-ethnicity, scroll-stopping.",
    clips: [
      { src: "videos/ugc-1.mp4", poster: "videos/posters/ugc-1.jpg", tag: "Native UGC" },
    ],
  },
];

// Tile — handles hover-preview on desktop, lazy poster otherwise.
function ReelTile({ clip, idx, onOpen }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [hovered]);

  return (
    <button
      type="button"
      className="reel-tile"
      style={{animationDelay: `${idx * 0.04}s`}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(clip)}
      aria-label={`Play ${clip.tag}`}
    >
      <div className="reel-tile-frame">
        <video
          ref={videoRef}
          src={clip.src}
          poster={clip.poster}
          muted
          playsInline
          preload="metadata"
          loop
        />
        <div className="reel-tile-overlay">
          <span className="reel-play">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor"/>
            </svg>
          </span>
          <span className="reel-tile-tag mono">{clip.tag}</span>
        </div>
      </div>
    </button>
  );
}

// Lightbox — fullscreen autoplay with sound, click-out / ESC to close.
function ReelLightbox({ clip, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!clip) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [clip, onClose]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !clip) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [clip]);

  if (!clip) return null;

  return (
    <div className="reel-lightbox" onClick={onClose}>
      <button className="reel-close" onClick={onClose} aria-label="Close">×</button>
      <div className="reel-stage" onClick={(e) => e.stopPropagation()}>
        <video
          ref={videoRef}
          src={clip.src}
          poster={clip.poster}
          controls
          autoPlay
          playsInline
          loop
        />
        <div className="reel-stage-meta mono">{clip.tag}</div>
      </div>
    </div>
  );
}

// Main reel section
function NovaReel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxClip, setLightboxClip] = useState(null);
  const active = REEL_BRANDS[activeIdx];
  const totalClips = REEL_BRANDS.reduce((n, b) => n + b.clips.length, 0);

  return (
    <section className="reel" id="reel">
      <div className="section-head">
        <div className="label">
          <span className="num" style={{color:"rgba(255,255,255,0.5)"}}>[03.4] — Output</span>
          <span className="eyebrow" style={{color:"rgba(255,255,255,0.5)"}}>Selected Reels · {totalClips} Assets</span>
        </div>
        <h2 style={{color:"#fff"}}>
          From brief<br/>
          to asset. <span className="ital" style={{color:"rgba(255,255,255,0.5)"}}>In flight.</span>
        </h2>
      </div>

      <p className="reel-intro">
        Six brands. {totalClips} clips, all produced through the NOVA pipeline.
        Hover any tile to preview — click to play with sound.
      </p>

      <div className="reel-tabs" role="tablist">
        {REEL_BRANDS.map((b, i) => (
          <button
            key={b.slug}
            role="tab"
            aria-selected={i === activeIdx}
            className={`reel-tab ${i === activeIdx ? "active" : ""}`}
            onClick={() => setActiveIdx(i)}
            onMouseEnter={() => setActiveIdx(i)}
          >
            <span className="reel-tab-num">{String(i+1).padStart(2,"0")}</span>
            <span className="reel-tab-name">{b.name}</span>
            <span className="reel-tab-count">{b.clips.length}</span>
          </button>
        ))}
      </div>

      <div className="reel-active" key={active.slug}>
        <div className="reel-active-meta">
          <span className="reel-active-kicker mono">{active.kicker}</span>
          <h3 className="reel-active-name">{active.name}</h3>
          <p className="reel-active-blurb">{active.blurb}</p>
          <span className="reel-active-counter mono">{String(activeIdx+1).padStart(2,"0")} / {String(REEL_BRANDS.length).padStart(2,"0")}</span>
        </div>
        <div className="reel-grid" data-count={active.clips.length}>
          {active.clips.map((clip, i) => (
            <ReelTile key={clip.src} clip={clip} idx={i} onOpen={setLightboxClip} />
          ))}
        </div>
      </div>

      <ReelLightbox clip={lightboxClip} onClose={() => setLightboxClip(null)} />
    </section>
  );
}

Object.assign(window, { NovaReel });
