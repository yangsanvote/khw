import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'pretendard': ['Pretendard-Regular', 'Arial', 'sans-serif'],
        'giants': ['Giants-Bold', 'Arial', 'sans-serif'],
        'ink': ['InkLipquid', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
