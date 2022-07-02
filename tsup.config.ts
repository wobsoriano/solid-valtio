import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/utils.ts', 'src/vanilla.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
})
