import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'plum': '#1E1932',
        'blackberry': '#191925',
        'indigo': '#353570',
        'lilac': '#ebebfd',
        'grape': '#627EEA',
        'apricot': '#F7931A',
      }
    },
  },
  plugins: [],
}
export default config
