import React from 'react'
import {Obj} from '../components/Cards/ProductCard'

interface ICartContext {
    onAddToCart?: (obj: Obj) => void;
    onClickCart?: (val: boolean) => void;
    setIsCartOpened?: (val: boolean) => void;
    isCartOpened?: boolean;
  }

export const CartContext = React.createContext<ICartContext>({});