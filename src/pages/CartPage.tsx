import React from 'react'
import { Cart } from '../components/Cart';
import { CartContext } from '../context/CartContext';


import { useSelector } from 'react-redux';
import {selectCart} from '../redux/cart/selectors';

type CartPageProps = {
    deleteItem: (docID: string, id: number) => void;
    setSignedUpUser: (val: boolean) => void
}

export const CartPage: React.FC<CartPageProps> = ({deleteItem, setSignedUpUser}) => {

    const {docID} = useSelector(selectCart)

    return (
<Cart docID={docID} deleteItem={deleteItem} setSignedUpUser={setSignedUpUser}/>


    )

}