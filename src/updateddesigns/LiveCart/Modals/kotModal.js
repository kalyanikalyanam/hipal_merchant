import React, { useContext, useEffect, useRef, useState } from "react";
import { dispatchContext, EmployeeContext, tableContext } from "../contexts";
import { useReactToPrint } from "react-to-print";
import * as moment from "moment";

const KotModal = React.forwardRef((props, ref) => {
  const { data } = props;
  const [table, setTable] = useState()
  const dbRef = useContext(tableContext)
  useEffect(() => {
    const tabledata = async () => {
      console.log(data)
      if(dbRef){
        let table = await dbRef.get()
        setTable(table.data())
      }
    }
    tabledata()
  }, [])
  const items =
    data &&
    data.map((item, index) => {
      return (
        <tr key={`${index}`}>
          <td
            style={{ textAlign: "left", padding: "3px 10px", fontSize: "35px" }}
          >
            <b>{item.name}</b>
          </td>
          <td
            style={{
              textAlign: "center",
              padding: "3px 10px",
              fontSize: "30px",
            }}
          >
            <b> {item.quantity}</b>
          </td>
          <td
            style={{
              textAlign: "right",
              padding: "3px 10px",
              fontSize: "30px",
            }}
          >
            <b> {item.quantity * item.price}</b>
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
              style={{
                display: "table",
                fontFamily: "Times New Roman",
                fontSize: "30px",
              }}
            >

              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#000000",
                    fontSize: "30px",
                  }}
                >
                  <b style={{ fontSize: "30px" }}>DINE IN</b>
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#000000",
                    fontSize: "30px",
                    borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <table width="100%">
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "3px 30px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>
                          {" "}
                          {moment(new Date().toLocaleString())
                            .locale("en")
                            .format("DD-MM-YYYY")}
                        </b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "3px 30px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>
                          {table && table.table_name}
                        </b>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "3px 30px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>
                          {moment(new Date().toLocaleString())
                            .locale("en")
                            .locale("en")
                            .format("HH:mm:ss")}
                        </b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "3px 30px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}> {table && table.currentEmployee}</b>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#000000",
                    fontSize: "30px",
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
                        <b style={{ fontSize: "30px" }}>Item</b>
                      </td>
                      
                      <td
                        style={{
                          textAlign: "center",
                          padding: "5px 30px 10px 30px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>Qty</b>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "5px 30px 10px 30px",
                          fontSize: "30px",
                        }}
                      >
                        <b style={{ fontSize: "30px" }}>Price</b>
                      </td>
                    </tr>
                    {items}
                  </table>
                </td>
              </tr>
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
      type: "KOTModalHide",
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
          fontSize: "30px",
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
          fontSize: "30px",
        }}
      >
        close
      </button>
    </div>
  );
};
export default Print;
