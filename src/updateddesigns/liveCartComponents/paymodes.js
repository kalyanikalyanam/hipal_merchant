import React from 'react'


const PayModes = () => {
    return (
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
    )
}

export default PayModes