import { db } from "../../config";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  billPageContext,
  tableContext,
  EmployeeContext,
  dispatchContext,
  BalanceContext,
} from "./contexts";
import * as actions from "./actionTypes";
import PaymentMethod from "./paymentMethods";

const BillRight = () => {
  const billPage = useContext(billPageContext);
  const balance = useContext(BalanceContext);
  const dispatch = useContext(dispatchContext);
  const [state, setState] = useState();
  const tableData = useContext(tableContext);
  const employee = useContext(EmployeeContext);
  const { handleSubmit, register, errors } = useForm({
    mode: "onChange",
  });
  useEffect(() => {
    var temp = 0;
    for (var key in state) {
      if (state.hasOwnProperty(key)) {
        console.log(state[key]);
        temp += parseInt(state[key]);
      }
    }
    var newBalance = parseInt(billPage.totalPrice - temp, 10);
    dispatch({
      type: "balance",
      balance: newBalance,
    });
  }, [state]);

  const onValue = (data) => {
    setState({ ...state, ...data });
  };

  const newHandleSettle = (data) => {
    const newBillPage = billPage;
    billPage.employee = data.employee;
    dispatch({
      type: "billModalShow",
      isSettle: true,
      bill: newBillPage,
    });
  };
  const handleBIllView = (data) => {
    const newBillPage = billPage;
    billPage.employee = data.employee;
    dispatch({
      type: "billModalShow",
      isSettle: false,
      bill: newBillPage,
    });
  };
  const handleSettle = async (data) => {
    let bill = {
      settle_by: employee,
      billId: billPage.billId,
      billAmount: billPage.totalPrice,
      billTiming: new Date().toLocaleString(),
      table: tableData.table_name,
      businessId: tableData.businessId,
      paymentMethod: state,
    };
    try {
      const temp = tableData.status.split(" ");
      var Table2;
      console.log(temp);
      if (temp[0] === "Table") {
        Table2 = temp[4];
        db.collection("tables")
          .where("businessId", "==", tableData.businessId)
          .where("table_name", "==", Table2)
          .limit(1)
          .get()
          .then((query) => {
            const thing = query.docs[0];

            thing.ref.update({
              status: "Vacant",
              customers: [],
            });
          });
      }
      const res = await db.collection("bills").add(bill);
      db.collection("tables").doc(tableData.id).update({
        status: "Vacant",
        customers: [],
        occupency: "0",
      });

      console.log(res);
    } catch (e) {
      console.log(e);
    }
    dispatch({
      type: actions.CustomerList,
      value: null,
      status: "Vacant",
    });
  };
  const paymentMethods = [
    "Cash",
    "Card",
    "Hipal Credits",
    "Employee",
    "Cheque",
    "UPI",
    "Pending",
    "Tip",
  ];
  const paymentMethod = paymentMethods.map((item, index) => {
    return <PaymentMethod key={index} method={item} onChange={onValue} />;
  });
  return (
    <div className="row m-t-20">
      <div className="category_upload_image w-100-row hipal_pop settle">
        <div className="modal-header">
          <h5 className="modal-title" id="smallmodalLabel">
            Settlement
          </h5>
          <div className="pull-right w-300 set_person">
            <div className="row form-group">
              <div className="col col-md-5">
                <label className=" form-control-label">Settle by</label>
              </div>
              <div className="col-12 col-md-7">
                <select
                  name="select"
                  name="settle_by"
                  ref={register({
                    required: "This is required",
                  })}
                  className="form-control settle"
                >
                  <option value={0}>{employee}</option>
                </select>
                {errors.settle_by && errors.settle_by.message}
              </div>
            </div>
          </div>
        </div>
        <div className="upload_img_block add_menu w-100-row">
          <div className="modal-body product_edit p-0">
            <div className="col-12 w-100-row">
              <div className="row">
                <div className="col col-md-5 bill_price">
                  Total: Rs {billPage.totalPrice}{" "}
                </div>
                <div className="col col-md-7 bill_id_settle">
                  Bill ID :{billPage.billId}{" "}
                  <span className="btn pull-right add_btn_pop_orange addmode_pad">
                    Add mode
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 w-100-row">
              <div className="row">
                <div className="col-md-6">
                  <div className="pay_box_block">{paymentMethod}</div>
                </div>
                <div className="col-md-6">
                  <div className="w-100-row m-b-30">
                    <span className="add_amount">Add Amount</span>
                    <span>
                      <input
                        type="number"
                        className="add_amount_field"
                        defaultValue
                        placeholder="Amount here"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 w-100-row bill_price balance text-center">
              Balance ({balance ? balance : 0})
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn close_btn width-150"
                  data-dismiss="modal"
                  onClick={handleSubmit(handleBIllView)}
                >
                  Bill View
                </button>
                {balance === 0 && billPage ? (
                  <button
                    type="button"
                    onClick={handleSubmit(newHandleSettle)}
                    className="btn save_btn width-150"
                  >
                    Settele
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn save_btn width-150"
                    disabled
                  >
                    Settele
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillRight;
