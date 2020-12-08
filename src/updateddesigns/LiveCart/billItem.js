import React from "react";

const BillItem = ({ item }) => {
  return (
    <tr>
      <td style={{ textAlign: "left", padding: "3px 10px" }}>
        {item && item.name}
      </td>
      <td style={{ textAlign: "center", padding: "3px 10px" }}>
        {item && item.quantity}
      </td>
      <td style={{ textAlign: "right", padding: "3px 10px" }}>
        {item && item.quantity * item.price}
        {item.discount > 0 ? (<>
          {`(Discount ₹ ${parseFloat(item.price * item.discount / 100 * item.quantity).toFixed(2)} )`}
         </>) : null}
      </td>
    </tr>
  );
};

export default BillItem;
