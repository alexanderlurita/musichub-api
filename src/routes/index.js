import { readdirSync } from 'node:fs'
import { basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Router } from 'express'

const router = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js') {
    import(`./${file}`).then((module) => {
      const prefix = `/${basename(file, '.js')}`
      router.use(prefix, module.default)
    })
  }
})

export default router
