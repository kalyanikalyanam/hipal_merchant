import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
class BillPrintPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

         
        };
    }
    style="background:#ccc;"


    componentWillMount(){
        document.body.style.backgroundColor ="#ccc";
        
      }
        componentWillUnmount(){
            document.body.style.backgroundColor ="";
       
      }

    render() {
        return (
          <div className="print_bill">


<table style={{width:"100%"}}>

<tr>
<td style={{textAlign:"center", padding:"10px", color:"#000000", borderBottom:"1px solid rgba(0, 0, 0, 0.5)"}}><b style={{paddingRight:"10px"}}>BILL ID</b>  2133456</td>
</tr>


<tr>
<td style={{textAlign:"center", padding:"10px"}}>
<img src="/images/logo_coffe_cup.png"/>
</td>
</tr>




<tr>
<td style={{textAlign:"center", padding:"10px", color:"#000000"}}>
12, Sainikpuri, Kapra,<br></br> Secunderabad, Telangana 500094</td>
</tr>

<tr>
<td style={{textAlign:"center", padding:"10px", color:"#000000"}}><b>DINE IN</b></td>
</tr>

<tr>

<td style={{textAlign:"center", padding:"10px", color:"#000000", borderBottom: "1px dashed rgba(0, 0, 0, 0.5)"}}>

<table style={{width:"100%"}}>

<tr>
<td style={{textAlign:"left", padding:"3px 30px"}}>Wed, May 27, 2020</td>
<td style={{textAlign:"right",padding:"3px 30px"}}>Table 7A</td>
</tr>

<tr>
<td style={{textAlign:"left", padding:"3px 30px"}}>09:23:45 AM</td>
<td style={{textAlign:"right",padding:"3px 30px"}}>S. Varun</td>
</tr>

<tr>
<td style={{textAlign:"left", padding:"3px 30px"}}>Order ID : 45635453462</td>
<td style={{textAlign:"right",padding:"3px 30px"}}>Copy : 1</td>
</tr>
</table>
</td>

</tr>


<tr>

<td style={{textAlign:"center", padding:"10px", color:"#000000", borderBottom: "1px dashed rgba(0, 0, 0, 0.5)"}}>

<table style={{width:"100%"}}>

<tr>
<td style={{textAlign:"left", padding:"5px 30px 10px 30px"}}><b>Item</b></td>
<td style={{textAlign:"center", padding:"5px 30px 10px 30px"}}><b>Qty</b></td>
<td style={{textAlign:"right", padding:"5px 30px 10px 30px"}}><b>Price</b></td>
</tr>

<tr>
<td style={{textAlign:"left", padding:"3px 30px"}}>Item 1</td>
<td style={{textAlign:"center", padding:"3px 30px"}}>1</td>
<td style={{textAlign:"right",padding:"3px 30px"}}>399.00</td>
</tr>

<tr>
<td style={{textAlign:"left", padding:"3px 30px"}}>Item 2</td>
<td style={{textAlign:"center", padding:"3px 30px"}}>1</td>
<td style={{textAlign:"right",padding:"3px 30px"}}>499.00</td>
</tr>

<tr>
<td style={{textAlign:"left", padding:"3px 30px"}}>Item 1</td>
<td style={{textAlign:"center", padding:"3px 30px"}}>1</td>
<td style={{textAlign:"right",padding:"3px 30px"}}>599.00</td>
</tr>

</table>
</td>


</tr>



<tr>
<td style={{textAlign:"center", padding:"10px", color:"#000000", borderBottom: "1px dashed rgba(0, 0, 0, 0.5)"}}>

<table width="100%">
<tr>
<td style={{textAlign:"left", padding:"3px 30px"}}>Subtotal</td>
<td style={{textAlign:"right",padding:"3px 30px"}}>₹ 1197</td>
</tr>
<tr>
<td style={{textAlign:"left", padding:"3px 30px"}}>Offer</td>
<td style={{textAlign:"right",padding:"3px 30px"}}>-100</td>
</tr>
<tr>
<td style={{textAlign:"left", padding:"3px 30px"}}>Extra charges</td>
<td style={{textAlign:"right",padding:"3px 30px"}}>-</td>
</tr>
<tr>
<td style={{textAlign:"left", padding:"3px 30px"}}>Packaging charges</td>
<td style={{textAlign:"right",padding:"3px 30px"}}>-</td>
</tr>
<tr>
<td style={{textAlign:"left", padding:"3px 30px"}}>GST</td>
<td style={{textAlign:"right", padding:"5px 30px"}}>8.75</td>
</tr>
<tr>
<td style={{textAlign:"left", padding:"3px 30px"}}>CGST</td>
<td style={{textAlign:"right",padding:"3px 30px"}}>8.75</td>
</tr>
</table>



</td>
</tr>



<tr>
<td style={{textAlign:"center", padding:"10px", color:"#000000", borderBottom: "1px dashed rgba(0, 0, 0, 0.5)"}}>
<table width="100%">
<tr>
<td style={{textAlign:"left", padding:"5px 30px"}}><b>        Total    </b></td>
<td style={{textalign:"right",  padding:"5px 30px"}}><b>₹ 1097.58</b></td>
</tr>
<tr>
<td style={{textAlign:"left",  padding:"5px 30px"}}><b>Grand Total</b></td>
<td style={{textAlign:"right",  padding:"5px 30px"}}><b>₹ 1098</b></td>
</tr>
</table>
</td>
</tr>



<tr>
<td style={{textAlign:"center", padding:"10px", color:"#000000"}}>
- Thank you! -
</td>
</tr>

<tr>
<td style={{textAlign:"center", padding:"10px", color:"#000000"}}>
GSTIN - 456AEW453462
</td>
</tr>



</table>

</div>

              
                                                                                               
        );
    }
}

export default BillPrintPage;
