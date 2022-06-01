import { setCookie, sleep } from "@/utils"
import { defineStore } from "pinia"

const users: ({ username: string, password: string } & Stores.user)[] = [
  {
    username: 'david',
    password: '123456',
    name: '大卫',
    age: 18,
    sex: 'male'
  }, {
    username: 'lili',
    password: '123456',
    name: '莉莉',
    age: 16,
    sex: 'female'
  },
]

export const userStore = defineStore('user', {
  state: (): Stores.user => ({
    name: '',
    age: null,
    sex: 'unknown',
    token: ''
  }),
  actions: {
    async login(username: string, password: string) {
      await sleep(2000)
      const user = users.find(item => item.username === username)
      if (!user || password !== user.password) {
        return Promise.reject('账号或密码错误')
      }
      this.name = user.name
      this.age = user.age
      this.sex = user.sex
      this.token = `${user.username} Token`
      setCookie('token', this.token)
      return Promise.resolve('login success')
    },
    async logout() {
      await sleep(500)
      setCookie('token', '', -1)
      return Promise.resolve('logout success')
    },
    async getUserInfo(token: string): Promise<string> {
      await sleep(500)
      const user = users.find(item => `${item.username} Token` === token)
      if (user) {
        this.name = user.name
        this.age = user.age
        this.sex = user.sex
        this.token = `${user.username} Token`
        setCookie('token', this.token)
        return Promise.resolve('get user info success')
      }
      return Promise.reject('token 错误')
    }
  }
})