import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

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
  // const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const cart = fakeCart;

  const formErrors = useActionData();

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
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              placeholder="Address"
              className="input w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            className="h-4 w-4 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-1"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="text-sm">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="mt-4">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order Now"}
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
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might use it to contact you.";
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
