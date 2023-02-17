import React from 'react'

import db from '../../firebase/firebase.config';
import {app} from '../../firebase/firebase.config';
import { doc, docs, getDocs, collection} from "firebase/firestore";
import { getAuth} from "firebase/auth";

import { Menu } from '../../components/Menu';
import { ProductCard } from '../../components/Cards/ProductCard';

import './orders.scss'

export const Orders = () => {

    const auth = getAuth(app);
    const [orders, setOrders] = React.useState([])

    React.useEffect(() => {
        const fetchOrders = async () => {

          try {
              const currentUser = await auth.currentUser;
              const uID = await currentUser.uid;
              const userDocRef = await collection(db, `users/${uID}/orders`)
              await getDocs(userDocRef)
              .then((snapshot) => {
                const ordersData = snapshot.docs.map((doc) => ({...doc.data()}));
                setOrders(ordersData.reduce((prev, obj) => [...prev, ...obj.items], []));
              }) 
          } catch (e) {
              console.error(e)
          }
           
        }

        fetchOrders();
    }, [auth.currentUser])

   
    console.log(orders);
  

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