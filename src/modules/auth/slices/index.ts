import { createSlice } from "@reduxjs/toolkit";

export interface authState {
  isAuth: boolean;
  account: string;
}

const initialState: authState = {
  isAuth: false,
  account: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAuth = true;
      state.account = action.payload?.account;
      // state.user = action.payload;
      state.isLoading = false;
      // localStorage.setItem("token-like168", action.payload?.token);
    },
    startLoginSession: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoading = true;
    },
    users: (state, action) => {
      state.users = action.payload?.users;
    },
    logout: (state) => {
      state.isAuth = false;
      state.account = "";
      // state.user = null;
      // localStorage.removeItem("token-like168");
    },
    updateToken: (state, action) => {
      state.token = action.payload?.access_token;
      state.isAuth = true;
    },
    updateUser: (state, action) => {
      state.user = action.payload?.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateToken, users, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
