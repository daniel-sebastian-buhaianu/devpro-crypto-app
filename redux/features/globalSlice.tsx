'use client';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CoinInfo {
  [coin: string]: number;
}

interface GlobalData {
  globalData: {
    active_cryptocurrencies: number;
    markets: number;
    total_volume: CoinInfo;
    total_market_cap: CoinInfo;
    market_cap_percentage: CoinInfo;
    market_cap_change_percentage_24h_usd: number;
  };
  isLoading: boolean;
  hasError: boolean;
}

const initialState: GlobalData = {
  globalData: {
    active_cryptocurrencies: 0,
    markets: 0,
    total_volume: { usd: 0 },
    total_market_cap: { usd: 0 },
    market_cap_percentage: { btc: 0, eth: 0 },
    market_cap_change_percentage_24h_usd: 0,
  },
  isLoading: false,
  hasError: false,
};

export const getGlobalData = createAsyncThunk('global/getGlobalData', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/global');
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGlobalData.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    })
    .addCase(getGlobalData.fulfilled, (state, action) => {
      state.globalData = action.payload.data
      state.isLoading = false;
    })
    .addCase(getGlobalData.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      console.error("API call failed with error:", action.payload);
    });
  }
});

export default globalSlice.reducer;