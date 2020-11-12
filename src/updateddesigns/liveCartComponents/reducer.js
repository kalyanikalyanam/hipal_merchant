import { act } from 'react-dom/test-utils'
import { CustomInput } from 'reactstrap'
import * as actions from './actionTypes'
import {addToarray, updateObject} from './reducerUtils'
const initState = {
    liveCart: [],
    order: [],
    bill:[],
    show: false,
    modalItem: {},
    cardId: {},
    orderId: {},
    billPage: {
        billId: null,
        show: false
    },
    table: {}
}
const reducer = (state, action) => {
    switch(action.type){
        case 'RESET':
            return updateObject(state, initState)
        case actions.ADDLIVE:
            return handleAddLiveCart(action, state)
        case actions.REMLIVE:
            return deleteLiveCartItem(action, state) 
        case actions.SENDTOORDER: 
            return handleToOrder(action, state)
        case actions.REMALLLIVE: 
            return updateObject(state, {liveCart: []})

        case actions.REMALLORDER:
            return updateObject(state, {order: []})
        case action.REMORDER:
            return deleteOrder(state, action.orderId)
        case actions.SENDTOBILL: 
            return handleToBill(action, state)
        
        case actions.ADVACEDOPTIONSSHOW:
            return updateObject(state, {avancedOptionsShow: true, addCustomerShow: false})
        case actions.ADVACEDOPTIONSHIDE:
            return updateObject(state, {avancedOptionsShow: false})
        case actions.ADDCUSTOMERSHOW:  
            return updateObject(state, {addCustomerShow: true, avancedOptionsShow: false})
        case actions.ADDCUSTOMERHIDE:
            return updateObject(state, {addCustomerShow: false})
        case actions.OPENMODEL:
            var editMode
            if(action.editMode)
            editMode = true
            else
            editMode = false
            return updateObject(state, {modalItem: action.item, show: true, editMode, formOrder: action.formOrder})
        case actions.CLOSEMODEL:
            return updateObject(state, {modalItem: null, show: false})
        case 'mergeModal':
            return updateObject(state, {avancedOptionsShow: false, customerMergeModal: true})
        case 'mergeModalHide':
            return updateObject(state, {avancedOptionsShow: false, customerMergeModal: false})
        case 'moveModal':
            return updateObject(state, {avancedOptionsShow: false, customerMoveModal: true})
        case 'moveModalHide':
            return updateObject(state, {avancedOptionsShow: false, customerMoveModal: false})
        case 'swapModal':
            return updateObject(state, {avancedOptionsShow: false, customerSwapModal: true})
        case 'swapModalHide':
            return updateObject(state, {avancedOptionsShow: false, customerSwapModal: false})

        case actions.BILLPAGESHOW: 
            return handleBillPageShow(action, state) 
        case actions.BILLPAGEHIDE: 
            return handleBillPageHide(action, state) 
        case actions.SETBILLID:
            return handleSetBillId(action, state)

        case actions.ADDTABLEDATA:
            return handleAddTableData(action, state)
        case actions.KOTCART:
            return handleKOTcart(action, state)
        default: 
            return state
    }
}

const handleAddTableData = (action, state) => {
    const tableData = action.table
    return updateObject(state, {table: tableData})
}

const handleBillPageShow = (action, state) => {
    const billPage = state.billPage 
    billPage.show = true
    return updateObject(state, {billPage})
}
const handleBillPageHide = (aciton, state) => {
    const billPage = state.billPage 
    billPage.show = false
    return updateObject(state, {billPage})
}

const handleSetBillId = (action, state) => {
    const billPage = state.billPage
    billPage.billId = action.billId 
    billPage.totalPrice = action.totalBill
    billPage.bill = action.bill
    return updateObject(state, {billPage})
}

const handleAddLiveCart = (action, state) => {
    let liveCart = state.liveCart
    if(!action.edit){
        var flag = false 
        for(var i = 0;i < liveCart.length; i++){
            let item = liveCart[i]
            if(item.item_id === action.item.item_id && item.price === action.item.price){
                flag = true
                item.quantity += action.item.quantity
                item.instructions = action.item.instructions
                item.discount = action.item.discount
                item.item_status = action.item.status
                item.id = action.id
                item.kot = false
                break
            }
        }
        if(!flag){
            const items = JSON.parse(JSON.stringify(action.item))
            items.id = action.id 
            items.kot = false
            liveCart.push(items)
        }
    }
    else {
        for(var i = 0;i < liveCart.length; i++){
            let item = liveCart[i]
            if(action.item.id === item.id){
                item.quantity = action.item.quantity
                item.instructions = action.item.instructions
                item.discount = action.item.discount
                item.item_status = action.item.status
                item.price = action.item.price
                item.portion = action.item.portion
            }
        }
    }
        return updateObject(state, {liveCart, show: false, modalItem: null})
}

const deleteLiveCartItem = (aciton, state) => {
    const itemId = aciton.itemId
    const {liveCart} = state
    let newLiveCart = liveCart.filter(item=> item.id!== itemId)
    return updateObject(state, {liveCart: newLiveCart, show: false})
}

const deleteOrder = (orderId, state) => {
    const {order} = state
    let newOrder = order.filter(order => order.order_id !== orderId)
    return updateObject(state, {order: newOrder})
}
const handleToOrder = (action, state) => {
    if (state.liveCart.length === 0) return state
    const currentCart = state.liveCart
    currentCart.cartId = action.cartId
    currentCart.cartPrice = action.cartPrice
    currentCart.cartDiscount = action.cartDiscount
    const order = addToarray(state.order, currentCart)
    return updateObject(state, { liveCart: [], order })
}

const handleToBill = (action, state) => {
    if(!action.orderId || state.order.length === 0) return state
    const currentOrders = state.order 
    currentOrders.orderId = action.orderId
    currentOrders.orderPrice = action.orderPrice
    currentOrders.orderDiscount = action.orderDiscount
    const bill = addToarray(state.bill,currentOrders) 
    return  updateObject(state, {order: [], bill}) 
}
const handleKOTcart = (action, state) => {
    const {cart} = action
    console.log(cart)
    let currentOrder = state.order
    console.log(currentOrder)
    for(var i = 0; i < currentOrder.length; i++){
        if(currentOrder[i].cartId === cart.cartId){
            currentOrder[i].forEach(item=> {
                item.kot = true
            })
        }
    }
    return updateObject(state, {order: currentOrder})

}

export default reducer