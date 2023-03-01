import { configureStore } from '@reduxjs/toolkit'
import cart from './cart/slice';
import orders from './orders/slice'
import favorites from './favorites/slice'

export const store = configureStore({
  reducer: {
    cart,
    orders,
    favorites
  },

})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch