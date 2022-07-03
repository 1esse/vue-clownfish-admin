import { Axios, AxiosResponse } from "axios"

export type RequestFail = 'fail'

export interface ResponseData<T> {
    code: number,
    msg: string,
    data: T | null
}

declare module 'axios' {
    export interface AxiosInstance {
        request<T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>>
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>>
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>>
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>>
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>>
    }
}