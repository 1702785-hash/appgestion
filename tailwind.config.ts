import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        glass: "22px",
      },
      boxShadow: {
        glass: "0 24px 80px rgba(31, 45, 71, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
