import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, Image as ImageIcon, Film, Mic, Layers, Camera, Wand2, Palette, Megaphone,
  Fingerprint, Target, Users, BookOpen, Braces, Cpu, AudioLines, Workflow, Rocket,
  CheckCircle2, ChevronLeft, ChevronRight, Expand, Maximize2, Volume2, VolumeX, X, Play, Shield,
} from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const DELIVERABLES = [
  { icon: ImageIcon, label: 'Editorial Photography', desc: 'Campaign-grade stills, product, and lifestyle imagery.' },
  { icon: Film, label: 'Cinematic Video', desc: 'Short-form, ads, and brand films with directorial polish.' },
  { icon: Camera, label: 'UGC & Creator Content', desc: 'Native-feeling, platform-fluent social content.' },
  { icon: Mic, label: 'Voice & VO', desc: 'Cloned, licensed, and original voice for every channel.' },
  { icon: Palette, label: 'Brand Visual Systems', desc: 'Logos, palettes, typography, motion identity.' },
  { icon: Wand2, label: 'AI Avatars & Actors', desc: 'Reusable digital talent trained on brand DNA.' },
  { icon: Megaphone, label: 'Ad Creative at Scale', desc: 'Iterative Meta, TikTok, YouTube, and PMAX sets.' },
  { icon: Layers, label: 'Post, Motion & VFX', desc: 'Finishing, compositing, and sonic design.' },
];

type Stage = {
  step: string;
  icon: typeof Fingerprint;
  short: string;
  title: string;
  subtitle: string;
  body: string;
};

const STAGES: Stage[] = [
  { step: '01', icon: Fingerprint, short: 'Brand DNA',    title: 'Brand DNA Extraction',              subtitle: 'Style guide · palette · voice · visual language',          body: 'We codify your brand into a machine-readable system — typography, motion, color, tone, editorial rules — so every output is unmistakably yours.' },
  { step: '02', icon: Target,      short: 'Goal',         title: 'Campaign & Goal Framing',            subtitle: 'Tone · KPI · platform · season',                            body: 'Define the creative intent: what the asset must accomplish, where it lives, and the emotional register it operates in.' },
  { step: '03', icon: Users,       short: 'Audience',     title: 'ICP & Audience Modeling',            subtitle: 'Pain points · desires · cultural context',                 body: 'A living persona file — pains, aspirations, references, objections — read by the engine on every run.' },
  { step: '04', icon: BookOpen,    short: 'References',   title: 'Reference & Inspo Training',         subtitle: 'LLM-tuned mood, frames, editorial cues',                    body: 'Curated references are ingested into tuned models so outputs inherit the taste of the directors we admire.' },
  { step: '05', icon: Wand2,       short: 'Avatars',      title: 'Actor & Avatar Creation',            subtitle: 'Human talent · digital doubles · licensed likeness',        body: 'Real subjects or AI-crafted brand avatars — trained, versioned, and reusable across every campaign.' },
  { step: '06', icon: Braces,      short: 'Prompting',    title: 'Prompt Engineering · JSON Logic',    subtitle: 'Scenes · cuts · lighting · motion · action',                body: 'Creative direction becomes structured prompt graphs — precise, auditable, reproducible across variants.' },
  { step: '07', icon: Cpu,         short: 'Models',       title: 'LLM & Model Orchestration',          subtitle: 'Image · video · voice · 3D · lipsync',                      body: 'We route each job to the right model — Flux, Veo, Runway, Midjourney, Sora, Eleven — chosen per shot, per frame.' },
  { step: '08', icon: AudioLines,  short: 'Voice',        title: 'Voice Cloning & Sonic Layer',        subtitle: 'Ethically-licensed, brand-approved voice IDs',              body: 'A permanent voice library: founder, spokesperson, or custom — ready for narration, ads, IVR, and VO.' },
  { step: '09', icon: Workflow,    short: 'Workflow',     title: 'AI Workflow Builder · Node Graph',   subtitle: 'Chained, versioned, observable pipelines',                  body: 'Every creative run is a composable node graph — ingest → draft → review → finish → publish — with human checkpoints.' },
  { step: '10', icon: Rocket,      short: 'Delivery',     title: 'Delivery · QC · Iteration',          subtitle: 'Editorial QA · brand lock · ship',                          body: 'Human direction on every final frame. Cleared, captioned, color-corrected, delivered in every required spec.' },
];

/* ============ PROTECTED VIDEO ============ */

type ProtectedVideoProps = {
  src: string;
  poster?: string;
  aspect?: '16/9' | '9/16' | '1/1' | '4/5';
  label?: string;
  category?: string;
  expandable?: boolean;
  hoverUnmute?: boolean;
  rounded?: string;
  objectFit?: 'cover' | 'contain';
  onExpand?: () => void;
};

export function useNoSaveGuards() {
  useEffect(() => {
    const stopKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && ['s', 'S', 'u', 'U'].includes(e.key)) e.preventDefault();
    };
    window.addEventListener('keydown', stopKey);
    return () => window.removeEventListener('keydown', stopKey);
  }, []);
}

