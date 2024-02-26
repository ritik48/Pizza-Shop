import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser(state, action) {
      state.userName = action.payload;
    },
  },
});

export function getUsername(state) {
  return state.user.userName;
}

const { createUser } = userSlice.actions;

export { createUser };
export default userSlice.reducer;
