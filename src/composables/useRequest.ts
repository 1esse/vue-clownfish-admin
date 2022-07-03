import request from "@/utils/request"
import { ref, shallowRef } from "vue"
import type { RequestFail } from '../../types/request'

export function requestGet<T = any>(url: string, useRef: boolean = false) {
    const data = useRef ? ref<T | RequestFail | null>(null) : shallowRef<T | RequestFail | null>(null)
    request.get<T>(url).then(res => {
        data.value = res.data
    }).catch(err => {
        console.error(err)
        data.value = 'fail'
    })
    return data
}

export function requestPost<T = any>(url: string, body: unknown, useRef: boolean = false) {
    const data = useRef ? ref<T | RequestFail | null>(null) : shallowRef<T | RequestFail | null>(null)
    request.post<T>(url, body).then(res => {
        data.value = res.data
    }).catch(err => {
        console.error(err)
        data.value = 'fail'
    })
    return data
}