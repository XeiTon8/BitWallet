import React from 'react';
import { Context } from '../../context/GlobalContext';
import { CartContext } from '../../context/CartContext';

import { useNavigate } from 'react-router-dom';

import { removeItem } from '../../img';

import { useSelector } from 'react-redux';
import {selectCart} from '../../redux/cart/selectors';

import './modalCart.scss'

type ModalCartProps = {
    deleteItem: (docID: string, id: number) => void;
    opened: boolean;

}

export const ModalCart: React.FC<ModalCartProps> = ({deleteItem, opened}) => {

    const {items} = useSelector(selectCart)

    const navigate = useNavigate()
   
    const {setIsCartOpened} = React.useContext(CartContext)
    const {setIsMain} = React.useContext(Context)
    const sumTotal = items.reduce((sum, item) => item.price + sum, 0)


    const onClose = () => {
        if(setIsCartOpened) {
            setIsCartOpened(false);
        }
    } 
    
    const confirmOrder = () => {
        if (setIsCartOpened && setIsMain) {
            setIsCartOpened(false)
            setIsMain(false)
            navigate("/cart");
        }
      
    }

    const renderItemsInCart = () => {
        return (items.map((product) => (
                <div className="modal-cart__item modal-cart-item">
                <img src={product.imgUrl} width="111" height="84" className="modalCart-item__img"/>
                <p className="modal-cart-item__title">{product.title}</p>
                <p className="modal-cart-item__count"> 1 шт </p>
                <p className="modal-cart-item__price">{product.price} грн</p>
                <button className="modal-cart-item__remove-btn" onClick={() => deleteItem(product.docID, product.id)}><img src={removeItem} width="14" height="14" /></button>
                </div>
                
        )))
    }

    return (
        <div className={` ${opened ? "appOverlay-visible" : "appOverlay"}`}>
            <div className="modal-cart">
                <div className="modal-cart__title-wrapper">
                <h2 className="modal-cart__title">Cart</h2>
                <button className="modal-cart__close-cart-btn" onClick={onClose}><img src={removeItem} width="14" height="14" /></button>
                </div>
               
                <div className="modal-cart__items-wrapper">
                {renderItemsInCart()}
                </div>
                <p className="modal-cart__price-total">Total: {`${sumTotal}`} UAH</p>
                <button onClick={confirmOrder} className="modal-cart__confirm-btn">Proceed to checkout</button>
            </div>
        </div>
    )
}