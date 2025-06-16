import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{html,css,tsx,ts}'],
  theme: {
    extend: {
      animation: {},
      keyframes: {},
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
