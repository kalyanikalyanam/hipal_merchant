import React, { useContext, useEffect, useState } from 'react'
import { balanceContext, dispatchContext, tableContext } from './contexts'
import PaymentMethod from './paymentMethods'


const BillBottom = () => {
    const balance = useContext(balanceContext)
    const [localBalance, setLocalBalance] = useState(balance)
    const dbRef = useContext(tableContext)
    const dispatch = useContext(dispatchContext)
    const [total, setTotal] = useState()
    const [table, setTable] = useState()
    const [state, setState] = useState()
    useEffect(() => {
        setTotal(balance.balance)
        setLocalBalance(balance.balance)
    }, [])
    useEffect(() => {
        let unsubscribe
        const getTable = async () => {
            if (dbRef) {
                const table = await dbRef.get()
                setTable(table.data())
                unsubscribe = dbRef.onSnapshot(table => setTable(table.data())) 
            }
        }
        getTable()
        return unsubscribe
    }, [dbRef])
     
    useEffect(() => {
        if(table && table.bill){
            let total = 0
            table.bill.forEach(item => {
                total += item.price * item.quantity
                total += item.price * item.tax / 100 * item.quantity
                total -= item.price * item.discount / 100 * item.quantity
            })
            let temp = total
            total += total * balance.gst/ 100
            total += temp * balance.gst / 100
            setTotal(Math.round(total))
        }
    }, [table])

    const onValue = (data) => {
        setState({ ...state, ...data });
        
    };

    useEffect(() => {
        var temp = 0;
        for (var key in state) {
            if (state.hasOwnProperty(key)) {
                temp += parseInt(state[key]);
            }
        }
        var newBalance = parseInt(total- temp);
        dispatch({
            type: "PaymentDetails",
            details: state
        })
        dispatch({
            type: "SetBalance",
            balance: {
                gst: balance.gst,
                cGst:balance.cGst,
                balance: newBalance
            },
        });
    }, [state]);
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
    })

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
                                    className="form-control settle"
                                >
                                    <option value={0}>{table && table.currentEmployee}</option>
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
                                    Total: Rs {total && total}{" "}
                                </div>
                                <div className="col col-md-7 bill_id_settle">
                                    Bill ID :{table && table.billId}{" "}
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
                            Balance ({balance ? balance.balance : 0})
              <div className="modal-footer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BillBottom