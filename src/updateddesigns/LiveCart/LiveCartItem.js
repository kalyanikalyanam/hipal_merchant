import React, { useContext} from "react";
import firebase from '../../config'
import { dispatchContext } from "./contexts";

const LiveCartItem = ({ item, index, dbRef}) => {
  const dispatch = useContext(dispatchContext)
  const onIncrease = async () => {
    let table = await dbRef.get()
    let liveCart = table.data().liveCart
    for(var i =0; i < liveCart.length; i++){
      let it = liveCart[i]
      if(it.price === item.price && it.id === item.id){
        it.quantity++
        break
      }
    }
    dbRef.update({
      liveCart,
    })
  };
  const onDecrease =async () => {
    if (item.quantity <= 1) {
      return;
    }
    let table = await dbRef.get()
    let liveCart = table.data().liveCart
    for(var i =0; i < liveCart.length; i++){
      let it = liveCart[i]
      if(it.price === item.price && it.id === item.id){
        it.quantity--
        break
      }
    }
    dbRef.update({
      liveCart,
    })
  };
  const deleteItem = () => {
    dbRef.update({
      liveCart: firebase.firestore.FieldValue.arrayRemove(item)
    })
  };
  const handleEdit = () => {
    dispatch({
      type: "EditModalShow",
      item: item
    }) 
  };
  return (
    item && (
      <div className="cart2_row cart_graybg" key={index}>
        <div className="cart_controls">
          <img
            src="/images/icon/close_black.png"
            alt="remove"
            onClick={deleteItem}
          />
          {" "}
          <img
            src="/images/icon/Edit_black.png"
            alt="edit"
            onClick={handleEdit}
          />
        </div>
        <div className="box_1 cart_tab_head">
          <p>
            {index + 1}. {item.name}{" "}
            {item.portion ? `(${item.portion})` : ""}
          </p>
        </div>

        <div className="box_2 cart_tab_width">
          <table className="cart_tab">
            <tbody>
              <tr>
                <td onClick={onDecrease}>-</td>
                <td style={{ background: "#fd8a36", color: "#fff" }}>
                  x{item.quantity}
                </td>
                <td onClick={onIncrease}>+</td>
              </tr>
            </tbody>
          </table>
          <p className="last_update">00:03 min last update</p>
        </div>
        <div className="box_3 cart_tab_price">
          <span> {parseFloat(item.quantity * item.price).toFixed(2)}</span>
          {item.discount > 0  ? (
            <p className="offer_applied">{`${item.discount}% off Applied`}</p>
          ) : null}
        </div>
      </div>
    )
  );
};
export default LiveCartItem;
