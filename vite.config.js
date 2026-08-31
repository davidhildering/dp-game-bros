import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

const r = (p) => fileURLToPath(new URL(p, import.meta.url));

// base "./" keeps every asset path relative, so the site works on any host
// (GitHub Pages project subpaths, Netlify root domains, itch.io, ...)
export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: r("index.html"),
        memoryCarLane: r("games/memory-car-lane/index.html"),
      },
    },
  },
});
