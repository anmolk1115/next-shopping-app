import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productsSlice from "./reducers/productsSlice";
import cartSlice from "./reducers/cartSlice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        cart: cartSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
