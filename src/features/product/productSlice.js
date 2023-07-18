import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  fetchProductsByFilters,
  fetchProductByID,
} from "./productAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  totalItems: 0,
  status: "idle",
  selectedProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async (pagenation) => {
    const response = await fetchAllProducts(pagenation);
    // console.log(response.data)
    return response.data;
  }
);
export const fetchProductByIDAsync = createAsyncThunk(
  "product/fetchProductByID",
  async (id) => {
    const response = await fetchProductByID(id);
    // console.log(response.data)
    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    // console.log(response.data)
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    // console.log(response.data)
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagenation }) => {
    const response = await fetchProductsByFilters(filter, sort, pagenation);
    // console.log(response.headers);
    return {
      data: response.data,
      totalItems: response.headers["x-total-count"],
    };
    // return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.products = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.data;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductByIDAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIDAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
        // console.log(state.selectedProduct);
      });
  },
});

export const { increment } = productSlice.actions;
export const selectAllProduct = (state) => state.product;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
