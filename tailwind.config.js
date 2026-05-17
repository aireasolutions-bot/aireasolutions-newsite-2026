import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Tight', 'DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Instrument Serif', 'Georgia', 'serif'],
        display: ['Fraunces', 'Instrument Serif', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        barlow: ['Barlow', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--primary-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        brand: {
          beige: '#F5F1E8',
          stone: '#C4B5A0',
          brown: '#3E2723',
          green: '#0F4C3A',
          gold: '#8B6914',
          terracotta: '#C87E5F',
          sky: '#6BA5C8',
          sage: '#A8B5A0',
          rust: '#8B4513',
          limestone: '#FAF8F4',
        },
        dark: {
          900: '#1A1A1A',
          800: '#222222',
          700: '#2C2C2C',
          600: '#363636',
          500: '#4A5759',
          teal: '#0A3D3D',
          red: '#8B3A3A',
          oxide: '#8B4513',
          bone: '#F5F1E8',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest: '0.2em',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out forwards',
        slideIn: 'slideIn 0.5s ease-out forwards',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindAnimate],
};
