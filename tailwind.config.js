/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:     '#0D0F0A',
        card:   '#161810',
        card2:  '#1c1f14',
        lime:   '#C8F560',
        amber:  '#E8A020',
        bone:   '#F0EDE6',
        muted:  '#6B6B5E',
      },
      borderRadius: {
        card: '14px',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
