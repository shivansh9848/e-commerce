import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, updateOrder,fetchLoggedInUsersOrders, } from "./orderAPI";

const initialState = {
  status: "idle",
  orders: [],
  userOrders: [],
  currentOrder: null,
};
export const fetchLoggedInUsersOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUsersOrders",
  async () => {
    const response = await fetchLoggedInUsersOrders();
    return response.data;
  }
);
export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (data) => {
    const response = await createOrder(data);
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async () => {
    const response = await fetchAllOrders();
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
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
    .addCase(fetchLoggedInUsersOrdersAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchLoggedInUsersOrdersAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.userOrders = action.payload;
    })
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = [...action.payload];
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const idx = state.orders.findIndex(
          (curr) => curr.id == action.payload.id
        );
        state.orders[idx] = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectAllOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectUserOrders = (state) => state.order.userOrders;


export default orderSlice.reducer;
