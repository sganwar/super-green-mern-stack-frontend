/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'], // Headers & Titles
        'body': ['Outfit', 'system-ui', 'sans-serif'], // Body text
        'accent': ['Poppins', 'system-ui', 'sans-serif'], // Buttons & CTAs
        'elegant': ['Playfair Display', 'serif'], // Premium/Logo text
        'modern': ['Manrope', 'system-ui', 'sans-serif'], // Subtle headings
        'minimal': ['Figtree', 'system-ui', 'sans-serif'], // Clean UI text
        'fancy': ['Dancing Script', 'cursive'], // Decorative text
      },
      colors: {
        nature: {
          primary: 'var(--nature-primary)',
          secondary: 'var(--nature-secondary)',
          accent: 'var(--nature-accent)',
          light: 'var(--nature-light)',
          dark: 'var(--nature-dark)',
          earth: 'var(--nature-earth)',
          sky: 'var(--nature-sky)',
          forest: 'var(--nature-forest)',
          leaf: 'var(--nature-leaf)',
          moss: 'var(--nature-moss)',
        }
      },
      backgroundImage: {
        'nature-gradient': 'var(--nature-gradient)',
        'forest-gradient': 'var(--forest-gradient)',
        'leaf-gradient': 'var(--leaf-gradient)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'grow': 'grow 0.6s ease-out',
        'leaf-sway': 'leaf-sway 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        grow: {
          '0%': { transform: 'scale(0.8) translateY(20px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'leaf-sway': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      }
    },
  },
  plugins: [],
}