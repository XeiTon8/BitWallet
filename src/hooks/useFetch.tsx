import React, { useEffect } from 'react'
import db from '../firebase/config/firebase.config';
import { getDocs, collection} from "firebase/firestore";


export function useFetch<T>(collectionName: string) {

    const [data, setData] = React.useState<any[]>([])


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



    
