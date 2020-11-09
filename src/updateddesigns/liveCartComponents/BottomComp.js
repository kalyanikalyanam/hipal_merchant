import React, { useContext} from 'react'
import Menu from './menu' 
import BillRight from './billRight'
import {billPageContext} from './contexts'


const BottomComp = () => {
    const billPage = useContext(billPageContext)
    const toReturn = billPage.show ? (<BillRight/>) : (<Menu/>)
    return (
        toReturn
    )
}

export default BottomComp 