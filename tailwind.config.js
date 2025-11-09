/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.{html,js}", "./static/**/*.{js,css}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#C6E5F5",
        "background-light": "#f6f7f8",
        "background-dark": "#121b20",
      },
      fontFamily: { display: "Space Grotesk" },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
