/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
// CUSTOM CURSOR
// ============================================================
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    
    // Hover detection
    const onOver = (e) => {
      const t = e.target;
      if (t.closest("a, button, .pillar, .case, .stage, .deliverable, .magnetic, .btn")) {
        document.body.dataset.cursor = "hover";
      } else if (t.closest("p, h1, h2, h3, h4, .display, .serif")) {
        document.body.dataset.cursor = "text";
      } else {
        document.body.dataset.cursor = "default";
      }
    };
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <React.Fragment>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={ringRef} className="cursor-ring"></div>
    </React.Fragment>
  );
}

// ============================================================
// LIVE MIAMI TIME
// ============================================================
function MiamiTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const opts = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "America/New_York" };
      setTime(new Intl.DateTimeFormat("en-US", opts).format(d));
    };
    fmt();
    const i = setInterval(fmt, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <span className="live-chip tabular">
      <span className="blip"></span>
      MIA · {time}
    </span>
  );
}

// ============================================================
// MEGAMENU DATA
// ============================================================
const MEGA = {
  Pillars: {
    intro: { kicker: "[01] · Five disciplines", title: "Growth, engineered as a system." },
    columns: [
      { title: "Amplify", desc: "Paid media at compounding scale.", num: "01", href: "pillars/amplify.html",
        sub: [
          { name: "Meta Ads",    desc: "Facebook + Instagram",   href: "pillars/amplify-meta.html" },
          { name: "Google Ads",  desc: "Search · YouTube · PMax", href: "pillars/amplify-google.html" },
          { name: "TikTok Ads",  desc: "Native creative buying",  href: "pillars/amplify-tiktok.html" },
          { name: "Programmatic",desc: "DSPs + retargeting",      href: "pillars/amplify-programmatic.html" },
        ]
      },
      { title: "Intelligence", desc: "Operational AI for revenue ops.", num: "02", href: "pillars/intelligence.html",
        sub: [
          { name: "AI Workflows",   desc: "Automations & agents",  href: "pillars/intelligence-workflows.html" },
          { name: "Revenue Ops",    desc: "Stack + attribution",   href: "pillars/intelligence-revops.html" },
          { name: "Data + BI",      desc: "Decision dashboards",   href: "pillars/intelligence-data.html" },
        ]
      },
      { title: "Reach", desc: "Organic, social, influence.", num: "03", href: "pillars/reach.html",
        sub: [
          { name: "Organic Social", desc: "Native channel craft",  href: "pillars/reach-social.html" },
          { name: "Influencer",     desc: "Casting + partnerships",href: "pillars/reach-influencer.html" },
          { name: "PR · Editorial", desc: "Earned + placement",    href: "pillars/reach-pr.html" },
        ]
      },
      { title: "Engage", desc: "Lifecycle, CRM, retention.", num: "04", href: "pillars/engage.html",
        sub: [
          { name: "Email", desc: "Klaviyo · custom flows",     href: "pillars/engage-email.html" },
          { name: "SMS",   desc: "High-intent retention",      href: "pillars/engage-sms.html" },
          { name: "CRM",   desc: "Loyalty + segmentation",     href: "pillars/engage-crm.html" },
        ]
      },
      { title: "Analyze", desc: "Attribution & decision data.", num: "05", href: "pillars/analyze.html",
        sub: [
          { name: "Attribution",   desc: "MMM + click",            href: "pillars/analyze-attribution.html" },
          { name: "Dashboards",    desc: "Operator-grade BI",       href: "pillars/analyze-dashboards.html" },
          { name: "Audits",        desc: "Performance diagnostics", href: "pillars/analyze-audits.html" },
        ]
      },
      { title: "Build", desc: "Web, product, conversion.", num: "06", href: "pillars/build.html",
        sub: [
          { name: "Shopify",   desc: "Headless · custom",     href: "pillars/build-shopify.html" },
          { name: "Web",       desc: "Editorial + CRO",       href: "pillars/build-web.html" },
          { name: "CRO",       desc: "Funnels + experiments", href: "pillars/build-cro.html" },
        ]
      },
    ]
  },
};

