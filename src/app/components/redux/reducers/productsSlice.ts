import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../helpers/types";

interface ProductsState {
    data: Product[];
    loading: boolean;
    error: string | null;
  }
  const initialState: ProductsState = {
    data: [],
    loading: false,
    error: null,
  };

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        getProducts: (state, action: PayloadAction<Product[]>)=>{
            state.data = action.payload;
        }
    }
})


export const { getProducts } = productsSlice.actions
export default productsSlice.reducer
