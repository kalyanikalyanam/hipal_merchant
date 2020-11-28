import React, { useContext, useEffect, useState } from "react";
import * as actions from "./actionTypes";
import { dispatchContext } from "./contexts";

const Select = ({ item, deleteItem }) => {
  return (
    <>
      <div>
        <select name="status">
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

const OrderItem = ({ item,cart, index }) => {
  const dispatch = useContext(dispatchContext);
  const [kotNum, setKotNum] = useState(0);
  const [carts, setCarts] = useState();
  const [, updateState] = useState();
  useEffect(() => {
    console.log(item)
  }, [cart]);
  const handleEdit = (item) => {
    dispatch({
      type: actions.OPENMODEL,
      item,
      editMode: true,
      id: item.id,
      formOrder: true,
    });
  };
  const handleKOTItem = (item) => {
    dispatch({
      type: actions.KOTITEM,
      item,
      cart,
    });
  };
  const deleteItem = (item) => {
    console.log(item);
    dispatch({
      type: actions.DELETEITEM,
      itemId: item.id,
    });
  };


  return (
    <div className="cart_scroll no_hieght">
      <div className="cart2_row" key={index}>
        <div className="box_1 new_size">
          <p>
            {index + 1}. {item.item_name}
          </p>
          <div className="w-100-row m-b-10">
            {!item.kot ? (
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
                <Select item={item} deleteItem={deleteItem} />
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
            {item.price * item.quantity - item.discount * item.quantity}
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
