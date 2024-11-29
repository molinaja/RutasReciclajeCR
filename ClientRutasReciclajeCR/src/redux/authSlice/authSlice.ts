import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userName: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  userName: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; userName: string }>
    ) => {
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.isAuthenticated = true;
      localStorage.setItem("jwt", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.userName = null;
      state.isAuthenticated = false;
      localStorage.removeItem("jwt");
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("jwt");
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { login, logout, loadUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
