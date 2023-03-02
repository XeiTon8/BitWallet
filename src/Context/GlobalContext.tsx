import React from 'react';

interface IContext {
    products: IProducts[];
    signedUpUser?: boolean;
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

  export const Context = React.createContext<IContext>({products: []});