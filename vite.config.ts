import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/

const env = loadEnv('', process.cwd())

const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(env.VITE_APP_PORT) || 5173
  },
  resolve: {
    alias: {
      '@configs': pathResolve('src/configs'),
      '@utils': pathResolve('src/utils'),
      '@atoms': pathResolve('src/components/atoms'),
      '@templates': pathResolve('src/components/templates')
    }
  },
  base: '/'
})
