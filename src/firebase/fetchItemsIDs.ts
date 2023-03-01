import db from './config/firebase.config';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCartItemsIDs = createAsyncThunk<string[], void, {}>("users/docIDs", async (_, {fulfillWithValue}): Promise<string[]> => {  
  const auth = getAuth();
  try {
          const currentUser = await auth.currentUser!;
       
          const uID = await currentUser.uid;
          const userDocRef = await collection(db, `users/${uID}/cart`)
          const documents = await getDocs((userDocRef))
          const cartItemsID: string[] = documents.docs.map((doc) => (doc.id))

          return fulfillWithValue(cartItemsID as string[])
         
        } catch (e) {
        throw(e)
      }}) 
  