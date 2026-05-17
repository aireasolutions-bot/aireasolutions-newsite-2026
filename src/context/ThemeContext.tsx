import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'paper' | 'sand' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  cycleTheme: () => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const CYCLE: Record<Theme, Theme> = { paper: 'sand', sand: 'dark', dark: 'paper' };

function resolveInitial(): Theme {
  if (typeof window === 'undefined') return 'paper';
  const stored = localStorage.getItem('airea-theme');
  if (stored === 'paper' || stored === 'sand' || stored === 'dark') return stored;
  if (stored === 'light') return 'paper';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'paper';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(resolveInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('airea-theme', theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const cycleTheme = () => setThemeState((prev) => CYCLE[prev] || 'paper');
  const toggleTheme = cycleTheme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
