import React, { useContext, useEffect, useRef, useState } from "react";
import { dispatchContext, tableContext } from "../contexts";
import { useReactToPrint } from "react-to-print";
import * as moment from "moment";

const KotModal = React.forwardRef((props, ref) => {
  const { data } = props;
  const [table, setTable] = useState();
  const dbRef = useContext(tableContext);
  useEffect(() => {
    const tabledata = async () => {
      console.log(data);
      if (dbRef) {
        let table = await dbRef.get();
        setTable(table.data());
      }
    };
    tabledata();
  }, []);
  const items =
    data &&
    data.map((item, index) => {
      return (
        <tr key={`${index}`}>
          <td
            style={{
              textAlign: "left",
              padding: "3px 10px",
              fontSize: "28px",
              color: "#000000",
            }}
          >
            {item.name}
          </td>
          <td
            style={{
              textAlign: "center",
              padding: "3px 10px",
              fontSize: "28px",
              color: "#000000",
            }}
          >
            {item.quantity}
          </td>
        </tr>
      );
    });
  const itemsbold =
    data &&
    data.map((item, index) => {
      return (
        <tr key={`${index}`}>
          <td
            style={{
              textAlign: "left",
              padding: "3px 10px",
              fontSize: "35px",
              color: "#000000",
            }}
          >
            <b>{item.name}</b>
          </td>
          <td
            style={{
              textAlign: "center",
              padding: "3px 10px",
              fontSize: "30px",
              color: "#000000",
            }}
          >
            <b> {item.quantity}</b>
          </td>
        </tr>
      );
    });
  return (
    <>
      <div className="order_id_cart_box col-md-12 m-t-20 bg-w m-b-20">
        <div className="width-100 bill_scroll1">
          <table width="100%" style={{ display: "table" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    fontSize: "28px",
                    color: "#000000",
                  }}
                >
                  <b> Dine In</b>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#000000",
                    fontSize: "28px",
                  }}
                >
                  <b> KOT</b>
                </td>
              </tr>

              <tr style={{ padding: "0px" }}>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    paddingBottom: "0px",
                    color: "#000000",
                    borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                    fontSize: "28px",
                  }}
                >
                  <table width="100%">
                    <tbody>
                      <tr>
                        <td
                          style={{
                            textAlign: "left",
                            padding: "3px 10px",
                            fontSize: "28px",
                            color: "#000000",
                          }}
                        >
                          {" "}
                          {moment(new Date().toLocaleString())
                            .locale("en")
                            .format("DD-MM-YYYY")}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "3px 10px",
                            fontSize: "28px",
                            color: "#000000",
                          }}
                        >
                          <b> {table && table.table_name}</b>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            textAlign: "left",
                            padding: "3px 10px",
                            fontSize: "28px",
                            color: "#000000",
                          }}
                        >
                          {" "}
                          {moment(new Date().toLocaleString())
                            .locale("en")
                            .locale("en")
                            .format("HH:mm:ss")}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "3px 10px",
                            fontSize: "28px",
                            color: "#000000",
                          }}
                        >
                          {table && table.currentEmployee}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#000000",
                    borderBottom: "1px dashed rgba(0, 0,0, 0.5)",
                    fontSize: "28px",
                  }}
                >
                  <table width="100%">
                    <tbody>
                      <tr>
                        <td
                          style={{
                            textAlign: "left",
                            padding: "5px 10px 10px 10px",
                            fontSize: "28px",
                            color: "#000000",
                          }}
                        >
                          <b>Item</b>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "5px 10px 10px 10px",
                            fontSize: "28px",
                            color: "#000000",
                          }}
                        >
                          <b>Qty</b>
                        </td>

                        <td></td>
                      </tr>
                      {items}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>{" "}
          <div style={{ display: "none" }}>
            <div className="print_bill" ref={ref}>
              <table width="100%">
                <tbody>
                  <tr>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        fontSize: "32px",
                        color: "#000000",
                      }}
                    >
                      <b> Dine In</b>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        color: "#000000",
                        fontSize: "32px",
                      }}
                    >
                      <b> KOT</b>
                    </td>
                  </tr>

                  <tr style={{ padding: "0px" }}>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        paddingBottom: "0px",
                        color: "#000000",
                        borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                        fontSize: "32px",
                      }}
                    >
                      <table width="100%">
                        <tbody>
                          <tr>
                            <td
                              style={{
                                textAlign: "left",
                                padding: "3px 10px",
                                fontSize: "32px",
                                color: "#000000",
                              }}
                            >
                              <b>
                                {" "}
                                {moment(new Date().toLocaleString())
                                  .locale("en")
                                  .format("DD-MM-YYYY")}
                              </b>
                            </td>
                            <td
                              style={{
                                textAlign: "right",
                                padding: "3px 10px",
                                fontSize: "32px",
                                color: "#000000",
                              }}
                            >
                              <b> {table && table.table_name}</b>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                textAlign: "left",
                                padding: "3px 10px",
                                fontSize: "32px",
                                color: "#000000",
                              }}
                            >
                              <b>
                                {" "}
                                {moment(new Date().toLocaleString())
                                  .locale("en")
                                  .locale("en")
                                  .format("HH:mm:ss")}
                              </b>
                            </td>
                            <td
                              style={{
                                textAlign: "right",
                                padding: "3px 10px",
                                fontSize: "32px",
                                color: "#000000",
                              }}
                            >
                              <b> {table && table.currentEmployee}</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        color: "#000000",
                        borderBottom: "1px dashed rgba(0, 0,0, 0.5)",
                        fontSize: "32px",
                      }}
                    >
                      <table width="100%">
                        <tbody>
                          <tr>
                            <td
                              style={{
                                textAlign: "left",
                                padding: "5px 10px 10px 10px",
                                fontSize: "33px",
                                color: "#000000",
                              }}
                            >
                              <b>Item</b>
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "5px 10px 10px 10px",
                                fontSize: "33px",
                                color: "#000000",
                              }}
                            >
                              <b>Qty</b>
                            </td>

                            <td></td>
                          </tr>
                          {itemsbold}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>{" "}
            </div>
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
      type: "KOTModalHide",
    });
  };
  return (
    <>
      <KotModal ref={componentRef} data={data} />

      <div className="w-100-row kotsettle_btn">
        <span className="btn add_ord" onClick={handlePrint}>
          <a href="#" data-toggle="modal" data-target="#add_edit_position">
            Print Bill
          </a>
        </span>
        <span className="btn view_ord" onClick={handleClick}>
          Cancel
        </span>
      </div>
    </>
  );
};
export default Print;
