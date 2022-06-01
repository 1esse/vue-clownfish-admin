import { setCookie, sleep } from "@/utils"
import { defineStore } from "pinia"

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
      if (username !== 'admin' || password !== '123456') {
        return Promise.reject('账号或密码错误')
      }
      this.name = '大卫'
      this.age = 17
      this.sex = 'male'
      this.token = 'Admin Token'
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
      if (token === 'Admin Token') {
        this.name = '大卫'
        this.age = 17
        this.sex = 'male'
        this.token = 'Admin Token'
        setCookie('token', this.token)
        return Promise.resolve('get user info success')
      }
      return Promise.reject('token 错误')
    }
  }
})