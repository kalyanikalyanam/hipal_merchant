// import React from "react";
// import firebase from '../config';
// import Sidebar from './sidebar';
// import Header from './header';
// import {Form} from 'reactstrap';
// import SimpleReactValidator from "simple-react-validator";
// class AddStation extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
          
//  printer_details:[
// {
//     printer_name:'',
// }
//     ],

//     employer_sevice_message: "",
//     validError:false,
//     mobile_message: '',
         
// };
// this.onChange = this
// .onChange
// .bind(this);
// this.validator = new SimpleReactValidator({
// className: "text-danger",
// validators: {
//     passwordvalid: {
//         message: "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
//                 "ter and 1 alphabet.",
//         rule: function (val, params, validator) {
//             // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
//             // params.indexOf(val) === -1
//             return (validator.helpers.testRegex(val, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i) && params.indexOf(val) === -1);
//         }
//     },
//     passwordMismatch: {
//         message: "confirm password must match with password field.",
//         rule: function (val, params, validator) {
//             return document
//                 .getElementById("password_input")
//                 .value === val
//                 ? true
//                 : false;
//         }
//     },
//     whitespace: {
//         message: "The :attribute not allowed first whitespace   characters.",
//         rule: function (val, params, validator) {
//             // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
//             // params.indexOf(val) === -1
//             return (validator.helpers.testRegex(val, /[^\s\\]/) && params.indexOf(val) === -1);
//         }
//     },
//     specialChar: {
//         message: "The :attribute not allowed special   characters.",
//         rule: function (val, params, validator) {
//             // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
//             // params.indexOf(val) === -1
//             return (validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) && params.indexOf(val) === -1);
//         }
//     },
//     specialCharText: {
//         message: "The :attribute may only contain letters, dot and spaces.",
//         rule: function (val, params, validator) {
//             // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
//             // params.indexOf(val) === -1
//             return (validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) && params.indexOf(val) === -1);
//         }
//     },

//     zip: {
//         message: "Invalid Pin Code",
//         rule: function (val, params, validator) {
//             // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
//             // params.indexOf(val) === -1
//             return (validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) && params.indexOf(val) === -1);
//         }
//     },
//     website: {
//         message: "The Url should be example.com ",
//         rule: function (val, params, validator) {
//             // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
//             // params.indexOf(val) === -1
//             return (validator.helpers.testRegex(val, /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) && params.indexOf(val) === -1);
//         }
//     },
//     Fax: {
//         message: "Invalid fax number ",
//         rule: function (val, params, validator) {
//             return (validator.helpers.testRegex(val, /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i) && params.indexOf(val) === -1);
//         }
//     }
// }
// });
// }

// onChange = (event) => {

//     this.setState({
//         [event.target.name]: event.target.value
//     });
// };
    
//  handleprinterRemoveShareholder = idx => () => {
//         this.setState({
//             printer_details: this
//                 .state
//                 .printer_details
//                 .filter((s, sidx) => idx !== sidx)
//         });
//     };

//     handleprinterShareholderNameChange = (idx) => evt => {
//         const printer_details = this
//             .state
//             .printer_details
//             .map((printer_details, sidx) => {
//                 if (idx !== sidx) 
//                     return printer_details;
//                 return {
//                     ...printer_details,
//                     [evt.target.name]: evt.target.value
//                 };
//             });

//         this.setState({printer_details: printer_details});
//     };

   
//     handleprinterAddShareholder = () => {
//         this.setState({
//             printer_details: this
//                 .state
//                 .printer_details
//                 .concat([
//                     {
//                         printer_name: ""
//                     }
//                 ])
//         });
//     };
//     handleSubmit = (event) => {
//         event.preventDefault();
//         if (this.validator.allValid()) {
          
//             var sessionId = sessionStorage.getItem("RoleId");
//             var username = sessionStorage.getItem("username");
//             var businessId = sessionStorage.getItem("businessId");
//             let dbCon = firebase
//                 .database()
//                 .ref('/station');
               
              
//             dbCon.push({
              


