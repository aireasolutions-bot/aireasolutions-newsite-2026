import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

interface VibeTheme {
  name: string;
  label: string;
  bg: string;
  cardBg: string;
  text: string;
  textMuted: string;
  accent: string;
  imageOverlay: string;
  swatches: [string, string, string];
  captionStyle: string;
}

const VIBES: VibeTheme[] = [
  {
    name: 'luxury',
    label: 'Luxury Dark',
    bg: '#1A1614',
    cardBg: '#252019',
    text: '#F5EDE4',
    textMuted: '#9E8E7E',
    accent: '#C9A96E',
    imageOverlay: 'rgba(26,22,20,0.15)',
    swatches: ['#1A1614', '#C9A96E', '#F5EDE4'],
    captionStyle: 'font-serif italic',
  },
  {
    name: 'warm',
    label: 'Warm Earth',
    bg: '#FBF6EF',
    cardBg: '#FFFFFF',
    text: '#3E2723',
    textMuted: '#8D7B6B',
    accent: '#C87E5F',
    imageOverlay: 'rgba(200,126,95,0.08)',
    swatches: ['#FBF6EF', '#C87E5F', '#3E2723'],
    captionStyle: '',
  },
  {
    name: 'minimal',
    label: 'Clean Modern',
    bg: '#FAFAFA',
    cardBg: '#FFFFFF',
    text: '#111111',
    textMuted: '#999999',
    accent: '#111111',
    imageOverlay: 'rgba(0,0,0,0.02)',
    swatches: ['#FAFAFA', '#111111', '#E0E0E0'],
    captionStyle: 'tracking-wide',
  },
  {
    name: 'bold',
    label: 'Bold Vivid',
    bg: '#0D0D0D',
    cardBg: '#1A1A1A',
    text: '#FFFFFF',
    textMuted: '#777777',
    accent: '#FF3D5A',
    imageOverlay: 'rgba(255,61,90,0.06)',
    swatches: ['#0D0D0D', '#FF3D5A', '#FFFFFF'],
    captionStyle: 'uppercase tracking-wider',
  },
  {
    name: 'ocean',
    label: 'Ocean Breeze',
    bg: '#EFF7FA',
    cardBg: '#FFFFFF',
    text: '#0C3547',
    textMuted: '#6B98A8',
    accent: '#0091B2',
    imageOverlay: 'rgba(0,145,178,0.05)',
    swatches: ['#EFF7FA', '#0091B2', '#0C3547'],
    captionStyle: '',
  },
];

const POSTS = [
  {
    handle: 'therooftopbar',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80',
    caption: 'Where the skyline meets the cocktail menu. Friday nights, reimagined.',
    likes: 2847,
  },
  {
    handle: 'maisonluxe',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    caption: 'Every plate tells a story. Welcome to a new standard of dining.',
    likes: 4123,
  },
];

const LIGHT_SWATCHES = new Set(['#FAFAFA', '#FFFFFF', '#FBF6EF', '#EFF7FA', '#F5EDE4', '#E0E0E0']);

export default function InteractiveFeed() {
  const [activeVibe, setActiveVibe] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [doubleTapHeart, setDoubleTapHeart] = useState<number | null>(null);
  const [lastTap, setLastTap] = useState(0);
  const { ref, isInView } = useInView();

  const vibe = VIBES[activeVibe];

  const toggleLike = useCallback((idx: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  const handleImageTap = useCallback((idx: number) => {
    const now = Date.now();
    if (now - lastTap < 400) {
      setLikedPosts(prev => new Set([...prev, idx]));
      setDoubleTapHeart(idx);
      setTimeout(() => setDoubleTapHeart(null), 900);
    }
    setLastTap(now);
  }, [lastTap]);

  return (
    <section ref={ref} className="relative py-20 md:py-32 section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-barlow font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-gold)' }}>
              Interactive Demo
            </span>
            <h2 className="mt-3 text-2xl md:text-4xl lg:text-5xl font-bold tracking-tightest leading-[1.1]" style={{ color: 'var(--color-text)' }}>
              One Brand.{' '}
              <span className="font-serif italic" style={{ color: 'var(--color-gold)' }}>Five Vibes.</span>
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed max-w-md" style={{ color: 'var(--color-text-muted)' }}>
              See how the same content transforms across different visual identities. Click a vibe to watch the feed transform in real-time. Double-tap images to like.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {VIBES.map((v, i) => (
                <motion.button
                  key={v.name}
                  onClick={() => setActiveVibe(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300"
                  style={{
                    border: activeVibe === i ? `2px solid ${v.accent}` : '1px solid var(--color-border)',
                    backgroundColor: activeVibe === i ? `${v.accent}18` : 'var(--color-surface)',
                    color: activeVibe === i ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  }}
                >
                  <div className="flex gap-0.5">
                    {v.swatches.map((c, ci) => (
                      <div
                        key={ci}
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: c, border: LIGHT_SWATCHES.has(c) ? '1px solid #ccc' : 'none' }}
                      />
                    ))}
                  </div>
                  {v.label}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeVibe}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="mt-8 p-5 rounded-xl border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg" style={{ backgroundColor: vibe.accent }} />
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{vibe.label}</p>
                    <p className="text-[10px] font-barlow uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Active Theme</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {vibe.swatches.map((c, i) => (
                    <div
                      key={i}
                      className="flex-1 h-2 rounded-full"
                      style={{ backgroundColor: c, border: LIGHT_SWATCHES.has(c) ? '1px solid #ddd' : 'none' }}
                    />
                  ))}
                  <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: vibe.accent }} />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-10 rounded-[3rem] blur-[80px] opacity-15"
                animate={{ backgroundColor: vibe.accent }}
                transition={{ duration: 0.6 }}
              />

              <div
                className="relative w-[280px] md:w-[320px] rounded-[2.5rem] overflow-hidden shadow-2xl"
                style={{ border: '8px solid #2A2A2A' }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{ backgroundColor: vibe.bg }}
                  transition={{ duration: 0.5 }}
                />

                <div className="relative z-10 flex justify-center pt-2.5 pb-1.5">
                  <div className="w-24 h-[22px] rounded-full bg-black" />
                </div>

                <div className="relative z-10 px-2.5 pb-5 space-y-3">
                  {POSTS.map((post, i) => (
                    <motion.div
                      key={`${activeVibe}-${i}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.12 }}
                    >
                      <div className="flex items-center gap-2 mb-1.5 px-0.5">
                        <motion.div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                          animate={{ backgroundColor: vibe.accent }}
                          transition={{ duration: 0.5 }}
                        >
                          {post.handle[0].toUpperCase()}
                        </motion.div>
                        <motion.span
                          className="text-[10px] font-semibold"
                          animate={{ color: vibe.text }}
                          transition={{ duration: 0.5 }}
                        >
                          {post.handle}
                        </motion.span>
                      </div>

                      <div
                        className="relative rounded-lg overflow-hidden cursor-pointer select-none"
                        onClick={() => handleImageTap(i)}
                      >
                        <img src={post.image} alt="" className="w-full aspect-[4/3] object-cover" draggable={false} />
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          animate={{ backgroundColor: vibe.imageOverlay }}
                          transition={{ duration: 0.5 }}
                        />
                        <AnimatePresence>
                          {doubleTapHeart === i && (
                            <motion.div
                              initial={{ scale: 0, opacity: 1 }}
                              animate={{ scale: 1.3, opacity: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.8 }}
                              className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                              <Heart size={56} fill="white" color="white" strokeWidth={0} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex items-center justify-between mt-1.5 px-0.5">
                        <div className="flex items-center gap-2.5">
                          <motion.button whileTap={{ scale: 1.4 }} onClick={() => toggleLike(i)}>
                            <Heart
                              size={16}
                              fill={likedPosts.has(i) ? vibe.accent : 'none'}
                              color={likedPosts.has(i) ? vibe.accent : vibe.text}
                              strokeWidth={1.5}
                            />
                          </motion.button>
                          <MessageCircle size={16} style={{ color: vibe.text }} strokeWidth={1.5} />
                          <Send size={16} style={{ color: vibe.text }} strokeWidth={1.5} />
                        </div>
                        <Bookmark size={16} style={{ color: vibe.text }} strokeWidth={1.5} />
                      </div>

                      <motion.p
                        className="text-[10px] font-bold mt-0.5 px-0.5"
                        animate={{ color: vibe.text }}
                        transition={{ duration: 0.5 }}
                      >
                        {(likedPosts.has(i) ? post.likes + 1 : post.likes).toLocaleString()} likes
                      </motion.p>

                      <div className="px-0.5 mt-0.5">
                        <motion.span
                          className="text-[10px] font-bold mr-1"
                          animate={{ color: vibe.text }}
                          transition={{ duration: 0.5 }}
                        >
                          {post.handle}
                        </motion.span>
                        <motion.span
                          className={`text-[9px] ${vibe.captionStyle}`}
                          animate={{ color: vibe.textMuted }}
                          transition={{ duration: 0.5 }}
                        >
                          {post.caption}
                        </motion.span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
