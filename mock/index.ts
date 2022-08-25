import Mock from 'mockjs'
import { mockNamespace } from '@/appConfig'
import { MockApi } from './mockapi'
import QueryString from 'qs'

type GlobModule = {
  default: MockApi.obj[]
}

function collectApis(): MockApi.obj[] {
  const mockApis = []
  const apiModules = import.meta.glob('./api/*.ts', { eager: true })

  if (mockNamespace) {
    for (const [filePath, apiModule] of Object.entries(apiModules)) {
      const apis: MockApi.obj[] = (apiModule as GlobModule).default
      apis.forEach(api => api.url = filePath.replace(/^.+([\/\\].*)\.ts$/, '$1') + api.url)
      mockApis.push(...(apiModule as GlobModule).default)
    }
  } else {
    for (const [, apiModule] of Object.entries(apiModules)) {
      mockApis.push(...(apiModule as GlobModule).default)
    }
  }
  return mockApis
}

/**
 * @param timeout 接口响应时间范围:毫秒(ms)，默认'100-1000'
 * https://github.com/nuysoft/Mock/wiki/Mock.setup()#timeout
 */
function enableMock(timeout: string | number = '100-1000') {
  Mock.setup({
    timeout: timeout
  })

  const mockApis = collectApis()
  for (const api of mockApis) {
    Mock.mock(new RegExp(api.url), api.type || 'get', (options: MockApi.request) => {
      // 如果传过来的body是序列化且有值，则解析body内容
      if (typeof options.body === 'string' && options.body) {
        options.body = JSON.parse(options.body)
      }
      // 提取params
      if (options.url.indexOf('?') > 0) {
        const paramsStr = options.url.slice(options.url.indexOf('?'))
        options.params = QueryString.parse(paramsStr, { ignoreQueryPrefix: true })
      }
      return api.response instanceof Function ? api.response(options) : api.response
    })
  }
}

export default enableMock