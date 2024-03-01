import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "./userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const redirectTo = searchParams.get("redirectTo") || "/menu";

  const curUserName = useSelector((state) => state.user.userName);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(createUser(username));
    navigate(redirectTo);
  }

  if (curUserName) {
    return (
      <Button type="primary" to="/menu">
        Go to menu, {curUserName}
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-5">
      <p className="text-sm font-semibold sm:text-xl">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        className="input w-72"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
