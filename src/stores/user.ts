import { removeCookie, setCookie, sleep } from "@/utils"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { message } from "ant-design-vue"

export const userStore = defineStore('user', {
  state: (): Stores.user => ({
    name: '',
    age: null,
    sex: 'unknown',
    token: ''
  }),
  actions: {
    async login(username: string, password: string) {
      return new Promise((resolve, reject) => {
        request.post('/user/login', {
          username, password
        }).then(res => {
          const { data, msg } = res.data
          if (data) {
            this.name = data.name
            this.age = data.age
            this.sex = data.sex
            this.token = `${data.username}Token`
            setCookie('token', this.token)
            resolve(msg)
          } else {
            reject(msg)
          }
        })
      })
    },
    async logout() {
      return new Promise((resolve) => {
        request.get('/user/logout').then(res => {
          const { msg } = res.data
          removeCookie('token')
          message.success(msg)
          resolve(msg)
        })
      })
    },
    async getUserInfo(token: string): Promise<string> {
      return new Promise((resolve, reject) => {
        request.get('/user/info', {
          params: {
            token: token
          }
        }).then(res => {
          const { data, msg } = res.data
          if (data) {
            this.name = data.name
            this.age = data.age
            this.sex = data.sex
            this.token = `${data.username}Token`
            setCookie('token', this.token)
            resolve(msg)
          } else {
            reject(msg)
          }
        })
      })
    }
  }
})