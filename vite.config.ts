import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/geoguessr-notes": {
        target: "http://localhost:5174",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./index.html",
        CV: "./CV.html",
      },
    },
  },
  root: ".",
});
