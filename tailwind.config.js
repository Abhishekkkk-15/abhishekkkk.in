/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F4F3EF',
        surface: '#F4F3EF',
        'surface-dim': '#EBEAE4',
        'surface-container': '#EBEAE4',
        'surface-container-high': '#E2E0D8',
        'hairline': '#E2E0D8',
        'hairline-dark': '#D8D6CE',
        'ink': '#111111',
        'ink-muted': '#444442',
        'ink-light': '#6E6D68',
        'cobalt': '#2563EB',
        // PlayerZero theme palette
        canvas: '#f8f8f9',
        cardBg: '#f2f2f4',
        darkPill: '#121213',
        matrixDot: '#171718',
        subtleBorder: '#e5e5e8',
        dimText: '#686870',
      },
      fontFamily: {
        sans: ['Inter', '"Hanken Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
        matrix: ['"Silkscreen"', 'monospace'],
      },
      boxShadow: {
        'subtle-card': '0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.02)',
        'pill': '0 2px 8px rgba(0,0,0,0.08)',
      },
      letterSpacing: {
        'widest-mono': '0.14em',
      },
    },
  },
  plugins: [],
};
