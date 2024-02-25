import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className="px-4 py-3">
      <LinkButton to={"/menu"}>&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, %NAME%</h2>

      <ul className="mt-3 divide-y divide-stone-500 border-b border-stone-500">
        {cart.map((pizza) => (
          <CartItem item={pizza} />
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-4">
        <Button to={"/order/new"} type="primary">
          Order Pizzas
        </Button>
        <Button type="secondary">Clear Cart</Button>
      </div>
    </div>
  );
}

export default Cart;