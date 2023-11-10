import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'plum': '#1E1932',
        'apricot': '#F7931A',
        'grape': '#627EEA'
      }
    },
  },
  plugins: [],
}
export default config
