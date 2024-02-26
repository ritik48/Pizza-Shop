import { Link } from "react-router-dom";

export default function Button({
  children,
  to = null,
  type,
  disabled = false,
  onClick,
}) {
  const base =
    "rounded-full bg-yellow-500 font-semibold tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1 disabled:cursor-not-allowed uppercase";

  const styles = {
    primary: base + " px-4 py-3 text-sm",
    small: base + " px-4 py-1.5 md:py-2 text-sm uppercase",
    secondary:
      "rounded-full text-sm font-semibold tracking-wide text-stone-500 transition-colors border border-stone-500 duration-300 hover:bg-stone-400 hover:text-stone-800 focus:outline-none focus:ring focus:bg-stone-400 focus:text-stone-800 focus:ring-stone-500 focus:ring-offset-1 disabled:cursor-not-allowed px-4 py-3 uppercase",
    round: base + " w-8 h-8"
  
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button className={styles[type]} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}
