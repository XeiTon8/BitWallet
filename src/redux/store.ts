import { configureStore } from '@reduxjs/toolkit'
import cart from './cart/slice';
import orders from './orders/slice'
import favorites from './favorites/slice'
import routing from './routing/slice'

export const store = configureStore({
  reducer: {
    cart,
    orders,
    favorites,
    routing
  },

})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch