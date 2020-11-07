import * as actions from './actionTypes'
const reducer = (state, action) => {
    switch(action.type){
        case actions.ADDLIVE:
            if(action.item && Object.keys(action.item).length === 0) return state
            const liveCart = addToarray(state.liveCart, action.item)
            return updateObject(state, {liveCart, show: false, modelItem: null}) 
        case actions.REMLIVE:
            return deleteLiveCartItem(action.itemId, state) 
        case actions.SENDTOORDER: 
            if(state.liveCart.length === 0) return state
            const currentCart = state.liveCart
            currentCart.cartId = action.cartId
            currentCart.cartPrice = action.cartPrice
            currentCart.cartDiscount = action.cartDiscount
            console.log(currentCart)
            const order = addToarray(state.order, currentCart)
            
            return updateObject(state, {liveCart: [], order})
        case actions.REMALLLIVE: 
            return updateObject(state, {liveCart: []})


        case actions.SENDTOBILL: 
            const currentOrder = state.order
            if(state.order.length === 0) return state
            const bill = addToarray(state.bill, currentOrder)
            return updateObject(state, {order: [], bill})
        case actions.REMALLORDER:
            return updateObject(state, {order: []})
        case action.REMORDER:
            return deleteOrder(state, action.orderId)
        
        case actions.OPENMODEL:
            return updateObject(state, {modalItem: action.item, show: true})
        case actions.CLOSEMODEL:
            return updateObject(state, {modalItem: null, show: false})

        case actions.BILLPAGESHOW: 
        console.log(state)
            return updateObject(state, {billPage: true})
        case actions.BILLPAGEHIDE: 
            return updateObject(state, {billPage: false})
        default: 
            return state
    }
}

const updateObject = (object, updatedProperties) => {
    return {...object, ...updatedProperties}
}
const addToarray = (array, object) => {
    let newArray = array
    newArray.push(object)
    return newArray
}

const deleteLiveCartItem = (itemId, state) => {
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
export default reducer