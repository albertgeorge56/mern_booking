import 'axios'

declare module 'axios' {
    export interface AxiosRequestConfig {
        skipError?: boolean
    }
}
