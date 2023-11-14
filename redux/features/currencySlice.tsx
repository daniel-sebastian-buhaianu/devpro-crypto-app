"use client";

import { createSlice } from "@reduxjs/toolkit";

interface CurrencyState {
  currency: string;
}

const initialState: CurrencyState = {
  currency: "USD",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

export const { updateCurrency } = currencySlice.actions;
export default currencySlice.reducer;