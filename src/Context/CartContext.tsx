import React from 'react'
import {Obj} from '../components/Cards/ProductCard'

interface ICartContext {
    onAddToCart: (obj: Obj) => void;
    docID: any[];
    setDocID: (val: []) => void;
    cartItems: any[];
    setCartItems: ([]) => void;
    onClickCart: (val: boolean) => void;
    setIsCartOpened: (val: boolean) => void;
    isCartOpened: boolean;
  }

export const CartContext = React.createContext<ICartContext>(null);