import { redirect, useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { requireAuth } from "../../utils/requireAuth";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-400 px-2 sm:px-0">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader({ request }) {
  await requireAuth(request);
  const menu = await getMenu();
  return menu;
}

export default Menu;
