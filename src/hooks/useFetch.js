import React, { useEffect } from 'react'
import db from '../firebase.config';
import { addDoc, doc, docs, getDocs, updateDoc, collection} from "firebase/firestore";

export function useFetch(collectionName="") {

    const [data, setData] = React.useState([])


useEffect(() => {

    async function fetchData() {

        try {
            await getDocs(collection(db, collectionName))
            .then((snapshot) => {
              const fetchedData = snapshot.docs.map((doc) => ({...doc.data()}));
              setData([...fetchedData])
             
              
            }) 
        }
        
        catch(e) {
            console.error(e)
        }
    
    }

   fetchData()
    
}, [])

 return [data]
}



    
