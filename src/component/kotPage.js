import React, { useEffect, useState } from 'react'
import { db } from '../config'

const KotPage = () => {
    const [itmes, setItems] = useState([])
    useEffect(() => {
        const businessId = sessionStorage.getItem("businessId")
        var unsubscribe
        const getItems = async () => {
            const ref = db 
                .collection("kotItems")
                .where("businessId", "==", businessId)
            const querySnapshot = await ref.get()
            let items = []
            querySnapshot.forEach(childSnapshot => items.push({...childSnapshot.data()}))
            setItems(items)

            unsubscribe = ref.onSnapshot(querySnapshot => {
                let items = []
                querySnapshot.forEach(childSnapshot => items.push({ ...childSnapshot.data() }))
                setItems(items)
            })
        }
        getItems()
        return unsubscribe
    }, [])

    return (
        <div>
            {itmes && itmes.map(item => (
                <div key={item.id}>
                    {item.name}
                </div>
            ))}
        </div>
    )
}