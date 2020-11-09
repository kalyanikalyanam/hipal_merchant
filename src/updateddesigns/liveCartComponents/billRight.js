import React, { useContext } from 'react'
import {billPageContext} from './contexts'

const BillRight = () => {
    const billPage = useContext(billPageContext)
    return(
        <div className="row m-t-20">
            <div className="category_upload_image w-100-row hipal_pop settle">
                <div className="modal-header">
                    <h5 className="modal-title" id="smallmodalLabel">Settlement</h5>
                    <div className="pull-right w-300 set_person">
                        <div className="row form-group">
                            <div className="col col-md-5">
                                <label className=" form-control-label">Settle by</label>
                            </div>
                            <div className="col-12 col-md-7">
                                <select name="select" id="select" className="form-control settle">
                                    <option value={0}>Varun</option>
                                    <option value={1}>Raju</option>
                                    <option value={2}>Krishna</option>
                                    <option value={3}>Rani</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="upload_img_block add_menu w-100-row">
                    <div className="modal-body product_edit p-0">
                        <div className="col-12 w-100-row">
                            <div className="row">
                                <div className="col col-md-5 bill_price">
                                    Total: Rs 499.00
                </div>
                                <div className="col col-md-7 bill_id_settle">
                                    Bill ID :{billPage.billId} <span className="btn pull-right add_btn_pop_orange addmode_pad">Add mode</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 w-100-row">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="pay_box_block">
                                        <div className="box_payment">
                                            <p className="price"><input type="number" defaultValue={120} /></p>
                                            <p className="img"><img src="/images/icon/cash_icon.png" /></p>
                                            <p className="price_head">Cash</p>
                                        </div>
                                        <div className="box_payment">
                                            <p className="price"><input type="number" defaultValue={120} /></p>
                                            <p className="img"><img src="/images/icon/card_icon.png" /></p>
                                            <p className="price_head">Card</p>
                                        </div>
                                        <div className="box_payment">
                                            <p className="price"><input type="number" defaultValue={120} /></p>
                                            <p className="img"><img src="/images/icon/hipla_credits.png" /></p>
                                            <p className="price_head">Hipal
                        Credits</p>
                                        </div>
                                        <div className="box_payment">
                                            <p className="price"><input type="number" defaultValue={120} /></p>
                                            <p className="img"><img src="/images/icon/employee_icon_pay.png" /></p>
                                            <p className="price_head">Employee</p>
                                        </div>
                                        <div className="box_payment">
                                            <p className="price"><input type="number" defaultValue={120} /></p>
                                            <p className="img"><img src="/images/icon/cheqe_cion.png" /></p>
                                            <p className="price_head">Cheque</p>
                                        </div>
                                        <div className="box_payment selected">
                                            <span className="active">
                                                <span className="dotsmall" />
                                            </span>
                                            <p className="price"><input type="number" defaultValue={120} /></p>
                                            <p className="img"><img src="/images/icon/upi_W.png" /></p>
                                            <p className="price_head">UPI</p>
                                        </div>
                                        <div className="box_payment">
                                            <p className="price"><input type="number" defaultValue={120} /></p>
                                            <p className="img"><img src="/images/icon/pending_icon.png" /></p>
                                            <p className="price_head">Pending</p>
                                        </div>
                                        <div className="box_payment">
                                            <p className="price"><input type="number" defaultValue={120} /></p>
                                            <p className="img"><img src="/images/icon/tip_icon.png" /></p>
                                            <p className="price_head">Tip</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="w-100-row m-b-30">
                                        <span className="add_amount">Add Amount</span>
                                        <span><input type="number" className="add_amount_field" defaultValue placeholder="Amount here" /></span>
                                    </div>
                                    <div className="pay_mode_bg">
                                        <p>Choose the mode of payment</p>
                                        <div className="row form-group user_roles_check">
                                            <label className="container_check"><img src="/images/icon/paytm.png" />
                                                <input type="checkbox" />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <div className="row form-group user_roles_check">
                                            <label className="container_check"><img src="/images/icon/g-pay.png" />
                                                <input type="checkbox" />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <div className="row form-group user_roles_check">
                                            <label className="container_check"><img src="/images/icon/pnonepay.png" />
                                                <input type="checkbox" />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <div className="row form-group user_roles_check">
                                            <label className="container_check"> <img src="/images/icon/bhim.png" />
                                                <input type="checkbox" />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <div className="row form-group user_roles_check">
                                            <label className="container_check"> <img src="/images/icon/amezonpay.png" />
                                                <input type="checkbox" />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <div className="row form-group user_roles_check">
                                            <label className="container_check"> <img src="/images/icon/freecharge.png" />
                                                <input type="checkbox" />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <div className="row form-group user_roles_check">
                                            <label className="container_check">Others
                        <input type="checkbox" />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 w-100-row bill_price balance text-center">
                            Balance (120)
              <div className="modal-footer">
                                <button type="button" className="btn close_btn width-150" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn save_btn width-150">Settele</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillRight