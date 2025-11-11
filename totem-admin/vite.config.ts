import path from "path";
import * as React from "react";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import { version as viteVersion } from "vite";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
let tailwindVersion = "unknown";
try {
  tailwindVersion = require("tailwindcss/package.json").version;
} catch (error) {
  console.error(`Erro ao checar versão do Tailwind: ${error}`);
}

// plugin simples que imprime mensagem no terminal com versões (multilinha)
function welcomePlugin() {
  const reactVersion = (React as typeof React)?.version ?? "unknown";
  const repoUrl = "https://github.com/DiegoRamos1012/movie-totem";
  const linkText = "movie-totem";
  // OSC 8 hyperlink: funciona em terminais que suportam (VS Code, Windows Terminal, iTerm2...)
  const oscLink = `\u001B]8;;${repoUrl}\u0007${linkText}\u001B]8;;\u0007`;

  const msgDev = 
`-------------------------------------------
Totem Admin - Ambiente de Desenvolvimento.
--------------------------------------------
- Vite v${viteVersion}
- React v${reactVersion}
- Tailwind v${tailwindVersion}
- Rode "pnpm run dev" para executar o projeto
- Repositório: ${oscLink} (<-- link clicável em IDEs compatíveis)`;

const msgPreview = `Preview do movie-totem
vite v${viteVersion}
react v${reactVersion}
tailwind v${tailwindVersion}
rode "npm run preview"
${oscLink} (<--link clicável em IDEs compatíveis)`;

  return {
    name: "vite:welcome",
    configureServer(server: import("vite").ViteDevServer) {
      server.httpServer?.once("listening", () => console.log(msgDev));
    },
    configurePreviewServer(server: import("vite").ViteDevServer) {
      server.httpServer?.once("listening", () => console.log(msgPreview));
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [welcomePlugin(), react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [path.resolve(__dirname, "src/setupTests.ts")],
    css: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
