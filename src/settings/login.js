import React from "react";
import {Link} from "react-router-dom";
import {Form} from 'reactstrap';
import firebase from '../config';
import SimpleReactValidator from "simple-react-validator";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
            employer_sevice_message: "",
            showLoading: false
        };
        this.validator = new SimpleReactValidator({
            className: "text-danger",
            validators: {
                passwordvalid: {
                    message: "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
                    "ter and 1 alphabet.",
                    rule: function (val, params, validator) {
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
                }
            }
        });

    }

<<<<<<< HEAD:src/settings/login.js

=======
>>>>>>> aa8838882f61aa55bd6cef5775d00e96dc15ab10:src/auth/Login.js
    componentWillMount(){
        document.getElementById('root').className='h-100'

    }
    componentWillUnmount(){
        document.getElementById('root').className=''

    }
    handleSubmit = (event) => {
        event.preventDefault();

        if (this.validator.allValid()) {

            const {email, password} = this.state;

            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((result) => {
                    console.log(result);

                    var user = result.user;
                    console.log(user.uid);

                    var ref = firebase
<<<<<<< HEAD:src/settings/login.js
                    .database()
                    .ref(`merchant_users/${user.uid}`);
=======
                        .database()
                        .ref(`users_Roles/${user.uid}`);
>>>>>>> aa8838882f61aa55bd6cef5775d00e96dc15ab10:src/auth/Login.js
                    ref.on('value', snapshot => {
                        var gstData = snapshot.val();
                        console.log(gstData);
                      
                            if(user.emailVerified==true){
                                if(gstData.status == "Active"){
                                    console.log(user.uid);

                            sessionStorage.setItem("RoleId", user.uid);
<<<<<<< HEAD:src/settings/login.js
                             sessionStorage.setItem("username", gstData.user_name);
                             sessionStorage.setItem("role", gstData.role);
                             sessionStorage.setItem("emai", gstData.email_id);
                         
                        
                            this
                            .props
                            .history
                            .push("/BusinessList");
                      
                    }else{
                        this.setState({employer_sevice_message: "Your Account is InActive"});
                    }
                    }else{
                        this.setState({employer_sevice_message: "your email id is not verified. please verify your email"});

                    }

                      
                      
                      
                       
                    });

                   
                 
                    

=======
                            sessionStorage.setItem("fullName", gstData.fullName);
                            sessionStorage.setItem("userRole", gstData.Role);
                            this
                                .props
                                .history
                                .push("/Orders");

                        }else{
                            this.setState({employer_sevice_message: "Invalid username/Password"});
                        }
                    });
>>>>>>> aa8838882f61aa55bd6cef5775d00e96dc15ab10:src/auth/Login.js
                })
                .catch(error => {
                    this.setState({error});
                    console.log(this.state.error);
                    this.setState({employer_sevice_message: this.state.error.message});
                });
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
        const {email, password, error} = this.state;

        return (
           
            <div className="page-wrapper login_register_box">

<<<<<<< HEAD:src/settings/login.js
            <div className="row h-100">
            <div className="col-md-5 h-100">
            
            <div className="logo_login">
            <img src="images/icon/logo.svg"/>
            </div>
            
            </div>
            <div className="col-md-7 h-100">
            
            <div className="box_login_register h-100 col-12">
            
            <div className="login_signup_box">
            <div className="login_regi_row col-12 m-b-50">
            <span className="btn active">Login</span><a href="/Register"><span className="btn">Register</span></a>
            </div>
            <Form onSubmit={this.handleSubmit} >
            <div className="form-group">
            <div className="col-12">
            <label className=" form-control-label">Username</label>
            </div>
            <div className="col-12">
            <input 
           type="email"
                                               id="username"
                                               name="email"
                                               value={email}
                                               onChange={this.onChange}
                                               placeholder=""
                                               title="Please enter you username"
            className="form-control"/>
            {this
                                                .validator
                                                .message("Email", this.state.email, "required|email|min:6|max:70")}
            </div>
            </div>
            <div className="form-group">
            <div className="col-12">
            <label className=" form-control-label">Password</label>
            </div>
            <div className="col-12">
            <input 
         type="Password"
                                             name="password"
                                             value={password}
                                             onChange={this.onChange}
                                             title="Please enter your password"
                                             placeholder=""
                                             id="password_input"
            className="form-control"/>
             {this
                                                .validator
                                                .message("Password", this.state.password, "required|passwordvalid|min:6|max:30")}
                                       
            </div>
            </div>
            <div className="form-group col-12 m-t-30">
            <button className="btn login_btn_menu">Login</button>
            <div className="btn ">Login As <a href="/EmployeeLogin"> Employee</a></div>
=======
                <div className="row h-100">
                    <div className="col-md-5 h-100">

                        <div className="logo_login">
                            <img src="images/icon/logo.svg"/>
                        </div>

                    </div>
                    <div className="col-md-7 h-100">

                        <div className="box_login_register h-100 col-12">
>>>>>>> aa8838882f61aa55bd6cef5775d00e96dc15ab10:src/auth/Login.js

                            <div className="login_signup_box">
                                <div className="login_regi_row col-12 m-b-50">
                                    <span className="btn active">Login</span><Link to="/Register1"><span className="btn">Register</span></Link>
                                </div>
                                <Form onSubmit={this.handleSubmit} >
                                    <div className="form-group">
                                        <div className="col-12">
                                            <label className=" form-control-label">Username</label>
                                        </div>
                                        <div className="col-12">
                                            <input
                                                type="username"
                                                id="username"
                                                name="email"
                                                value={email}
                                                onChange={this.onChange}
                                                placeholder=""
                                                title="Please enter you username"
                                                className="form-control"/>
                                            {this
                                                    .validator
                                                    .message("Email", this.state.email, "required|email|min:6|max:70")}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-12">
                                            <label className=" form-control-label">Password</label>
                                        </div>
                                        <div className="col-12">
                                            <input
                                                type="Password"
                                                name="password"
                                                value={password}
                                                onChange={this.onChange}
                                                title="Please enter your password"
                                                placeholder=""
                                                id="password_input"
                                                className="form-control"/>
                                            {this
                                                    .validator
                                                    .message("Password", this.state.password, "required|passwordvalid|min:6|max:30")}

                                        </div>
                                    </div>
                                    <div className="form-group col-12 m-t-30">
                                        <button className="btn login_btn_menu">Login</button>
                                        {/* <div className="btn login_btn_menu">Login</div> */}

                                        {this.state.employer_sevice_message
                                            ? (
                                                <div className="alert alert-warning" role="alert">
                                                    {this.state.employer_sevice_message}
                                                </div>
                                            )
                                            : ("")}{" "}
                                    </div>
                                </Form>
                            </div>



                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default Login;
