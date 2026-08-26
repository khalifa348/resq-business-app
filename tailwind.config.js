/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* ===== RESQ V2 — "Airbnb Light" brand ===== */
        'brand-lime': '#B9D063',
        'brand-lime-bright': '#D3E58A',
        'brand-lime-dim': '#9DBF4A',
        'brand-lime-dark': '#CBDD85',

        /* ===== Semantic surface scale (clean warm white) ===== */
        ink: '#0E100C',              // page background (lightest)
        surface: '#161913',          // base surface
        'surface-raised': '#1C2018', // cards
        'surface-elevated': '#262B20', // hover / chips
        'surface-bright': '#2E3427', // icon wells

        /* ===== Borders ===== */
        line: '#2A2F24',
        'line-strong': '#363C2E',

        /* ===== Text ===== */
        'text-primary': '#F2F4ED',
        'text-secondary': '#A9AF9E',
        'text-muted': '#6E7562',

        /* ===== Status ===== */
        ok: '#00A699',
        warn: '#FC642D',
        danger: '#FF5A5F',

        /* ===== Material-3 names kept mapped to light palette (compat) ===== */
        'tertiary-container': '#F7F7F7',
        'primary-fixed': '#B9D063',
        'primary-container': '#E8F0CC',
        'inverse-on-surface': '#FFFFFF',
        'surface-variant': '#F0F0F0',
        'error': '#FF5A5F',
        'error-container': '#FFDAD6',
        'surface-container': '#1C2018',
        'on-secondary-fixed': '#222222',
        'on-error': '#FFFFFF',
        'surface-container-lowest': '#0E100C',
        'surface': '#F7F7F7',
        'on-error-container': '#B8003C',
        'inverse-primary': '#9DBF4A',
        'surface-container-low': '#F7F7F7',
        'surface-bright-m3': '#EBEBEB',
        'on-primary-fixed': '#1A2200',
        'background': '#0E100C',
        'surface-dim': '#F2F2F2',
        'surface-container-high': '#F0F0F0',
        'on-surface-variant': '#717171',
        'surface-container-highest': '#EBEBEB',
        'secondary-fixed-dim': '#DDDDDD',
        'on-background': '#F2F4ED',
        'on-primary-container': '#3B4D00',
        'secondary-container': '#F0F0F0',
        'tertiary-fixed-dim': '#EBEBEB',
        'outline': '#B0B0B0',
        'on-tertiary-fixed': '#222222',
        'secondary-fixed': '#F0F0F0',
        'outline-variant': '#E8E8E8',
        'on-tertiary': '#333333',
        'primary-fixed-dim': '#9DBF4A',
        'on-secondary-container': '#717171',
        'on-tertiary-fixed-variant': '#555555',
        'on-tertiary-container': '#666666',
        'secondary': '#DDDDDD',
        'primary': '#B9D063',
        'on-primary-fixed-variant': '#CBDD85',
        'tertiary': '#F0F0F0',
        'surface-tint': '#B9D063',
        'on-primary': '#1A2200',
        'on-secondary-fixed-variant': '#555555',
        'inverse-surface': '#333333',
        'on-surface': '#F2F4ED',
        'on-secondary': '#222222',
        'tertiary-fixed': '#F5F5F5',
      },
      fontFamily: {
        display: [
          '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text',
          'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif',
        ],
        sans: [
          '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text',
          'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif',
        ],
        mono: [
          'ui-monospace', 'SF Mono', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.45)',
        'card-hover': '0 2px 4px rgba(0,0,0,0.4), 0 14px 36px rgba(0,0,0,0.55)',
        glow: '0 0 28px rgba(168,194,86,0.25)',
        'glow-sm': '0 0 12px rgba(168,194,86,0.18)',
        dock: '0 -8px 32px rgba(0,0,0,0.08)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.05)',
        /* Hard offset shadows (kept for compat; unused per anti-AI rules) */
        hard: '4px 4px 0 0 #222222',
        'hard-lime': '4px 4px 0 0 #A8C256',
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
