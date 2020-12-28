import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import firebase, { db } from "../../config";
import { dispatchContext } from "./contexts";

const Select = ({ item, deleteItem }) => {
  return (
    <>
      <div>
        <select name="status" value={item.status}>
          <option value="cooking">Cooking</option>
          <option value="served">Served</option>
        </select>
      </div>
      {(sessionStorage.getItem("role") == "Merchant" ||
        sessionStorage.getItem("deleteitemafterkot") == "Yes") &&
      item.status !== "served" ? (
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

const OrderItem = ({ item, index, dbRef }) => {
  const dispatch = useContext(dispatchContext);
  const handleEdit = (item) => {
    dispatch({
      type: "EditModalShow",
      item: item,
      edit: "order",
    });
  };
  const handleKOTItem = async () => {
    let table = await dbRef.get();
    const businessId = sessionStorage.getItem("businessId");
    var order = table.data().orders;
    var kotItems = [];
    let kotId = Math.floor(Math.random() * 1000000000);
    for (var i = 0; i < order.length; i++) {
      let it = order[i];
      if (it.orderPageId === item.orderPageId) {
        it.status = "cooking";
        it.kotId = kotId;
        kotItems.push(it);
        break;
      }
    }
    const kot = {
      items: kotItems,
      businessId,
      tableName: table.data().table_name,
      createdOn: Date.now(),
      employee: table.data().currentEmployee,
      tableId: table.id,
      orderId: table.data().orderId,
      type: "DineIn",
      status: "notServed",
    };

    await db.collection("kotItems").doc(kotId.toString()).set(kot);

    dispatch({
      type: "KOTModalShow",
      items: [item],
    });

    await dbRef.update({
      orders: order,
    });
  };
  const deleteItem = (item) => {
    if (item.status !== "NotKot") {
      dispatch({
        type: "DeleteModalShow",
        item: item,
      });
      return;
    }
    dbRef.update({
      orders: firebase.firestore.FieldValue.arrayRemove(item),
    });
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
              <Select item={item} deleteItem={deleteItem} dbRef={dbRef} />
            )}
          </div>
          {item.discount > 0 ? (
            <>
              <p className="offer_applied">{`${item.discount}% off Applied`}</p>
              <p className="offer_applied">{`₹ ${parseFloat(
                ((item.price * item.discount) / 100) * item.quantity
              ).toFixed(2)}`}</p>
            </>
          ) : null}
        </div>
        <div className="box_2">
          <span>x{item.quantity}</span>
        </div>
        <div className="box_3">
          <span>{item.price * item.quantity}</span>
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
