'use client';

import { useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "@/redux/features/globalSlice";
import currencyReducer from "@/redux/features/currencySlice";
import coinMarketReducer from "@/redux/features/coinMarketSlice";

export const  store = configureStore({
  reducer: {
    currency: currencyReducer,
    globalData: globalReducer,
    coins: coinMarketReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;