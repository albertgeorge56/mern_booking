import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="bg-primary py-10">
      <div className="container flex items-center justify-between">
        <span className="text-xl font-semibold text-white">BookHub</span>
        <span className="flex gap-4 text-white [&_a]:hover:underline [&_a]:hover:underline-offset-4">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
        </span>
      </div>
    </div>
  );
}
