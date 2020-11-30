import React, { useContext, useEffect } from "react";
import { tableContext } from "./contexts";
import firebase from '../../config'


const MenuItem = ({ item }) => {
  const dbRef = useContext(tableContext) 
  const handleClick = async () => {
    let table = await dbRef.get()
    let liveCart = table.data().liveCart
    if (!liveCart) {
      liveCart = []
    }
    if(liveCart.length === 0){
      var id = Math.floor(Math.random() * 100000000)
      dbRef.update({
        liveCartId: id
      })
    }
    var flag = false
    for (var i = 0; i < liveCart.length; i++) {
      var it = liveCart[i]
      if (it.id === item.itemId && parseInt(it.price) === parseInt(item.item_price)) {
        flag = true
        it.quantity++
      }
    }
    if (!flag) {
      let newItem = {
        name: item.item_name,
        price: parseFloat(item.item_price).toFixed(2),
        discount: parseFloat(item.discount || 0).toFixed(2) || "0",
        tax: parseFloat(item.item_tax).toFixed(2),
        image: item.item_image,
        id: item.itemId,
        portions: item.portions,
        portions_details: item.portion_details || [],
        quantity: 1,
        status: "NotKot"
      }
      dbRef.update({
        liveCart: firebase.firestore.FieldValue.arrayUnion(newItem)
      })
    } else {
      dbRef.update({
        liveCart
      })
    }
  }
  return (
    <div
      className="col-md-4 mb-15"
      onClick ={handleClick}
    >
      <div className="cate_img_box">
        <img src={item.item_image} alt="imageItem" />
        <p className="text-left">{item.item_name}</p>
        <p className="text-left m-t-5">
          <span className="box-differ">
            {item.item_type === "veg" ? (
              <span className="veg"></span>
            ) : (
              <span className="nonveg"></span>
            )}
          </span>
          ₹ {item.item_price}
          {item.portions === "Yes" && (
            <span className="pull-right porstion_icon">
              <img src="/images/icon/porstion_icon.png" alt="options" />
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
