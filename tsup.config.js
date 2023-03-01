import { defineConfig } from 'tsup'

export default defineConfig({
  splitting: true,
  sourcemap: true,
  clean: true,
  entryPoints: ['src/bin.js', 'app.js'],
  format: ['esm', 'cjs'],
})