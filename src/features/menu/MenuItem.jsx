import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex gap-3 py-2">
      <img
        className={`h-24 sm:h-28 ${soldOut ? "opacity-70 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="mt-1 flex grow flex-col">
        <p className="text-lg font-extrabold">{name}</p>
        <p className="text-sm sm:text-md capitalize italic text-stone-500">
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
          <Button type="small">Add to Cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
