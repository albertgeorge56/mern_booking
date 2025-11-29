import type { userRegisterSchemaType } from '@/schemas/user.schema'
import apiClient from './api-client'

export const register = async (
    data: Omit<userRegisterSchemaType, 'confirmPassword'>
) => {
    const res = await apiClient.post('/auth/register', data)
    return res.data
}

export const verifyUser = async () => {
    const res = await apiClient.get('/auth/verify')
    return res.data
}
