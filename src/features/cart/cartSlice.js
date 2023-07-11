import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchItemsByUserID } from "./cartAPI";

const initialState = {
  value: null,
  status: "idle",
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (data) => {
    const response = await addToCart(data);
    // console.log("demo", response);
    return response.data;
  }
);
export const fetchItemsByUserIDAsync = createAsyncThunk(
  "cart/fetchItemsByUserID",
  async (userID) => {
    const response = await fetchItemsByUserID(userID);
    console.log("demo", response);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIDAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIDAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(...action.payload);
      });
  },
});

export const { increment } = cartSlice.actions;
export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
