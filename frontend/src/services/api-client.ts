import axios from 'axios'

const apiClient = axios.create({
    baseURL: '/api/',
    timeout: 1000,
    withCredentials: true,
})

apiClient.interceptors.response.use(
    (res) => res,
    (error) => {
        console.log(error.response?.data?.error)
        return Promise.reject(error)
    }
)

export default apiClient
