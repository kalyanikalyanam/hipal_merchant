import React, { useContext} from "react";
import {useForm} from 'react-hook-form'
import firebase from "../../config";
import { dispatchContext } from "./contexts";

const Select = ({ item, deleteItem , dbRef}) => {
  const {handleSubmit, register} = useForm()
  const handleStatusChange = async (data) => {
    let table = await dbRef.get()
    var order = table.data().orders
    for(var i = 0; i < order.length; i++){
      let it = order[i]
      if(it.id === item.id && it.price === item.price ){
        it.status = data.status
        break
      }
    }
    await dbRef.update({
      orders: order
    })
  }
  return (
    <>
      <div>
        <select name="status" onChange={handleSubmit(handleStatusChange)} ref={register}>
          <option value="cooking">Cooking</option>
          <option value="delivery">Delivery</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      {sessionStorage.getItem("role") == "Merchant" ||
      sessionStorage.getItem("deleteitemafterkot") == "Yes" ? (
        <div
          className="edit"
          data-toggle="modal"
          data-target="#edit_product"
          onClick={() => {
            deleteItem(item);
          }}
        >
          Delete
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const OrderItem = ({ item, index, dbRef}) => {
  const dispatch = useContext(dispatchContext);
  const handleEdit = (item) => {
    dispatch({
      type: "EditModalShow",
      item: item,
      edit: 'order'
    }) 
  };
  const handleKOTItem = async () => {
    let table = await dbRef.get()
    var order = table.data().orders
    for(var i = 0; i < order.length; i++){
      let it = order[i]
      if(it.id === item.id && it.price === item.price ){
        it.status = "cooking"
        break
      }
    }
    dispatch({
      type: "KOTModalShow",
      items: [item]
    })
    await dbRef.update({
      orders: order
    })
  };
  const deleteItem = () => {
    dbRef.update({
      orders: firebase.firestore.FieldValue.arrayRemove(item)
    })
  };


  return (
    <div className="cart_scroll no_hieght">
      <div className="cart2_row" key={index}>
        <div className="box_1 new_size">
          <p>
            {index + 1}. {item.name}
          </p>
          <div className="w-100-row m-b-10">
            {item.status === "NotKot" ? (
              <>
                <div
                  className="kot"
                  onClick={() => {
                    handleKOTItem(item);
                  }}
                >
                  KOT
                        </div>
                <div
                  className="edit"
                  data-toggle="modal"
                  data-target="#edit_product"
                  onClick={() => {
                    handleEdit(item);
                  }}
                >
                  Edit
                        </div>

                <div
                  className="edit"
                  data-toggle="modal"
                  data-target="#edit_product"
                  onClick={() => {
                    deleteItem(item);
                  }}
                >
                  Delete
                        </div>
              </>
            ) : (
                <Select item={item} deleteItem={deleteItem} dbRef={dbRef}/>
              )}
          </div>

          {item.discount != 0 && (
            <p className="offer_applied">{`${item.discount}% off Applied`}</p>
          )}
        </div>
        <div className="box_2">
          <span>x{item.quantity}</span>
        </div>
        <div className="box_3">
          <span>
            {item.price * item.quantity}
          </span>
          <span>
            00:03 min <br />
                    last update
                  </span>
        </div>
      </div>
     </div>
  );
};

export default OrderItem;
