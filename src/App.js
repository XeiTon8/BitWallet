

import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'

import {isMobile, isBrowser} from 'react-device-detect'

import './css/styles.scss';

import db from './firebase/firebase.config';
import { addDoc, doc, docs, getDoc, getDocs, updateDoc, collection, deleteDoc} from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

import {Header} from './components/Header';
import { Footer } from './components/Footer';
import { ModalCart } from './components/ModalCart';
import { AuthForm } from './components/AuthForm';

import {Main} from './pages/Main';
import { CartPage } from './pages/CartPage';
import { Orders } from './pages/Orders';
import { Favorites } from './pages/Favorites';
import { Catalog } from './pages/Catalog';

import { useFetch } from './hooks/useFetch';

export const Context = React.createContext({});
export const CartContext = React.createContext({});

function App() {

  
React.useEffect(() => {
    async function createUser() {
    try {
  await signInAnonymously(auth)
  const currentUser = await auth.currentUser;
  const uID = await currentUser.uid;
  setUserID(uID); 
  } catch(e) {
    console.error(e);
}};
      createUser()

  }, [])

const [products] = useFetch("products")
const [favorites, setFavorites] = React.useState([]);
const [searchValue, setSearchValue] = React.useState("");
const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);


// Auth
const auth = getAuth();
const [isAuthOpened, setIsAuthOpened] = React.useState(false);
const [signedUpUser, setSignedUpUser] = React.useState(false);
const [userID, setUserID] = React.useState("")


// Routing
const [isMain, setIsMain] = React.useState(true);
const navigate = useNavigate();

React.useEffect(() => {

  setIsMain(JSON.parse(window.localStorage.getItem("isMain")));

}, [])

React.useEffect(() => {

  window.localStorage.setItem("isMain", isMain)

}, [isMain])

// Cart
const [docID, setDocID] = React.useState([]);
const [cartItems, setCartItems]  = React.useState([]);
const [isOrderPage, setIsOrderPage] = React.useState(false);
const [isCartOpened, setIsCartOpened] = React.useState(false);

// On click
const onClickPage = () => {
  setIsMain(false);
}

const onGoHome = () => {
  setIsMain(true);
  setIsOrderPage(false);
  setIsAuthOpened(false);
  setSearchValue("");
}

const onAccountClick = () => { 
  if (!signedUpUser) {
    setIsAuthOpened(true)
  } 
  
  else {
    setIsMain(false)
    navigate("/orders")
  }  }

const onClickCart = () => setIsCartOpened(true);


const onAddToCart = async (obj) => {

  try {
      const currentUser = await auth.currentUser;
      const uID = await currentUser.uid;      
      const userCartRef = collection(db, `users/${uID}/cart`)

      const productDocument =  await addDoc(userCartRef, {  
          id: obj.id,
          title: obj.title, 
          imgUrl: obj.imgUrl, 
          price: obj.price, 
        })

      const docRes = await productDocument.id
      await updateDoc((userCartRef, productDocument), {docID: docRes}, {merge: true});
      
      fetchCartItems();

    } catch(e) {
        console.error(e)   
      }}

const onAddToFavorites = async (obj) => {
    
    try {
      if (favorites.find(item => (item.id) === (obj.id))) {
        const currentUser = await auth.currentUser;
        const uID = await currentUser.uid;
        const userDelFavRef = collection(db, `users/${uID}/favorites`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
        await deleteDoc(doc(userDelFavRef, obj.favItemID));
        console.log("Item deleted successfully!")
        console.log(favorites);
        
      }
      else {
        setFavorites(prev => [...prev, obj])
        const currentUser = await auth.currentUser;
        const uID = await currentUser.uid;
        const userFavRef = collection(db, `users/${uID}/favorites`)
       const favProductDocument =  await addDoc((userFavRef), {
          id: obj.id,
          title: obj.title,
          imgUrl: obj.imgUrl,
          price: obj.price,
        })
        const docRes = await favProductDocument.id
        await updateDoc((userFavRef, favProductDocument), {docID: docRes}, {merge: true});
        console.log("Item added.");
        
      } 
       
      } catch(e) {
        console.error(e);
      }
  }

const deleteItem = async (obj, id) => {
    try {
        await deleteDoc(doc(db, `users/${userID}/cart`, obj));
        setCartItems((prev => prev.filter((item) => item.id !== id)))
    } catch(e) {
        console.error(e);
    }}

// Fetch

const fetchCartItems = async () => {

  try {
      const currentUser = await auth.currentUser;
      const uID = await currentUser.uid;
      const userDocRef = await collection(db, `users/${uID}/cart`)

      await getDocs(userDocRef).then((snapshot) => {
        const cartItemsData = snapshot.docs.map((doc) => ({...doc.data()}));
        setCartItems(cartItemsData);
      }) 
  } catch (e) {
      console.error(e)
  }
   
}

const fetchCartItemsIDs = async () => {  
  try {
      const currentUser = await auth.currentUser;
      const uID = await currentUser.uid;
      const userDocRef = await collection(db, `users/${uID}/cart`)

      await getDocs((userDocRef)).then((snapshot) => {
      const cartItemsID = snapshot.docs.map((doc) => (doc.id))
      setDocID(cartItemsID)  
      })
  } catch (e) {
      console.error(e)
  }}

const fetchFavorites = async () => {

    try {
        const currentUser = await auth.currentUser;
        const uID = await currentUser.uid;
        const userDocRef = await collection(db, `users/${uID}/favorites`)
        await getDocs(userDocRef)
        .then((snapshot) => {
          const favoritesData = snapshot.docs.map((doc) => ({...doc.data()}));
          setFavorites(favoritesData);
        }) 
       
    } catch (e) {
        console.error(e)
    }
     
  }

  return (
  
<>
<Context.Provider value={ {products, isMain, setIsMain, onAddToFavorites, onClickPage, setIsAuthOpened} }>
<CartContext.Provider value={ {docID, setDocID, cartItems, setCartItems, onAddToCart, onClickCart, setIsCartOpened, isCartOpened} }>

<Header 
isOrderPage={isOrderPage} 
onGoHome={onGoHome} 
onAccountClick={onAccountClick} 
searchValue={searchValue} 
setSearchValue={setSearchValue}
isBurgerOpen={isBurgerOpen}
setIsBurgerOpen={setIsBurgerOpen}
/>

<AuthForm 
isOpened={isAuthOpened} 
setIsOpened={setIsAuthOpened}
onGoHome={onGoHome} 
setSignedUpUser={setSignedUpUser}  
fetchCart={fetchCartItems} 
fetchID={fetchCartItemsIDs}
userID={userID}
setUserID={setUserID}
/>

<ModalCart deleteItem={deleteItem} opened={isCartOpened} items={cartItems} />

<Routes>

  <Route path="/" element={<Main onGoHome={onGoHome} />} />

  <Route path="/cart" element={<CartPage  deleteItem={deleteItem} setSignedUpUser={setSignedUpUser}/>} />

  <Route path="/orders" element={<Orders isMain={isMain}/>} />

  <Route path="/favorites" element={<Favorites addToCart={onAddToCart} addToFavorites={onAddToFavorites} fetchFavorites={fetchFavorites} favorites={favorites}/>} />

  <Route path="/catalog" element={<Catalog searchValue={searchValue} />} />

</Routes>
<Footer 
isBurgerOpen={isBurgerOpen}
setIsBurgerOpen={setIsBurgerOpen}
/>
</CartContext.Provider>
</Context.Provider>

</>

    
   
  );
}

export default App;
