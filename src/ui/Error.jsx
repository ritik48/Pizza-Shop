import { useNavigate, useRouteError } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😐</h1>
      <div>{error.data || error.message}</div>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
}