//                 sessionId: sessionId,
               
//                 username:username,



//                 station_name:this.state.station_name,
//                 // printer_name:this.state.printer_name,
//                 printer_details:this.state.printer_details,

//                 businessId:businessId,

               

//             });
//             // window.location.href="/AddItemMenu";
//             this.props.onClose();
          
//         } else {
//             this
//                 .validator
//                 .showMessages();
//             this.forceUpdate();
//         }

//     };
//     stationNameChange  = (e) => {
//         this.setState({
//             station_name: e.target.value
//         });
//         if(this.state.validError!=true){
           
            
//             var ref = firebase
//             .database()
//             .ref('station/').orderByChild("station_name").equalTo(e.target.value);
//             ref.on('value', snapshot => {
//                 var  user_exist = snapshot.numChildren();
//                 console.log(user_exist);
           
//             if(user_exist>0 && this.state.validError!=true){
               
               
//                 this.setState({mobile_message: "Station Name already exist",validError:false});

//             }
          
//             else
//             {
//                 this.setState({mobile_message: "",validError:true});
               
//             }
           
//         })
//     }
       
//     };

//     render() {
//         return (
     
// <>
// {/* <div className="modal fade" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true"> */}
// <div className="modal-dialog modal-sm hipal_pop" role="document">
// <div className="modal-content">


// <div className="modal-header">
// <h5 className="modal-title" id="smallmodalLabel">Add Station
// </h5></div>
// <Form onSubmit={this.handleSubmit}>

// <div className="modal-body product_edit">


// <div className="col-12 w-100-row">
// <div className="row form-group">
// <div className="col col-md-4">
// <label className=" form-control-label">Station name</label>
// </div>
// <div className="col-12 col-md-6">
// <input type="text" id="text-input" 
// name="station_name" onChange={this.stationNameChange} value={this.state.station_name}
// placeholder="BAR" className="form-control edit_product"/>
// </div>
// {this.validator.message("Station Name", this.state.station_name, "required")}
// <div className="text-danger">
//                                                         {" "}
//                                                         {this.state.mobile_message}
//                                                         </div>
// </div>
// </div>




// <div className="col-12 w-100-row">
// {this
//                                                                 .state
//                                                                 .printer_details
//                                                                 // .slice(0, this.state.desired_Machines)
//                                                                 .map((printer_details, idx) => (
                                                                 

// <div className="row form-group" key={idx}>
// <div className="col col-md-4">
// <label className=" form-control-label">Select Printer {idx+1} :</label>
// </div>
// <div className="col-12 col-md-6">

// <select 
//   name="printer_name"
//   value={printer_details.printer_name}
//   onChange={this.handleprinterShareholderNameChange(idx)}
// id="select" className="form-control edit_product">
// <option value="0">Select Printer :</option>
// <option value="1st Floor">1st Floor</option>
// <option value="2st Floor">2nd Floor</option>
// <option value="3st Floor">3rd Floor</option>
// </select>


// </div>




// {idx != 0
//     ?
// <button
// type="button" onClick={this.handleprinterRemoveShareholder(idx)}
// className="btn btn-danger m-r-10">Remove
// </button>
//     : ''}


// <button
// type="button" onClick={this.handleprinterAddShareholder}
// className="btn create_add_more_btn m-r-10">Add More 
// </button>

// </div>
// ))}

// </div>





// {/* <div className="col-12 w-100-row">                                            

// <div className="row form-group">
// <div className="col col-md-4">
// <label className=" form-control-label">Select Printer  :</label>
// </div>
// <div className="col-12 col-md-6">

// <select 
//   name="printer_name"
//   value={this.state.printer_name}
//   onChange={this.onChange}
// id="select" className="form-control edit_product">
// <option value="0">Select Printer :</option>
// <option value="0">1st Floor</option>
// <option value="0">2nd Floor</option>
// <option value="0">3rd Floor</option>
// </select>


// </div>

// </div>


// </div> */}








// </div>



// <div className="modal-footer">
// <button type="submit" className="btn save_btn">Save</button>
// </div>

