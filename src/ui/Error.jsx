import { useNavigate, useRouteError } from "react-router-dom";
import Button from "./Button";

export default function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="p-6 space-y-2">
      <div className="text-stone-800 font-semobold">{error.data || error.message}</div>
      <Button type="link" onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
}
