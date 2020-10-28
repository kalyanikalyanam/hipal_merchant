import React from "react";
import firebase from '../config';
import Sidebar from '../component/sidebar';
import Header from '../component/header';
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
class SettingsStation extends React.Component {
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
       
       
   
    this.stationList();
      
    
  }
  stationList() {
    var sessionId = sessionStorage.getItem("RoleId");   
    this.setState({loading: true});
    var ref = firebase
    .database()
    .ref("settings_station/")
        .orderByChild("sessionId")
        .equalTo(sessionId);
    // var ref = firebase
    //     .database()
    //     .ref("settings_station/");

    ref.on('value', snapshot => {
        const data = [];
        snapshot.forEach(childSnapShot => {

            const GSTData = {
                stationId: childSnapShot
                    .key
                    .toString(),
                    station_name: childSnapShot
                    .val()
                    .station_name,
                    printer_details: childSnapShot
                    .val()
                    .printer_details,
                    printer_name: childSnapShot.val().printer_name,
                    
                  
                 


            };

            data.push(GSTData);
        });

        this.setState({stationList: data, countPage: data.length, loading: false});
        console.log(this.state.stationList);

    });
}

    render() {
             
        return (
     
<>
<div className="row business_reg_box">

<div className="col-md-12"><h3>Update stations</h3></div>

<div className="col-md-12">

<div className="row form-group mb-0">
{this
                                                    .state
                                                    .stationList&&this.state.stationList
                                                    .map((data, index) => {
                                                        return (
<div className="col-md-4"  key={index}>
<div className="billion_stations">
<span className="edit_billing">   <Link to={`/SettingsEditStation/${data.stationId}`}><button className="edit_small_button">EDIT</button></Link></span>
<p>{data.station_name}</p>
{this.state.printer_details.map((data,index) =>{
                                     
                                       
                                     return(
                                         <>
                                        <p>Number Of Printers : <span> {data.printer_name.length}</span></p>
                                         
                                        <p >Added Printer : <span key={index}>({data.printer_name})</span></p>
                                        </>
                                       
                                     )

                                 } )}

{/* </>
                                     )})} */}
</div>
</div>
                                                    )})}
{/* <div className="col-md-4">
<div className="billion_stations">
<span className="edit_billing"><button className="edit_small_button">EDIT</button></span>
<p>Billing Counter</p>
<p>Number Of Printers : <span>1</span></p>
<p>Added Printer : <span>(hP00123)</span></p>
</div>
</div> */}
<div className="col-md-4">
<Link to="/SettingsAddStation">
<div className="add_station">
    
<img src="images/icon/plus_add.png"/><br></br>
Add station</div>
</Link>

</div>

</div>

</div>





</div>


</>

              
                                                                                               
        );
    }
}

export default SettingsStation;
