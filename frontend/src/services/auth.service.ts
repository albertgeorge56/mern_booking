import type { userRegisterSchemaType } from '@/schemas/user.schema'
import apiClient from './api-client'

export const register = async (
    data: Omit<userRegisterSchemaType, 'confirmPassword'>
) => {
    const response = await apiClient.post('/auth/register', data)
    return response
}
