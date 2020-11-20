import React, { useContext, useEffect, useRef} from 'react'
import {dispatchContext} from './contexts'
import {useReactToPrint} from 'react-to-print'

const KotModal = React.forwardRef((props, ref) => {
    const {data} = props
    const dispatch = useContext(dispatchContext)
    useEffect(() => {
    }, [])
    const handleClick = () => {
        dispatch({
            type: 'kotModalHide'
        })
    }
    const items = data && data.map((item, index) => {
        return(
            <tr key={`${index}`} >
                <td style={{ textAlign: 'left', padding: '3px 10px' }}>{item.item_name}</td>
                <td style={{ textAlign: 'center', padding: '3px 10px' }}>{item.quantity}</td>
                <td style={{ textAlign: 'right', padding: '3px 10px' }}>{item.quantity * item.price}</td>
            </tr>
        )
    })
    return(
        <div>
            <div>Kot Items</div>
            <table width="100%" ref={ref}>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'left', padding: '5px 10px 10px 10px' }}><b>Item</b></td>
                        <td style={{ textAlign: 'center', padding: '5px 10px 10px 10px' }}><b>Qty</b></td>
                        <td style={{ textAlign: 'right', padding: '5px 10px 10px 10px' }}><b>Price</b></td><td>
                        </td>
                    </tr>
                    {items}
                </tbody></table>
            <button onClick={handleClick}>close</button>
        </div>
    )
})

const Print = ({data}) => {
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    }) 
    return (
        <div>
            <button onClick={handlePrint}>Print this</button>
            <KotModal ref={componentRef} data={data}/>
        </div>
    )
}
export default Print 