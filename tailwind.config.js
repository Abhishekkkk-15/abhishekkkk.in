/** @type {import('tailwindcss').Config} */
export default {
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
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'widest-mono': '0.14em',
      },
    },
  },
  plugins: [],
};
