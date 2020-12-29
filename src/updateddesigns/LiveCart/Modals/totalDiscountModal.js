import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { dispatchContext } from "../contexts";
import LoginForm from "./login";

const TotalDiscountModal = ({ dbRef }) => {
  const { register, handleSubmit, errors, reset, setValue } = useForm();
  const dispatch = useContext(dispatchContext);
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    if (dbRef) {
      const setValues = async () => {
        const data = await dbRef.get();
        if (data.data().total_discount !== "") {
          setValue("total_discount", data.data().total_discount);
        }
        if (data.data().total_discount == "") {
          setValue("total_discount", 0);
        }
      };
      setValues();
    }
  }, [dbRef]);
  const onClose = () => {
    dispatch({
      type: "TotalDiscountModalHide",
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    if (data.total_discount !== "0" && !authenticated) {
      alert("Login to add discount");
      return;
    }
    dbRef.update({
      total_discount: parseFloat(data.total_discount || 0).toFixed(2) || "0",
    });
    onClose();
  };

  return (
    <div className="modal-dialog modal-sm hipal_pop" role="document">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="smallmodallabel">
              Add Total Discount
            </h5>
          </div>
          <div className="modal-body product_edit">
            {sessionStorage.getItem("role") == "Merchant" ||
            sessionStorage.getItem("additemdiscount") == "Yes" ? (
              <>
                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">
                        Add Total discount
                      </label>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        name="total_discount"
                        pattern="\d+"
                        className="form-control edit_product"
                        ref={register}
                        type="number"
                        id="text-input"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>

                {!authenticated && <LoginForm auth={setAuthenticated} />}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn close_btn" onClick={onClose}>
              close{" "}
            </button>
            <button type="submit" className={`btn save_btn`}>
              save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TotalDiscountModal;
