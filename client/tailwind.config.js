/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#D95D45',
          'primary-dark': '#BF4C38',
          accent: '#D9E5D6',
          bg: '#F7F6F2',
          surface: '#FFFFFF',
          border: '#E8E5DF',
          text: '#191919',
          muted: '#77746F',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      backgroundImage: { 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))' },
      boxShadow: {
        'card': '0 2px 10px rgba(25,25,25,.04)',
        'card-hover': '0 5px 18px rgba(25,25,25,.08)',
      },
    },
  },
  plugins: [],
}
