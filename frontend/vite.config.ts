/// <reference types="node" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

const env = loadEnv("", process.cwd(), "");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: "./src/pages",
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: env.VITE_API_URL || "http://localhost:5000",
        changeOrigin: true,
      },
    },
    host: true,
  },
  preview: {
    port: 3000,
  },
});
