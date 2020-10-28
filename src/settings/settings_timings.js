import React from "react";
import firebase from '../config';
import Sidebar from '../component/sidebar';
import Header from '../component/header';
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { Alert } from 'reactstrap';
class SettingsTimings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          

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
       
       
   
    this.timings();
           
}
timings() {
 this.setState({ loading: false });
 var user=null;
 var sessionId = sessionStorage.getItem("RoleId");
if(sessionId){



 firebase
     .database().ref('settings_Timings/' + sessionId).on('value', snapshot => {
         
  var timings = snapshot.val();
  if(snapshot.numChildren()>0){
console.log(timings);
 this.setState({
    Force:timings.Force,
     
     Monday:timings.Monday,
     Monday_Open_From:timings.Monday_Open_From,
     Monday_Open_To:timings.Monday_Open_To,
     Monday_Break:timings.Monday_Break,
     Monday_Break_From:timings.Monday_Break_From,
     Monday_Break_To:timings.Monday_Break_To,
     

     Tuesday:timings.Tuesday,
     Tuesday_Open_From:timings.Tuesday_Open_From,
     Tuesday_Open_To:timings.Tuesday_Open_To,
     Tuesday_Break:timings.Tuesday_Break,
     Tuesday_Break_From:timings.Tuesday_Break_From,
     Tuesday_Break_To:timings.Tuesday_Break_To,

     Wednesday:timings.Wednesday,
     Wednesday_Open_From:timings.Wednesday_Open_From,
     Wednesday_Open_To:timings.Wednesday_Open_To,
     Wednesday_Break:timings.Wednesday_Break,
     Wednesday_Break_From:timings.Wednesday_Break_From,
     Wednesday_Break_To:timings.Wednesday_Break_To,

     Thrusday:timings.Thrusday,
     Thrusday_Open_From:timings.Thrusday_Open_From,
     Thrusday_Open_To:timings.Thrusday_Open_To,
     Thrusday_Break:timings.Thrusday_Break,
     Thrusday_Break_From:timings.Thrusday_Break_From,
     Thrusday_Break_To:timings.Thrusday_Break_To,

     Friday:timings.Friday,
     Friday_Open_From:timings.Friday_Open_From,
     Friday_Open_To:timings.Friday_Open_To,
     Friday_Break:timings.Friday_Break,
     Friday_Break_From:timings.Friday_Break_From,
     Friday_Break_To:timings.Friday_Break_To,

     Saturday:timings.Saturday,
     Saturday_Open_From:timings.Saturday_Open_From,
     Saturday_Open_To:timings.Saturday_Open_To,
     Saturday_Break:timings.Saturday_Break,
     Saturday_Break_From:timings.Saturday_Break_From,
     Saturday_Break_To:timings.Saturday_Break_To,

     Sunday:timings.Sunday,
     Sunday_Open_From:timings.Sunday_Open_From,
     Sunday_Open_To:timings.Sunday_Open_To,
     Sunday_Break:timings.Sunday_Break,
     Sunday_Break_From:timings.Sunday_Break_From,
     Sunday_Break_To:timings.Sunday_Break_To,
   });
  
 }
 else{

 }
 });
}
}

