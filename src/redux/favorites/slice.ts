import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FavoritesSliceState } from "./types";
import { Item, Status } from "../cart/types";

import { fetchFavorites } from "../../firebase/fetchFavorites";

const initialState: FavoritesSliceState = {
    favorites: [],
    status: Status.LOADING
}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<Item>){
            state.favorites.push({...action.payload})
        },

        removeFavorite(state, action: PayloadAction<number>){
            state.favorites = state.favorites.filter((obj: any) => obj.id !== action.payload)
        },

    },

    extraReducers: (builder) => {
        builder.addCase(fetchFavorites.pending, (state) => {
            state.favorites = []
            state.status = Status.LOADING
        })

        builder.addCase(fetchFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload;
            state.status = Status.SUCCESS
        })

        builder.addCase(fetchFavorites.rejected, (state) => {
            state.favorites = []
            state.status = Status.ERROR
        })
    }
})

export const {addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;