/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F57C00",
        secondary: "#1565C0",
        background: "#FAFAFA",
        success: "#2E7D32",
        error: "#C62828",
        lightbeige: "#EAD8C8",
        cardcyan: "#36C2CF",
        cardyellow: "#F4C430",
        cardorange: "#E7A06A",
      },
    },
  },
  plugins: [],
};
