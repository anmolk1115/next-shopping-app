import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../../../helpers/types"

export interface cartInitialState {
    data: Product[];
    loading: boolean;
    error: string | null;
}
const initialState: cartInitialState = {
    data: [],
    loading: false,
    error: null,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addItem: (state, action: PayloadAction<Product>)=>{
            let currItem = {...action.payload};
            let currCartItems = state.data;
            const currItemIndex= currCartItems.findIndex((item: Product)=>{
                return item.id===action.payload.id;
            });
            if(currItemIndex > -1){
                let newItem= currCartItems[currItemIndex];
                newItem.orderQty = newItem.orderQty ? +newItem.orderQty+1: 1;
                currCartItems.splice(currItemIndex,1,newItem);
                state.data=currCartItems;
            }
            else{
                
                currItem.orderQty = 1;
                state.data.push(currItem);
            }
            
        },
        deleteItem: (state,action:PayloadAction<Product>) => {
           
            let currCartItems = state.data;
            const payload = action.payload;
            const currItemIndex= currCartItems.findIndex((item: Product)=>{
                return item.id===payload.id;
            });
            if(currItemIndex > -1){
                currCartItems.splice(currItemIndex,1);
                state.data=currCartItems;
            }
        },
        updateItemQuantity: (state,action) => {
            let currCartItems = state.data;
            let currItem = {...action.payload.currItem};
            const operation= action.payload.operation;
            const currItemIndex= currCartItems.findIndex((item: Product)=>{
                return item.id===currItem.id;
            });
            
            if(currItemIndex > -1){
                let currQty= +currItem.orderQty;
                if(operation==="decrease" && currQty === 1){
                    currCartItems.splice(currItemIndex,1);
                }
                else if(operation==="decrease" && currQty > 1){
                    currItem.orderQty = currQty-1;
                    currCartItems.splice(currItemIndex,1, currItem);
                }
                else{
                    currItem.orderQty = currQty+1;
                    currCartItems.splice(currItemIndex,1, currItem);
                }
                
                state.data=currCartItems;
            }
        }
    }
})


export const { addItem, updateItemQuantity, deleteItem } = cartSlice.actions
export default cartSlice.reducer
