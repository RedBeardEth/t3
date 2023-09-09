import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@realms-world/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
      colors: {
        "theme-gray": "#050505",
        "theme-gray-light": "#343531",
      },
      fontFamily: {
        sans: ["var(--font-inconsolata)", ...fontFamily.sans],
        "sans-serif": ["var(--font-karla)", ...fontFamily.serif],
      },
    },
  },
} satisfies Config;
