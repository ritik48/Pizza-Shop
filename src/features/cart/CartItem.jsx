import { useSelector } from "react-redux";

import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import DeletePizza from "../cart/DeletePizza";
import UpdateQuantity from "../../ui/UpdateQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, unitPrice } = item;
  const totalPrice = quantity * unitPrice;

  return (
    <li className="items-center justify-between py-1 md:flex md:py-3">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateQuantity pizzaId={pizzaId}>{ quantity }</UpdateQuantity>
        <DeletePizza pizzaId={pizzaId}>Delete</DeletePizza>
      </div>
    </li>
  );
}

export default CartItem;