handleSubmit = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      
        var sessionId = sessionStorage.getItem("RoleId");
        var username = sessionStorage.getItem("username");
        var ref = firebase
        .database()
        .ref(`settings_Timings/${sessionId}`);
       
        ref.update({
            Force:this.state.Force,
       
        
            Monday:this.state.Monday,
            Monday_Open_From:this.state.Monday_Open_From,
            Monday_Open_To:this.state.Monday_Open_To,
            Monday_Break:this.state.Monday_Break,
            Monday_Break_From:this.state.Monday_Break_From,
            Monday_Break_To:this.state.Monday_Break_To,

            Tuesday:this.state.Tuesday,
    Tuesday_Open_From:this.state.Tuesday_Open_From,
    Tuesday_Open_To:this.state.Tuesday_Open_To,
    Tuesday_Break:this.state.Tuesday_Break,
    Tuesday_Break_From:this.state.Tuesday_Break_From,
    Tuesday_Break_To:this.state.Tuesday_Break_To,

    Wednesday:this.state.Wednesday,
    Wednesday_Open_From:this.state.Wednesday_Open_From,
    Wednesday_Open_To:this.state.Wednesday_Open_To,
    Wednesday_Break:this.state.Wednesday_Break,
    Wednesday_Break_From:this.state.Wednesday_Break_From,
    Wednesday_Break_To:this.state.Wednesday_Break_To,

    Thrusday:this.state.Thrusday,
    Thrusday_Open_From:this.state.Thrusday_Open_From,
    Thrusday_Open_To:this.state.Thrusday_Open_To,
    Thrusday_Break:this.state.Thrusday_Break,
    Thrusday_Break_From:this.state.Thrusday_Break_From,
    Thrusday_Break_To:this.state.Thrusday_Break_To,
    

    Friday:this.state.Friday,
    Friday_Open_From:this.state.Friday_Open_From,
    Friday_Open_To:this.state.Friday_Open_To,
    Friday_Break:this.state.Friday_Break,
    Friday_Break_From:this.state.Friday_Break_From,
    Friday_Break_To:this.state.Friday_Break_To,


    Saturday:this.state.Saturday,
    Saturday_Open_From:this.state.Saturday_Open_From,
    Saturday_Open_To:this.state.Saturday_Open_To,
    Saturday_Break:this.state.Saturday_Break,
    Saturday_Break_From:this.state.Saturday_Break_From,
    Saturday_Break_To:this.state.Saturday_Break_To,
    

    Sunday:this.state.Sunday,
    Sunday_Open_From:this.state.Sunday_Open_From,
    Sunday_Open_To:this.state.Sunday_Open_To,
    Sunday_Break:this.state.Sunday_Break,
    Sunday_Break_From:this.state.Sunday_Break_From,
    Sunday_Break_To:this.state.Sunday_Break_To,
    
           
            sessionId:sessionId,
            username:username,

           
       
    
         });
         this.setState({employer_sevice_message:  <Alert color="success">
  Information has been updated ...!
  </Alert>});
