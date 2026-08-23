/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* ===== RESQ V2 — "Airbnb Light" brand ===== */
        'brand-lime': '#C6F24E',
        'brand-lime-bright': '#D6FA6B',
        'brand-lime-dim': '#9CC93C',
        'brand-lime-dark': '#7FA82E',

        /* ===== Semantic surface scale (clean warm white) ===== */
        ink: '#FFFFFF',              // page background (lightest)
        surface: '#F7F7F7',          // base surface
        'surface-raised': '#FFFFFF', // cards
        'surface-elevated': '#F0F0F0', // hover / chips
        'surface-bright': '#EBEBEB', // icon wells

        /* ===== Borders ===== */
        line: '#E8E8E8',
        'line-strong': '#DDDDDD',

        /* ===== Text ===== */
        'text-primary': '#222222',
        'text-secondary': '#717171',
        'text-muted': '#9E9E9E',

        /* ===== Status ===== */
        ok: '#00A699',
        warn: '#FC642D',
        danger: '#FF5A5F',

        /* ===== Material-3 names kept mapped to light palette (compat) ===== */
        'tertiary-container': '#F7F7F7',
        'primary-fixed': '#C6F24E',
        'primary-container': '#E4F8B8',
        'inverse-on-surface': '#FFFFFF',
        'surface-variant': '#F0F0F0',
        'error': '#FF5A5F',
        'error-container': '#FFDAD6',
        'surface-container': '#FFFFFF',
        'on-secondary-fixed': '#222222',
        'on-error': '#FFFFFF',
        'surface-container-lowest': '#FFFFFF',
        'surface': '#F7F7F7',
        'on-error-container': '#B8003C',
        'inverse-primary': '#7FA82E',
        'surface-container-low': '#F7F7F7',
        'surface-bright-m3': '#EBEBEB',
        'on-primary-fixed': '#1A2200',
        'background': '#FFFFFF',
        'surface-dim': '#F2F2F2',
        'surface-container-high': '#F0F0F0',
        'on-surface-variant': '#717171',
        'surface-container-highest': '#EBEBEB',
        'secondary-fixed-dim': '#DDDDDD',
        'on-background': '#222222',
        'on-primary-container': '#3B4D00',
        'secondary-container': '#F0F0F0',
        'tertiary-fixed-dim': '#EBEBEB',
        'outline': '#B0B0B0',
        'on-tertiary-fixed': '#222222',
        'secondary-fixed': '#F0F0F0',
        'outline-variant': '#E8E8E8',
        'on-tertiary': '#333333',
        'primary-fixed-dim': '#9CC93C',
        'on-secondary-container': '#717171',
        'on-tertiary-fixed-variant': '#555555',
        'on-tertiary-container': '#666666',
        'secondary': '#DDDDDD',
        'primary': '#C6F24E',
        'on-primary-fixed-variant': '#7FA82E',
        'tertiary': '#F0F0F0',
        'surface-tint': '#C6F24E',
        'on-primary': '#1A2200',
        'on-secondary-fixed-variant': '#555555',
        'inverse-surface': '#333333',
        'on-surface': '#222222',
        'on-secondary': '#222222',
        'tertiary-fixed': '#F5F5F5',
      },
      fontFamily: {
        display: [
          'Space Grotesk', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont',
          'Inter', 'Segoe UI', 'Roboto', 'sans-serif',
        ],
        sans: [
          '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text',
          'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif',
        ],
        mono: [
          'IBM Plex Mono', 'JetBrains Mono', 'SF Mono', 'Cascadia Code', 'Menlo', 'Consolas', 'monospace',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 2px 4px rgba(0,0,0,0.06), 0 14px 36px rgba(0,0,0,0.12)',
        glow: '0 0 28px rgba(198,242,78,0.35)',
        'glow-sm': '0 0 12px rgba(198,242,78,0.25)',
        dock: '0 -8px 32px rgba(0,0,0,0.08)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.9)',
        /* Hard offset shadows (kept for compat; unused per anti-AI rules) */
        hard: '4px 4px 0 0 #222222',
        'hard-lime': '4px 4px 0 0 #C6F24E',
        'hard-sm': '2px 2px 0 0 #222222',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUpSm: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shrinkOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.85)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(16px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out forwards',
        fadeOut: 'fadeOut 0.35s ease-in forwards',
        slideUp: 'slideUp 0.5s ease-out forwards',
        slideUpSm: 'slideUpSm 0.35s ease-out forwards',
        shrinkOut: 'shrinkOut 0.35s ease-in forwards',
        scaleIn: 'scaleIn 0.35s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 1.5s infinite linear',
        float: 'float 5s ease-in-out infinite',
        riseIn: 'riseIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [],
};
