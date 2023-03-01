// React
import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'

// Firebse
import db from './firebase//config/firebase.config';
import { addDoc, doc,  getDocs, collection, deleteDoc, setDoc, getDoc} from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// Components
import {Header} from './components/Header';
import { Footer } from './components/Footer';
import { ModalCart } from './components/ModalCart';
import { AuthForm } from './components/AuthForm';

// Pages
import {Main} from './pages/Main';
import { CartPage } from './pages/CartPage';
import { Orders } from './pages/Orders';
import { Favorites } from './pages/Favorites';
import { Catalog } from './pages/Catalog';

// Hooks
import { useFetch } from './hooks/useFetch';

// Context 
import {Context, IProducts} from './context/GlobalContext';
import { CartContext } from './context/CartContext';

// Redux 
import { removeProduct } from './redux/cart/slice';
import { addFavorite, removeFavorite } from './redux/favorites/slice';
import { setCartItems } from './firebase/setCartItems';
import { useDispatch } from 'react-redux';


import './css/styles.scss';

function App() {

const dispatch = useDispatch();
 
React.useEffect(() => {
    async function createUser() {
    try {
  await signInAnonymously(auth)
  const currentUser = await auth.currentUser;

  if (currentUser) {
    const uID = await currentUser.uid;
    setUserID(uID); 
    dispatch<any>(setCartItems())
  }
  
  } catch(e) {
    console.error(e);
}};
      createUser()

  }, [])

const [products] = useFetch<IProducts>("products")
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

// Cart
const [isOrderPage, setIsOrderPage] = React.useState(false);
const [isCartOpened, setIsCartOpened] = React.useState(false);

// On click
const onClickPage = () => {
  console.log(isMain)
  setIsMain(false);
}

const onClickCart = () => setIsCartOpened(!isCartOpened);

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
      }}

const deleteItem = async (docID: string, id: number) => {
    try {
        await deleteDoc(doc(db, `users/${userID}/cart`, docID));
        dispatch(removeProduct(id));
    } catch(e) {
        console.error(e);
      }}



      return (
  
<>
<Context.Provider value={ {products, isMain, setIsMain, onClickPage, setIsAuthOpened} }>
<CartContext.Provider value={ {onClickCart, setIsCartOpened, isCartOpened} }>

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
setSignedUpUser={setSignedUpUser}  
userID={userID}
setUserID={setUserID}
/>

<ModalCart deleteItem={deleteItem} opened={isCartOpened} />

<Routes>

  <Route path="/" element={<Main />} />

  <Route path="/cart" element={<CartPage  deleteItem={deleteItem} setSignedUpUser={setSignedUpUser}/>} />

  <Route path="/orders" element={<Orders />} />

  <Route path="/favorites" element={<Favorites />} />

  <Route path="/catalog" element={<Catalog searchValue={searchValue} />} />

</Routes>

<Footer isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />

</CartContext.Provider>
</Context.Provider>

</>

    
   
);
}

export default App;
