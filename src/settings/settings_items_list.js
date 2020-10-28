import React from 'react';
import "../index.css";

import firebase from '../config';
import {Link} from "react-router-dom";

class SettingsItemsList extends React.Component{
  constructor(props){
    super(props);

    this.state={
        
         UploadCauroselList:[],
         bestrecommendation:true,
       
         };
        
         
        
      }
      componentDidMount() {
        this.setState({ loading: true });
        var sessionId = sessionStorage.getItem("RoleId");
        if(sessionId){
           
      console.log(sessionId);
        
            firebase
                .database().ref('merchant_users/' + sessionId).on('value', snapshot => {
             var Users = snapshot.val();
             console.log(Users);
             sessionStorage.setItem("username", Users.user_name);
             sessionStorage.setItem("email", Users.email_id);
           
            this.setState({
              userRole:Users.Role,loading: false
                
                
              });
             
             
            });
        }
           
           
       
        this.UploadCauroselList();
          
        
      }
      UploadCauroselList(){
   
        var sessionId = sessionStorage.getItem("RoleId");   
        this.setState({loading: true});
      var ref=firebase.database().ref('merchant_menu_items').orderByChild("sessionId")
      .equalTo(sessionId);
    ref.once("value",snapshot =>{
     const data =[];
      console.log(snapshot.val());
      snapshot.forEach(element => {
        const usersData={
          itemId: element.key.toString(),
          item_id:element.val().item_id,
          item_name:element.val().item_name,
          bestrecommendation:element.val().bestrecommendation,
          item_image:element.val().item_image,
          
        }
        data.unshift(usersData);
      });
     
      this.setState({UploadCauroselList:data, countPage: data.length,loading: false},()=>{
        console.log(this.state.UploadCauroselList,'UploadCauroselList');
      });
     
    })
    }
  
      handleChange = (Id,bestrecommendation) => {
        const value = bestrecommendation === 'UnSelect' ? 'Selected' : 'UnSelect';
        const data = this.state.UploadCauroselList;
          for (var i in data) {

          if(this.state.UploadCauroselList&&data[i].itemId == Id){
            let reff= firebase.database().ref(`/merchant_menu_items/${data[i].itemId}`);
                 
              reff.update({
                      
                      bestrecommendation:value,
                  });

          }
          // else{
          //   let reff= firebase.database().ref(`/News/${data[i].editorId}`);
          //   reff.update({
                      
          //     bestrecommendation:"select",
          // });

          // }
        }

this.componentDidMount();
  
      }
    
    
  
  


  
    
    render(){
     return(
        <div class="modal-dialog modal-sm hipal_pop" role="document">
        <div class="modal-content">
        
        
        <div class="modal-header">
        <h5 class="modal-title" id="smallmodalLabel">Select Recommended Items
        </h5></div>
        
        
        <div class="modal-body upload_carosel">
        
        
        
        
        
        <div class="col-12 w-100-row line_bdr_bottom">
        {this.state.UploadCauroselList && this.state.UploadCauroselList.map((items,index) => {
            return(
        <div class="row" key={index}>
        <div class="col col-md-5 font-18">
        <div class="upload_img upload_small p-0">
         <div class="form-group">
        <img src={items.item_image} id="img-upload"/>
        </div>
        </div>
        </div>
        <div class="col col-md-6 bill_id_settle">
        <div class="form-group">
        
        <span class="pull-left m-b-20">
        <div class="input-group">
        <span class="input-group-btn">
        <span class="btn btn_explore btn-default btn-file"><button  onClick={()=>this.handleChange(items.itemId,items.bestrecommendation)} >
        {items.bestrecommendation=='Selected' ? 'Selected' : 'UnSelect'} 
        </button>
        </span>
        </span>
       
        </div>
        </span>
        
        
     
      
        
        </div>
        </div>
        </div>
            )})}
        </div>
        
        
        
      
        
        
        
        
        
        
        
        </div>
        
        
        <div class="modal-footer">
            <Link to='/Settings'>
<button type="button" class="btn save_btn">Add Items</button>
</Link>
</div>
        
        
        
        </div>
        </div>
        );
    }
}


export default SettingsItemsList;







