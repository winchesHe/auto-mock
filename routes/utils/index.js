let cacheData
let mockDir

function cacheMockDir(data) {
  if (!data)
    return { cacheData, mockDir }
  cacheData = data.cacheData || cacheData
  mockDir = data.mockDir || mockDir

  return { cacheData, mockDir }
}

module.exports = {
  cacheMockDir,
}
