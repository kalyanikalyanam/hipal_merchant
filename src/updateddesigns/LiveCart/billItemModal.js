import React from "react";

const BillItemModal = ({ item }) => {
  return (
    <tr>
      <td
        style={{
          textAlign: "left",
          padding: "3px 10px",
          fontSize: "34px",
          color: "#000000",
        }}
      >
        <b>
          {item && item.name}({item && item.tax}%)
        </b>
      </td>
      <td
        style={{
          textAlign: "center",
          padding: "3px 10px",
          fontSize: "34px",
          color: "#000000",
        }}
      >
        <b>{item && item.quantity}</b>
      </td>
      <td
        style={{
          textAlign: "right",
          padding: "3px 10px",
          fontSize: "34px",
          color: "#000000",
        }}
      >
        <b>{item && item.quantity * item.price}</b>
        {/* {item && item.quantity * item.price} */}
        {item.discount > 0 ? (
          <b>
            {`(Discount ₹ ${parseFloat(
              ((item.price * item.discount) / 100) * item.quantity
            ).toFixed(2)} )`}
            ({item.discount}%)
          </b>
        ) : null}
      </td>
    </tr>
  );
};

export default BillItemModal;
