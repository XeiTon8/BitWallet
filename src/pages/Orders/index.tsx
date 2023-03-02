import React from 'react'

import db from '../../firebase/config/firebase.config';
import {app} from '../../firebase/config/firebase.config';
import { getDocs, collection} from "firebase/firestore";
import { getAuth} from "firebase/auth";

import { Menu } from '../../components/Menu';
import { ProductCard } from '../../components/Cards/ProductCard';

import { setOrders } from '../../redux/orders/slice';
import { selectOrders } from '../../redux/orders/selectors';
import { useDispatch, useSelector } from 'react-redux';

import './orders.scss'

export const Orders = () => {

    const auth = getAuth(app);
    const dispatch = useDispatch()

    React.useEffect(() => {
        const fetchOrders = async () => {

          try {
              const currentUser = await auth.currentUser;
              if (currentUser) {
                const uID = await currentUser.uid;
                const userDocRef = await collection(db, `users/${uID}/orders`)
                await getDocs(userDocRef)
                .then((snapshot) => {
                  const ordersData: any[] = snapshot.docs.map((doc) => ({...doc.data()}));
                 dispatch<any>(setOrders((ordersData.reduce((prev, obj) => [...prev, ...obj.items], []))));
                }) 
              }} catch (e) {
              console.error(e)
          }
           
        }

        fetchOrders();
    }, [auth.currentUser])

   
   const {orders} = useSelector(selectOrders);
  

    const renderOrders = () => {

    return (orders.map((order, index) => (
      
      <>
     <ProductCard 
     key={index}
     id={order.id}
     title={order.title}
     imgUrl={order.imgUrl}
     price={order.price}
     oldPrice={order.oldPrice}
     isDiscount={order.isDiscount}
     favItemID={order.docID}
     

     />
      </>
      
    )))

    }


    return (

      <>
      <Menu />
      <div className="orders__container">   
      <h2>My orders</h2>
      <div className="orders__wrapper"></div>
      {renderOrders()}
      </div>
   

      
      </>

    )
}