function ProtectedVideo({
  src, poster, aspect = '16/9', label, category, expandable = true, hoverUnmute = true,
  rounded = 'rounded-2xl', objectFit = 'cover', onExpand,
}: ProtectedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hoverUnmute) v.muted = !hovered;
    else v.muted = muted;
  }, [hovered, muted, hoverUnmute]);

  useEffect(() => {
    const el = wrapRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { rootMargin: '200px', threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const requestFullscreen = () => {
    const el = wrapRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> }) | null;
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    try {
      if (el?.requestFullscreen) return void el.requestFullscreen();
      if (el?.webkitRequestFullscreen) return void el.webkitRequestFullscreen();
      if (v?.webkitEnterFullscreen) return void v.webkitEnterFullscreen();
    } catch {
      /* noop */
    }
  };

  const stopEvent = (e: React.SyntheticEvent) => { e.preventDefault(); };

  const aspectClass =
    aspect === '9/16' ? 'aspect-[9/16]' :
    aspect === '1/1' ? 'aspect-square' :
    aspect === '4/5' ? 'aspect-[4/5]' : 'aspect-video';

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden group ${rounded} select-none`}
      style={{ backgroundColor: '#0A0907' }}
      onContextMenu={stopEvent}
      onDragStart={stopEvent}
      onMouseEnter={() => { setHovered(true); setShowHint(true); setTimeout(() => setShowHint(false), 1800); }}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`${aspectClass} w-full relative`}>
        {!loaded && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: '#0A0907' }}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: 'var(--color-gold)', borderTopColor: 'transparent' }}
            />
          </div>
        )}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
          onCanPlay={() => { setLoaded(true); videoRef.current?.play().catch(() => {}); }}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noremoteplayback noplaybackrate"
          onContextMenu={stopEvent}
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${objectFit === 'contain' ? 'object-contain' : 'object-cover'} ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
        />
        {/* Invisible capture layer to block right-click/save on the video element itself */}
        <div className="absolute inset-0" onContextMenu={stopEvent} />

        {/* Top chips */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          {category && (
            <span
              className="mono-eyebrow px-2 py-1 rounded-full text-[9px] font-semibold backdrop-blur-md"
              style={{ backgroundColor: 'rgba(15,14,12,0.65)', color: 'var(--color-gold)', border: '1px solid rgba(201,169,110,0.35)' }}
            >
              {category}
            </span>
          )}
          <span
            className="mono-eyebrow px-2 py-1 rounded-full text-[9px] inline-flex items-center gap-1 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(15,14,12,0.65)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <Shield size={9} /> Protected
          </span>
        </div>

        {/* Bottom label + controls */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 flex items-end justify-between gap-2 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.55))' }}>
          {label && (
            <div className="text-white text-xs md:text-sm font-semibold drop-shadow">
              {label}
            </div>
          )}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {hoverUnmute && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
                className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(15,14,12,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
                aria-label={hovered ? 'muted on hover' : 'muted'}
              >
                {hovered ? <Volume2 size={13} /> : <VolumeX size={13} />}
              </button>
            )}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); requestFullscreen(); }}
              className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
              style={{ backgroundColor: 'rgba(15,14,12,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
              aria-label="Fullscreen"
            >
              <Maximize2 size={13} />
            </button>
            {expandable && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onExpand?.(); }}
                className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
                style={{ backgroundColor: 'var(--color-gold)', color: '#0E0C0A' }}
                aria-label="Expand"
              >
                <Expand size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Hover hint */}
        <AnimatePresence>
          {showHint && hovered && hoverUnmute && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mono-eyebrow px-3 py-1.5 rounded-full pointer-events-none"
              style={{ backgroundColor: 'rgba(15,14,12,0.8)', color: 'white', border: '1px solid rgba(201,169,110,0.4)' }}
            >
              Sound on
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grain overlay to deter screenshot forging */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.05]"
          style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.5'/></svg>\")" }}
        />
      </div>
    </div>
  );
}

export function VideoLightbox({ item, onClose }: { item: ShowcaseItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [item, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: 'rgba(8,7,6,0.92)', backdropFilter: 'blur(16px)' }}
          onClick={onClose}
          onContextMenu={(e) => e.preventDefault()}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className={`relative w-full ${item.aspect === '9/16' ? 'max-w-sm md:max-w-md' : 'max-w-5xl'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-12 right-0 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <X size={16} />
            </button>
            <ProtectedVideo
              key={item.id}
              src={item.src}
              aspect={item.aspect}
              label={item.label}
              category={item.category}
              expandable={false}
              hoverUnmute={true}
              rounded="rounded-3xl"
            />
            <div className="mt-5 flex items-center justify-between gap-4 text-white">
              <div>
                <div className="mono-eyebrow" style={{ color: 'var(--color-gold)' }}>{item.category}</div>
                <div className="mt-1 font-semibold">{item.label}</div>
              </div>
              <div className="mono-eyebrow text-[10px] opacity-60 inline-flex items-center gap-1.5">
                <Shield size={10} /> Download disabled · NOVA © AIREA
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ============ SHOWCASE DATA ============ */

type ShowcaseItem = {
  id: string;
  src: string;
  aspect: '16/9' | '9/16';
  label: string;
  category: string;
  tags: string[];
};

export const NOVA_HERO_VIDEO = 'https://www.image2url.com/r2/default/videos/1777695690361-5075b66d-1c52-46c2-bb31-11067dc80df2.mp4';

export type { ShowcaseItem };

export const SHOWCASE: ShowcaseItem[] = [
  { id: 's1',  src: 'https://image2url.com/r2/default/videos/1773381312661-f7c08799-d939-4d4c-bd80-e32aad2f1c2d.mp4',     aspect: '16/9', label: 'Website Hero Asset', category: 'Website', tags: ['Website'] },
  { id: 's2',  src: 'https://www.image2url.com/r2/default/videos/1777384473229-8825b8b0-a78c-40a5-88eb-e6f3e975dcbf.mp4', aspect: '16/9', label: 'Above-fold Film',    category: 'Website', tags: ['Website'] },
  { id: 's3',  src: 'https://www.image2url.com/r2/default/videos/1777384539746-6bcc8cc7-9e83-4699-85ba-cc9032ae5773.mp4', aspect: '9/16', label: 'Vertical Brand Reel', category: 'Social', tags: ['Website', 'Social'] },
  { id: 's4',  src: 'https://www.image2url.com/r2/default/videos/1777384584613-6ee65af1-e42e-42cd-b962-f510b6088974.mp4', aspect: '9/16', label: 'Vertical Campaign',   category: 'Social', tags: ['Website', 'Social'] },
  { id: 's5',  src: 'https://www.image2url.com/r2/default/videos/1777384798872-7ea47883-a682-4a07-bbd5-efd8ca154a05.mp4', aspect: '9/16', label: 'Retail Editorial',    category: 'Retail', tags: ['Retail'] },
  { id: 's6',  src: 'https://www.image2url.com/r2/default/videos/1777384768697-2fc31c7d-53e4-4da1-817e-d0053edee31f.mp4', aspect: '9/16', label: 'Product Focus · Macro', category: 'Product', tags: ['Product'] },
  { id: 's7',  src: 'https://www.image2url.com/r2/default/videos/1777384858359-8a1daba7-cde1-45fd-bb7e-3a332c7ac89e.mp4', aspect: '9/16', label: 'Product in Motion',   category: 'Product', tags: ['Product'] },
  { id: 's8',  src: 'https://www.image2url.com/r2/default/videos/1777384829943-9cdb0e5b-052d-41cd-8207-b9f632fa30e8.mp4', aspect: '9/16', label: 'UGC · Creator Voice', category: 'UGC', tags: ['UGC'] },
  { id: 's9',  src: 'https://www.image2url.com/r2/default/videos/1777384436375-bc2c2827-cd00-4f54-aab6-5edf076886ab.mp4', aspect: '16/9', label: 'Explainer Film',       category: 'Explainer', tags: ['Explainer'] },
  { id: 's10', src: 'https://www.image2url.com/r2/default/videos/1777694711832-f1622e17-0cc3-4dc3-8a37-2547530fe6b6.mp4', aspect: '9/16', label: 'Commercial Spot',      category: 'Commercial', tags: ['Commercial'] },
  { id: 's11', src: 'https://www.image2url.com/r2/default/videos/1777694764675-c8ec1b45-4aca-437c-b637-7eae0199b644.mp4', aspect: '16/9', label: 'TV Spot',              category: 'Commercial', tags: ['Commercial'] },
  { id: 's12', src: 'https://www.image2url.com/r2/default/videos/1777694914784-e9edab70-0a7e-4628-a0d0-b4d1568d1868.mp4', aspect: '9/16', label: 'Motion Design',        category: 'Motion', tags: ['Motion'] },
  { id: 's13', src: 'https://www.image2url.com/r2/default/videos/1777694979149-fb056185-f3ff-4fdb-9bd2-c87fce467119.mp4', aspect: '16/9', label: 'UGC · Native Ad',      category: 'UGC', tags: ['UGC'] },
  { id: 's14', src: 'https://www.image2url.com/r2/default/videos/1777695459715-43dce0f2-7125-4590-9265-ad51614ea73d.mp4', aspect: '16/9', label: 'Rocci Avatar · Product Ad', category: 'Avatar', tags: ['Avatar'] },
  { id: 's15', src: 'https://www.image2url.com/r2/default/videos/1777695584753-3d8f5827-f4a6-4dde-8a68-e4c7f20510b8.mp4', aspect: '9/16', label: 'Rocci Avatar · Reel',     category: 'Avatar', tags: ['Avatar'] },
  { id: 's16', src: 'https://www.image2url.com/r2/default/videos/1777695690361-5075b66d-1c52-46c2-bb31-11067dc80df2.mp4', aspect: '16/9', label: 'Rocci Avatar · Commercial', category: 'Avatar', tags: ['Avatar'] },
  { id: 's17', src: 'https://www.image2url.com/r2/default/videos/1777866621685-ffd2d2d9-217c-46fe-bd4f-47bd2f9b9506.mp4', aspect: '9/16', label: 'Product Reveal',          category: 'Product',    tags: ['Product'] },
  { id: 's18', src: 'https://www.image2url.com/r2/default/videos/1777866726499-dc5b4549-a8c2-4abb-8d08-8b80cbf4dfd7.mp4', aspect: '16/9', label: 'Streaming · YouTube Ad',  category: 'Social',     tags: ['Social', 'Commercial'] },
  { id: 's19', src: 'https://www.image2url.com/r2/default/videos/1777866750568-58dd4ad8-ce2d-416e-a698-090a7813fe6d.mp4', aspect: '16/9', label: 'Streaming · Social Ad',   category: 'Social',     tags: ['Social', 'Commercial'] },
  { id: 's20', src: 'https://www.image2url.com/r2/default/videos/1777866778576-ab77b37d-3c64-4285-a9b9-f747915c061d.mp4', aspect: '9/16', label: 'Product Focus · Macro',   category: 'Product',    tags: ['Product'] },
  { id: 's21', src: 'https://www.image2url.com/r2/default/videos/1777866811453-b90c547f-8f09-4f93-9e41-b631faadb1d2.mp4', aspect: '9/16', label: 'Product Focus · Texture', category: 'Product',    tags: ['Product'] },
  { id: 's22', src: 'https://www.image2url.com/r2/default/videos/1777866819179-7cc6af0f-63e1-43fd-a4cb-45fdb640d569.mp4', aspect: '9/16', label: 'Product Focus · Ritual',  category: 'Product',    tags: ['Product'] },
  { id: 's23', src: 'https://www.image2url.com/r2/default/videos/1777867028667-e72a28ed-f70d-4c09-91d5-974f7ff970c0.mp4', aspect: '9/16', label: 'Product Focus · Drop',    category: 'Product',    tags: ['Product'] },
  { id: 's24', src: 'https://www.image2url.com/r2/default/videos/1777866928435-02662796-7a50-44bb-ae3e-2690c8641a1e.mp4', aspect: '9/16', label: 'Retail Focus · Editorial',category: 'Retail',     tags: ['Retail'] },
  { id: 's25', src: 'https://www.image2url.com/r2/default/videos/1777867113406-39076504-da84-4cf0-b727-1e8b897712f4.mp4', aspect: '9/16', label: 'Retail Focus · Shelf',    category: 'Retail',     tags: ['Retail'] },
  { id: 's26', src: 'https://www.image2url.com/r2/default/videos/1777867134509-eaef324c-6af9-40c2-8952-de822123f584.mp4', aspect: '9/16', label: 'Retail Focus · Display',  category: 'Retail',     tags: ['Retail'] },
  { id: 's27', src: 'https://www.image2url.com/r2/default/videos/1777867159866-87f26cb3-0537-4bca-bdb2-b36bc0ccf040.mp4', aspect: '9/16', label: 'Retail Focus · Campaign', category: 'Retail',     tags: ['Retail'] },
];

const CATEGORIES = [
  { id: 'All', label: 'All' },
  { id: 'Website', label: 'Website' },
  { id: 'Retail', label: 'Retail' },
  { id: 'Product', label: 'Product' },
  { id: 'UGC', label: 'UGC' },
  { id: 'Explainer', label: 'Explainers' },
  { id: 'Commercial', label: 'Commercial' },
  { id: 'Motion', label: 'Motion' },
  { id: 'Avatar', label: 'Avatars' },
];

/* ============ NOVA HERO ============ */

function NovaHero({ onExpand }: { onExpand: (item: ShowcaseItem) => void }) {
  const heroItem: ShowcaseItem = {
    id: 'nova-hero',
    src: NOVA_HERO_VIDEO,
    aspect: '16/9',
    label: 'Rocci Avatar · Commercial',
    category: 'NOVA Showreel',
    tags: ['Avatar'],
  };
  return (
    <div className="relative">
      <div className="grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-14 items-center">
        <div className="relative">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="mono-eyebrow flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-gold)' }}>
              <Sparkles size={11} /> AIREA × NOVA · v2.4 LIVE
            </div>
            <p className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>
              [Slide 01] — Introducing
            </p>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="display-serif leading-[0.88] tracking-tight"
            style={{ color: 'var(--color-text)', fontSize: 'clamp(4.5rem, 12vw, 10rem)' }}
          >
            NOVA
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-2 flex items-center gap-3"
          >
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-border-strong)' }} />
            <span className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>Editorial AI Production</span>
          </motion.div>

          <p className="display-serif ital-accent mt-6 text-2xl md:text-3xl leading-snug" style={{ color: 'var(--color-text)' }}>
            The AI Creative Engine — <br className="hidden md:block" />
            engineered for your <span style={{ color: 'var(--color-gold)' }}>brand DNA</span>.
          </p>
          <p className="mt-6 text-base md:text-lg leading-relaxed max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Built for brands obsessed with creative volume that compounds. Photography, film, voice,
            avatars — produced on one brand-locked pipeline.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
            {[
              ['10', 'Pipeline stages'],
              ['8', 'Output formats'],
              ['72h', 'First sample'],
            ].map(([k, v]) => (
              <div key={v} className="rounded-xl border p-3 md:p-4" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                <div className="display-serif text-2xl md:text-3xl" style={{ color: 'var(--color-gold)' }}>{k}</div>
                <div className="mono-eyebrow mt-1" style={{ color: 'var(--color-text-muted)' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="absolute -inset-6 rounded-[2rem] blur-3xl pointer-events-none opacity-60"
              style={{ background: 'radial-gradient(ellipse at center, var(--color-gold), transparent 60%)' }}
            />
            <div className="relative rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--color-border-strong)' }}>
              <ProtectedVideo
                src={NOVA_HERO_VIDEO}
                aspect="16/9"
                label="Rocci Avatar · NOVA Showreel"
                category="Hero · 4K"
                rounded="rounded-3xl"
                onExpand={() => onExpand(heroItem)}
              />
            </div>
            <div className="absolute -bottom-4 left-4 right-4 flex items-center justify-between px-4 py-3 rounded-2xl border backdrop-blur-md" style={{ borderColor: 'var(--color-border-strong)', backgroundColor: 'rgba(15,14,12,0.72)' }}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-gold)' }} />
                <span className="mono-eyebrow text-white/80">Hover for audio · click to expand</span>
              </div>
              <span className="mono-eyebrow text-white/60 inline-flex items-center gap-1.5"><Shield size={10} /> No download</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ============ SHOWCASE GRID ============ */

function ShowcaseTile({ item, onExpand }: { item: ShowcaseItem; onExpand: (i: ShowcaseItem) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [detectedAspect, setDetectedAspect] = useState<'16/9' | '9/16'>(item.aspect);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleMetadata = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth || !v.videoHeight) return;
    setDetectedAspect(v.videoWidth >= v.videoHeight ? '16/9' : '9/16');
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = videoRef.current;
          if (e.isIntersecting) {
            setShouldLoad(true);
            if (v) v.play().catch(() => {});
          } else if (v) {
            v.pause();
          }
        });
      },
      { rootMargin: '300px 500px', threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const widthClass = detectedAspect === '16/9' ? 'w-[480px] md:w-[620px]' : 'w-[152px] md:w-[196px]';
  return (
    <div ref={containerRef} className={`shrink-0 ${widthClass} h-[270px] md:h-[349px]`}>
      <button
        type="button"
        onClick={() => onExpand({ ...item, aspect: detectedAspect })}
        onContextMenu={(e) => e.preventDefault()}
        className="group relative w-full h-full rounded-2xl overflow-hidden border block transition-transform duration-500 hover:scale-[1.015]"
        style={{ borderColor: 'var(--color-border)', backgroundColor: '#0A0907' }}
        aria-label={`Expand ${item.label}`}
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: '#0A0907' }}>
            <div
              className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin opacity-60"
              style={{ borderColor: 'var(--color-gold)', borderTopColor: 'transparent' }}
            />
          </div>
        )}
        {shouldLoad && (
          <video
            ref={videoRef}
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={handleMetadata}
            onLoadedData={() => setLoaded(true)}
            onCanPlay={() => { setLoaded(true); videoRef.current?.play().catch(() => {}); }}
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload noremoteplayback noplaybackrate"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none opacity-70 group-hover:opacity-0 transition-opacity duration-500"
          style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.8) 100%)' }}
        />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          <span className="mono-eyebrow text-[9px] px-2 py-1 rounded-full backdrop-blur-md" style={{ backgroundColor: 'rgba(15,14,12,0.65)', color: 'var(--color-gold)', border: '1px solid rgba(201,169,110,0.35)' }}>
            {item.category}
          </span>
          <span className="mono-eyebrow text-[9px] px-2 py-1 rounded-full backdrop-blur-md" style={{ backgroundColor: 'rgba(15,14,12,0.65)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.12)' }}>
            {detectedAspect}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-gold)', color: '#0E0C0A', boxShadow: '0 0 50px var(--color-glow)' }}
          >
            <Play size={18} fill="#0E0C0A" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 flex items-end justify-between gap-2 text-white pointer-events-none">
          <div className="text-xs md:text-sm font-semibold drop-shadow">{item.label}</div>
        </div>
      </button>
    </div>
  );
}

