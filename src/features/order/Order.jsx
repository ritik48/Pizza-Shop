// Test ID: IIDSAT
import Button from "../../ui/Button";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";

function Order() {
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  // const [loading, setLoading] = useState(false);
  // const [menu, setMenu] = useState([])

  // getting menu so that we could show ingredients
  // Now, we also have one route which loads the menu , so instead of below approach we can also use
  // useFetcher() hook

  // useEffect(() => {
  //   setLoading(true);
  //   async function fetchMenu() {
  //     const menu = await getMenu();
  //     console.log(menu);
  //     setMenu(menu);
  //     setLoading(false);
  //   }
  //   fetchMenu();
  // }, []);

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  return (
    <div className="flex flex-col gap-8 px-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-bold">Order #{id} Status</h2>

        <div className="flex items-center gap-2">
          {priority && (
            <span className="text-md py-0.4 rounded-xl bg-red-500 px-2 uppercase text-red-100">
              Priority
            </span>
          )}
          <span className="text-md py-0.4 rounded-xl bg-green-500 px-2 uppercase text-green-100">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-300 px-4 py-5">
        <p className="font-semibold text-stone-800">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-stone-600">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-300">
        {cart.map((pizza) => (
          <OrderItem
            key={pizza.pizzaId}
            item={pizza}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((men) => men.id === pizza.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-300 px-4 py-5">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-md font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && (
        <fetcher.Form className="text-right" method="PATCH">
          <Button type="primary">Make Priority</Button>
        </fetcher.Form>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  console.log(order);
  return order;
}

export async function action({ params }) {
  const update = { priority: true };
  await updateOrder(params.orderId, update);
  return null;
}

export default Order;
