import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: true,
  sourcemap: true,
  outDir: 'lib',
  clean: true,
  format: ['cjs', 'esm'],
});
