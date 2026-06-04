import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // GameVerse brand palette
        primary: {
          DEFAULT: '#6C5CE7',
          50: '#f0eefe',
          100: '#ddd9fc',
          200: '#c2b9fa',
          300: '#a08ff5',
          400: '#8470ef',
          500: '#6C5CE7',
          600: '#5a45d6',
          700: '#4a36b3',
          800: '#3c2e91',
          900: '#332a76',
        },
        secondary: {
          DEFAULT: '#00D2FF',
          400: '#33dbff',
          500: '#00D2FF',
          600: '#00a8cc',
        },
        accent: {
          DEFAULT: '#00FFB3',
          400: '#33ffc2',
          500: '#00FFB3',
          600: '#00cc8f',
        },
        background: '#0D1117',
        surface: '#161B22',
        'surface-2': '#1c2330',
        'surface-3': '#232b3a',
        border: 'rgba(255,255,255,0.08)',
        'text-primary': '#FFFFFF',
        'text-muted': '#9aa4b2',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(108,92,231,0.4), 0 0 24px rgba(108,92,231,0.35)',
        'neon-cyan': '0 0 0 1px rgba(0,210,255,0.4), 0 0 24px rgba(0,210,255,0.35)',
        'neon-green': '0 0 0 1px rgba(0,255,179,0.4), 0 0 24px rgba(0,255,179,0.35)',
        glass: '0 8px 32px rgba(0,0,0,0.37)',
        card: '0 10px 30px -10px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'grid-neon':
          'linear-gradient(rgba(108,92,231,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.06) 1px, transparent 1px)',
        'hero-glow':
          'radial-gradient(1200px 600px at 50% -10%, rgba(108,92,231,0.35), transparent 60%), radial-gradient(800px 400px at 90% 10%, rgba(0,210,255,0.18), transparent 55%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.7', filter: 'brightness(1.3)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
