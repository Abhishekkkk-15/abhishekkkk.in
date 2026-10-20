/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#faf9f5',
        surface: '#faf9f5',
        'surface-dim': '#f2f0ea',
        'surface-container': '#efeeea',
        'surface-container-high': '#e9e8e4',
        'hairline': '#e2e0d8',
        'hairline-dark': '#cbc8be',
        'ink': '#111111',
        'ink-muted': '#555452',
        'ink-light': '#8a8883',
        'cobalt': '#0051d5',
        'cobalt-dim': '#316bf3',
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