export function NovaShowcase({ onExpand }: { onExpand: (item: ShowcaseItem) => void }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(70);
  const [progress, setProgress] = useState(0);

  const loop = useMemo(() => [...SHOWCASE, ...SHOWCASE, ...SHOWCASE], []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    let virtual = el.scrollLeft;
    let initialized = false;

    const init = () => {
      if (initialized) return;
      const oneThird = el.scrollWidth / 3;
      if (oneThird > 0) {
        virtual = oneThird;
        el.scrollLeft = oneThird;
        initialized = true;
      }
    };
    init();

    const onUserScroll = () => {
      if (paused) virtual = el.scrollLeft;
    };
    el.addEventListener('scroll', onUserScroll, { passive: true });

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      init();
      const oneThird = el.scrollWidth / 3;
      if (oneThird > 0) {
        if (!paused) {
          virtual += (dt / 1000) * speed;
          if (virtual >= oneThird * 2) virtual -= oneThird;
          else if (virtual < oneThird * 0.5) virtual += oneThird;
          el.scrollLeft = virtual;
        } else {
          if (el.scrollLeft >= oneThird * 2) {
            el.scrollLeft -= oneThird;
            virtual = el.scrollLeft;
          } else if (el.scrollLeft < oneThird * 0.5) {
            el.scrollLeft += oneThird;
            virtual = el.scrollLeft;
          }
        }
        const rel = ((el.scrollLeft - oneThird) / oneThird + 1) % 1;
        setProgress(rel);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onUserScroll);
    };
  }, [paused, speed]);

  const nudge = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = dir * (el.clientWidth * 0.6);
    const start = el.scrollLeft;
    const target = start + delta;
    const duration = 600;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      el.scrollLeft = start + (target - start) * ease(t);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="mt-28 md:mt-40">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8 md:mb-10">
        <div className="max-w-2xl">
          <p className="mono-eyebrow mb-3" style={{ color: 'var(--color-text-muted)' }}>
            Showcase
          </p>
          <h3 className="display-serif text-3xl md:text-5xl lg:text-6xl" style={{ color: 'var(--color-text)' }}>
            Formats. Aspect ratios.{' '}
            <span className="ital-accent">Every canvas.</span>
          </h3>
          <p className="mt-5 text-base md:text-lg" style={{ color: 'var(--color-text-muted)' }}>
            A continuous reel of NOVA outputs — 16:9, 9:16, retail, product, UGC, commercial, avatars. Click any tile to expand.
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => nudge(-1)}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:scale-105"
              style={{ borderColor: 'var(--color-border-strong)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setPaused((p) => !p)}
              className="mono-eyebrow px-4 h-11 rounded-full border inline-flex items-center gap-2 transition-all hover:scale-105"
              style={{ borderColor: 'var(--color-border-strong)', backgroundColor: paused ? 'var(--color-gold)' : 'var(--color-surface)', color: paused ? '#0E0C0A' : 'var(--color-text)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: paused ? '#0E0C0A' : 'var(--color-gold)' }} />
              {paused ? 'Paused' : 'Auto-scroll'}
            </button>
            <button
              onClick={() => nudge(1)}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:scale-105"
              style={{ borderColor: 'var(--color-border-strong)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative marquee-fade-left">
        <div
          ref={scrollerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-6"
          style={{ scrollbarWidth: 'none', scrollBehavior: 'auto' }}
        >
          {loop.map((item, i) => (
            <ShowcaseTile key={`${item.id}-${i}`} item={item} onExpand={onExpand} />
          ))}
        </div>

        {/* Side arrow buttons floating over reel */}
        <button
          onClick={() => nudge(-1)}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 z-10 w-12 h-12 rounded-full items-center justify-center backdrop-blur-md transition-all hover:scale-110"
          style={{ backgroundColor: 'rgba(15,14,12,0.72)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => nudge(1)}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 z-10 w-12 h-12 rounded-full items-center justify-center backdrop-blur-md transition-all hover:scale-110"
          style={{ backgroundColor: 'rgba(15,14,12,0.72)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Speed control + progress */}
      <div className="mt-6 flex items-center gap-5 flex-wrap">
        <div className="flex items-center gap-3 min-w-[220px]">
          <span className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>Speed</span>
          <input
            type="range"
            min={20}
            max={180}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="nova-speed-range flex-1"
            aria-label="Showcase scroll speed"
          />
          <span className="mono-eyebrow tabular-nums" style={{ color: 'var(--color-gold)' }}>{speed}px/s</span>
        </div>
        <div className="flex-1 min-w-[200px] h-px relative overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{ backgroundColor: 'var(--color-gold)', width: `${Math.max(2, progress * 100)}%` }}
            transition={{ ease: 'linear', duration: 0 }}
          />
        </div>
        <span className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>
          {SHOWCASE.length} outputs · looping
        </span>
      </div>
    </div>
  );
}

/* ============ VISUALIZATIONS ============ */

const VizFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div
    className={`relative rounded-2xl border overflow-hidden h-full ${className || ''}`}
    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
  >
    <div
      className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
      style={{ backgroundColor: 'var(--color-gold)', opacity: 0.12 }}
    />
    {children}
  </div>
);

function VizBrandDNA() {
  const palette = ['#0F0E0C', '#F3EFE6', '#8B6914', '#0F4C3A', '#C9A96E', '#A8967A'];
  return (
    <VizFrame>
      <div className="relative p-6 md:p-8 h-full flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="mono-eyebrow" style={{ color: 'var(--color-gold)' }}>brand.dna</span>
          <span className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>v2.4 · locked</span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {palette.map((c, i) => (
            <motion.div
              key={c}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square rounded-lg ring-1 ring-black/10"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <div className="rounded-xl p-4 border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
          <div className="display-serif text-4xl" style={{ color: 'var(--color-text)' }}>Aa</div>
          <div className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>Fraunces · Inter Tight · JetBrains Mono</div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {[
            ['Tone', 'Editorial'],
            ['Pace', 'Deliberate'],
            ['Grade', 'Warm filmic'],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg p-3 border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
              <div className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>{k}</div>
              <div className="mt-1 font-medium" style={{ color: 'var(--color-text)' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </VizFrame>
  );
}

function VizGoal() {
  const bars = [72, 88, 54, 91];
  return (
    <VizFrame>
      <div className="relative p-6 md:p-8 h-full flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="mono-eyebrow" style={{ color: 'var(--color-gold)' }}>brief.targets</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>live</span>
          </div>
        </div>
        <div className="rounded-xl p-4 border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Campaign</div>
          <div className="text-xl font-semibold mt-1" style={{ color: 'var(--color-text)' }}>Q3 · Rooftop Season</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {['Meta', 'TikTok', 'Email', 'OOH'].map((t) => (
              <span key={t} className="mono-eyebrow px-2 py-1 rounded-full border" style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-secondary)' }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {['CTR', 'ROAS', 'CAC', 'LTV'].map((k, i) => (
            <div key={k} className="flex flex-col gap-2">
              <div className="h-20 rounded-md flex items-end overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${bars[i]}%` }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-t-md"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                />
              </div>
              <div className="mono-eyebrow text-center" style={{ color: 'var(--color-text-muted)' }}>{k}</div>
            </div>
          ))}
        </div>
      </div>
    </VizFrame>
  );
}

function VizICP() {
  return (
    <VizFrame>
      <div className="relative p-6 md:p-8 h-full grid grid-cols-5 gap-5">
        <div className="col-span-2 rounded-xl overflow-hidden relative" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 30%, var(--color-gold) 0%, transparent 55%)', opacity: 0.25 }} />
          <div className="relative p-4 flex flex-col h-full justify-between">
            <div>
              <div className="mono-eyebrow" style={{ color: 'var(--color-gold)' }}>persona.001</div>
              <div className="mt-8 text-lg font-semibold" style={{ color: 'var(--color-text)' }}>Sophia · 34</div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>NYC · design lead</div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {['Brunch', 'Art', 'Travel', 'Wellness'].map((t) => (
                <span key={t} className="mono-eyebrow px-2 py-1 rounded-full text-center border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-3">
          {[
            { k: 'Pain', v: 'Predictable dining scene' },
            { k: 'Desire', v: 'Scene-setting moments' },
            { k: 'Objection', v: 'Tourist-trap vibe' },
            { k: 'Trigger', v: 'Thursday evening scroll' },
          ].map((row, i) => (
            <motion.div
              key={row.k}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-lg p-3 border flex items-center gap-3"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
            >
              <div className="mono-eyebrow w-16 shrink-0" style={{ color: 'var(--color-gold)' }}>{row.k}</div>
              <div className="text-sm" style={{ color: 'var(--color-text)' }}>{row.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </VizFrame>
  );
}

function VizReferences() {
  const refs = [
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&q=80',
    'https://images.unsplash.com/photo-1505937014721-85c03b3b6be3?w=500&q=80',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80',
  ];
  return (
    <VizFrame>
      <div className="relative p-6 md:p-8 h-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="mono-eyebrow" style={{ color: 'var(--color-gold)' }}>moodboard.train</span>
          <span className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>248 references · ingested</span>
        </div>
        <div className="grid grid-cols-3 gap-2 flex-1">
          {refs.map((src, i) => (
            <motion.div
              key={src}
              initial={{ y: 10, opacity: 0, rotate: (i % 2 ? 1 : -1) * 3 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg overflow-hidden aspect-[4/5]"
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </VizFrame>
  );
}

function VizAvatar() {
  return (
    <VizFrame>
      <div className="relative p-6 md:p-8 h-full grid grid-cols-5 gap-5">
        <div className="col-span-2 relative rounded-xl overflow-hidden border" style={{ borderColor: 'var(--color-border-strong)' }}>
          <img src="https://i.imgur.com/JzNIP54.jpeg" alt="Rocci" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.85) 100%)' }} />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="text-[9px] font-mono uppercase tracking-widest text-white/70">subject · 001</div>
            <div className="text-lg font-semibold text-white mt-0.5">Rocci</div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/80">Avatar trained</span>
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-3">
          <div className="rounded-lg p-4 border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
            <div className="mono-eyebrow mb-2" style={{ color: 'var(--color-text-muted)' }}>Avatar profile</div>
            {[
              ['Likeness lock', '98.4%'],
              ['Voice clone', 'Ready'],
              ['Wardrobe sets', '12'],
              ['Scene presets', '28'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs py-1.5 border-t first:border-t-0" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
                <span className="opacity-70">{k}</span>
                <span className="font-medium" style={{ color: 'var(--color-gold)' }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="rounded-lg p-4 border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
            <div className="mono-eyebrow mb-2" style={{ color: 'var(--color-text-muted)' }}>Usage rights</div>
            <div className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Perpetual, brand-exclusive, governed by signed release &amp; data-residency.
            </div>
          </div>
        </div>
      </div>
    </VizFrame>
  );
}

const PROMPT_JSON = `{
  "scene": "rooftop golden hour, Miami skyline",
  "subject": "Rocci — founder, brand avatar",
  "wardrobe": "tailored ivory linen suit",
  "lighting": {
    "key": "warm 4800K, low angle",
    "fill": "soft bounce, -1.5 stop",
    "rim": "magenta practical"
  },
  "camera": {
    "lens": "35mm anamorphic",
    "movement": "slow dolly-in, parallax left"
  },
  "action": "turns, half-smile, two-beat hold",
  "grade": "editorial film, teal-amber, grain 0.3",
  "duration": "00:06",
  "aspect": "9:16"
}`;

function VizPrompt() {
  return (
    <VizFrame>
      <div className="relative p-6 md:p-8 h-full">
        <div
          className="rounded-xl overflow-hidden border h-full flex flex-col"
          style={{ backgroundColor: '#0E0C0A', borderColor: 'rgba(244,241,236,0.10)' }}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(244,241,236,0.10)' }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28C840' }} />
            <span className="ml-auto text-[10px] font-mono" style={{ color: '#8A8178' }}>scene.prompt.json</span>
          </div>
          <pre className="text-[11px] md:text-xs p-5 overflow-auto leading-relaxed font-mono flex-1" style={{ color: '#E3C888' }}>
            <code>
              {PROMPT_JSON.split('\n').map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  style={{ color: /\"[a-z_]+\":/i.test(line) ? '#C9A96E' : /:\s*\"/.test(line) ? '#A8D5BA' : '#C9BFB3' }}
                >
                  {line}
                </motion.div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </VizFrame>
  );
}

function VizModels() {
  const models = [
    { name: 'Flux Pro', tag: 'image', pct: 94 },
    { name: 'Veo 3',    tag: 'video', pct: 88 },
    { name: 'Runway',   tag: 'video', pct: 81 },
    { name: 'Midjourney', tag: 'image', pct: 76 },
    { name: 'Sora',     tag: 'video', pct: 72 },
    { name: 'Eleven',   tag: 'voice', pct: 96 },
  ];
  return (
    <VizFrame>
      <div className="relative p-6 md:p-8 h-full flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="mono-eyebrow" style={{ color: 'var(--color-gold)' }}>orchestrator.route</span>
          <span className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>6 models online</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {models.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg p-3 border"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{m.name}</div>
                <span className="mono-eyebrow px-1.5 py-0.5 rounded border" style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-muted)' }}>{m.tag}</span>
              </div>
              <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.pct}%` }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                />
              </div>
              <div className="mt-1 mono-eyebrow text-right" style={{ color: 'var(--color-text-muted)' }}>{m.pct}% fit</div>
            </motion.div>
          ))}
        </div>
      </div>
    </VizFrame>
  );
}

function VizVoice() {
  const bars = Array.from({ length: 42 }, (_, i) => 20 + Math.abs(Math.sin(i * 0.5)) * 75);
  return (
    <VizFrame>
      <div className="relative p-6 md:p-8 h-full flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="mono-eyebrow" style={{ color: 'var(--color-gold)' }}>voice.clone</span>
          <span className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>48 kHz · 3m sample</span>
        </div>
        <div className="rounded-xl p-6 border flex-1 flex items-center gap-1" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="rounded-full flex-1"
              style={{ backgroundColor: 'var(--color-gold)' }}
              animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.5}%`] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.03, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs">
          {[['Pitch', 'C3'], ['Timbre', 'Warm'], ['Cadence', 'Measured']].map(([k, v]) => (
            <div key={k} className="rounded-lg p-3 border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
              <div className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>{k}</div>
              <div className="mt-1 font-medium" style={{ color: 'var(--color-text)' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </VizFrame>
  );
}

function VizWorkflow() {
  type Node = {
    id: string; label: string; kind: string; io: string;
    x: number; y: number; w: number; h: number; status: 'ok' | 'run' | 'wait';
  };
  const nodes: Node[] = [
    { id: 'brief',  label: 'Brief',       kind: 'Input',    io: 'json',  x: 3,  y: 34, w: 20, h: 14, status: 'ok'  },
    { id: 'refs',   label: 'References',  kind: 'Ingest',   io: 'image', x: 3,  y: 58, w: 20, h: 14, status: 'ok'  },
    { id: 'dna',    label: 'Brand DNA',   kind: 'Model',    io: 'weights', x: 28, y: 12, w: 20, h: 14, status: 'ok' },
    { id: 'draft',  label: 'Draft Gen',   kind: 'LLM',      io: 'mixed', x: 28, y: 44, w: 22, h: 16, status: 'run' },
    { id: 'score',  label: 'Scoring',     kind: 'Rubric',   io: 'json',  x: 55, y: 26, w: 20, h: 14, status: 'run' },
    { id: 'qc',     label: 'Human QC',    kind: 'Approval', io: 'event', x: 55, y: 58, w: 20, h: 14, status: 'wait' },
    { id: 'finish', label: 'Finish',      kind: 'Render',   io: 'video', x: 80, y: 40, w: 17, h: 14, status: 'wait' },
  ];
  const edges: [string, string][] = [
    ['brief', 'dna'], ['brief', 'draft'], ['refs', 'draft'], ['dna', 'draft'],
    ['draft', 'score'], ['draft', 'qc'], ['score', 'finish'], ['qc', 'finish'],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const portOut = (n: Node) => ({ x: n.x + n.w, y: n.y + n.h / 2 });
  const portIn  = (n: Node) => ({ x: n.x,       y: n.y + n.h / 2 });
  const pathFor = (a: Node, b: Node) => {
    const p1 = portOut(a); const p2 = portIn(b);
    const dx = Math.max(6, (p2.x - p1.x) / 2);
    return `M ${p1.x} ${p1.y} C ${p1.x + dx} ${p1.y}, ${p2.x - dx} ${p2.y}, ${p2.x} ${p2.y}`;
  };

  const statusColor = (s: Node['status']) =>
    s === 'ok' ? '#10B981' : s === 'run' ? 'var(--color-gold)' : '#8A8178';

  return (
    <VizFrame>
      <div className="relative p-5 md:p-6 h-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="mono-eyebrow" style={{ color: 'var(--color-gold)' }}>workflow.graph</span>
            <span className="mono-eyebrow px-1.5 py-0.5 rounded border" style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-muted)' }}>v3.1</span>
          </div>
          <div className="flex items-center gap-3 mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#10B981' }} /> ok</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-gold)' }} /> running</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#8A8178' }} /> waiting</span>
          </div>
        </div>
        <div
          className="relative rounded-xl border flex-1 overflow-hidden"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--color-border-strong) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        >
          <svg viewBox="0 0 100 80" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wf-edge" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.9" />
              </linearGradient>
              <radialGradient id="wf-particle" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
              </radialGradient>
            </defs>
            {edges.map(([a, b], i) => {
              const d = pathFor(byId[a], byId[b]);
              return (
                <g key={`${a}-${b}`}>
                  <motion.path
                    d={d} fill="none" stroke="url(#wf-edge)" strokeWidth={0.35}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <circle r={0.6} fill="url(#wf-particle)">
                    <animateMotion dur={`${2.4 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} path={d} />
                  </circle>
                </g>
              );
            })}
          </svg>

          {nodes.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ scale: 0.85, opacity: 0, y: 6 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 280, damping: 22 }}
              className="absolute rounded-lg border overflow-hidden"
              style={{
                left: `${n.x}%`, top: `${n.y}%`,
                width: `${n.w}%`, height: `${n.h}%`,
                backgroundColor: 'var(--color-surface)',
                borderColor: n.status === 'run' ? 'var(--color-gold)' : 'var(--color-border-strong)',
                boxShadow: n.status === 'run' ? '0 0 24px var(--color-glow)' : '0 4px 14px rgba(0,0,0,0.08)',
              }}
            >
              <div
                className="flex items-center justify-between px-2 py-1 border-b"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
              >
                <span className="text-[8px] font-mono uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  {n.kind}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: statusColor(n.status),
                    boxShadow: n.status === 'run' ? `0 0 8px ${statusColor(n.status)}` : 'none',
                  }}
                />
              </div>
              <div className="px-2 py-1.5 flex items-center justify-between">
                <span className="text-[10px] md:text-xs font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                  {n.label}
                </span>
                <span className="text-[8px] font-mono uppercase" style={{ color: 'var(--color-gold)' }}>
                  {n.io}
                </span>
              </div>
              <span
                className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-gold)' }}
              />
              <span
                className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-gold)' }}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs">
          {[
            ['Nodes', '7'],
            ['Edges', '8'],
            ['Runtime', '42s'],
            ['Checkpoints', '2'],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg p-2.5 border text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
              <div className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>{k}</div>
              <div className="font-semibold mt-0.5" style={{ color: 'var(--color-text)' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </VizFrame>
  );
}

function VizDelivery() {
  const specs = [
    ['IG 9:16', '1080×1920', 'MP4'],
    ['TikTok',  '1080×1920', 'MP4'],
    ['Meta 1:1','1080×1080', 'MP4'],
    ['YT 16:9', '1920×1080', 'MP4'],
    ['OOH',     '3840×2160', 'MOV'],
    ['Email',   '1200×628',  'JPG'],
  ];
  return (
    <VizFrame>
      <div className="relative p-6 md:p-8 h-full flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="mono-eyebrow" style={{ color: 'var(--color-gold)' }}>delivery.manifest</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-500" />
            <span className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>brand-locked</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {specs.map((s, i) => (
            <motion.div
              key={s[0]}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg p-3 border flex items-center justify-between"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
            >
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{s[0]}</div>
                <div className="mono-eyebrow mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{s[1]}</div>
              </div>
              <span className="mono-eyebrow px-2 py-1 rounded border" style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-gold)' }}>{s[2]}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </VizFrame>
  );
}

const VIZ_MAP: Record<string, React.FC> = {
  '01': VizBrandDNA,
  '02': VizGoal,
  '03': VizICP,
  '04': VizReferences,
  '05': VizAvatar,
  '06': VizPrompt,
  '07': VizModels,
  '08': VizVoice,
  '09': VizWorkflow,
  '10': VizDelivery,
};

/* ============ DELIVERABLE GRID ============ */

function DeliverableCard({ item, i }: { item: typeof DELIVERABLES[0]; i: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl p-6 border overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
        style={{ backgroundColor: 'var(--color-gold)' }}
      />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center border"
            style={{ borderColor: 'var(--color-border-strong)', backgroundColor: 'var(--color-bg)' }}
          >
            <Icon size={18} style={{ color: 'var(--color-gold)' }} />
          </div>
          <span className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>0{i + 1}</span>
        </div>
        <h4 className="text-base font-semibold leading-tight" style={{ color: 'var(--color-text)' }}>{item.label}</h4>
        <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

/* ============ INTERACTIVE HORIZONTAL PIPELINE ============ */

export function PipelineBoard() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const Active = STAGES[active];
  const Viz = VIZ_MAP[Active.step];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % STAGES.length), 3600);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const el = chipRefs.current[active];
    const container = scrollerRef.current;
    if (el && container) {
      const eRect = el.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const offset = eRect.left - cRect.left - cRect.width / 2 + eRect.width / 2;
      container.scrollBy({ left: offset, behavior: 'smooth' });
    }
  }, [active]);

  const go = (dir: -1 | 1) => setActive((i) => (i + dir + STAGES.length) % STAGES.length);

  const boardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = boardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;
      if (!inView) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); setPaused(true); go(1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); setPaused(true); go(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      ref={boardRef}
      className="relative"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Top: visualization panel + textual detail */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8">
        <div className="relative min-h-[460px] md:min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={Active.step}
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Viz />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={Active.step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="mono-eyebrow" style={{ color: 'var(--color-gold)' }}>Stage · {Active.step}</span>
                <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-border)' }} />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center border"
                  style={{ borderColor: 'var(--color-border-strong)', backgroundColor: 'var(--color-surface)' }}
                >
                  <Active.icon size={18} style={{ color: 'var(--color-gold)' }} />
                </div>
              </div>
              <h3 className="display-serif text-3xl md:text-4xl leading-[1.05]" style={{ color: 'var(--color-text)' }}>
                {Active.title}
              </h3>
              <p className="mt-3 mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>{Active.subtitle}</p>
              <p className="mt-5 text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{Active.body}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text)' }}
              aria-label="Previous stage"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text)' }}
              aria-label="Next stage"
            >
              <ChevronRight size={16} />
            </button>
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: 'var(--color-gold)' }}
                animate={{ width: `${((active + 1) / STAGES.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="mono-eyebrow tabular" style={{ color: 'var(--color-text-muted)' }}>
              {String(active + 1).padStart(2, '0')} / {STAGES.length}
            </span>
          </div>
          <div className="mt-3 hidden md:flex items-center gap-2 mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>
            <kbd className="px-1.5 py-0.5 rounded border text-[10px]" style={{ borderColor: 'var(--color-border-strong)' }}>←</kbd>
            <kbd className="px-1.5 py-0.5 rounded border text-[10px]" style={{ borderColor: 'var(--color-border-strong)' }}>→</kbd>
            <span>to navigate</span>
          </div>
        </div>
      </div>

      {/* Bottom: horizontal stage scroller */}
      <div className="mt-10">
        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-3 snap-x"
          style={{ scrollPaddingLeft: 24 }}
        >
          {STAGES.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.step}
                ref={(el) => (chipRefs.current[i] = el)}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="snap-start shrink-0 relative text-left rounded-2xl border p-4 md:p-5 transition-all duration-300 group"
                style={{
                  minWidth: 220,
                  backgroundColor: isActive ? 'var(--color-surface-elevated)' : 'var(--color-surface)',
                  borderColor: isActive ? 'var(--color-gold)' : 'var(--color-border)',
                  boxShadow: isActive ? '0 20px 50px var(--color-glow)' : 'none',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: isActive ? 'var(--color-gold)' : 'var(--color-bg)',
                      color: isActive ? '#0E0C0A' : 'var(--color-text-muted)',
                    }}
                  >
                    <s.icon size={14} />
                  </div>
                  <span className="mono-eyebrow" style={{ color: isActive ? 'var(--color-gold)' : 'var(--color-text-muted)' }}>
                    {s.step}
                  </span>
                </div>
                <div className="text-sm font-semibold leading-tight" style={{ color: 'var(--color-text)' }}>
                  {s.short}
                </div>
                <div className="mt-1 text-xs leading-snug line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                  {s.subtitle}
                </div>
              </button>
            );
          })}
        </div>
        <p className="mt-3 mono-eyebrow text-center opacity-60" style={{ color: 'var(--color-text-muted)' }}>
          Hover or scroll · click to pin
        </p>
      </div>
    </div>
  );
}

/* ============ SECTION ============ */

export default function NovaSection() {
  const { ref } = useInView();
  const deliverableIntro = useMemo(() => DELIVERABLES, []);
  const [lightbox, setLightbox] = useState<ShowcaseItem | null>(null);
  useNoSaveGuards();

  return (
    <section
      id="nova"
      ref={ref}
      className="relative py-24 md:py-36 section-padding overflow-hidden scroll-mt-24"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div
        className="absolute top-[8%] right-[6%] w-[520px] h-[520px] rounded-full blur-[180px] pointer-events-none"
        style={{ backgroundColor: 'var(--color-gold)', opacity: 0.09 }}
      />
      <div
        className="absolute bottom-[4%] left-[2%] w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none"
        style={{ backgroundColor: 'var(--color-accent)', opacity: 0.07 }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Epic Hero */}
        <NovaHero onExpand={(it) => setLightbox(it)} />

        {/* Showcase Gallery */}
        <NovaShowcase onExpand={(it) => setLightbox(it)} />

        {/* Eight deliverables */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
            <div>
              <p className="mono-eyebrow mb-3" style={{ color: 'var(--color-text-muted)' }}>
                [Slide 03] — Outputs
              </p>
              <h3 className="display-serif text-3xl md:text-5xl lg:text-6xl" style={{ color: 'var(--color-text)' }}>
                Eight deliverables. <span className="ital-accent">One creative engine.</span>
              </h3>
            </div>
            <p className="text-sm max-w-sm" style={{ color: 'var(--color-text-muted)' }}>
              Every format your brand needs, produced on the same brand-locked pipeline — photography to cinema, voice to motion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {deliverableIntro.map((item, i) => (
              <DeliverableCard key={item.label} item={item} i={i} />
            ))}
          </div>
        </div>

        {/* Ten-stage production pipeline */}
        <div className="mt-28 md:mt-40">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
            <div className="max-w-2xl">
              <p className="mono-eyebrow mb-3" style={{ color: 'var(--color-text-muted)' }}>
                [Slide 04] — Proprietary Methodology
              </p>
              <h3 className="display-serif text-3xl md:text-5xl lg:text-6xl" style={{ color: 'var(--color-text)' }}>
                NOVA isn&apos;t a prompt.
                <br />
                <span className="ital-accent">It&apos;s a ten-stage production pipeline.</span>
              </h3>
              <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Hover any stage to inspect what actually happens inside the engine — from brand
                codification to scene-level prompt engineering and editorial QC.
              </p>
            </div>
            <div
              className="hidden md:flex items-center gap-3 px-4 py-3 rounded-full border"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-gold)' }} />
              <span className="mono-eyebrow" style={{ color: 'var(--color-text-muted)' }}>
                Live · auto-advancing
              </span>
            </div>
          </div>

          <PipelineBoard />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 md:mt-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <p className="display-serif text-2xl md:text-3xl" style={{ color: 'var(--color-text)' }}>
              Want to see the engine <span className="ital-accent">running on your brand?</span>
            </p>
            <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Pilot productions begin with a Brand DNA intake and a 72-hour creative sample.
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold rounded-full transition-all hover:scale-[1.03]"
            style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
          >
            Request a NOVA Sample
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <VideoLightbox item={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
