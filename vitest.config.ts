import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./shared/config/test/setupTest.ts"],
    coverage: {
      provider: "v8",
      exclude: [
        "**/*.config.{mjs,js,ts}",
        "**/configs/**",
        "**/*.store.{js,ts}",
        "build/**",
        "dist/**",
        "**/node_modules/**",
        "**/.next/**",
        "**/layout.{jsx,tsx}",
        "next-env.d.ts",
        "**/types.{js,ts}",
        "**/index.{js,ts}",
        "**/store.{js,ts}",
        "**/utils.{js,ts}",
        "**/worker/**",
      ],
    },
  },
});
