import path from 'path';
import dns from 'dns'
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
//! Error if import from `src` dir
import { EnvSchema } from '@wisdom/backend/dist/config/schema';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = EnvSchema.parse(loadEnv(mode, path.join(__dirname, '..'), ''));
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '~bootstrap': path.resolve(__dirname, '../node_modules/bootstrap'),
        '~bootstrap-icons': path.resolve(__dirname, '../node_modules/bootstrap-icons'),
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: env.APP_SITE_HOST,
      port: env.APP_SITE_PORT,
      https: env.APP_SITE_HTTPS,
      proxy: {
        '/api': {
          target: `http://localhost:${env.APP_SERVER_PORT}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    define: {
      APP_TELEGRAM_BOT_NAME: `"${env.APP_TELEGRAM_BOT_NAME}"`,
    }
  };
});
