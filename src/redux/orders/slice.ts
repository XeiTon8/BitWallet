import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersInitialState } from "./types";
import { Status } from "../cart/types";

const initialState: OrdersInitialState = {
    orders: [],
    status: Status.LOADING
}

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers:  {
            setOrders(state, action: PayloadAction<any[]>) {
                state.status = Status.SUCCESS;
                state.orders = action.payload;
            }
    },
    
})

export const {setOrders} = ordersSlice.actions;

export default ordersSlice.reducer;