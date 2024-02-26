import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalAmount, getTotalPizza } from "./cartSlice";

function CartOverview() {
  const totalPizza = useSelector(getTotalPizza);
  const totalAmount = useSelector(getTotalAmount);

  if (totalPizza < 1) {
    return null;
  }

  return (
    <div className="flex justify-between bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-6">
      <p className="space-x-4 font-semibold text-stone-300">
        <span>{totalPizza} pizzas</span>
        <span>${totalAmount}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
