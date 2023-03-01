import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCartItems } from "../../firebase/setCartItems";
import { fetchCartItemsIDs } from "../../firebase/fetchItemsIDs";
import { Item, CartSliceState, Status} from "./types";


const initialState: CartSliceState = {
    items: [],
    docID: [],
    status: Status.LOADING
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Item>) {
            state.items.push({...action.payload})
        },

        removeProduct(state, action: PayloadAction<number>) {
            state.items = state.items.filter((obj: any) => obj.id !== action.payload)
        },

        clearCart(state) {
            state.items = [];
        },

    },

    extraReducers: (builder) => {
        
        builder.addCase(setCartItems.pending, (state) => {
            state.items = [];
            state.status = Status.LOADING;
        })

        builder.addCase(setCartItems.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;

        })

        builder.addCase(setCartItems.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        })

        builder.addCase(fetchCartItemsIDs.pending, (state) => {
            state.docID = [];
            
        })

        builder.addCase(fetchCartItemsIDs.fulfilled, (state, action) => {
            state.docID = action.payload;
        })

        builder.addCase(fetchCartItemsIDs.rejected, (state) => {
            state.docID = [];
        })
    }
})

export const {removeProduct, addProduct, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
