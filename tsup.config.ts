import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/utils.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
})
