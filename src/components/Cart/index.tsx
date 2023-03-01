import React, { ChangeEvent } from 'react';
import {isMobile} from 'react-device-detect';

import { Menu } from '../Menu';


import { useSelector, useDispatch } from 'react-redux';
import {selectCart} from '../../redux/cart/selectors';
import { clearCart } from '../../redux/cart/slice';

import {collection, doc, addDoc, deleteDoc} from "firebase/firestore";
import { getAuth,  EmailAuthProvider, linkWithCredential} from 'firebase/auth';
import db from '../../firebase/config/firebase.config';

import { breadCrumbsAnle, removeItem, minusCount, plusCount, postImage, orderConfirmedImg} from '../../img';
import "./cart.scss"

import {fetchCartItemsIDs} from '../../firebase/fetchItemsIDs';

type CartProps = {

    docID: string[];
    deleteItem: (docID: string, ID: number) => void;
    setSignedUpUser: (user: boolean) => void;
}

export const Cart: React.FC<CartProps> = ({docID, deleteItem, setSignedUpUser}) => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch<any>(fetchCartItemsIDs());
    }, [])

    const {items} = useSelector(selectCart)
    const auth = getAuth();
    let [randomPassword, setRandomPassword] = React.useState("");

    // Form
    const [userEmail, setUserEmail] = React.useState("");
    const [userPhone, setUserPhone] = React.useState("");
    const [doNotCall, setDoNotCall] = React.useState("call");
    const [isCommentFieldOpen, setIsCommentFieldOpen] = React.useState(false)
    const [isOrderConfirmed, setIsOrderConfirmed] = React.useState(false);

    // Items
    const [count, setCount] = React.useState<number>(1)
    const totalPrice = items.reduce((sum: number, item: any) => (item.price + sum) * count, 0);
  
    const generatePass = () => {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 12;

    for (let i = 0; i < passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    setRandomPassword(randomPassword += chars.substring(randomNumber, randomNumber +1))
    }
    return [randomPassword]
    }

    const generateOrderID = () => {
    const id = Math.floor(100000 + Math.random() * 900000);
    return id;
    }

    const increaseCount = () => {
   
        setCount((prev) => prev + 1)
    }

    const decreaseCount = () => {
    setCount((prev) => prev - 1)
    }

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


    // Form 
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        let email = document.getElementById("user-email")!
        const target = e.currentTarget as HTMLInputElement;
        if (!validateEmail(target.textContent!)) {
           
            email.classList.add("invalid");
            email.classList.remove("valid");
        }

        else {
            email.classList.remove("invalid");
            email.classList.add("valid");
        }
        setUserEmail(target.value);

    }

    const validateEmail = (val: string) => {

        return /\S+@\S+\.\S+/.test(userEmail)
       
    }

    const handlePhone = (e: React.ChangeEvent) => {
        let phone = document.getElementById("phone-number")!;
        const target = e.target as HTMLInputElement;
        if(!validatePhone(target.value)) {
            phone.classList.add("invalid");
            phone.classList.remove("valid");
        }

        else {
            phone.classList.remove("invalid");
            phone.classList.add("valid");
        }

        setUserPhone(target.value)
    }

    const validatePhone = (val: string) => {
      return /(\+380)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/.test(val)
    } 

    const orderItems = async (e: React.MouseEvent, docID: string[]) => {

        e.preventDefault();
        generatePass();
        
        try {
            const credential = await EmailAuthProvider.credential(userEmail, randomPassword);
           
            await linkWithCredential(auth.currentUser!, credential)
            .then((usercred) => {
                const user = usercred.user;
                setSignedUpUser(true);
                console.log("Anonymous account successfully upgraded", user);
    
            }).catch((error) => {
                console.log("Error upgrading anonymous account", error);
            });
    
            const currentUser = await auth.currentUser;
         
            if (currentUser) {
                const uID = await currentUser.uid;
                const userCartRef = collection(db, `users/${uID}/orders`);
                await addDoc((userCartRef), {items});

                for (let i = 0; i < docID.length; i++) {
                deleteDoc(doc(db, `users/${uID}/cart`, docID[i]));
            }
                dispatch(clearCart());
                setIsOrderConfirmed(true);
            }
            
        } catch(e) {
        console.error(e)
        }}
    
    const addCommentaryToOrder = () => setIsCommentFieldOpen(!isCommentFieldOpen);

    const doCall = () => { doNotCall === "call" ? setDoNotCall("DoNot") : setDoNotCall("call");
        
    };
    
 return (

<>
<Menu />

{isOrderConfirmed ? 

<>
<div className="cart__container">
<div className="cart__order-confirmed-wrapper order-confirmed">

<div className="order-confirmed__title-wrapper">
<h2 className="">Thank you, your order has been placed!</h2>
<span>Order ID: {generateOrderID()}</span>
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
                                             <label htmlFor="city">City</label>
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
                                             <label htmlFor="post-office">Address  </label>
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
                                             <label htmlFor="name-and-surname">Name and surname</label>
                                             <input type="text" id="name-and-surname" />
                                             <label htmlFor="phone-number">Phone number</label>
                                             <input type="phone" id="phone-number" placeholder="+380 (__) ___-__-__" value={userPhone} onChange={handlePhone} />
                                             <div className="cart-form__inner-wrapper">
                                                 <input type="checkbox" id="do-not-call" defaultChecked value={doNotCall} onClick={doCall} />
                                                 <label htmlFor="do-not-call" className="do-not-call-label">Do not call me</label>
                                             </div>
                                             <label htmlFor="user-email">E-mail</label>
                                             <input type="email" id="user-email" value={userEmail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmail(e)} />
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
                                            <label htmlFor="city">City</label>
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
                                            <label htmlFor="post-office">Address</label>
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
                                            <label htmlFor="name-and-surname">Name and surname</label>
                                            <input type="text" id="name-and-surname" />
                                            <label htmlFor="phone-number">Phone number</label>
                                            <input type="phone" id="phone-number" placeholder="+380 (__) ___-__-__" value={userPhone} onChange={handlePhone}/>
                                            <div className="cart-form__inner-wrapper">
                                                <input type="checkbox" id="do-not-call" defaultChecked value={doNotCall} onClick={doCall} />
                                                <label htmlFor="do-not-call" className="do-not-call-label">Do not call me</label>
                                            </div>
                                            <label htmlFor="user-email">E-mail</label>
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


