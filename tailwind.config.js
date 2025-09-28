/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'g23-navy': '#01010f',
        'g23-black': '#000000',
        'g23-white': '#FFFFFF',
        'g23-gray': '#585858',
        'g23-gray-light': '#8b8b8b',
        'g23-gray-lighter': '#b5b5b5',
        'g23-accent': '#9AFFF9',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      screens: {
        'xs': '390px',
        'sm': '640px',
        'md': '810px',
        'lg': '1024px',
        'xl': '1320px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}