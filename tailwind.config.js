/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          top: '#EAF1E4',
          horizon: '#FBF4E3',
        },
        soil: '#5B4636',
        path: '#CFC6B4',
        leaf: {
          deep: '#2F5D3A',
          mid: '#5E8C4A',
          light: '#A9C77A',
        },
        bloom: {
          marigold: '#E8A33D',
          clay: '#C65D3B',
          lavender: '#8C7BB5',
          skyblue: '#6FA3C8',
        },
        ink: '#1F2A1F',
        muted: '#5B665B',
        cream: '#FFFBF0',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
      },
    },
  },
  plugins: [],
};
