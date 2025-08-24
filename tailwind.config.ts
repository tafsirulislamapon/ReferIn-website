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
        },
        theme: {
          bg: 'var(--color-theme-bg)',
          text: 'var(--color-theme-text)',
          button: {
            bg: 'var(--color-theme-button-bg)',
            text: 'var(--color-theme-button-text)',
            hover: 'var(--color-theme-button-hover)',
          }
        }
      },
      keyframes: {
        'fade-in': {
          '0%': { 
            opacity: '0', 
            transform: 'translate(-50%, -20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translate(-50%, 0)' 
          }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out'
      }
    },
  },
  plugins: [],
} as const;

export default config; 