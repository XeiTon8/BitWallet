import React from 'react';

import { fetchFavorites } from '../../firebase/fetchFavorites';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/favorites/selectors';

import {ProductCard} from '../../components/Cards/ProductCard'
import { Menu } from '../../components/Menu';
import { Obj } from '../../components/Cards/ProductCard';

import './favorites.scss'

export const Favorites = () => {

const dispatch = useDispatch()
const {favorites} = useSelector(selectFavorites)
    
 React.useEffect(() => {
  
dispatch<any>(fetchFavorites())

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