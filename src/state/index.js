import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  mode: 'dark',
  user: null,
  token: null,
  transactions: [],
  totals: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.transactions = [];
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload.userTrxs;
      state.totals = action.payload.total
    }
  }
})

export const { setMode, setLogin, setLogout, setTransactions } = authSlice.actions;
export default authSlice.reducer;