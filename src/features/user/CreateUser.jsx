import { useState } from "react";
import Button from "../../ui/Button";

function CreateUser() {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
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
