import db from './config/firebase.config';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Item } from '../redux/cart/types';

export const fetchFavorites = createAsyncThunk<Item[], void, {}>("users/fetchFavorites", async (_, {fulfillWithValue}): Promise<Item[]> => {
    const auth = getAuth();
        try {
            const currentUser = await auth.currentUser!;
            const uID = await currentUser.uid;
    
            const userDocRef = await collection(db, `users/${uID}/favorites`)
            const favoritesDocs =  await getDocs(userDocRef)
            const favoritesData = favoritesDocs.docs.map((doc) => ({...doc.data()}));
            
            return fulfillWithValue(favoritesData as Item[]);
           
           
        } catch (e) {
            throw(e)
          }}) 

