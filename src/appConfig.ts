/**
 * app标题
 */
export const appTitle = 'ClownFish Admin'

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
 * 只在开发环境且appConfig的mock字段为‘on’的情况启动mock，
 * 由于线上预览需要，这里不限制环境
 */
export const mockEnv: envType[] = ['development', 'staging', 'production']