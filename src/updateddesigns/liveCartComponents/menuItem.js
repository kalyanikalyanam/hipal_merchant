import React, { useContext } from "react";
import { dispatchContext } from "./contexts";
import * as actions from "./actionTypes";

const MenuItem = ({ item }) => {
  const dispatch = useContext(dispatchContext);
  const handleOptions = (event) => {
    try{
      event.stopPropagation()
    }
    catch(e) {
      console.log(e)
    }
    dispatch({
      type: actions.OPENMODEL,
      item,
      editMode: false,
      id: Date.now().toString,
      formOrder: false
    })
  }
  const handleClick = () => {
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

    <div className="col-md-4 mb-15" onClick={() => {handleClick(item)}}>
      <div className="cate_img_box">
        <img src={item.item_image} alt="imageItem"/>
        <p className="text-left">{item.item_name}</p>
        <p className="text-left m-t-5">
          <span className="box-differ">
            {item.item_type === "veg" ? (
              <span className="veg"></span>
            ) : (<span className="nonveg"></span>)}
          </span>
            ₹ {item.item_price}
        {item.portions === "Yes" &&  <span className="pull-right porstion_icon" onClick={handleOptions}>
          <img src="/images/icon/porstion_icon.png" alt="options" />
        </span>}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
