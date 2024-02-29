import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useFetcher } from "react-router-dom";

import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { getUsername } from "../user/userSlice";
import { clearCart } from "./cartSlice";
import { getMenu } from "../../services/apiRestaurant";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector(getUsername);
  const dispatch = useDispatch();

  return (
    <div className="px-4 py-3">
      <LinkButton to={"/menu"}>&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-bold">Your cart, {username}</h2>

      {cart.length < 1 && (
        <p className="mt-4">
          You haven't added any pizzas to your cart yet. Explore the menu.
        </p>
      )}
      {cart.length > 0 && (
        <>
          <ul className="mt-3 divide-y divide-stone-500 border-b border-stone-500">
            {cart.map((pizza) => (
              <CartItem item={pizza} key={pizza.pizzaId} />
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-4">
            <Button to={"/order/new"} type="primary">
              Order Pizzas
            </Button>
            <Button type="secondary" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
