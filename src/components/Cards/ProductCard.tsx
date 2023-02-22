import React from 'react';
import {isMobile} from 'react-device-detect';

type ProductCardProps = {
    id: number;
    title: string;
    imgUrl: string;
    price: number;
    oldPrice: number;
    isDiscount: boolean;
    onClickCartButton: Function;
    onClickFavoriteButton: Function;
    favItemID: any;
}


export const ProductCard: React.FC<ProductCardProps> = ({id, title, imgUrl, price, oldPrice, isDiscount, onClickCartButton, onClickFavoriteButton, favItemID}) => {

    const obj = {id, title, imgUrl, price, favItemID};


const onClickCart = async () => {
await onClickCartButton(obj)
}

const onClickFavorites = async (obj) => {
await onClickFavoriteButton(obj)
}

    return (

        <li className="products-flex-container__product-item">
        
                            <img src={imgUrl} alt="" />

                        <span className="product-item__title">{title}</span>
                       
                        <div className="price-discount-flex-wrapper">

                          {isDiscount ? 
                          <>
                          <span className="product-price">{price} UAH</span>
                          <span className="discount-price">{oldPrice} UAH</span>
                          </>
                            
                            :
                            
                        <span className="product-price">{price} UAH</span>  
                        }  

                            
                        </div>

                        <div className="product-item__btns">

                            <a href="#" className="product-item__commentaries">3</a>
                            {isMobile ? <button className="product-item__add-to-cart-btn-mobile" onClick={onClickCart}/> : <button className="product-item__add-to-cart-btn" onClick={onClickCart}>Add to cart</button>}
                            
                            <button className="product-item__add-to-favorites-btn" onClick={() => onClickFavorites(obj)}></button>
                        </div>
        
                        </li>

    )


}