interface MarqueeRowProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
}

export default function MarqueeRow({ items, direction = 'left', speed = 40 }: MarqueeRowProps) {
  const doubled = [...items, ...items];
  const animClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';
  const duration = `${speed}s`;

  return (
    <div className="overflow-hidden marquee-fade-left">
      <div className={`flex gap-8 md:gap-12 ${animClass} whitespace-nowrap`} style={{ animationDuration: duration }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm md:text-base font-barlow font-medium tracking-wide shrink-0 px-4 py-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
