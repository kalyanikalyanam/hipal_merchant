import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { dispatchContext} from "../contexts";
import LoginForm from "./login";

const EditModal = ({item, dbRef, edit}) => {
  const { register, handleSubmit, errors, reset, setValue} = useForm();
  const dispatch = useContext(dispatchContext);
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
   reset({
      quantity: item.quantity, 
      status: item.status,
      portion: item.portion,
      discount:`${item.discount}`,
    });
  }, []);
  const onClose = () => {
    dispatch({
      type:"EditModalHide" 
    });
  };
  const onSubmit = async (data) => {
    if (data.item_discount !== "0" && !authenticated) {
      alert("Login to add discount");
      return;
    }
    let table = await dbRef.get()
    if(edit === 'liveCart'){
      let liveCart = table.data().liveCart
      for (var i = 0; i < liveCart.length; i++) {
        let newItem = liveCart[i]
        if (newItem.id === item.id && item.price === newItem.price) {
          newItem.quantity = data.quantity
          newItem.discount = data.item_discount
          newItem.instructions = data.instructions || ""
          if (data.portion) {
            var temp
            newItem.portions_details.forEach(portion => {
              if (portion.name === data.portion) {
                temp = portion.price
              }
            })
            newItem.price = temp
          }
          await dbRef.update({
            liveCart
          })
          break;
        }
      }
    }
    else if(edit === 'order'){
      console.log("here")
      let order = table.data().orders
      for (var i = 0; i < order.length; i++) {
        let newItem = order[i]
        
        if (newItem.id === item.id && item.price === newItem.price) {
          newItem.quantity = data.quantity
          newItem.discount = data.item_discount
          newItem.instructions = data.instructions || ""
          if (data.portion) {
            var temp
            newItem.portions_details.forEach(portion => {
              if (portion.name === data.portion) {
                temp = portion.price
              }
            })
            newItem.price = temp
          }
          await dbRef.update({
            orders: order
          })
          break;
        }
      }
    }
    onClose()
  };
  const portions =
    item && item.portions === "Yes" ? (
      <div className="col-12 w-100-row">
        <div className="row form-group">
          <div className="col col-md-4">
            <label className=" form-control-label">Portion</label>
          </div>
          <div className="col-12 col-md-6">
            {item.portions_details.map((portion, index) => {
              return (
                <label className="container_check" key={index}>
                  {portion.name}
                  <input
                    type="radio"
                    name="portion"
                    ref={register}
                    value={portion.name}
                  />
                  <span className="checkmark"></span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    ) : null;
  return (
    <div className="modal-dialog modal-sm hipal_pop" role="document">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="smallmodallabel">
              edit item details
            </h5>
          </div>
          <div className="modal-body product_edit">
            <div className="col-12 w-100-row">
              <h1>{item && item.item_name} </h1>
            </div>
            <div className="col-12 w-100-row">
              <div className="row form-group">
                <div className="col col-md-4">
                  <label className=" form-control-label">quantity</label>
                </div>
                <div className="col-12 col-md-6">
                  <input
                    name="quantity"
                    className="form-control edit_product"
                    ref={register}
                    min="1"
                    max="12"
                    type="number"
                  />
                </div>
              </div>
            </div>
            {sessionStorage.getItem("role") == "Merchant" ||
            sessionStorage.getItem("additemdiscount") == "Yes" ? (
              <>
                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">
                        add item discount
                      </label>
                    </div>
                    <div className="col-12 col-md-6">
                      <select
                        name="item_discount"
                        className="form-control edit_product"
                        ref={register}
                      >
                        <option value="0">0%</option>
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                        <option value="20">20%</option>
                      </select>
                    </div>
                  </div>
                </div>
                {!authenticated && <LoginForm auth={setAuthenticated} />}
              </>
            ) : (
              ""
            )}
            {item && item.portions === "Yes" ? portions : null}
            <div className="col-12 w-100-row">
              <div className="row form-group">
                <div className="col col-md-4">
                  <label className=" form-control-label">instructions</label>
                </div>
                <div className="col-12 col-md-6">
                  <textarea
                    name="item_instructions"
                    rows="3"
                    placeholder="enter text here"
                    className="form-control edit_product"
                    ref={register}
                  ></textarea>
                </div>
              </div>
            </div>
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

export default EditModal
