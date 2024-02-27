import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";

import { clearCart, getTotalAmount } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const dispatch = useDispatch();

  const {
    position: addressPosition,
    address,
    status: addressStatus,
    error: addressError,
  } = useSelector((state) => state.user);

  const isLoading = addressStatus === "loading";

  const cart = useSelector((state) => state.cart.cart);
  const formErrors = useActionData();

  const totalPrice = useSelector(getTotalAmount);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;

  return (
    <div className="sn:px-4 px-6 py-6">
      <h2 className="mb-5 text-xl font-bold">Ready to order? Let's go!</h2>

      <Form method="POST" className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            placeholder="Name"
            className="input grow"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              placeholder="Phone no."
              className="input w-full"
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 px-2 py-1 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              type="text"
              name="address"
              required
              placeholder="Address"
              className="input w-full"
              defaultValue={address}
            />
            {Object.keys(addressPosition).length < 1 && (
              <div className="absolute right-1 top-1">
                <Button
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                  disabled={isLoading}
                >
                  Get Location
                </Button>
              </div>
            )}
            {addressError && (
              <p className="mt-2 rounded-md bg-red-100 px-2 py-1 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            className="h-4 w-4 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-1"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="text-sm">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="mt-4">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order..."
              : `Order Now From ${formatCurrency(totalPrice + priorityPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === true,
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might use it to contact you.";
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // we cannot use hooks inside here as it's not a component,
  // so we will use directly 'redux store' to invoke the action function
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
