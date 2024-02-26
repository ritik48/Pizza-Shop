import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza(state, action) {
      state.cart.push(action.payload);
    },
    increasePizzaQuantity(state, action) {
      const pizza = state.cart.find((item) => item.pizzaId === action.payload);
      pizza.quantity++;
    },
    decreasePizzaQuantity(state, action) {
      const pizza = state.cart.find((item) => item.pizzaId === action.payload);
      pizza.quantity--;

      if (pizza.quantity === 0) {
        state.cart = state.cart.filter(
          (item) => item.pizzaId !== action.payload,
        );
      }
    },
    deletePizza(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export function getTotalPizza(state) {
  return state.cart.cart.reduce((acc, cur) => acc + cur.quantity, 0);
}

export function getTotalAmount(state) {
  return state.cart.cart.reduce(
    (acc, cur) => acc + cur.quantity * cur.unitPrice,
    0,
  );
}

export function getCurrentQuantityById(id) {
  return (state) => {
    return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
  };
}

const {
  addPizza,
  deletePizza,
  clearCart,
  increasePizzaQuantity,
  decreasePizzaQuantity,
} = cartSlice.actions;

export {
  addPizza,
  deletePizza,
  clearCart,
  increasePizzaQuantity,
  decreasePizzaQuantity,
};
export default cartSlice.reducer;
