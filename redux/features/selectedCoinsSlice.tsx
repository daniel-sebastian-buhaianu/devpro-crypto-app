'use client';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface GetCoinDataArgs {
  currency: string;
  days: string;
  coinId: string;
}

interface CoinData {
  id: string;
  prices: [number, number][];
  total_volumes: [number, number][];
}

interface selectedCoinState {
  selectedCoins: CoinData[];
  loading: string;
  hasError: boolean;
}

const initialState: selectedCoinState = {
  selectedCoins: [],
  loading: "idle",
  hasError: false
}

export const getCoinData = createAsyncThunk('coinData/getCoinData',
  async ({ currency, days, coinId }: GetCoinDataArgs, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`);
      const { prices, total_volumes } = data
      const item: CoinData = {
        id: coinId,
        prices,
        total_volumes
      }
      return item;
    } catch (error) {
      return rejectWithValue(error);
    }
  });


const selectedCoinsSlice = createSlice({
  name: "selectedCoin",
  initialState,
  reducers: {
    removeCoin(state, action) {
      const coinIdToRemove = action.payload;
      const newList = state.selectedCoins.filter((item) => item.id !== coinIdToRemove);
      state.selectedCoins = [...newList];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoinData.pending, (state) => {
        state.loading = "pending";
        state.hasError = false;
      })
      .addCase(getCoinData.fulfilled, (state, action) => {
        state.selectedCoins = [...state.selectedCoins, action.payload];
        state.loading = "fulfilled";
      })
      .addCase(getCoinData.rejected, (state, action) => {
        state.loading = "rejected";
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  }
});

export const { removeCoin } = selectedCoinsSlice.actions;
export default selectedCoinsSlice.reducer;