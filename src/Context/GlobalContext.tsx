import React from 'react';
import {Obj} from '../components/Cards/ProductCard';

interface IContext {
    products?: IProducts[];
    onAddToFavorites?: (obj: Obj) => void;
    isMain?: Boolean;
    setIsMain?: (value: boolean) => void;
    onClickPage?: (value: boolean) => void;
    setIsAuthOpened?: (value: boolean) => void;
  };
  export type IProducts =  {
    id: number;
    title: string;
    imgUrl: string;
    price: number;
    oldPrice: number;
    favItemID: string;
    isDiscount: boolean;
  };

  export const Context = React.createContext<IContext>({});