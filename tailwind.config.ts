import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // <-- GARANTA QUE ESTA LINHA ESTEJA AQUI
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};

export default config;