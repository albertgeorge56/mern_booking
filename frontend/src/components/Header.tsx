import { Link } from 'react-router'

export default function Header() {
  return (
    <div className="bg-white py-4">
      <div className="container flex justify-between">
        <span className="text-2xl font-bold tracking-tight">
          <Link to="/">BookingHub</Link>
        </span>
        <span className="flex gap-3">
          <Link to="/sign-in" className="btn btn-primary">
            Login
          </Link>
        </span>
      </div>
    </div>
  )
}
