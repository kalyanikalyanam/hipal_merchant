import React, { useContext } from 'react'
import { stateContext } from './contexts'
import Menu from './menu'
import BillBottom from './billBottom'
const BottomComp = () => {
    const state = useContext(stateContext)
    const toReturn = state.setBillPage === 3 ? <BillBottom />: <Menu /> 
    return (
        toReturn
    )
}

export default BottomComp