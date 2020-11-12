import React, { useContext } from "react";
import { dispatchContext } from "./contexts";
import * as actions from "./actionTypes";

const MenuItem = ({ item }) => {
  const dispatch = useContext(dispatchContext);
  const handleOptions = (item) => {
    dispatch({
      type: actions.OPENMODEL,
      item,
      editMode: false,
      id: Date.now().toString,
      formOrder: false
    })
  }
  const handleClick = (item) => {
      let items = JSON.parse(JSON.stringify(item))
      items.price = parseInt(items.item_price)
      items.quantity = 1
      items.discount = "0"
      items.status = "active" 
      items.item_instructions = " "
      dispatch({
        type: actions.ADDLIVE,
        item: JSON.parse(JSON.stringify(items)),
        edit: false,
        id: Date.now().toString()
      })
  };
  return (
    <div
      className="col-md-4 mb-15"
      onClick={() => {
        handleClick(item);
      }}
    >
      <div className="cate_img_box item">
        <img src={item.item_image} />
        <div className="item_name">
          <span>{item.item_name}</span>
          <span className="item_diff ">
            {item.item_type == "Veg" ? (
              <span className="veg"></span>
            ) : (
              <span className="nonveg"></span>
            )}
            {item.item_type == "Egg" ? <span className="egg"></span> : ""}
          </span>
        </div>
          {item.portions === "Yes" && <span onClick ={(e) => {
            handleOptions(item)
            e.stopPropagation()
          }}> options</span>}
        <div className="price">₹ {item.item_price}</div>
      </div>
    </div>
  );
};

export default MenuItem;
