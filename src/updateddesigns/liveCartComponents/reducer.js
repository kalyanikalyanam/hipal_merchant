import { act } from 'react-dom/test-utils'
import * as actions from './actionTypes'
const updateObject = (object, updatedProperties) => {
    return {...object, ...updatedProperties}
}
const addToarray = (array, object) => {
    let newArray = array
    newArray.push(object)
    return newArray
}

const reducer = (state, action) => {
    switch(action.type){
        case actions.ADDLIVE:
            const liveCart = addToarray(state.liveCart, action.item)
            return updateObject(state, {liveCart, show: false, modelItem: null}) 
        case actions.REMLIVE:
            return deleteLiveCartItem(action.itemId, state) 
        case actions.SENDTOORDER: 
            const currentCart = state.liveCart
            return updateObject(state, {liveCart: [], order: currentCart})
        case actions.OPENMODEL:
            return updateObject(state, {modalItem: action.item, show: true})
        case actions.CLOSEMODEL:
            return updateObject(state, {modalItem: null, show: false})
        default: 
            return state
    }
}

const deleteLiveCartItem = (itemId, state) => {
    const {liveCart} = state
    console.log(liveCart)
    let newLiveCart = liveCart.filter(item=> item.item_id !== itemId)
    return updateObject(state, {liveCart: newLiveCart, show: false})
}
export default reducer