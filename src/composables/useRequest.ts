import request from "@/utils/request"
import { ref, shallowRef } from "vue"

export function requestGet(url: string, useRef: boolean = false) {
    const data = useRef ? ref<any>(null) : shallowRef<any>(null)
    const error = useRef ? ref<any>(null) : shallowRef<any>(null)
    request.get(url).then(res => {
        data.value = res.data.data
    }).catch(err => {
        error.value = err
    })
    return { data, error }
}

export function requestPost(url: string, body: unknown, useRef: boolean = false) {
    const data = useRef ? ref<any>(null) : shallowRef<any>(null)
    const error = useRef ? ref<any>(null) : shallowRef<any>(null)
    request.post(url, body).then(res => {
        data.value = res.data.data
    }).catch(err => {
        error.value = err
    })
    return { data, error }
}