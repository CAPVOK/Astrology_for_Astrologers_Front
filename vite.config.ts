import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Astrology_for_Astrologers_Front/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://10.10.10.51:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "@app": "/src/app",
      "@assets": "/src/assets",
      "@Pages": "/src/pages",
      "@Shared": "/src/shared",
      "@Hooks": "/src/hooks",
      "@utils": "/src/utils",
    },
  },
});
