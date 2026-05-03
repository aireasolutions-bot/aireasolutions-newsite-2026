/* global React, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle */
const { useEffect } = React;

const ACCENTS = {
  Ink:    { light: "#0a0a0a", dark: "#f4f1ec" },
  Cobalt: { light: "#1a3aff", dark: "#7da7ff" },
  Acid:   { light: "#c0ff00", dark: "#c0ff00" },
  Ember:  { light: "#ff4a1c", dark: "#ff7a52" },
  Sage:   { light: "#3d6b4f", dark: "#7ec895" },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "paper",
  "accent": "Ink",
  "showGuides": false,
  "denseGrid": false
}/*EDITMODE-END*/;

function App() {
  const [t, setT] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    // Migrate legacy values: 'light' → 'paper'
    const theme = t.theme === "light" ? "paper" : t.theme;
    document.documentElement.dataset.theme = theme;
    const a = ACCENTS[t.accent] || ACCENTS.Ink;
    const isDark = theme === "dark";
    document.documentElement.style.setProperty("--accent", isDark ? a.dark : a.light);
    if (t.accent !== "Ink") {
      document.documentElement.style.setProperty("--ink", isDark ? a.dark : a.light);
    } else {
      document.documentElement.style.removeProperty("--ink");
    }
  }, [t.theme, t.accent]);

  // Allow the Nav (and anything else) to toggle theme via a custom event.
  useEffect(() => {
    // Cycle paper → sand → dark → paper
    const cycle = { paper: "sand", sand: "dark", dark: "paper", light: "sand" };
    const onToggle = () => setT("theme", cycle[t.theme] || "paper");
    const onSet = (e) => { if (e.detail) setT("theme", e.detail); };
    window.addEventListener("airea:toggle-theme", onToggle);
    window.addEventListener("airea:set-theme", onSet);
    return () => {
      window.removeEventListener("airea:toggle-theme", onToggle);
      window.removeEventListener("airea:set-theme", onSet);
    };
  }, [t.theme, setT]);

  return (
    <React.Fragment>
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <Pillars />
      <Nova />
      <Cases />
      <Process />
      <Results />
      <About />
      <Packages />
      <Contact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakRadio
            label="Mode"
            value={t.theme === "light" ? "paper" : t.theme}
            options={[{label:"Paper", value:"paper"}, {label:"Sand", value:"sand"}, {label:"Night", value:"dark"}]}
            onChange={v => setT("theme", v)}
          />
        </TweakSection>
        <TweakSection title="Accent">
          <TweakRadio
            label="Color"
            value={t.accent}
            options={Object.keys(ACCENTS).map(k => ({label:k, value:k}))}
            onChange={v => setT("accent", v)}
          />
        </TweakSection>
        <TweakSection title="Surprise">
          <TweakToggle label="Brutalist guides" value={t.showGuides} onChange={v => setT("showGuides", v)} />
          <TweakToggle label="Dense grid" value={t.denseGrid} onChange={v => setT("denseGrid", v)} />
        </TweakSection>
      </TweaksPanel>

      {t.showGuides && (
        <div className="guides" aria-hidden="true">
          {Array.from({length:14}).map((_,i) => <div key={i}></div>)}
        </div>
      )}
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
