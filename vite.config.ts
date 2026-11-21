import { defineConfig } from 'vite';
import solid from '@solidjs/vite-plugin';

export default defineConfig({
  // Relative asset paths keep the static build working at the GitHub Pages
  // project URL as well as at the local development root.
  base: './',
  // Turnkey client mode: no index.html and no mount file — the plugin generates
  // the entries around src/App.tsx (wrapped in src/Document.tsx) and `vite build`
  // prerenders the shell into a purely static dist/client.
  plugins: [solid({ start: true, diagnostics: true })],
  // Keep one copy of the behavior core. Pre-bundling it separately makes
  // @ui-sdk/solid load a second instance and throw in development.
  optimizeDeps: { exclude: ['@ui-sdk/core'] },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
  },
});
