import { defineConfig, loadEnv, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import {
  handleDisableDraftMode,
  handleEnableDraftMode,
  handleSanitySiteContent,
} from './api/_lib/sanity-content.js'

function sanityPreviewApi(): Plugin {
  return {
    name: 'black-opal-sanity-preview-api',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url || '/', 'http://localhost').pathname;

        if (pathname === '/api/draft-mode/enable') {
          await handleEnableDraftMode(request, response);
          return;
        }

        if (pathname === '/api/draft-mode/disable') {
          handleDisableDraftMode(request, response);
          return;
        }

        if (pathname === '/api/sanity-site-content') {
          await handleSanitySiteContent(request, response);
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...env };

  return {
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used - do not remove them
      react(),
      tailwindcss(),
      sanityPreviewApi(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  };
})
