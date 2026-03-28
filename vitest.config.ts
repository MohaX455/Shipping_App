import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    test: {
        environment: 'node',
        globals: false,
        include: ['src/__tests__/**/*.spec.ts']
    },
    plugins: [tsconfigPaths()]
})
