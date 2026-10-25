import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración de Vitest (pruebas unitarias)
  test: {
    environment: "jsdom", // simula un navegador para poder renderizar componentes
    globals: true, // permite que React Testing Library limpie el DOM entre pruebas
    setupFiles: "./src/pruebas/setup.ts",
    css: false,
  },
});
