import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ['Clash Display', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
      },
      colors: {
        primary: {
          DEFAULT: '#08498E',
          hover: '#063a75',  
        }
      }
    },
  },
  plugins: [],
};

export default config; 