window.location.href="/Settings";

        // this
        //     .props
        //     .history
        //     .push("/AllCustomers");
    } else {
        this
            .validator
            .showMessages();
        this.forceUpdate();
    }

};



  onChange = (event) => {

    this.setState({
        [event.target.name]: event.target.value
    });
};
    render() {
             
        return (
     
<>
<Form onSubmit={this.handleSubmit}>
<div className="row business_reg_box">

<div className="col-md-6">

<div className="w-100-row open_store"><span></span>Open</div>

<div className="w-100-row running_time">
<span><span className="dot_green"></span></span>Running Based On Time
</div>



</div>

<div className="col-md-6">


<div className="force_close_open">
<div className="force"><span className="close_shop"> 
                                                                    <input
                                                                        type="radio"
                                                                        name="Force"
                                                                        value="Force Closed"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.Force === 'Force Closed'}/>
                                                              </span> 
                                                              Force Closed
                                                              </div>
<div className="force"><span className="open_shop">
                                                                      <input
                                                                        type="radio"
                                                                        name="Force"
                                                                        value="Force Open"
                                                                        onChange={this.onChange}
                                                                        checked={this.state.Force === 'Force Open'}/>
    </span>Force Open </div>
</div>


</div>


</div>

<hr></hr>
<div className="row business_reg_box">

<div className="col-md-12"><h3>Timing</h3></div>

<div className="col-md-12">

<div className="row form-group mb-0">


<div className="col-md-12">

<div className="timimg_row">
<span className="pull-left"></span>
<span className="pull-left">

</span>
<span className="pull-left">
From
</span>
<span className="pull-left">
To
</span>
<span className="pull-left">
Break
</span>
<span className="pull-left">
Between
</span>
<span className="pull-left">
To
</span>
</div>

<div className="timimg_row">
<span className="pull-left">Monday</span>
<span className="pull-left">
<select name="Monday"
onChange={this.onChange}
value={this.state.Monday}
id="select" className="form-control open_cafe">
    <option value={this.state.Monday}>{this.state.Monday}</option>
<option value="Open">Open</option>
<option value="Close">Close</option>
</select>
</span>
{this.state.Monday=="Open"?
<>
<span className="pull-left">
<input name="Monday_Open_From"
 onChange={this.onChange}
 value={this.state.Monday_Open_From}
type="time" 
/>
</span>
<span className="pull-left">
<input 
 name="Monday_Open_To"
 onChange={this.onChange}
 value={this.state.Monday_Open_To}
type="time"  />
</span>
<span className="pull-left">
<select name="Monday_Break"
onChange={this.onChange}
value={this.state.Monday_Break}
id="select" className="form-control open_cafe">
    <option value={this.state.Monday_Break}>{this.state.Monday_Break}</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select>
</span>
{this.state.Monday_Break=="Yes"?
<>
<span className="pull-left">
<input 
 name="Monday_Break_From"
 onChange={this.onChange}
 value={this.state.Monday_Break_From}
type="time"  />
</span>
<span className="pull-left">
<input 
 name="Monday_Break_To"
 onChange={this.onChange}
 value={this.state.Monday_Break_To}
type="time"  />
</span>
</>
:
''
        }
</>
:
''
}
</div>
<div className="timimg_row">
<span className="pull-left">Tuesday</span>
<span className="pull-left">
<select name="Tuesday"
onChange={this.onChange}
value={this.state.Tuesday}
id="select" className="form-control open_cafe">
    <option value={this.state.Tuesday}>{this.state.Tuesday}</option>
<option value="Open">Open</option>
<option value="Close">Close</option>
</select>
</span>
{this.state.Tuesday=="Open"?
<>
<span className="pull-left">
<input name="Tuesday_Open_From"
 onChange={this.onChange}
 value={this.state.Tuesday_Open_From}
type="time" 
/>
</span>
<span className="pull-left">
<input 
 name="Tuesday_Open_To"
 onChange={this.onChange}
 value={this.state.Tuesday_Open_To}
type="time"  />
</span>
<span className="pull-left">
<select name="Tuesday_Break"
onChange={this.onChange}
value={this.state.Tuesday_Break}
id="select" className="form-control open_cafe">
    <option value={this.state.Tuesday_Break}>{this.state.Tuesday_Break}</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select>
</span>
{this.state.Tuesday_Break=="Yes"?
<>
<span className="pull-left">
<input 
 name="Tuesday_Break_From"
 onChange={this.onChange}
 value={this.state.Tuesday_Break_From}
type="time"  />
</span>
<span className="pull-left">
<input 
 name="Tuesday_Break_To"
 onChange={this.onChange}
 value={this.state.Tuesday_Break_To}
type="time"  />
</span>
</>
:
''
        }
</>
:
''
}
</div>  

<div className="timimg_row">
<span className="pull-left">Wednesday</span>
<span className="pull-left">
<select name="Wednesday"
onChange={this.onChange}
value={this.state.Wednesday}
id="select" className="form-control open_cafe">
    <option value={this.state.Wednesday}>{this.state.Wednesday}</option>
<option value="Open">Open</option>
<option value="Close">Close</option>
</select>
</span>
{this.state.Wednesday=="Open"?
<>
<span className="pull-left">
<input name="Wednesday_Open_From"
 onChange={this.onChange}
 value={this.state.Wednesday_Open_From}
type="time" 
/>
</span>
<span className="pull-left">
<input 
 name="Wednesday_Open_To"
 onChange={this.onChange}
 value={this.state.Wednesday_Open_To}
type="time"  />
</span>
<span className="pull-left">
<select name="Wednesday_Break"
onChange={this.onChange}
value={this.state.Wednesday_Break}
id="select" className="form-control open_cafe">
    <option value={this.state.Wednesday_Break}>{this.state.Wednesday_Break}</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select>
</span>
{this.state.Wednesday_Break=="Yes"?
<>
<span className="pull-left">
<input 
 name="Wednesday_Break_From"
 onChange={this.onChange}
 value={this.state.Wednesday_Break_From}
type="time"  />
</span>
<span className="pull-left">
<input 
 name="Wednesday_Break_To"
 onChange={this.onChange}
 value={this.state.Wednesday_Break_To}
type="time"  />
</span>
</>
:
''
        }
</>
:
''
}
</div>  

<div className="timimg_row">
<span className="pull-left">Thrusday</span>
<span className="pull-left">
<select name="Thrusday"
onChange={this.onChange}
value={this.state.Thrusday}
id="select" className="form-control open_cafe">
    <option value={this.state.Thrusday}>{this.state.Thrusday}</option>
<option value="Open">Open</option>
<option value="Close">Close</option>
</select>
</span>
{this.state.Thrusday=="Open"?
<>
<span className="pull-left">
<input name="Thrusday_Open_From"
 onChange={this.onChange}
 value={this.state.Thrusday_Open_From}
type="time" 
/>
</span>
<span className="pull-left">
<input 
 name="Thrusday_Open_To"
 onChange={this.onChange}
 value={this.state.Thrusday_Open_To}
type="time"  />
</span>
<span className="pull-left">
<select name="Thrusday_Break"
onChange={this.onChange}
value={this.state.Thrusday_Break}
id="select" className="form-control open_cafe">
    <option value={this.state.Thrusday_Break}>{this.state.Thrusday_Break}</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select>
</span>
{this.state.Thrusday_Break=="Yes"?
<>
<span className="pull-left">
<input 
 name="Thrusday_Break_From"
 onChange={this.onChange}
 value={this.state.Thrusday_Break_From}
type="time"  />
</span>
<span className="pull-left">
<input 
 name="Thrusday_Break_To"
 onChange={this.onChange}
 value={this.state.Thrusday_Break_To}
type="time"  />
</span>
</>
:
''
        }
</>
:
''
}
</div> 



<div className="timimg_row">
<span className="pull-left">Friday</span>
<span className="pull-left">
<select name="Friday"
onChange={this.onChange}
value={this.state.Friday}
id="select" className="form-control open_cafe">
    <option value={this.state.Friday}>{this.state.Friday}</option>
<option value="Open">Open</option>
<option value="Close">Close</option>
</select>
</span>
{this.state.Friday=="Open"?
<>
<span className="pull-left">
<input name="Friday_Open_From"
 onChange={this.onChange}
 value={this.state.Friday_Open_From}
type="time" 
/>
</span>
<span className="pull-left">
<input 
 name="Friday_Open_To"
 onChange={this.onChange}
 value={this.state.Friday_Open_To}
type="time"  />
</span>
<span className="pull-left">
<select name="Friday_Break"
onChange={this.onChange}
value={this.state.Friday_Break}
id="select" className="form-control open_cafe">
    <option value={this.state.Friday_Break}>{this.state.Friday_Break}</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select>
</span>
{this.state.Friday_Break=="Yes"?
<>
<span className="pull-left">
<input 
 name="Friday_Break_From"
 onChange={this.onChange}
 value={this.state.Friday_Break_From}
type="time"  />
</span>
<span className="pull-left">
<input 
 name="Friday_Break_To"
 onChange={this.onChange}
 value={this.state.Friday_Break_To}
type="time"  />
</span>
</>
:
''
        }
</>
:
''
}
</div> 


<div className="timimg_row">
<span className="pull-left">Saturday</span>
<span className="pull-left">
<select name="Saturday"
onChange={this.onChange}
value={this.state.Saturday}
id="select" className="form-control open_cafe">
    <option value={this.state.Saturday}>{this.state.Saturday}</option>
<option value="Open">Open</option>
<option value="Close">Close</option>
</select>
</span>
{this.state.Saturday=="Open"?
<>
<span className="pull-left">
<input name="Saturday_Open_From"
 onChange={this.onChange}
 value={this.state.Saturday_Open_From}
type="time" 
/>
</span>
<span className="pull-left">
<input 
 name="Saturday_Open_To"
 onChange={this.onChange}
 value={this.state.Saturday_Open_To}
type="time"  />
</span>
<span className="pull-left">
<select name="Saturday_Break"
onChange={this.onChange}
value={this.state.Saturday_Break}
id="select" className="form-control open_cafe">
    <option value={this.state.Saturday_Break}>{this.state.Saturday_Break}</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select>
</span>
{this.state.Saturday_Break=="Yes"?
<>
<span className="pull-left">
<input 
 name="Saturday_Break_From"
 onChange={this.onChange}
 value={this.state.Saturday_Break_From}
type="time"  />
</span>
<span className="pull-left">
<input 
 name="Saturday_Break_To"
 onChange={this.onChange}
 value={this.state.Saturday_Break_To}
type="time"  />
</span>
</>
:
''
        }
</>
:
''
}
</div> 


<div className="timimg_row">
<span className="pull-left">Sunday</span>
<span className="pull-left">
<select name="Sunday"
onChange={this.onChange}
value={this.state.Sunday}
id="select" className="form-control open_cafe">
    <option value={this.state.Sunday}>{this.state.Sunday}</option>
<option value="Open">Open</option>
<option value="Close">Close</option>
</select>
</span>
{this.state.Sunday=="Open"?
<>
<span className="pull-left">
<input name="Sunday_Open_From"
 onChange={this.onChange}
 value={this.state.Sunday_Open_From}
type="time" 
/>
</span>
<span className="pull-left">
<input 
 name="Sunday_Open_To"
 onChange={this.onChange}
 value={this.state.Sunday_Open_To}
type="time"  />
</span>
<span className="pull-left">
<select name="Sunday_Break"
onChange={this.onChange}
value={this.state.Sunday_Break}
id="select" className="form-control open_cafe">
    <option value={this.state.Sunday_Break}>{this.state.Sunday_Break}</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
</select>
</span>
{this.state.Sunday_Break=="Yes"?
<>
<span className="pull-left">
<input 
 name="Sunday_Break_From"
 onChange={this.onChange}
 value={this.state.Sunday_Break_From}
type="time"  />
</span>
<span className="pull-left">
<input 
 name="Sunday_Break_To"
 onChange={this.onChange}
 value={this.state.Sunday_Break_To}
type="time"  />
</span>
</>
:
''
        }
</>
:
''
}
</div> 

{/* <div className="timimg_row">
<span className="pull-left">Tuesday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control open_cafe">
<option value="0">Open</option>
<option value="0">Close</option>
</select>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
</div>



<div className="timimg_row">
<span className="pull-left">Wednesday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control open_cafe">
<option value="0">Open</option>
<option value="0">Close</option>
</select>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
</div>



<div className="timimg_row">
<span className="pull-left">Thursday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control open_cafe">
<option value="0">Open</option>
<option value="0">Close</option>
</select>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
</div>



<div className="timimg_row">
<span className="pull-left">Friday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control open_cafe">
<option value="0">Open</option>
<option value="0">Close</option>
</select>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
</div>



<div className="timimg_row">
<span className="pull-left">Saturday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control open_cafe">
<option value="0">Open</option>
<option value="0">Close</option>
</select>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
</div>



<div className="timimg_row">
<span className="pull-left">Sunday</span>
<span className="pull-left">
<select name="select" id="select" className="form-control close_cafe">
<option value="0">Close</option>
<option value="0">Open</option>
</select>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
<span className="pull-left">
<input type="text" name="text-input" className="form-control"/>
</span>
</div> */}




</div>



</div>

</div>



<div className="col-md-12 text-right m-t-10"><span><button type="submit" className="save_small_button">Save</button></span></div>

</div>
</Form>

</>

              
                                                                                               
        );
    }
}

export default SettingsTimings;
