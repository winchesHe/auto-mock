import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

export async function getOptions() {
  async function getOpts(path) {
    const absPath = resolve(process.cwd(), path)
    if (!existsSync(absPath))
      return null
    return await import(absPath)
  }
  const opts = getOpts('mock.config.js') || getOpts('mock.config.cjs')
    || getOpts('package.json') || {}

  return opts
}
