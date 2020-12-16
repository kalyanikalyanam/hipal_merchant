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
            const table = await dbRef.get()
            const kotRef = db
                .collection('kotItems')
                .doc(table.data().kotId)
            const kotData = await kotRef.get()
            
            console.log(kotData.data().items)
            const newItems = kotData.data().items.filter(it => it.id != data.id)
            if(newItems.length === 0){
                await dbRef.update({
                    kotId: ''
                })
            }
            kotRef.update({
                items: newItems
            })
            dbRef.update({
                orders: firebase.firestore.FieldValue.arrayRemove(data)
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