/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 30000,
    globals: true,
    environment: 'jsdom',
    setupFiles: 'packages/frontend/src/test/setup.ts',
    css: true,
  },
  logLevel: 'info',
  esbuild: {
    sourcemap: 'both',
  },
  resolve: {
    alias: {
      '@dubs-app/core': './packages/core/src',
      '@dubs-app/databases': './packages/databases/src',
      '@dubs-app/frontend': './packages/frontend/src',
      '@dubs-app/functions': './packages/functions/src',
    },
  },
});
