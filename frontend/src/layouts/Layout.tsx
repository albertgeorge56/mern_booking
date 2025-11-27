import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '@/components/Footer'

export default function layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
