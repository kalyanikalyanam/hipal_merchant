import React from "react";
import firebase from '../config';
import Sidebar from '../component/sidebar';
import Header from '../component/header';
import {Link} from "react-router-dom";
class Settele extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

         
        };
    }
  

    render() {
        return (
            <>
            <div class="col-md-12">
            <div class="card">
            <div class="card-body">
            
            
            
            
            
            
            
            
            <button type="button" class="btn btn-secondary mb-1" data-toggle="modal" data-target="#settlement">
            Settlement
            </button>
            
            
            
            
            
            </div>
            </div>
            
            
            
            
            
            
            </div>
                                    
                                        
                
                        
            
            
            
            <div class="modal fade" id="settlement" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm hipal_pop" role="document">
            <div class="modal-content">
            
            
            <div class="modal-header">
            <h5 class="modal-title color_black" id="smallmodalLabel">Settle
            </h5>
            <div class="pull-right w-300 set_person text-right settle_pop">
            Order ID <span>2139AAS213</span>
            </div>
            </div>
            
            
            <div class="modal-body">
            
            
            
            
            
            <div class="col-12 w-100-row">
            <p class="text-right"><span class="btn print_btn">Print</span></p>
            <p class="text-center"><img src="/images/settle_img.png"/></p>
            <p class="text-center small_things">Small things makle big changes!</p>
            </div>
            
            <div class="col-12 w-100-row text-center">
            
            <div class="bill_send_box">
            Bill Sent to: <span>Rishabh, Sandeep</span> <span class="share">
            <i class="fa fa-share-alt" aria-hidden="true"></i>
            </span>
            </div>
            
            <p class="text-center font-15 m-t-10 cust_font">Customer <span>doesn't want</span> a printed bill</p>
            
            </div>
            
            <div class="col-12 w-100-row text-center">
            
            <p class="text-center font-15 m-t-10 cust_font">Rate them</p>
            
            
            
            
            <p class="text-center m-t-10 star_font">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star-half-o" aria-hidden="true"></i>
            <i class="fa fa-star-o" aria-hidden="true"></i>
            
            </p>
            
            </div>
            
            
            
            
            </div>
            
            
            
            <div class="modal-footer">
            <button type="button" class="btn save_btn proceed_btn_pop">Proceed</button>
            </div>
            
            
            </div>
            </div>
            </div>
            </>
            
        );
    }
}

export default Settele;
