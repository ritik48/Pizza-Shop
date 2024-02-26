import { useDispatch } from "react-redux";

import Button from "./Button";
import {
  increasePizzaQuantity,
  decreasePizzaQuantity,
} from "../features/cart/cartSlice";

export default function UpdateQuantity({ children, pizzaId }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <Button
        type="round"
        onClick={() => dispatch(decreasePizzaQuantity(pizzaId))}
      >
        -
      </Button>
      <span>{children}</span>
      <Button
        type="round"
        onClick={() => dispatch(increasePizzaQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}
