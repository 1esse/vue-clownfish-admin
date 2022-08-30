/**
 * @param key cookie的键
 * @param value cookie的值
 * @param expires cookie的过期时间（天数），不传则关闭会话后失效，传参为负数则清除该cookie
 * @param path cookie生效路径范围，默认"/"全局生效
 */
export function setCookie(key: string, value: string | number, expires: number = 0, path: string = '/') {
  let cookie = `${key}=${encodeURIComponent(value)};path=${path};${import.meta.env.MODE === 'production' ? 'SameSite=None;Secure' : ''}`
  if (expires !== 0) {
    const date = new Date()
    date.setDate(date.getDate() + expires)
    cookie += `;expires=${date.toUTCString()}`
  }
  document.cookie = cookie
}

/**
 * @param key cookie的键
 * @returns cookie的值
 */
export function getCookie(key: string) {
  const reg = new RegExp("(^| )" + encodeURIComponent(key) + "=([^;]+)")
  const match = document.cookie.match(reg)
  return match ? decodeURIComponent(match[2]) : ""
}

/**
 * 
 * @param key 移除的cookie的键名
 */
export function removeCookie(key: string) {
  setCookie(key, '', -1)
}

/**
 * @param ms 睡眠时间（毫秒）
 * @returns Promise<unknown>
 */
export function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('wake up')
    }, ms)
  })
}

/**
 * 
 * @param arr Array<any>
 * @returns 数组随机项
 */
export function randomPick(arr: Array<any>) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * 
 * @returns guid
 */
export const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * @summary 验证字段是不是手机号码
 * @param {string} str
 * @returns {Boolean}
 */
export const isPhone = (str: string) => {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(str)
}

/**
 * @summary 验证字段是不是邮箱
 * @param {string} str
 * @returns {Boolean}
 */
export const isEmail = (str: string) => {
  const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  return reg.test(str)
}

