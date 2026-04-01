import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/huangmenji-ai-assistant-demo/',
  plugins: [react()],
});
