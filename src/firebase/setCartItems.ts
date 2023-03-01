import db from './config/firebase.config';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { Item } from '../redux/cart/types';
import { createAsyncThunk } from "@reduxjs/toolkit";


export const setCartItems = createAsyncThunk<Item[], void, {}>("users/fetchCart", async (_, {fulfillWithValue}): Promise<Item[]> => {

  const auth = getAuth();
  try {
      
        const currentUser = await auth.currentUser!;
        const uID = await currentUser.uid;
        const userDocRef = await collection(db, `users/${uID}/cart`)
  
        const docsData =  await getDocs(userDocRef)
        const cartItemsData = await docsData.docs.map((doc) => ({...doc.data()}));
        
        return fulfillWithValue(cartItemsData as Item[]);
      
  } catch (e) {
      throw(e)
      }}) 
