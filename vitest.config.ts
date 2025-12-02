import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: ['node_modules', 'cypress'],
    coverage: {
      provider: 'v8',
      exclude: ['node_modules', 'cypress', '**/*.config.*'],
    },
  },
});
