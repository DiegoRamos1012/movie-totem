import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react()],
  test: {
    globals: true, // permite usar describe/it/expect sem importar
    environment: "jsdom", // simula o navegador
    setupFiles: [path.resolve(__dirname, "src/setupTests.ts")], // configurações globais
    css: true, // permite importar CSS nos testes
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
