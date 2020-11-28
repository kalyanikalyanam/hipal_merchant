import React, { useContext, useEffect, useRef } from "react";
import { dispatchContext, EmployeeContext, tableContext } from "./contexts";
import { useReactToPrint } from "react-to-print";
import * as moment from "moment";

const KotModal = React.forwardRef((props, ref) => {
  const { data } = props;
  const dispatch = useContext(dispatchContext);
  const employee = useContext(EmployeeContext);
  const tableData = useContext(tableContext);
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
    <>
      <div width="100%" ref={ref}>
        <div className="modal-dialog modal-sm hipal_pop" role="document">
          <div>
            <table
              width="100%"
              style={{ display: "table", fontFamily: "Times New Roman" }}
            >
              {/* <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <img
                    src={sessionStorage.getItem("BusinessLogo")}
                    style={{ maxWidth: "150px" }}
                  />
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#000000",
                  }}
                >
                  12, Sainikpuri, Kapra,<br></br> Secunderabad, Telangana 500094
                </td>
              </tr> */}

              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#000000",
                  }}
                >
                  <b>DINE IN</b>
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#000000",
                    borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <table width="100%">
                    <tr>
                      <td style={{ textAlign: "left", padding: "3px 30px" }}>
                        {moment(new Date().toLocaleString())
                          .locale("en")
                          .format("DD-MM-YYYY")}
                      </td>
                      <td style={{ textAlign: "right", padding: "3px 30px" }}>
                        {tableData.table_name}
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: "left", padding: "3px 30px" }}>
                        {moment(new Date().toLocaleString())
                          .locale("en")
                          .locale("en")
                          .format("HH:mm:ss")}
                      </td>
                      <td style={{ textAlign: "right", padding: "3px 30px" }}>
                        {employee}
                      </td>
                    </tr>

                    {/* <tr>
                  <td style={{ textAlign: "left", padding: "3px 30px" }}>
                    Order ID :{or}
                  </td>
                </tr> */}
                  </table>
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#000000",
                    borderBottom: " 1px dashed rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <table width="100%">
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "5px 30px 10px 30px",
                        }}
                      >
                        <b>Item</b>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "5px 30px 10px 30px",
                        }}
                      >
                        <b>Qty</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "5px 30px 10px 30px",
                        }}
                      >
                        <b>Price</b>
                      </td>
                    </tr>
                    {items}
                  </table>
                </td>
              </tr>
              {/* 
              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#000000",
                  }}
                >
                  - Thank you! -
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#000000",
                  }}
                >
                  GSTIN - 456AEW453462
                </td>
              </tr> */}
            </table>
          </div>
        </div>
      </div>
    </>
  );
});

const Print = ({ data }) => {
  const componentRef = useRef();
  const dispatch = useContext(dispatchContext);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleClick = () => {
    dispatch({
      type: "kotModalHide",
    });
  };
  return (
    <div>
      <button
        onClick={handlePrint}
        style={{
          textAlign: "center",
          padding: "10px",
          color: "#000000",
          backgroundColor: "#06c00e",
          borderRadius: "25px",
        }}
      >
        Print this
      </button>
      <KotModal ref={componentRef} data={data} />
      <button
        onClick={handleClick}
        style={{
          textAlign: "center",
          padding: "10px",
          color: "#000000",
          backgroundColor: "#ff3b3b",
          borderRadius: "25px",
        }}
      >
        close
      </button>
    </div>
  );
};
export default Print;
