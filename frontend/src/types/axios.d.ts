import 'axios'

declare module 'axios' {
    export interface AxiosRequestConfig {
        skipMessage?: boolean
    }
}
