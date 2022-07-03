import { EnvType, SwitchType } from "types/app"

/**
 * app标题
 */
export const appTitle = 'Clownfish Admin'

/**
 * 使用mock代理api请求：on开，off关  
 */
export const mock: SwitchType = 'on'

/**
 * mock是否开启namespace，开启后文件名将作为前缀拼接在url
 */
export const mockNamespace: boolean = true

/**
 * mock代理指定环境
 * 只在开发环境且appConfig的mock字段为‘on’的情况启动mock
 */
export const mockEnv: EnvType[] = ['development', 'staging', 'production']

/**
 * 过渡动画类型
 */
export enum transitions {
  fade = 'fade',
  fadeScale = 'fade-scale',
  slideLeft = 'slide-left',
  slideRight = 'slide-right',
  slideUp = 'slide-up',
  slideDown = 'slide-down',
}
