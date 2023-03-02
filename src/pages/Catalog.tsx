import React from 'react';
import { Context } from '../context/GlobalContext';

import { ProductCard } from '../components/Cards/ProductCard';

import { Menu } from '../components/Menu';

type CatalogProps = {
    searchValue: string
}

export const Catalog: React.FC<CatalogProps> = ({searchValue}) => {

 
   
    const {products} = React.useContext(Context)

    const showSearchProduct = () => {
        if (products) {
            return (products
                .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                .map((item, index) => (
                    <ProductCard
                    key={index}
                    id={item.id}
                    title={item.title}
                    imgUrl={item.imgUrl}
                    price={item.price}
                    oldPrice={item.oldPrice}
                    isDiscount={item.isDiscount}
                    favItemID={item.favItemID}
                     />
                ))
            )
        }
       
       
    }
    return (
        <>
        <Menu />
        {showSearchProduct()}
        </>
    )
}