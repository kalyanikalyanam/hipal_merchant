import React, { useContext, useEffect } from "react";
import { dispatchContext } from "./contexts";

const KotModal = ({ data }) => {
  const dispatch = useContext(dispatchContext);
  useEffect(() => {}, []);
  const handleClick = () => {
    dispatch({
      type: "kotModalHide",
    });
  };
  const items =
    data &&
    data.map((item, index) => {
      return (
        <tr key={`${index}`}>
          <td style={{ textAlign: "left", padding: "3px 10px" }}>
            {item.item_name}
          </td>
          <td style={{ textAlign: "center", padding: "3px 10px" }}>
            {item.quantity}
          </td>
          <td style={{ textAlign: "right", padding: "3px 10px" }}>
            {item.quantity * item.price}
          </td>
        </tr>
      );
    });
  return (
    <div>
      <div>Kot Items</div>
      <table width="100%">
        <tbody>
          <tr>
            <td style={{ textAlign: "left", padding: "5px 10px 10px 10px" }}>
              <b>Item</b>
            </td>
            <td style={{ textAlign: "center", padding: "5px 10px 10px 10px" }}>
              <b>Qty</b>
            </td>
            <td style={{ textAlign: "right", padding: "5px 10px 10px 10px" }}>
              <b>Price</b>
            </td>
            <td></td>
          </tr>
          {items}
        </tbody>
      </table>
      <button onClick={handleClick}>close</button>
    </div>
  );
};

export default KotModal;
