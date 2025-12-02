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
            background: "#FAFAFA", // Off-white for reduced eye strain
            foreground: "#0A0A0F", // Deep navy-black for luxury
            primary: {
              DEFAULT: "#6366F1", // Electric indigo - tech & energetic
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#C4941F", // Rich gold - luxurious accent
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#10B981", // Emerald - intuitive positive action
              foreground: "#FFFFFF",
            },
            warning: {
              DEFAULT: "#F59E0B", // Amber - intuitive caution
              foreground: "#FFFFFF",
            },
            danger: {
              DEFAULT: "#EF4444", // Red - intuitive danger/delete
              foreground: "#FFFFFF",
            },
            default: {
              DEFAULT: "#E4E4E7", // Neutral zinc
              foreground: "#18181B",
            },
            focus: "#8B5CF6", // Purple focus ring for luxury feel
          },
        },
        dark: {
          colors: {
            background: "#09090B", // Deep black for luxury & contrast
            foreground: "#FAFAFA", // Bright white text
            primary: {
              DEFAULT: "#818CF8", // Bright electric indigo - energetic
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#EAB308", // Bright gold - luxurious & visible
              foreground: "#000000",
            },
            success: {
              DEFAULT: "#22C55E", // Bright green - intuitive success
              foreground: "#000000",
            },
            warning: {
              DEFAULT: "#FBBF24", // Bright amber - intuitive warning
              foreground: "#000000",
            },
            danger: {
              DEFAULT: "#F87171", // Bright red - intuitive danger
              foreground: "#000000",
            },
            default: {
              DEFAULT: "#27272A", // Dark zinc
              foreground: "#FAFAFA",
            },
            focus: "#A78BFA", // Bright purple focus
            content1: "#18181B", // Zinc 900 - cards
            content2: "#27272A", // Zinc 800
            content3: "#3F3F46", // Zinc 700
            content4: "#52525B", // Zinc 600
          },
        },
      },
    }),
  ],
};
