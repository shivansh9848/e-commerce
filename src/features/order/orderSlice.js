import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";

const initialState = {
  value: 1,
  status: "idle",
  orders: [],
  currentOrder: null,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (data) => {
    const response = await createOrder(data);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
      state.orders = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
