import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import firebase, { db } from "../../config";
import { dispatchContext } from "./contexts";

const Select = ({ item, deleteItem, dbRef }) => {
  const { handleSubmit, register } = useForm();

  const handleStatusChange = async (data) => {
    let table = await dbRef.get();
    var order = table.data().orders;
    for (var i = 0; i < order.length; i++) {
      let it = order[i];
      if (it.id === item.id && it.price === item.price) {
        it.status = data.status;
        break;
      }
    }
    await dbRef.update({
      orders: order,
    });
  };
  return (
    <>
      <div>
        <select
          name="status"
          onChange={handleSubmit(handleStatusChange)}
          ref={register}
        >
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
    let KotItems = []
    for (var i = 0; i < order.length; i++) {
      let it = order[i];
      if (it.id === item.id && it.price === item.price) {
        it.status = "cooking";
        const kotItems = {
          name: it.name,
          id: item.id,
          status: "Cooking",
          quantity: it.quantity,
          instructions: it.instructions || ""
        } 
        KotItems.push(kotItems)
        break;
      }
    }
    dispatch({
      type: "KOTModalShow",
      items: [item],
    });

    await dbRef.update({
      orders: order,
    });

    console.log(KotItems)
    
    if(table.data().kotId === undefined || table.data().kotId === ""){
      console.log("here")
      const kot = await db.collection("kotItems").add({
        items: KotItems,
        businessId,
        employee: table.data().currentEmployee,
        tableName: table.data().table_name,
        tableId: table.id
      });

      dbRef.update({
        kotId: kot.id
      })
    }
    else {
      console.log("here2")
      const kot = await db.collection('kotItems').doc(table.data().kotId).get()
      let currentItems = kot.data().items
      await db.collection('kotItems').doc(table.data().kotId).update({
        items: currentItems.concat(KotItems)
      })
    }
  }
  const deleteItem = (item) => {
    if(item.status !== "NotKot"){
      dispatch({
        type: 'DeleteModalShow',
        item: item
      })
      return
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
