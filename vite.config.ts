import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  // Load .env.local (and friends) so the ShelterLuv key is available to the
  // dev server WITHOUT a VITE_ prefix — it stays server-side and never reaches
  // the browser bundle.
  const env = loadEnv(mode, process.cwd(), '')
  const shelterLuvKey = env.SHELTER_LUV_API_KEY

  return {
    plugins: [
      figmaAssetResolver(),
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],

    server: {
      proxy: {
        // Proxy ShelterLuv API calls through the dev server so the secret API
        // key is injected here (server-side) instead of being exposed to the
        // browser. The client calls /api/shelterluv/animals?... and this maps
        // it to https://www.shelterluv.com/api/v1/animals?... with the header.
        //
        // NOTE: This only runs under `vite dev`. For a production build you'll
        // need an equivalent serverless function / proxy that injects the key.
        '/api/shelterluv': {
          target: 'https://www.shelterluv.com',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/shelterluv/, '/api/v1'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (shelterLuvKey) {
                proxyReq.setHeader('X-Api-Key', shelterLuvKey)
              }
            })
          },
        },
      },
    },
  }
})
