import React from 'react'
import { Cart } from '../components/Cart';
import { CartContext } from '../Context/CartContext';


type CartPageProps = {
    deleteItem: (docID: string, id: number) => void;
    setSignedUpUser: (val: boolean) => void
}

export const CartPage: React.FC<CartPageProps> = ({deleteItem, setSignedUpUser}) => {

    const {docID, cartItems, setCartItems} = React.useContext(CartContext);

    return (
<Cart items={cartItems} docID={docID} setCartItems={setCartItems} deleteItem={deleteItem} setSignedUpUser={setSignedUpUser}/>


    )

}