// ============================================================
// THEME TOGGLE — Horizon (sun ⇄ moon)
// ============================================================
// A minimal celestial toggle. The disc is the "body":
//   - Light mode = sun (full disc, with rays peeking out)
//   - Dark mode  = moon (an offset circle eclipses the disc into a crescent)
// On click the body arcs across the horizon line — a setting sun /
// rising moon — while a tiny star wakes up.
// 3-state theme toggle: Paper (sun) → Sand (palm) → Night (moon).
// Click cycles forward; the icon morphs to the next mode's glyph.
function ThemeToggle() {
  const [theme, setTheme] = useState(
    typeof document !== "undefined"
      ? (document.documentElement.dataset.theme === "light"
          ? "paper"
          : document.documentElement.dataset.theme || "paper")
      : "paper"
  );
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const obs = new MutationObserver(() => {
      const t = document.documentElement.dataset.theme || "paper";
      setTheme(t === "light" ? "paper" : t);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const cycle = { paper: "sand", sand: "dark", dark: "paper" };
  const onClick = () => {
    const next = cycle[theme] || "paper";
    setTheme(next);
    window.dispatchEvent(new CustomEvent("airea:set-theme", { detail: next }));
  };

  const labels = { paper: "Paper", sand: "Sand", dark: "Night" };
  const nextLabel = labels[cycle[theme]] || "Sand";
  const ariaLabel = `Theme: ${labels[theme]}. Switch to ${nextLabel}.`;

  return (
    <button
      type="button"
      className={`theme-toggle theme-${theme}`}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <span className="tt-stack" data-theme={theme}>
        {/* PAPER — sun (rays + disc) */}
        <svg className="tt-icon tt-paper" style={{opacity: theme === "paper" ? 1 : 0, transform: theme === "paper" ? "scale(1) rotate(0)" : "scale(0.8) rotate(-30deg)"}} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <line x1="12" y1="2.5" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="21.5" />
            <line x1="2.5" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="21.5" y2="12" />
            <line x1="5.2" y1="5.2" x2="6.9" y2="6.9" />
            <line x1="17.1" y1="17.1" x2="18.8" y2="18.8" />
            <line x1="5.2" y1="18.8" x2="6.9" y2="17.1" />
            <line x1="17.1" y1="6.9" x2="18.8" y2="5.2" />
          </g>
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </svg>

        {/* SAND — palm frond — single bold leaf shape, instantly readable at 16px */}
        <svg className="tt-icon tt-sand" style={{opacity: theme === "sand" ? 1 : 0, transform: theme === "sand" ? "scale(1) rotate(0)" : "scale(0.8) rotate(-30deg)"}} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          {/* horizon line */}
          <line x1="2" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
          {/* trunk — slight curve, thick */}
          <path d="M12.2 20 Q 11.5 14 12.5 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* fronds — 4 fat curved leaves */}
          <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none">
            <path d="M12.5 8 Q 7 5 3.5 7" />
            <path d="M12.5 8 Q 13.5 3 11 1.5" />
            <path d="M12.5 8 Q 18 5 21 8" />
            <path d="M12.5 8 Q 16 11 20 12" />
          </g>
          {/* coconut cluster */}
          <circle cx="12.5" cy="8" r="1.1" fill="currentColor" />
        </svg>

        {/* NIGHT — crescent moon */}
        <svg className="tt-icon tt-night" style={{opacity: theme === "dark" ? 1 : 0, transform: theme === "dark" ? "scale(1) rotate(0)" : "scale(0.8) rotate(-30deg)"}} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M19.5 14.5 A 8.5 8.5 0 1 1 9.5 4.5 A 6.5 6.5 0 0 0 19.5 14.5 Z" fill="currentColor" />
          {/* small star */}
          <g fill="currentColor" opacity="0.7">
            <circle cx="6" cy="6" r="0.6" />
          </g>
        </svg>
      </span>
    </button>
  );
}

// ============================================================
// NAV
// ============================================================
function Nav() {
  const [open, setOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(null);
    };
    const onEsc = (e) => { if (e.key === "Escape") setOpen(null); };
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const items = [
    { label: "Pillars", mega: "Pillars" },
    { label: "NOVA", href: "#nova" },
    { label: "Services", href: "#pillars" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Packages", href: "#packages" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
    <nav className={`nav ${open ? "nav-open" : ""} ${scrolled ? "nav-scrolled" : ""}`} ref={ref}>
      <a href="index.html" className="logo">
        <span className="dot"></span>
        AIREA
      </a>
      <div className="menu">
        {items.map((it, i) => it.mega ? (
          <button
            key={i}
            className={`menu-item ${open === it.mega ? "active" : ""}`}
            onMouseEnter={() => setOpen(it.mega)}
            onClick={() => setOpen(open === it.mega ? null : it.mega)}
          >
            {it.label} <span className="caret">＋</span>
          </button>
        ) : (
          <a key={i} href={it.href} onMouseEnter={() => setOpen(null)}>{it.label}</a>
        ))}
      </div>
      <div className="right">
        <MiamiTime />
        <ThemeToggle />
        <a href="#contact" className="magnetic">Book Audit ↗</a>
      </div>
    </nav>
    <Megamenu data={open ? MEGA[open] : null} onClose={() => setOpen(null)} />
    </>
  );
}

function Megamenu({ data, onClose }) {
  return (
    <div className={`megamenu ${data ? "open" : ""}`} onMouseLeave={onClose}>
      {data && (
        <div className="megamenu-inner">
          <div className="megamenu-intro">
            <span className="eyebrow" style={{color:"rgba(255,255,255,0.55)"}}>{data.intro.kicker}</span>
            <h3 className="serif">{data.intro.title}</h3>
            <p className="megamenu-foot">
              Each pillar runs as a standalone engagement — or compounds inside a full-stack
              retainer. Click any to enter that vertical.
            </p>
            <a className="btn megamenu-cta" href="#contact">Book a free audit <span className="arrow">↗</span></a>
          </div>
          <div className="megamenu-cols">
            {data.columns.map((c, i) => (
              <div className="megamenu-col" key={i}>
                <a className="megamenu-col-head" href={c.href}>
                  <span className="megamenu-num">{c.num}</span>
                  <span className="megamenu-title">{c.title}</span>
                  <span className="megamenu-desc">{c.desc}</span>
                </a>
                <ul className="megamenu-sub">
                  {c.sub.map((s, j) => (
                    <li key={j}>
                      <a href={s.href}>
                        <span className="s-name">{s.name}</span>
                        <span className="s-desc">{s.desc}</span>
                        <span className="s-arrow">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SPLIT TEXT (reveal on scroll)
// ============================================================
function Reveal({ children, className = "", as = "div" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); }});
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>;
}

function SplitLine({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <span ref={ref} className="split-line">
      <span>{children}</span>
    </span>
  );
}

// ============================================================
// MAGNETIC
// ============================================================
function Magnetic({ children, className = "", strength = 0.3, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) * strength;
      const y = (e.clientY - r.top - r.height/2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return <span ref={ref} className={`magnetic ${className}`} {...rest}>{children}</span>;
}

Object.assign(window, { Cursor, Nav, Reveal, SplitLine, Magnetic, MiamiTime, ThemeToggle });
