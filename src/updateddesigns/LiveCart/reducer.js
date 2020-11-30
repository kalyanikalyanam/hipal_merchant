import { act } from "react-dom/test-utils"

const updateObject = (state, updatedProps) => {
    return {...state ,... updatedProps}
}

export const initState = {
    editModal: false,
    kotModal: false,
    customerToTableModal: false,
    addUserModal: false,
    advacedOptionModal: false,
    moveModal: false,
    mergeModal: false,
    swapModal: false,
    billViewModal: false,
    setBillPage: 1,
    kotItems: [],
    balance: 0
}

export const reducer = (state, action) => {
    switch(action.type){
        case "EditModalShow":
            return updateObject(state, {editModal: true, editModalItem: action.item, edit: action.edit})
        case "EditModalHide":
            return updateObject(state, {editModal: false, editModalItem: null, edit: action.edit})

        case "KOTModalShow":
            return updateObject(state, {kotModal: true, kotItems: action.items})
        case "KOTModalHide":
            return updateObject(state, {kotModal: false})

        case "CustomerToTableModalShow":
            return updateObject(state, {customerToTableModal: true})
        case "CustomerToTableModalHide":
            return updateObject(state, {customerToTableModal: false})

        case "AddUserModalShow":
            return updateObject(state, {addUserModal: true})
        case "AddUserModalHide":
            return updateObject(state, {addUserModal: false})

        case "AdvanceOptionsModalShow":
            return updateObject(state, {advacedOptionModal: true})
        case "AdvanceOptionsModalHide":
            return updateObject(state, {advacedOptionModal: false})
        
        case "MoveModalShow":
            return updateObject(state, {moveModal: true})
        case "MoveModalHide":
            return updateObject(state, {moveModal: false})

        case "MergeModalShow":
            return updateObject(state, {mergeModal: true})
        case "MergeModalHide":
            return updateObject(state, {mergeModal: false})

        case "SwapModalShow":
            return updateObject(state, {swapModal: true})
        case "SwapModalHide":
            return updateObject(state, {swapModal: false})

        case "BillViewModalShow":
            return updateObject(state, {billViewModal: true, billData: action.data})
        case "BillViewModalHide":
            return updateObject(state, {billViewModal: false, billData: null})

        case "setBillPage":
            return updateObject(state, {setBillPage: action.select})
        
        case "SetBalance":
            return updateObject(state, {balance: action.balance})
        case "PaymentDetails":
            return updateObject(state, {details: action.details})
        default: return state
    }
}