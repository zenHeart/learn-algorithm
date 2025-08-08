import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['docs/data-structures/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', 'build', 'coverage'],
    globals: true,
    environment: 'node',
  },
})
