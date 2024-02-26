import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deletePizza } from "./cartSlice";

export default function DeletePizza({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deletePizza(pizzaId))}>
      Delete
    </Button>
  );
}
