import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// npm run dev 에서도 /api/yoonie/* 서버 함수가 동작하도록 같은 핸들러를 개발 서버에 붙인다.
// (배포 환경에서는 Vercel이 /api 폴더를 서버리스 함수로 실행한다.)
function yoonieApiDevPlugin() {
  return {
    name: 'yoonie-api-dev',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.root, '')
      for (const key of ['GUMLOOP_API_KEY', 'GUMLOOP_USER_ID', 'GUMLOOP_GUMMIE_ID', 'GUMLOOP_GUMMIE_ID_YOONIE_MENTOR', 'GUMLOOP_GUMMIE_ID_MENTIT', 'GUMLOOP_API_BASE']) {
        if (env[key] && !process.env[key]) process.env[key] = env[key]
      }
      server.middlewares.use('/api/yoonie', async (req, res, next) => {
        const route = (req.url ?? '').split('?')[0].replace(/^\/+|\/+$/g, '')
        if (route !== 'start' && route !== 'status') return next()
        try {
          const mod = await server.ssrLoadModule(`/api/yoonie/${route}.js`)
          await mod.default(req, res)
        } catch (error) {
          console.error('[yoonie-api-dev]', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'dev_handler_error' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), yoonieApiDevPlugin()],
})
