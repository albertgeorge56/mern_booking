import axios from 'axios'
import { toast } from 'sonner'

const apiClient = axios.create({
    baseURL: '/api/',
    timeout: 1000,
    withCredentials: true,
})

apiClient.interceptors.response.use(
    (res) => {
        if (res.data?.message) toast.success(res.data?.message)
        return res
    },
    (error) => {
        toast.error(error.response?.data?.error)
        return Promise.reject(error)
    }
)

export default apiClient
