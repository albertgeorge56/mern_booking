import type { userLoginSchemaType } from '@/schemas/user.schema'
import * as authService from '@/services/auth.service'
import type { UserType } from '@/types/user'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

type AppContextType = {
    user: UserType | null
    isLoggedIn: boolean
    login: ({ email, password }: userLoginSchemaType) => Promise<void>
    logout: () => Promise<void>
}

const AppContext = React.createContext<AppContextType | undefined>(undefined)

export function AppContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<UserType | null>(null)
    const isLoggedIn = !!user

    useEffect(() => {
        authService
            .verifyUser()
            .then((data) => setUser(data))
            .catch(() => {
                toast.error('Something Went Wrong.')
                setUser(null)
            })
    }, [])

    const login = async ({ email, password }: userLoginSchemaType) => {
        const data = await authService.login({ email, password })
        setUser(data)
    }

    const logout = async () => {
        try {
            await authService.logout()
            setUser(null)
        } catch (error) {
            toast.error('Something Went Wrong.')
        }
    }

    return (
        <AppContext.Provider value={{ isLoggedIn, login, logout, user }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext)
    if (!context) throw new Error('Invalid Context')
    return context
}
