import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{html,css,tsx,ts}'],
  theme: {
    extend: {
      animation: {
        type: 'type 2s ease-in-out infinite',
      },
      keyframes: {
        type: {
          to: {
            width: '100%',
          },
        },
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
