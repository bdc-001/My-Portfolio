/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        bgPrimary: 'var(--color-bg-primary)',
        bgSecondary: 'var(--color-bg-secondary)',
        // Soft graphite text scale: 400 is secondary copy, 500 is tertiary/meta.
        neutral: {
          50: '#f7f7f5',
          100: '#efeeeb',
          200: '#e2e1dd',
          300: '#cfcecb',
          400: '#b9b8b4',
          500: '#8b8a86',
          600: '#6c6b68',
          700: '#4b4b4f',
          800: '#35353a',
          900: '#26262a',
          950: '#1e1e21',
        },
        // Surfaces: DEFAULT is the canvas, 800 a raised card, 700 its hover state.
        ink: {
          DEFAULT: '#1a1a1d',
          950: '#141416',
          900: '#1a1a1d',
          850: '#1e1e21',
          800: '#222226',
          700: '#2b2b30',
          600: '#34343a',
          500: '#3e3e45',
        },
        bone: {
          DEFAULT: '#f4f4f2',
          muted: '#e4e3df',
        },
        accent: 'rgb(var(--accent) / <alpha-value>)',
        periwinkle: '#a9bdff',
        violet: '#7c6cff',
        coral: '#ff8a5c',
        mint: '#7fe0c3',
      },
      borderRadius: {
        card: '22px',
      },
      letterSpacing: {
        label: '0.08em',
        display: '-0.035em',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        marquee: {
          to: { transform: 'translateX(-50%)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
        cue: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        wave: 'wave 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
