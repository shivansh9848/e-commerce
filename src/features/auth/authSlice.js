import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, updateUser } from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  errMessage: null,
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
    return response.data[0];
  }
);
export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (data) => {
    const response = await updateUser(data);
    // console.log(response.data[0]);
    return response;
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
        state.loggedInUser = action.payload;
        state.errMessage = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.errMessage = action.error;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      });
  },
});

export const { increment } = authSlice.actions;

export const selectUser = (state) => state.auth.loggedInUser;
export const errorMessage = (state) => state.auth.errMessage;

export default authSlice.reducer;
