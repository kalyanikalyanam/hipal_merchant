import * as actions from './actionTypes'
import {addToarray, updateObject} from './reducerUtils'
const reducer = (state, action) => {
    switch(action.type){
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
        
        case actions.OPENMODEL:
            return updateObject(state, {modalItem: action.item, show: true})
        case actions.CLOSEMODEL:
            return updateObject(state, {modalItem: null, show: false})

        case actions.BILLPAGESHOW: 
            return handleBillPageShow(action, state) 
        case actions.BILLPAGEHIDE: 
            return handleBillPageHide(action, state) 
        case actions.SETBILLID:
            return handleSetBillId(action, state)

        case actions.ADDTABLEDATA:
            return handleAddTableData(action, state)
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
    return updateObject(state, {billPage})
}

const handleAddLiveCart = (action, state) => {
    if (action.item && Object.keys(action.item).length === 0) return state
    const liveCart = addToarray(state.liveCart, action.item)
    return updateObject(state, { liveCart, show: false, modelItem: null }) 
}

const deleteLiveCartItem = (aciton, state) => {
    const itemId = aciton.itemId
    const {liveCart} = state
    console.log(liveCart)
    let newLiveCart = liveCart.filter(item=> item.item_id !== itemId)
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
export default reducer