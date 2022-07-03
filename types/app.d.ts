import { Ref } from "vue"

/**
 * 开关类型：on开 off关
 */
export type SwitchType = 'on' | 'off'

/**
 * 环境类型 
 * 
 * development：开发环境；
 * staging：预发布环境；
 * production：生产环境；
 */
export type EnvType = 'development' | 'staging' | 'production'

export type TextType<T = string> = {
    field?: T,
    title: string
    value?: string | number
}

export type FilterForm<T> = {
    [K in keyof T]: TextType<K>
}