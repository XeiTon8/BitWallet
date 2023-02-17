import React from 'react';
import {isMobile} from 'react-device-detect';

import { Menu } from '../Menu';
import { Footer } from '../Footer';

import {collection, doc, addDoc, deleteDoc} from "firebase/firestore";
import { getAuth,  EmailAuthProvider, linkWithCredential} from 'firebase/auth';
import db from '../../firebase.config';

import { breadCrumbsAnle, removeItem, minusCount, plusCount, postImage, orderConfirmedImg} from '../../img';
import "./cart.scss"

export const Cart = ({items, setCartItems, docID, deleteItem, setSignedUpUser}) => {

    const auth = getAuth();
    let [randomPassword, setRandomPassword] = React.useState("");

    // User data
    const [userEmail, setUserEmail] = React.useState("");
    const [userPhone, setUserPhone] = React.useState("");
    const [isError, setIsError] = React.useState(false)

    const [count, setCount] = React.useState(1)
    const [doNotCall, setDoNotCall] = React.useState(true);
    const [isCommentFieldOpen, setIsCommentFieldOpen] = React.useState(false)
    const [isOrderConfirmed, setIsOrderConfirmed] = React.useState(false);
    const totalPrice = items.reduce((sum, item) => (item.price + sum) * count, 0);
    const id = React.useId();
  
const generatePass = () => {

let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const passwordLength = 12;

for (let i = 0; i < passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    setRandomPassword(randomPassword += chars.substring(randomNumber, randomNumber +1))
}

return [randomPassword]
}

console.log(randomPassword)

   const increaseCount = () => {
   
        setCount((prev) => prev + 1)
   }

   const decreaseCount = () => {
    setCount((prev) => prev - 1)
   }

   const addCommentaryToOrder = () => {
    setIsCommentFieldOpen(!isCommentFieldOpen);
   }

   const doCall = () => {
    setDoNotCall(false);
   }

    const orderItems = async (e) => {

    e.preventDefault();
    generatePass();
    
    try {
        const credential = await EmailAuthProvider.credential(userEmail, randomPassword);

        await linkWithCredential(auth.currentUser, credential)
        .then((usercred) => {
            const user = usercred.user;
            setSignedUpUser(true);
            console.log("Anonymous account successfully upgraded", user);

        }).catch((error) => {
            console.log("Error upgrading anonymous account", error);
        });

  
        const currentUser = await auth.currentUser;
        const uID = await currentUser.uid;
        const userCartRef = collection(db, `users/${uID}/orders`);
        await addDoc((userCartRef), {items});
        for (let i = 0; i < docID.length; i++) {
        deleteDoc(doc(db, `users/${uID}/cart`, docID[i]));
        }
        setCartItems([]);
        setIsOrderConfirmed(true);
    } catch(e) {
    console.error(e)
    }}

   

    const renderCartItems = () => {
        
            return (items.map((product) => (
                <>
                <div className="cart-item cart-item__wrapper">
                <img src={product.imgUrl} width="184" height="140" className="cart-item__img"/>
                <div className="cart-item__decor"></div>
                <p className="cart-item__title">{product.title}</p>

                    <div className="cart-item__count-wrapper">

                <img className='remove-count' src={minusCount} onClick={() => decreaseCount()} width="12" height="2" />
                <p>{count}</p>
                <img className='add-count' src={plusCount} onClick={() => increaseCount()} width="12" height="12" />
             

                    </div>
                    <p className="cart-item__price">{product.price} грн</p>
                    <button className="cart-item__remove-btn" onClick={() => deleteItem(product.docID, product.id)}><img src={removeItem} width="14" height="14" /></button>
                </div>
                </>    
    )))}

    const handleEmail = (e) => {
        let email = document.getElementById("user-email")
        if (!validateEmail(e.target.value)) {
           
            email.classList.add("invalid");
            email.classList.remove("valid");
        }

        else {
            email.classList.remove("invalid");
            email.classList.add("valid");
        }
        setUserEmail(e.target.value);

    }

    const validateEmail = () => {
        
        return /\S+@\S+\.\S+/.test(userEmail)
    }

    const handlePhone = (e) => {
        let phone = document.getElementById("phone-number");
        if(!validatePhone(e.target.value)) {
            phone.classList.add("invalid");
            phone.classList.remove("valid");
        }

        else {
            phone.classList.remove("invalid");
            phone.classList.add("valid");
        }

        setUserPhone(e.target.value)
    }

    const validatePhone = () => {
      return /(\+380)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/.test(userPhone)
       } 
    
 return (

<>
<Menu />

{isOrderConfirmed ? 

<>
<div className="cart__container">
<div className="cart__order-confirmed-wrapper order-confirmed">

<div className="order-confirmed__title-wrapper">
<h2 className="">Thank you, your order has been placed!</h2>
<span>Order ID: {id}</span>
</div>

<div className="order-confirmed__img-wrapper">
<img src={orderConfirmedImg} />
</div>

</div>

</div>
</>

:

<>
<div className="cart__container">

        <div className="breadcrumbs-wrapper">
        <span>Main</span>
        <img src={breadCrumbsAnle}/>
        <span>Cart</span>
        </div>  

        <h2 className="cart__title">Checkout</h2>

        <div className="cart__wrapper">

{isMobile ?  
<>
                             <div className="cart-orders">

                                 <p className="cart-orders__subtitle">Cart</p>
                                 <div className="cart-orders__wrapper">
                                     {renderCartItems()}
                                 </div>
                                 <p>Total: {`${totalPrice}`} UAH </p>

                             </div>

                             <div className="form__wrapper">
                                     <div className="cart-form__header">
                                         <p><span className="login">Log In</span> to get <span>bonuses</span> and fast ordering.</p>
                                         <p><span>+ 10₴</span> on your bonus account for this order.</p>
                                     </div>

                                     <form className="cart-form">
                                         <fieldset>
                                             <legend>Delivery method</legend>
                                             <label for="city">City</label>
                                             <input type="text" name="city" id="city" className="city-input" placeholder="Dnipro" />
                                             <div className="cart-form__inner-wrapper">
                                                 <input type="radio" />
                                                 <img src={postImage} width="20" height="20" />
                                                 <label>Post office "Нова Пошта"  55 ₴</label>
                                             </div>
                                             <div className="cart-form__inner-wrapper">
                                                 <input type="radio" />
                                                 <img src={postImage} width="20" height="20" />
                                                 <label>Adress delivery "Нова Пошта"  75 ₴</label>
                                             </div>
                                             <label for="post-office">Address  </label>
                                             <input type="text" name="post-office" id="post-office" />
                                         </fieldset>

                                         <fieldset>
                                             <legend>Payment method</legend>
                                             <label>Pay with card</label>
                                             <select>
                                                 <option value="Visa/MasterCard">Visa/MasterCard</option>
                                                 <option value="PrivatBank">PrivatBank</option>
                                                 <option value="MonoBank">MonoBank</option>
                                                 <option value="PayPal">PayPal</option>
                                             </select>
                                         </fieldset>

                                         <fieldset>
                                             <legend>Recipient info</legend>
                                             <label for="name-and-surname">Name and surname</label>
                                             <input type="text" id="name-and-surname" />
                                             <label for="phone-number">Phone number</label>
                                             <input type="phone" id="phone-number" placeholder="+380 (__) ___-__-__" value={userPhone} onChange={handlePhone} />
                                             <div className="cart-form__inner-wrapper">
                                                 <input type="checkbox" id="do-not-call" defaultChecked value={doNotCall} onClick={doCall} />
                                                 <label for="do-not-call" className="do-not-call-label">Do not call me</label>
                                             </div>
                                             <label for="user-email">E-mail</label>
                                             <input type="email" id="user-email" value={userEmail} onChange={handleEmail} />
                                             <span className="order-status">For tracking status of an order</span>
                                         </fieldset>
                                         <span className="add-commentary" onClick={addCommentaryToOrder}>Add commentary to an order</span>
                                         <textarea className={isCommentFieldOpen ? "commentary-field-opened" : "commentary-field-hidden"}></textarea>
                                         <button type="submit" onClick={(e) => orderItems(e, docID)} className="confirm-order-btn">Confirm order</button>
                                     </form>
                             </div>
</> 
    :
<>
        <div className="form__wrapper">
            <div className="cart-form__header">
                <p><span className="login">Log In</span> to get <span>bonuses</span> and fast ordering.</p>
                <p><span>+ 10₴</span> on your bonus account for this order.</p>
            </div>
                                     <form className="cart-form">
                                        <fieldset>
                                            <legend>Delivery method</legend>
                                            <label for="city">City</label>
                                            <input type="text" name="city" id="city" className="city-input" placeholder="Dnipro" />
                                            <div className="cart-form__inner-wrapper">
                                                <input type="radio" />
                                                <img src={postImage} width="20" height="20" />
                                                <label>Post office "Нова Пошта"  55 ₴</label>
                                            </div>
                                            <div className="cart-form__inner-wrapper">
                                                <input type="radio" />
                                                <img src={postImage} width="20" height="20" />
                                                <label>Address delivery "Нова Пошта"  75 ₴</label>
                                            </div>
                                            <label for="post-office">Address</label>
                                            <input type="text" name="post-office" id="post-office" />
                                        </fieldset>

                                        <fieldset>
                                            <legend>Payment method</legend>
                                            <label>Pay with card</label>
                                            <select>
                                                <option value="Visa/MasterCard">Visa/MasterCard</option>
                                                <option value="PrivatBank">PrivatBank</option>
                                                <option value="MonoBank">MonoBank</option>
                                                <option value="PayPal">PayPal</option>
                                            </select>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Recipient info</legend>
                                            <label for="name-and-surname">Name and surname</label>
                                            <input type="text" id="name-and-surname" />
                                            <label for="phone-number">Phone number</label>
                                            <input type="phone" id="phone-number" placeholder="+380 (__) ___-__-__" value={userPhone} onChange={handlePhone}/>
                                            <div className="cart-form__inner-wrapper">
                                                <input type="checkbox" id="do-not-call" defaultChecked value={doNotCall} onClick={doCall} />
                                                <label for="do-not-call" className="do-not-call-label">Do not call me</label>
                                            </div>
                                            <label for="user-email">E-mail</label>
                                            <input type="email" id="user-email" value={userEmail} onChange={handleEmail} />
                                            <span className="order-status">For tracking status of an order</span>
                                            
                                        </fieldset>
                                        <span className="add-commentary" onClick={addCommentaryToOrder}>Add commentary to an order</span>
                                        <textarea className={isCommentFieldOpen ? "commentary-field-opened" : "commentary-field-hidden"}></textarea>
                                        <button type="submit" onClick={(e) => orderItems(e, docID)} className="confirm-order-btn">Confirm order</button>
            </form>
        </div>

        <div className="cart-orders">
        <p className="cart-orders__subtitle">Cart</p>

        <div className="cart-orders__wrapper">
        {renderCartItems()}
        </div>

        <p>Total: {`${totalPrice}`} UAH </p>

        </div>
</>
}    
</div>
    
</div>
</>

}

</>

)}


