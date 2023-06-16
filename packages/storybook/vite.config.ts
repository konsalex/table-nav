/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['./__tests__/*.test.(tsx?|tsx)'],
    /** Can be used I need to set-up the tests */
    // setupFiles: ['./src/setup.ts'],
  },
});
