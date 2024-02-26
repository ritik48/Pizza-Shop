import { useSelector } from "react-redux";

export default function Username() {
  const username = useSelector((state) => state.user.userName);

  if (!username) return null;
  return <h1 className="hidden text-lg font-semibold sm:block">{username}</h1>;
}
