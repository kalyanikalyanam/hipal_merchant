import { db } from "../../../config";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { dispatchContext} from "../contexts";

const AddCustomerForm = () => {
  const { handleSubmit, register, reset, errors } = useForm({
    mode: "onBlur",
  });
  const dispatch = useContext(dispatchContext);

  const onSubmit = async (data) => {
    console.log("here")
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    dispatch({
      type: "addUserModalHide"
    });
    const customer = {
      created_on: Date.now(),

      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phonenumber: data.customer_phonenumber,

      customer_notes: data.customer_notes,

      sessionId: sessionId,
      username: username,
      businessId: businessId,
    };
    await db.collection("customers").add(customer);
  };
  const onCancel = () => {
    console.log("here")
    dispatch({
      type: "AddUserModalHide",
    });
  };
  return (
    <div className="modal-dialog modal-sm hipal_pop" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="smallmodalLabel">
            Add Customer
          </h5>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body product_edit">
            <div className="col-12 w-100-row">
              <div className="row form-group">
                <div className="col col-md-4">
                  <label className=" form-control-label">Customer Name</label>
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    id="text-input"
                    name="customer_name"
                    placeholder="Krishna Kola"
                    className="form-control edit_product"
                    ref={register({
                      required: "Name is required",
                    })}
                  />
                  <div className="text-danger">
                    {errors.customer_name && errors.customer_name.message}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 w-100-row">
              <div className="row form-group">
                <div className="col col-md-4">
                  <label className=" form-control-label">Email Address</label>
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    name="customer_email"
                    placeholder="krishna.kola@gmail.com"
                    className="form-control edit_product"
                    ref={register({
                      required: "E-mail is required",
                    })}
                  />
                  <div className="text-danger">
                    {errors.customer_email && errors.customer_email.message}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 w-100-row">
              <div className="row form-group">
                <div className="col col-md-4">
                  <label className=" form-control-label">Mobile</label>
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    name="customer_phonenumber"
                    placeholder="9703371164"
                    className="form-control edit_product"
                    ref={register}
                  />
                  <div className="text-danger">
                    {errors.customer_phonenumber &&
                      errors.customer_phonenumber.message}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 w-100-row">
              <div className="row form-group">
                <div className="col col-md-4">
                  <label className=" form-control-label">Notes</label>
                </div>
                <div className="col-12 col-md-6">
                  <textarea
                    name="customer_notes"
                    rows="3"
                    placeholder="Likes take away, Yapral"
                    className="form-control edit_product"
                    ref={register}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn close_btn"
              data-dismiss="modal"
              onClick={onCancel}
            >
              Close{" "}
            </button>
            <button type="submit" className="btn save_btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddCustomerForm;
