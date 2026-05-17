import { useTheme, type Theme } from '../../context/ThemeContext';

const LABELS: Record<Theme, string> = { paper: 'Paper', sand: 'Sand', dark: 'Night' };
const NEXT: Record<Theme, Theme> = { paper: 'sand', sand: 'dark', dark: 'paper' };

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();
  const nextLabel = LABELS[NEXT[theme]];
  const aria = `Theme: ${LABELS[theme]}. Switch to ${nextLabel}.`;

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={aria}
      title={aria}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
      style={{
        color: 'var(--color-text-secondary)',
        border: `1px solid var(--color-border-strong)`,
        backgroundColor: 'transparent',
      }}
    >
      <span className="tt-stack">
        {/* Paper — sun */}
        <svg
          className="tt-icon"
          style={{
            opacity: theme === 'paper' ? 1 : 0,
            transform: theme === 'paper' ? 'scale(1) rotate(0)' : 'scale(0.7) rotate(-30deg)',
          }}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
        >
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

        {/* Sand — palm */}
        <svg
          className="tt-icon"
          style={{
            opacity: theme === 'sand' ? 1 : 0,
            transform: theme === 'sand' ? 'scale(1) rotate(0)' : 'scale(0.7) rotate(-30deg)',
          }}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <line x1="2" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
          <path d="M12.2 20 Q 11.5 14 12.5 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none">
            <path d="M12.5 8 Q 7 5 3.5 7" />
            <path d="M12.5 8 Q 13.5 3 11 1.5" />
            <path d="M12.5 8 Q 18 5 21 8" />
            <path d="M12.5 8 Q 16 11 20 12" />
          </g>
          <circle cx="12.5" cy="8" r="1.1" fill="currentColor" />
        </svg>

        {/* Night — moon */}
        <svg
          className="tt-icon"
          style={{
            opacity: theme === 'dark' ? 1 : 0,
            transform: theme === 'dark' ? 'scale(1) rotate(0)' : 'scale(0.7) rotate(-30deg)',
          }}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path d="M19.5 14.5 A 8.5 8.5 0 1 1 9.5 4.5 A 6.5 6.5 0 0 0 19.5 14.5 Z" fill="currentColor" />
          <circle cx="6" cy="6" r="0.6" fill="currentColor" opacity="0.7" />
        </svg>
      </span>
    </button>
  );
}