// </Form>
// </div>
// </div>
// {/* </div> */}



// </>

              
                                                                                               
//         );
//     }
// }

// export default AddStation;


import React from "react";
import firebase from '../config';
import Sidebar from '../component/sidebar';
import Header from '../component/header';
import {Form} from 'reactstrap';
import SimpleReactValidator from "simple-react-validator";
import {Link} from "react-router-dom";
class SettingsAddStation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
 printer_details:[
{
    printer_name:'',
}
    ],

    employer_sevice_message: "",
    validError:false,
    mobile_message: '',
         
};
this.onChange = this
.onChange
.bind(this);
this.validator = new SimpleReactValidator({
className: "text-danger",
validators: {
    passwordvalid: {
        message: "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
                "ter and 1 alphabet.",
        rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (validator.helpers.testRegex(val, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i) && params.indexOf(val) === -1);
        }
    },
    passwordMismatch: {
        message: "confirm password must match with password field.",
        rule: function (val, params, validator) {
            return document
                .getElementById("password_input")
                .value === val
                ? true
                : false;
        }
    },
    whitespace: {
        message: "The :attribute not allowed first whitespace   characters.",
        rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (validator.helpers.testRegex(val, /[^\s\\]/) && params.indexOf(val) === -1);
        }
    },
    specialChar: {
        message: "The :attribute not allowed special   characters.",
        rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) && params.indexOf(val) === -1);
        }
    },
    specialCharText: {
        message: "The :attribute may only contain letters, dot and spaces.",
        rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) && params.indexOf(val) === -1);
        }
    },

    zip: {
        message: "Invalid Pin Code",
        rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) && params.indexOf(val) === -1);
        }
    },
    website: {
        message: "The Url should be example.com ",
        rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (validator.helpers.testRegex(val, /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) && params.indexOf(val) === -1);
        }
    },
    Fax: {
        message: "Invalid fax number ",
        rule: function (val, params, validator) {
            return (validator.helpers.testRegex(val, /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i) && params.indexOf(val) === -1);
        }
    }
}
});
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
       
       
 
    this.printeridList();
      
    
  }

  printeridList() {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({loading: true});
    var ref = firebase
        .database()
        .ref("PrinterId/").orderByChild("sessionId").equalTo(sessionId);

    ref.on('value', snapshot => {
        const data = [];
        snapshot.forEach(childSnapShot => {

            const GSTData = {
                printerid: childSnapShot
                    .key
                    .toString(),
                    printer_id: childSnapShot
                    .val()
                    .printer_id,
                    sessionId: childSnapShot
                    .val()
                    .sessionId,
                    businessId: childSnapShot
                    .val()
                    .businessId,
                   
                    
                  
                 


            };

            data.push(GSTData);
        });

        let sortedKeys = data.filter((res) => {
            return res.businessId === businessId;
          });
        this.setState({printeridList: sortedKeys, countPage: data.length, loading: false});
        console.log(this.state.printeridList);

    });
}

