import { useAppContext } from '@/contexts/AppContext'
import { Link, useNavigate } from 'react-router'

export default function Header() {
    const { isLoggedIn, logout } = useAppContext()
    console.log(isLoggedIn)
    const navigate = useNavigate()
    return (
        <div className="bg-white py-4">
            <div className="container flex justify-between">
                <span className="text-2xl font-bold tracking-tight">
                    <Link to="/">BookingHub</Link>
                </span>
                <span className="flex gap-5 items-center">
                    {isLoggedIn ? (
                        <>
                            <Link
                                className="smooth-underline"
                                to="/my-bookings"
                            >
                                My Bookings
                            </Link>
                            <Link
                                className="smooth-underline"
                                to="/my-bookings"
                            >
                                My Hotels
                            </Link>
                            <button
                                onClick={() => {
                                    logout()
                                    navigate('/login', { replace: true })
                                }}
                                className="btn btn-primary"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary">
                            Login
                        </Link>
                    )}
                </span>
            </div>
        </div>
    )
}
