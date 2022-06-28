/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#121a3e",
          100: "#DCE0EE", // tab selection
          200: "#70768F", // form title
          300: "#eff1ff", // Dropdown hover
          400: "#384062", // button
          500: "#121a3e", // left drawer, button:hover
          600: "#f0f2f9",
          700: "#3f2a55", // bg selected tab
        },
        action: {
          default: "#ffd700",
          500: "#ffd700",
        },
        secondary: {
          default: "#9f26b5",
          100: "#9F26B50D",
          200: "#72297e7a",
          300: "#9f26b5",
          400: "rgba(216, 63, 142, 0.09)",
          500: "#25283d",
          600: "#2B2E45;",
        },
        green: {
          default: " #d6f5d4",
          100: "#d6f5d4",
          200: "#309c42" //upload button
        },
        blue: {
          default: " #428bca",
          300: "#428bca", //links
        },
        yellow: {
          default: "#fff7ca",
          100: "#fff7ca",
          200: "#726a3a",
        }
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
  variants: {
    extend: {
      border: ["first", "last"],    
      borderCollapse: ["first", "last"],
      borderColor: ["first", "last"],
      borderOpacity: ["first", "last"],
      borderRadius: ["first", "last"],
      borderStyle: ["first", "last"],
      borderWidth: ["first", "last"],
    },
  },
};
