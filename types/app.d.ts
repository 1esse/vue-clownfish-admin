import { DefaultOptionType, SelectValue } from "ant-design-vue/es/select"
import { Ref, ShallowRef } from "vue"

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

export type TextType = {
    kind: 'text'
    field?: string
    title: string
    value?: string | number | Ref<string | number>
}

export type SelectType = {
    kind: 'select'
    field?: string
    title: string
    value: SelectValue | Ref<SelectValue>
    options: DefaultOptionType[] | ShallowRef<DefaultOptionType[]>
    onChange?: (value: SelectValue, option: DefaultOptionType | DefaultOptionType[]) => void
}


