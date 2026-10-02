import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import blogContent from './scripts/vite-plugin-blog.js'

// Serves the Vercel functions in /api during `vite dev`, so the blog stats work locally without `vercel dev`.
function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/api\/([a-z0-9-]+)\/?(?:\?|$)/i)
        if (!match) return next()

        const file = path.resolve(server.config.root, 'api', `${match[1]}.js`)
        if (!fs.existsSync(file)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Not found' }))
          return
        }

        try {
          const mod = await server.ssrLoadModule(file)
          await mod.default(req, res)
        } catch (error) {
          server.ssrFixStacktrace(error)
          next(error)
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) process.env[key] = value
  }

  return {
    plugins: [blogContent(), react(), localApi()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'animation-vendor': ['framer-motion'],
            'icons-vendor': ['react-icons']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    },
  }
})
