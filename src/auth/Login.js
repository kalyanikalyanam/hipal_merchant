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
                        .database()
                        .ref(`users_Roles/${user.uid}`);
                    ref.on('value', snapshot => {
                        var gstData = snapshot.val();
                        console.log(gstData);
                        if(gstData.status == "Active"){
                            console.log(user.uid);

                            sessionStorage.setItem("RoleId", user.uid);
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
            // <div>
            //     <div className="color-line"></div>

            //     <div className="container-fluid">
            //         <Form onSubmit={this.handleSubmit} id="login-form">
            //             <div className="row">
            //                 <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
            //                 <div className="col-md-4 col-md-4 col-sm-4 col-xs-12">
            //                     <div className="text-center m-b-md custom-login m-t-80 m-b-20">
            //                         <h1>
            //                             <b>Hipal - Login</b>
            //                         </h1>
            //                     </div>
            //                     <div className="hpanel">
            //                         <div className="panel-body">

            //                             <div className="form-group">
            //                                 <label className="control-label">Email</label>
            //                                 <input
            //                                     type="email"
            //                                     id="username"
            //                                     name="email"
            //                                     value={email}
            //                                     onChange={this.onChange}
            //                                     placeholder=""
            //                                     title="Please enter you username"
            //                                     required
            //                                     className="form-control"/> {this
            //                                     .validator
            //                                     .message("Email", this.state.email, "required|email|min:6|max:70")}
            //                             </div>
            //                             <div className="form-group">
            //                                 <label className="control-label">Password</label>
            //                                 <input
            //                                     type="Password"
            //                                     name="password"
            //                                     value={password}
            //                                     onChange={this.onChange}
            //                                     title="Please enter your password"
            //                                     placeholder=""
            //                                     className="form-control"
            //                                     id="password_input"/> {this
            //                                     .validator
            //                                     .message("Password", this.state.password, "required|passwordvalid|min:6|max:30")}
            //                             </div>

            //                             <button className="btn btn-success btn-block loginbtn">Login</button>

            //                             {this.state.employer_sevice_message
            //                                 ? (
            //                                     <div className="alert alert-warning" role="alert">
            //                                         {this.state.employer_sevice_message}
            //                                     </div>
            //                                 )
            //                                 : ("")}{" "}

            //                         </div>
            //                     </div>
            //                 </div>
            //                 <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
            //             </div>
            //         </Form>
            //     </div>
            // </div>

            <div className="page-wrapper login_register_box">

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
