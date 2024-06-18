import { resolve } from 'node:path'
import { scanDirFile } from '@winches/utils'
import { interceptMock } from './intercept'
import { getOptions } from './utils'

async function main() {
  const { mockPath = '__mock__' } = await getOptions()
  const mockDir = resolve(process.cwd(), mockPath)
  const mockList = scanDirFile(mockDir)
    .map(path => path.slice(path.indexOf(mockDir) + mockDir.length))
    .map(path => path.replace(/\..*/g, ''))

  // 拦截请求
  await interceptMock(mockList, mockDir)

  console.log()
  console.log(`Success：成功拦截请求 ${mockList}`)
}

main()
