import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-400 bg-yellow-500 p-4 uppercase sm:px-6">
      <Link
        to="/"
        className="text-xs font-bold tracking-widest sm:text-sm sm:font-semibold"
      >
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
