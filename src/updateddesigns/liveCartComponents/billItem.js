import React from "react";

const BillItem = ({ item }) => {
  return (
    <tr>
      <td style={{ textAlign: "left", padding: "3px 10px" }}>
        {item && item.item_name}
      </td>
      <td style={{ textAlign: "center", padding: "3px 10px" }}>
        {item && item.quantity}
      </td>
      <td style={{ textAlign: "right", padding: "3px 10px" }}>
        {item && item.quantity * item.price}
      </td>
    </tr>
  );
};

export default BillItem;
