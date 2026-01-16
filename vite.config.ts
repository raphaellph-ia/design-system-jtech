import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Garante runtime JSX do React mesmo com tsconfig legado (Vue)
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  plugins: [
    react({
      jsxImportSource: "react",
      jsxRuntime: "automatic",
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
