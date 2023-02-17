import React from 'react';
import { CartContext, Context } from '../App';
import { ProductCard } from '../components/Cards/ProductCard';

import { Menu } from '../components/Menu';

export const Catalog = ({searchValue}) => {

   
    const {products, onAddToFavorites} = React.useContext(Context)
    const {onAddToCart} = React.useContext(CartContext)
    const showSearchProduct = () => {
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
                onClickCartButton={(obj) => onAddToCart(obj)}
                onClickFavoriteButton={(obj) => onAddToFavorites(obj)}
                 />
            ))
        )
       
    }
    return (
        <>
        <Menu />
        {showSearchProduct()}
        </>
    )
}