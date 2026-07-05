import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["app/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    tsconfigPaths: true,
  },
});
