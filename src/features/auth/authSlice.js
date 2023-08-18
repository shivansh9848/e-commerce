import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser,checkAuth } from "./authAPI";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  errMessage: null,
  userChecked:false
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (data) => {
    const response = await createUser(data);
    // console.log("demo", response.data);
    return response.data;
  }
);
export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (data) => {
    const response = await loginUser(data);
    // console.log(response.data[0]);
    return response.data;
  }
);
export const checkAuthAsync = createAsyncThunk(
  "auth/checkAuth",
  async () => {
    const response = await checkAuth();
    // console.log(response.data[0]);
    return response.data.user;
  }
);
export const logoutAsync = createAsyncThunk("auth/", async () => {
  return null;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.errMessage = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.errMessage = action.error;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.errMessage = null;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })
  },
});

export const { increment } = authSlice.actions;

export const selectUser = (state) => state.auth.loggedInUserToken;
export const errorMessage = (state) => state.auth.errMessage;
export const selectUserChecked = (state) => state.auth.userChecked;

export default authSlice.reducer;
