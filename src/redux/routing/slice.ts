import { createSlice } from "@reduxjs/toolkit";
import { RoutingSliceState } from "./types";
const initialState:RoutingSliceState = {
 isOrderPage: false,
 isMain: true,  
 isAuthOpened: false
}

const routingSlice = createSlice({
    name: "routing",
    initialState,
    reducers: {
        changePage(state) {
            state.isMain = false;
        },

        goHome(state) {
            state.isMain = true;
        },

        openAuth(state) {
            state.isAuthOpened = !state.isAuthOpened;
        },

        openOrderPage(state) {
            state.isOrderPage = true;
        }
    }
})

export const {changePage, goHome, openAuth, openOrderPage} = routingSlice.actions;

export default routingSlice.reducer;