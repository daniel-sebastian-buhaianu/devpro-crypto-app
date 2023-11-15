'use client';

import { useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "@/redux/features/globalSlice";
import currencyReducer from "@/redux/features/currencySlice";

export const  store = configureStore({
  reducer: {
    currency: currencyReducer,
    globalData: globalReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;