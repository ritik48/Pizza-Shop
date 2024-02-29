import { useSearchParams } from "react-router-dom";
import CreateUser from "../features/user/CreateUser";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const message = searchParams.get("message");

  return (
    <div className="text-center">
      <h1 className="my-10 text-xl font-semibold sm:text-3xl">
        The best pizza.
        <br />
        <span className="font-bold text-yellow-500">
          Straight out of the oven, straight to you
        </span>
      </h1>
      {message && <p className="my-5 px-10 mx-auto w-fit text-sm text-red-600 font-semibold bg-red-200 rounded-md">{message}</p>}
      <CreateUser />
    </div>
  );
}

export default Home;
