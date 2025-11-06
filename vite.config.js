import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/7-wonders-score-calculator-vue-js/",

  // FORCE ALL SVGs to be files (no inlining)
  assetsInclude: ["**/*.svg"],

  build: {
    outDir: "docs",
    assetsDir: "assets",
    emptyOutDir: true,

    // THIS IS THE KEY
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";
          if (name.endsWith(".svg")) {
            return "assets/[name].[hash][extname]"; // Always copy
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },

    // DISABLE inlining of small assets
    assetsInlineLimit: 0, // ← ADD THIS
  },

  ssgOptions: {
    script: "async",
    formatting: "minify",
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
