import firebase from "../../../config";
import React, { useContext, useState } from 'react'
import { dispatchContext, tableContext } from '../contexts'
import LoginForm from './login'
import {db} from '../../../config'


const DeleteModal = ({data}) => {
    const [authenticate, setAuthenticate] = useState(false)
    const [loading, setLoading] = useState(false)
    const dbRef = useContext(tableContext)
    const dispatch = useContext(dispatchContext)
    const handleDelete = async () => {
        if(!authenticate){
            alert('login To Delete This')
        } else {
            setLoading(true)
            console.log(data)
            const table = await dbRef.get()
            let orders = table.data().orders.filter(item => item.orderPageId !== data.orderPageId)
            const ref = await db
                .collection('kotItems')
                .doc(data.kotId.toString())

            const kot = await ref.get()
            let items = kot.data().items.filter(item => item.orderPageId !== data.orderPageId)
            if(items.length > 0){
                ref.update({
                    items
                })
            }
            else {
                await ref.delete()
            }
            dbRef.update({
                orders: orders 
            })
            setLoading(false)
            dispatch({
                type: 'DeleteModalHide'
            })
        }
    }

    return (
        <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Login to Delete</h5>
                </div>
                <div className="modal-body product-edit" >
                    <LoginForm auth={setAuthenticate} />
                    {authenticate && <div>You Have Logged in now delete</div>}
                </div>
                <div className="modal-footer">
                    <button onClick={handleDelete} className="btn close_btn" disabled={!authenticate || loading}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeleteModal