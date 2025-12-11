import axios, { type AxiosRequestConfig } from 'axios'
import { useLocation } from 'react-router'
import { toast } from 'sonner'

const apiClient = axios.create({
    baseURL: '/api/',
    timeout: 1000,
    withCredentials: true,
})

apiClient.interceptors.response.use(
    (res) => {
        if (res.data?.message)
            toast.success(
                (res.data?.message as string).charAt(0).toUpperCase() +
                    (res.data?.message as string).slice(1)
            )
        return res
    },
    (error) => {
        if (error.config?.skipError) {
            return Promise.reject(error)
        }
        toast.error(error.response?.data?.error)
        return Promise.reject(error)
    }
)

export default apiClient
