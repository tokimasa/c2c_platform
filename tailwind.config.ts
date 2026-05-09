import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2933",
        muted: "#667085",
        line: "#e6e8ec",
        soft: "#f6f7f9",
        accent: "#e93845",
        teal: "#097a7a"
      },
      boxShadow: {
        lift: "0 16px 40px rgba(31, 41, 51, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
