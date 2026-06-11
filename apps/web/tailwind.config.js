/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        '7xl': '100rem',
      },
      fontSize: {
        'xs': ['var(--text-xs)', { lineHeight: 'var(--lh-xs, 1.5)' }],
        'sm': ['var(--text-sm)', { lineHeight: 'var(--lh-sm, 1.5)' }],
        'base': ['var(--text-base)', { lineHeight: 'var(--lh-base, 1.6)' }],
        'lg': ['var(--text-lg)', { lineHeight: 'var(--lh-lg, 1.5)' }],
        'xl': ['var(--text-xl)', { lineHeight: 'var(--lh-xl, 1.4)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--lh-2xl, 1.35)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--lh-3xl, 1.3)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--lh-4xl, 1.2)' }],
        '5xl': ['var(--text-5xl)', { lineHeight: 'var(--lh-5xl, 1.15)' }],
        '6xl': ['var(--text-6xl)', { lineHeight: 'var(--lh-6xl, 1.1)' }],
        '7xl': ['var(--text-7xl)', { lineHeight: 'var(--lh-7xl, 1.1)' }],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        brand: {
          green: '#155a2c',
          'green-light': '#1a7a3c',
          'green-dark': '#0f3d1e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        'counter-spin': 'counterSpin 0.3s ease-out',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
        },
        counterSpin: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(210,100%,16%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(220,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(210,100%,16%,1) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-blue-lg': '0 0 40px rgba(59, 130, 246, 0.5)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
