import { Stores } from '../../types/stores'
import { MockApi } from '../mockapi'

const users: ({ username: string, password: string } & Stores.user)[] = [
  {
    username: 'david',
    password: '123456',
    name: '大卫',
    age: 18,
    sex: 'male',
    token: 'davidToken'
  }, {
    username: 'lili',
    password: '123456',
    name: '莉莉',
    age: 16,
    sex: 'female',
    token: 'liliToken'
  },
]

export default <MockApi.obj[]>[
  {
    url: '/login',
    type: 'post',
    response: (options) => {
      const failRes: MockApi.response = {
        code: 200,
        msg: '登陆失败',
        data: null
      }
      if (!options.body) return failRes
      const { username, password } = options.body
      const user = users.find(user => user.username === username)
      if (!user || user.password !== password) return failRes
      return {
        code: 200,
        msg: '登录成功',
        data: user
      }
    }
  },
  {
    url: '/logout',
    type: 'get',
    response: {
      code: 200,
      msg: '登出成功',
      data: 'logout success'
    }
  },
  {
    url: '/info\\?token=.*',
    type: 'get',
    response: (options) => {
      const failRes: MockApi.response = {
        code: 200,
        msg: '获取用户失败',
        data: null
      }
      // 获取token
      const token = options.url.slice(options.url.indexOf('=') + 1)
      if (!token) return failRes
      const user = users.find(user => user.token === token)
      if (!user) return failRes
      return {
        code: 200,
        msg: '获取用户信息成功',
        data: user
      }
    }
  }
]