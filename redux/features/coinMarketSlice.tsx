'use client';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Coin } from "@/types";

interface GetCoinMarketDataArgs {
  currency: string;
  page: number;
}

interface CoinMarketData {
  coins: Coin[];
  loading: string;
  hasError: boolean;
  currentPage: number;
}

const initialState: CoinMarketData = {
  coins: [],
  loading: 'idle',
  hasError: false,
  currentPage: 1
}

export const getCoinMarketData = createAsyncThunk('coinMarket/getCoinMarketData',
  async ({ currency, page }: GetCoinMarketDataArgs, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});


const coinMarketData = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoinMarketData.pending, (state) => {
        state.loading = "pending";
        state.hasError = false;
      })
      .addCase(getCoinMarketData.fulfilled, (state, action) => {
        state.coins = [...state.coins, ...action.payload];
        state.loading = "fulfilled";
        state.currentPage += 1;
      })
      .addCase(getCoinMarketData.rejected, (state, action) => {
        state.loading = "rejected";
        state.hasError = true;
        console.error("API call failed with error:", action.payload);
      });
  }
});

export default coinMarketData.reducer;