import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addPizza, getCurrentQuantityById } from "../cart/cartSlice";
import DeletePizza from "../cart/DeletePizza";
import UpdateQuantity from "../../ui/UpdateQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();

  function handleAddToCart() {
    const item = { pizzaId: id, name, unitPrice, quantity: 1 };
    dispatch(addPizza(item));
  }

  const quantityInCart = useSelector(getCurrentQuantityById(id));
  console.log(quantityInCart);

  return (
    <li className="flex gap-3 py-2">
      <img
        className={`h-24 sm:h-28 ${soldOut ? "opacity-70 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="mt-1 flex grow flex-col">
        <p className="text-lg font-extrabold">{name}</p>
        <p className="sm:text-md text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm md:text-base">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-semibold uppercase text-stone-500 md:text-base">
              Sold out
            </p>
          )}
          {quantityInCart > 0 && !soldOut && (
            <UpdateQuantity pizzaId={id}>{quantityInCart}</UpdateQuantity>
          )}
          {quantityInCart < 1 && !soldOut && (
            <Button type="small" onClick={() => handleAddToCart()}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
