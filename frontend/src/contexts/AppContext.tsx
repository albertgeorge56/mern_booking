import { verifyUser } from '@/services/auth.service'
import type { UserType } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'

type AppContextType = {
    user: UserType | null
}

const AppContext = React.createContext<AppContextType | undefined>(undefined)

export function AppContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<UserType | null>(null)
    const { data } = useQuery({
        queryKey: ['auth'],
        queryFn: verifyUser,
        retry: false,
    })
    useEffect(() => {
        setUser(data?.data)
    }, [data])
    return (
        <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext)
    if (!context) throw new Error('Invalid Context')
    return context
}
