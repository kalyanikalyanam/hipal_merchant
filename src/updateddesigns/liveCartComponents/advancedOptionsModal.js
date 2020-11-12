import {db} from '../../config'
import React, {useContext, useEffect, useState} from 'react'
import {dispatchContext} from './contexts'
import * as actions from './actionTypes'

const AdvancedOptionsModal = () => {
    const dispatch= useContext(dispatchContext)
    const handleMerge = () => {
        dispatch({
            type: 'mergeModal'
        })
    }
    const handleMove= () => {
        console.log("here")
        dispatch({
            type: 'moveModal'
        })
    }
    const handleSwap = () => {
        dispatch({
            type: 'swapModal'
        })
    }
    const handleClose = () => {
        dispatch({
            type: actions.ADVACEDOPTIONSHIDE
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
                                <div onClick={handleMerge} className="btn add_btn_pop_orange">merge</div>
                            </div>
                            <div className="col col-md-4">
                                <div onClick={handleSwap} className="btn add_btn_pop_orange">Swap</div>
                            </div>
                            <div className="col col-md-4">
                                <div onClick={handleMove} className="btn add_btn_pop_orange">Move</div>
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

export default AdvancedOptionsModal