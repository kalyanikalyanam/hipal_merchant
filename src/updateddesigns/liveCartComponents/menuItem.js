import React, { useContext } from "react";
import { dispatchContext } from "./contexts";
import * as actions from "./actionTypes";

const MenuItem = ({ item }) => {
  const dispatch = useContext(dispatchContext);
  const handleClick = (item) => {
    dispatch({
      type: actions.OPENMODEL,
      item,
    });
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
        <div className="price">₹ {item.item_price}</div>
      </div>
    </div>
  );
};

export default MenuItem;
