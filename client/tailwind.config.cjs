/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        siteblack: '#131519',
        siteDimBlack: '#191d23',
        siteViolet: '#7f46f0',
        siteWhite: '#9eacc7',
      },
      backgroundImage: {
        astral: "url('/src/assets/background/astral.webp')",
        saiman: "url('/src/assets/background/saiman.webp')",
        eoaalien: "url('/src/assets/background/eoaalien.webp')",
        panight: "url('/src/assets/background/panight.webp')",
        heroImg: "url('/src/assets/background/hero-img.webp')",
        landing: "url('/src/assets/background/landing.webp')",
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
