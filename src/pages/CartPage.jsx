import React from 'react'
import { Cart } from '../components/Cart';
import { CartContext } from '../App';

export const CartPage = ({deleteItem, setSignedUpUser}) => {

    const {docID, cartItems, setCartItems} = React.useContext(CartContext);

    return (
<Cart items={cartItems} docID={docID} setCartItems={setCartItems} deleteItem={deleteItem} setSignedUpUser={setSignedUpUser}/>


    )

}