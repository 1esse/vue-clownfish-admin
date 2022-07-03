import { removeCookie, setCookie } from "@/utils"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { message } from "ant-design-vue"
import { Stores } from "types/stores"

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
        request.post<Stores.user>('/user/login', {
          username, password
        }).then(res => {
          const { data, msg } = res
          if (data) {
            this.name = data.name
            this.age = data.age
            this.sex = data.sex
            this.token = `${username}Token`
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
        request.get<Stores.user>('/user/logout').then((res) => {
          const { msg } = res
          removeCookie('token')
          message.success(msg)
          resolve(msg)
        })
      })
    },
    async getUserInfo(token: string): Promise<string> {
      return new Promise((resolve, reject) => {
        request.get<Stores.user>('/user/info', {
          params: {
            token: token
          }
        }).then(res => {
          const { data, msg } = res
          if (data) {
            this.name = data.name
            this.age = data.age
            this.sex = data.sex
            this.token = token
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