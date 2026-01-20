/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Electric Blue/Cyan
        primary: {
          50: '#e6f7ff',
          100: '#b3e5ff',
          200: '#80d4ff',
          300: '#4dc3ff',
          400: '#1ab2ff',
          500: '#00a0f0',
          600: '#0080c0',
          700: '#006090',
          800: '#004060',
          900: '#002030',
        },
        // Accent - Purple/Magenta
        accent: {
          50: '#f5e6ff',
          100: '#e0b3ff',
          200: '#cc80ff',
          300: '#b84dff',
          400: '#a31aff',
          500: '#8f00ff',
          600: '#7200cc',
          700: '#560099',
          800: '#390066',
          900: '#1d0033',
        },
        // Dark Theme
        dark: {
          bg: '#0a0e1a',
          surface: '#1a1f35',
          elevated: '#252b45',
          border: '#363d5a',
        },
        // Semantic Colors
        success: '#00e676',
        warning: '#ffa726',
        error: '#ff1744',
        info: '#00b0ff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
