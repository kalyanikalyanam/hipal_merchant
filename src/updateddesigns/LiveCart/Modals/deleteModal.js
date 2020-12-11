import firebase from "../../../config";
import React, { useContext, useState } from 'react'
import { dispatchContext, tableContext } from '../contexts'
import LoginForm from './login'


const DeleteModal = ({data}) => {
    const [authenticate, setAuthenticate] = useState(false)
    const dbRef = useContext(tableContext)
    const dispatch = useContext(dispatchContext)
    const handleDelete = async () => {
        if(!authenticate){
            alert('login To Delete This')
        } else {
            dbRef.update({
                orders: firebase.firestore.FieldValue.arrayRemove(data)
            })
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
                    <button onClick={handleDelete} className="btn close_btn" disabled={!authenticate}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeleteModal