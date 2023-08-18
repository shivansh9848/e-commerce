import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchItemsByUserID,
  deleteItem,
  updateCart,
  resetCart,
} from "./cartAPI";

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
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (data) => {
    const response = await updateCart(data);
    // console.log("demo", response);
    return response;
  }
);

export const deleteItemAsync = createAsyncThunk(
  "cart/deleteItem",
  async (id) => {
    const response = await deleteItem(id);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
  const response = await resetCart();
  return response.data;
});

export const fetchItemsByUserIDAsync = createAsyncThunk(
  "cart/fetchItemsByUserID",
  async () => {
    const response = await fetchItemsByUserID();
    // console.log("demo", response);
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
        state.items = action.payload;
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const idx = state.items.findIndex((curr) => curr.id == action.payload);
        state.items.splice(idx, 1);
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const idx = state.items.findIndex(
          (curr) => curr.id == action.payload.cartItemId
        );
        state.items[idx].quantity = action.payload.quantity;
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
      })
      .addCase(resetCartAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.error);
      });
  },
});

export const { increment } = cartSlice.actions;
export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
