import { Link } from "react-router-dom";

export default function LinkButton({ children, to }) {
  return (
    <Link to={to} className="font-semibold text-blue-600 hover:text-blue-400">
      {children}
    </Link>
  );
}
