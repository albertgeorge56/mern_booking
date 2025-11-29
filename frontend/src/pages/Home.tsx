import { useAppContext } from '@/contexts/AppContext'
import Hero from '../components/Hero'
import { useEffect } from 'react'

export default function Home() {
    const { user } = useAppContext()
    useEffect(() => {
        console.log(user)
    }, [user])
    return (
        <>
            <Hero />
        </>
    )
}
