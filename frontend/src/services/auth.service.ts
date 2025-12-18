import type {
    userLoginSchemaType,
    userRegisterSchemaType,
} from '@/schemas/user.schema'
import apiClient from './api-client'

export const register = async (
    data: Omit<userRegisterSchemaType, 'confirmPassword'>
) => {
    const res = await apiClient.post('/auth/register', data)
    return res.data
}

export const login = async (data: userLoginSchemaType) => {
    const res = await apiClient.post('/auth/login', data)
    return res.data
}

export const verifyUser = async (skipMessage: boolean = false) => {
    const res = await apiClient.get('/auth/verify', {
        skipMessage: skipMessage,
    })
    return res.data
}

export const logout = async () => {
    const res = await apiClient.post('/auth/logout')
    return res.data
}
