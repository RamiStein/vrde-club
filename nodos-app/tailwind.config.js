/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4e8d26',
        accent: '#b6e936',
        bg: '#f8fae5',
        'card-bg': '#ffffff',
        'text-main': '#1f2937',
        'text-muted': '#6b7280',
        border: '#e5e7eb',
        
        // Colores nuevos Landing
        'vrde-brand': '#10A352', 
        'vrde-dark': '#0B7339',
        'vrde-light': '#D4F1A0',
        'vrde-bg': '#F8F9FA',
        'vrde-text': '#2D3748',
        'vrde-accent': '#E76F51',
      },
      fontFamily: {
        heading: ['Rajdhani', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        // Fuentes nuevas Landing
        sans: ['Outfit', 'sans-serif'],
        tech: ['Space Grotesk', 'sans-serif'],
        pixel: ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
}
