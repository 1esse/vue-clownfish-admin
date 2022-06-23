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
      if (!options.body) return null
      const { username, password } = options.body
      const user = users.find(user => user.username === username)
      if (!user || user.password !== password) return {
        code: 200,
        msg: '登陆失败',
        data: null
      }
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
      // 获取token
      const token = options.url.slice(options.url.indexOf('=') + 1)
      if (!token) return {
        code: 200,
        msg: '获取用户失败',
        data: null
      }
      const user = users.find(user => user.token === token)
      if (!user) return {
        code: 200,
        msg: '获取用户失败',
        data: null
      }
      return {
        code: 200,
        msg: '获取用户信息成功',
        data: user
      }
    }
  }
]