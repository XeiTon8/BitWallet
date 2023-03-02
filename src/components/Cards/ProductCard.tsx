import React from 'react';
import {isMobile} from 'react-device-detect';

import db from '../../firebase//config/firebase.config';
import { getAuth } from 'firebase/auth';
import { addDoc, doc,  getDocs, collection, deleteDoc, setDoc, getDoc} from "firebase/firestore";

import { removeProduct, addProduct} from '../../redux/cart/slice';
import { addFavorite, removeFavorite } from '../../redux/favorites/slice';
import { selectFavorites } from '../../redux/favorites/selectors';
import { useDispatch, useSelector } from 'react-redux';

type ProductCardProps = {
    id: number;
    title: string;
    imgUrl: string;
    price: number;
    oldPrice: number;
    isDiscount: boolean;
    favItemID: string;
}

export type Obj = {
    id: number;
    title: string;
    imgUrl: string;
    price: number;
    favItemID: any;
};

export const ProductCard: React.FC<ProductCardProps> = ({id, title, imgUrl, price, oldPrice, isDiscount, favItemID}) => {

const dispatch = useDispatch();
const {favorites} = useSelector(selectFavorites)

const auth = getAuth();

const obj: Obj = {id, title, imgUrl, price, favItemID};


const onAddToCart = async (obj: {
    id: number;
    title: string;
    imgUrl: string;
    price: number;
  }) => {
    try {
        const currentUser = await auth.currentUser;
        if (currentUser) {
          const uID = await currentUser.uid;
          const userCartRef = collection(db, `users/${uID}/cart`)
  
          const productDocument =  await addDoc(userCartRef, {  
              id: obj.id,
              title: obj.title, 
              imgUrl: obj.imgUrl, 
              price: obj.price, 
            })
    
          const docRes = await productDocument.id
          const docRef = await doc(userCartRef, docRes)
          await setDoc((docRef), {docID: docRes}, {merge: true});
          
          const document = await getDoc(docRef)
          const itemData: any = await document.data();
          dispatch(addProduct(itemData));
         
        }} catch(e) {
          console.error(e)   
        }}
  

const onAddToFavorites = async (obj: {
          id: number;
          title: string;
          imgUrl: string;
          price: number;
          favItemID: string;
        }) => {
            
            try {
        
              if (favorites.find(item => (item['id']) === (obj.id))) {
                const currentUser = await auth.currentUser;
                if (currentUser) {
                  const uID = await currentUser.uid;
                  const userDelFavRef = collection(db, `users/${uID}/favorites`);
                  dispatch(removeFavorite(obj.id))
                  await deleteDoc(doc(userDelFavRef, obj.favItemID));
                }
                   
              }
              
              else {
                
                const currentUser = await auth.currentUser;
                if (currentUser) {
                  const uID = await currentUser.uid;
                  const userFavRef = collection(db, `users/${uID}/favorites`)
                 const favProductDocument =  await addDoc((userFavRef), {
                    id: obj.id,
                    title: obj.title,
                    imgUrl: obj.imgUrl,
                    price: obj.price,
                  })
                  const docRes = await favProductDocument.id
                  const docRef = doc(userFavRef, docRes)
                  await setDoc((docRef), {docID: docRes}, {merge: true});
        
                  const document = await getDoc(docRef)
                  const favoriteItemData: any = await document.data();
                  dispatch(addFavorite(favoriteItemData))
                }
                
              }} catch(e) {
                console.error(e);
                
              }}


        

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
                            {isMobile ? <button className="product-item__add-to-cart-btn-mobile" onClick={() => onAddToCart(obj)}/> : <button className="product-item__add-to-cart-btn" onClick={() => onAddToCart(obj)}>Add to cart</button>}
                            
                            <button className="product-item__add-to-favorites-btn" onClick={() => onAddToFavorites(obj)}></button>
                        </div>
        
                        </li>

    )


}