import plugin from "tailwindcss/plugin";


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        postPrimary: "#dfebff",
        postSecondary: "#fff5df",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      gridTemplateColumns: {
        'main-layout': '20% 60% 20%'
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          xl: "1480px",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--postPrimary': theme('colors.postPrimary'),
          '--postSecondary': theme('colors.postSecondary'),
        },
      });
    }),
  ]
}