onChange = (event) => {

    this.setState({
        [event.target.name]: event.target.value
    });
};
    
 handleprinterRemoveShareholder = idx => () => {
        this.setState({
            printer_details: this
                .state
                .printer_details
                .filter((s, sidx) => idx !== sidx)
        });
    };

    handleprinterShareholderNameChange = (idx) => evt => {
        const printer_details = this
            .state
            .printer_details
            .map((printer_details, sidx) => {
                if (idx !== sidx) 
                    return printer_details;
                return {
                    ...printer_details,
                    [evt.target.name]: evt.target.value
                };
            });

        this.setState({printer_details: printer_details});
    };

   
    handleprinterAddShareholder = () => {
        this.setState({
            printer_details: this
                .state
                .printer_details
                .concat([
                    {
                        printer_name: ""
                    }
                ])
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          
            var sessionId = sessionStorage.getItem("RoleId");
            var username = sessionStorage.getItem("username");
            var businessId = sessionStorage.getItem("businessId");
            let dbCon = firebase
                .database()
                .ref('/settings_station');
               
              
            dbCon.push({
              


                sessionId: sessionId,
               
                username:username,
                businessId:businessId,


                station_name:this.state.station_name,
                // printer_name:this.state.printer_name,
                printer_details:this.state.printer_details,



               

            });
            // window.location.href="/Settings";
            this.props.onClose();
          
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }

    };
    stationNameChange  = (e) => {
        this.setState({
            station_name: e.target.value
        });
        if(this.state.validError!=true){
           
            
            var ref = firebase
            .database()
            .ref('settings_station/').orderByChild("station_name").equalTo(e.target.value);
            ref.on('value', snapshot => {
                var  user_exist = snapshot.numChildren();
                console.log(user_exist);
           
            if(user_exist>0 && this.state.validError!=true){
               
               
                this.setState({mobile_message: "Station Name already exist",validError:false});

            }
          
            else
            {
                this.setState({mobile_message: "",validError:true});
               
            }
           
        })
    }
       
    };

    render() {
        return (
     
<>
{/* <div className="modal fade" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true"> */}
<div className="modal-dialog modal-sm hipal_pop" role="document">
<div className="modal-content">


<div className="modal-header">
<h5 className="modal-title" id="smallmodalLabel">Add Station
</h5></div>
<Form onSubmit={this.handleSubmit}>

<div className="modal-body product_edit">


<div className="col-12 w-100-row">
<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Station name</label>
</div>
<div className="col-12 col-md-6">
<input type="text" id="text-input" 
name="station_name" onChange={this.stationNameChange} value={this.state.station_name}
placeholder="BAR" className="form-control edit_product"/>
</div>
{this.validator.message("Station Name", this.state.station_name, "required")}
<div className="text-danger">
                                                        {" "}
                                                        {this.state.mobile_message}
                                                        </div>
</div>
</div>




<div className="col-12 w-100-row">
{this
                                                                .state
                                                                .printer_details
                                                                // .slice(0, this.state.desired_Machines)
                                                                .map((printer_details, idx) => (
                                                                 

<div className="row form-group" key={idx}>
<div className="col col-md-4">
<label className=" form-control-label">Select Printer {idx+1} :</label>
</div>
<div className="col-12 col-md-6">
<select
                                                      className="form-control edit_product"
                                                        name="printer_name"
                                                        // value={printer_details.printer_name}
                                                        onChange={this.handleprinterShareholderNameChange(idx)}>
                                                        <option>Select Printer ID</option>
                                                        {this.state.printeridList && this
                                                            .state
                                                            .printeridList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.printer_id}  id={data} key={index}>{data.printer_id}</option>
                                                                )

                                                            })}

                                                    </select>
{/* <select 
  name="printer_name"
  value={printer_details.printer_name}
  onChange={this.handleprinterShareholderNameChange(idx)}
id="select" className="form-control edit_product">
<option value="0">Select Printer :</option>
<option value="1st Floor">1st Floor</option>
<option value="2st Floor">2nd Floor</option>
<option value="3st Floor">3rd Floor</option>
</select> */}


</div>




{idx != 0
    ?
<button
type="button" onClick={this.handleprinterRemoveShareholder(idx)}
className="btn btn-danger m-r-10">Remove
</button>
    : ''}


<button
type="button" onClick={this.handleprinterAddShareholder}
className="btn create_add_more_btn m-r-10">Add More 
</button>

</div>
))}

</div>





{/* <div className="col-12 w-100-row">                                            

<div className="row form-group">
<div className="col col-md-4">
<label className=" form-control-label">Add Printer  :</label>
</div>
<div className="col-12 col-md-6">


<Link to="/AddPrinterId">
<div className="btn add_btn_pop_orange addmode_pad m-t-15">
Add Printer Id</div>
</Link>

</div>

</div>


</div> */}








</div>



<div className="modal-footer">
<button type="submit" className="btn save_btn">Save</button>
</div>

</Form>
</div>
</div>
{/* </div> */}



</>

              
                                                                                               
        );
    }
}

export default SettingsAddStation;
