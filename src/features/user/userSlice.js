import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAddress } from "../../services/apiGeocoding";
import { builders } from "prettier/doc";

const initialState = {
  userName: "",
  status: "ideal",
  error: "",
  position: {},
  address: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = "";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        // state.error = action.error.message; // provide by RTK
        state.error = "Cannot fetch your location. Make sure to fill your address."
      });
  },
});

export function getUsername(state) {
  return state.user.userName;
}

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// thunk middleware
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function fetchAddress() {
    const positionObj = await getPosition();
    const position = {
      longitude: positionObj.coords.longitude,
      latitude: positionObj.coords.latitude,
    };

    //convert coords to address
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode} ${addressObj?.countryName}`;

    return { position, address };
  },
);

export const { createUser } = userSlice.actions;

export default userSlice.reducer;
