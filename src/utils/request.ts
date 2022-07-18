import { message } from 'ant-design-vue'
import axios from 'axios'
import { getCookie } from '.'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: true,
  timeout: 60000
})

const token = getCookie('token')

request.interceptors.request.use(
  config => {
    if (config.headers && token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const { code, msg } = response.data
    if (code !== 200) {
      message.error(`错误码${code}：${msg || '未知错误'}`, 5)
      return Promise.reject(new Error(msg || '未知错误'))
    } else {
      return response.data
    }
  },
  error => {
    console.error(error)
    message.error(error.message, 5)
    return Promise.reject(error)
  }
)

export default request