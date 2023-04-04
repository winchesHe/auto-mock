import Mock from 'mockjs'
import { join } from 'path'

export async function interceptMock(mockList, mockDir) {
  for (const item of mockList) {
    newItem = item.replace(/\\/g, '\/')
    // 判断是否为动态路径
    if (newItem.includes(':')) {
      const path = newItem.replace(':', '/:')
      await addRoutes(path, item)
      continue
    }
    await addRoutes(newItem, item)
  }

  async function addRoutes(url, name) {
    const path = join(mockDir, `${name}.js`)
    const mockFn = await import(path)
    Mock.mock(url, 'GET', mockFn)
    Mock.mock(url, 'POST', mockFn)
  }
}