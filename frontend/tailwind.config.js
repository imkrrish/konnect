/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",

    // vite specific
    "./index.html",
    "./src/main.tsx",
  ],
  important: "#root",
  theme: {
    extend: {},
  },
  corePlugins: { preflight: false },
  plugins: [],
};
