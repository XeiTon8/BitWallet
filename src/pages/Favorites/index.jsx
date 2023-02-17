import React from 'react';

import {ProductCard} from '../../components/Cards/ProductCard'
import { Menu } from '../../components/Menu';

import './favorites.scss'

export const Favorites = ({addToCart, addToFavorites, fetchFavorites, favorites}) => {
    
 React.useEffect(() => {
  fetchFavorites()

 }, [])
 
    const renderFavorites = () => {
      return (favorites.map((item, index) => (
        <ProductCard 
        key={index}
        id={item.id}
        title={item.title}
        imgUrl={item.imgUrl}
        price={item.price}
        oldPrice={item.oldPrice}
        isDiscount={item.isDiscount}
        onClickCartButton={(obj) => addToCart(obj)}
        onClickFavoriteButton={(obj) => addToFavorites(obj)}
        favItemID={item.docID}
        />
      )))
    }
    return (
      <>
      <Menu />
      <div className="favorites__container">
<h2>My favorites</h2>
        <div className="favorites-items-wrapper">
          {renderFavorites()}
        </div>

      </div>
      </>

      
    )

}