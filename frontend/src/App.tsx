import { Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import Layout from './layouts/Layout'
import Home from './pages/Home'
import Register from './pages/Register'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
        },
        mutations: {
            retry: 0,
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="top-right" richColors />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </QueryClientProvider>
    )
}

export default App
