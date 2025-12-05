const { nextui } = require("@nextui-org/react");
const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    path.join(path.dirname(require.resolve("@nextui-org/theme")), "**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FAFBFC", // Clean light background
            foreground: "#1A1F36", // Deep tech gray
            primary: {
              DEFAULT: "#8B5CF6", // Rich violet
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#06B6D4", // Premium teal/cyan
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#10B981", // Emerald green
              foreground: "#FFFFFF",
            },
            warning: {
              DEFAULT: "#F59E0B", // Amber gold
              foreground: "#1A1F36",
            },
            danger: {
              DEFAULT: "#EF4444", // Clean red
              foreground: "#FFFFFF",
            },
            default: {
              DEFAULT: "#F7F8FA", // Light surface
              foreground: "#1A1F36",
            },
            focus: "#8B5CF6", // Violet focus
            content1: "#FFFFFF", // Pure white cards
            content2: "#FAFBFC",
            content3: "#F7F8FA",
            content4: "#F0F2F5",
          },
          extend: "light",
        },
        dark: {
          colors: {
            background: "#0D0E14", // Deep space black
            foreground: "#F0F2F5", // Bright metallic white
            primary: {
              DEFAULT: "#A78BFA", // Bright violet
              foreground: "#0D0E14",
            },
            secondary: {
              DEFAULT: "#22D3EE", // Bright teal/cyan
              foreground: "#0D0E14",
            },
            success: {
              DEFAULT: "#34D399", // Bright emerald
              foreground: "#0D0E14",
            },
            warning: {
              DEFAULT: "#FBBF24", // Bright amber
              foreground: "#0D0E14",
            },
            danger: {
              DEFAULT: "#F87171", // Bright red
              foreground: "#0D0E14",
            },
            default: {
              DEFAULT: "#161822", // Dark metallic surface
              foreground: "#F0F2F5",
            },
            focus: "#A78BFA", // Violet focus
            content1: "#161822", // Dark cards
            content2: "#1F212E",
            content3: "#2A2D3A",
            content4: "#353845",
          },
          extend: "dark",
        },
      },
    }),
  ],
};
