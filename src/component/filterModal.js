import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const FilterModal = ({ setShow, filter, resetFilter }) => {
  const { handleSubmit, register, errors, setError, reset } = useForm({
    mode: "onSubmit",
  });
  const handleReset = () => {
    resetFilter();
    setShow(false);
  };

  useEffect(() => {
    reset();
  }, []);
  const onSubmit = (data) => {
    let flag = false;
    if (data.validFrom === "") {
      setError("validFrom", {
        type: "manual",
        message: "This is required",
      });
      flag = true;
    }
    if (data.validTo === "") {
      setError("validFrom", {
        type: "manual",
        message: "This is required",
      });
      flag = true;
    }
    if (!flag) {
      filter(data);
      setShow(false);
    }
  };
  return (
    <div className="modal-dialog modal-sm hipal_pop" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="smallmodalLabel">
            Filters
          </h5>

          <span>
            <button className="color_red" onClick={handleReset}>
              Reset filters
            </button>
          </span>
        </div>

        <div className="modal-body product_edit">
          {/* 

            {/* <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">Bill ID</label>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder=""
                        className="form-control edit_product"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">Order ID</label>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder=""
                        className="form-control edit_product"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">Cart ID</label>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder=""
                        className="form-control edit_product"
                      />
                    </div>
                  </div>
                </div> */}

          {/* <div className="col-12 w-100-row">
                  <hr></hr>
                </div> */}

          <div className="col-12 w-100-row p-30_filter">Advanced filter</div>

          <div className="col-12 w-100-row">
            <div className="row form-group">
              <div className="col col-md-4">
                <label className=" form-control-label">Date</label>
              </div>
              <div className="col-12 col-md-7">
                <div className="row">
                  <div className="col-md-6">
                    <label className=" form-control-label pull-left">
                      From
                    </label>
                    <span className=" pull-left small_filed">
                      <input
                        name="validFrom"
                        id="validFrom"
                        type="date"
                        placeholder="DD/MM/YYYY"
                        className="form-control edit_product"
                        ref={register({
                          required: "This is required",
                        })}
                      />
                    </span>
                  </div>
                  {errors.validFrom && <div>{errors.validFrom.message}</div>}
                  <div className="col-md-6">
                    <label className=" form-control-label  pull-left">To</label>
                    <span className="small_filed  pull-left">
                      <input
                        name="validTo"
                        id="validTo"
                        className="form-control edit_product"
                        type="date"
                        ref={register({
                          required: "This is required",
                        })}
                      />
                    </span>
                  </div>
                  {errors.validTo && <div>{errors.validTo.message}</div>}{" "}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">Day</label>
                    </div>
                    <div className="col-12 col-md-6">
                      <select
                        name="select"
                        id="select"
                        className="form-control edit_product"
                      >
                        <option value="0">Drop Down</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">Amount</label>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder=""
                        className="form-control edit_product"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 w-100-row">
                  <div className="row form-group">
                    <div className="col col-md-4">
                      <label className=" form-control-label">
                        Customer name
                      </label>
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder=""
                        className="form-control edit_product"
                      />
                    </div>
                  </div>
                </div> */}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn save_btn"
            onClick={handleSubmit(onSubmit)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
