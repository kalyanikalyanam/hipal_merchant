import React, { useContext } from 'react'
import { dispatchContext } from '../contexts'

const AdvancedOptions = () => {
    const dispatch = useContext(dispatchContext)
    const handleMerge = () => {
        dispatch({
            type: "MergeModalShow"
        })
    }
    const handleMove = () => {
        dispatch({
            type: "MoveModalShow"
        })
    }
    const handleSwap= () => {
        dispatch({
            type: "SwapModalShow"
        })
    }
    const handleClose = () => {
        dispatch({
            type: "AdvanceOptionsModalHide"
        })
    }
    return (
        <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="smallmodalLabel">Select Option</h5>
                </div>
                <div className="modal-body product_edit">
                    <div className="col-12 w-100-row">
                        <div className="row form-group">
                            <div className="col col-md-4">
                                <div className="btn add_btn_pop_orange" onClick={handleMerge}>merge</div>
                            </div>
                            <div className="col col-md-4">
                                <div className="btn add_btn_pop_orange" onClick={handleSwap}>Swap</div>
                            </div>
                            <div className="col col-md-4">
                                <div className="btn add_btn_pop_orange" onClick={handleMove}>Move</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn close_btn" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    ) 
}

export default AdvancedOptions