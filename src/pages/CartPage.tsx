import React from 'react'
import { Cart } from '../components/Cart';

import { useSelector } from 'react-redux';
import {selectCart} from '../redux/cart/selectors';

type CartPageProps = {
    deleteItem: (docID: string, id: number) => void
    setSignedUpUser: (val: boolean) => void
}

export const CartPage: React.FC<CartPageProps> = ({setSignedUpUser, deleteItem}) => {

    const {docID} = useSelector(selectCart)

    return (
<Cart docID={docID} setSignedUpUser={setSignedUpUser} deleteItem={deleteItem}/>


    )

}