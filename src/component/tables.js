import React from "react";
import firebase from '../config';
import Sidebar from './sidebar';
import Header from './header';
import {Link} from "react-router-dom";
class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

         
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

        this.floorsList();
      this.tableList();
           
       }

       floorsList=()=>{

        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("floors/");

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    floorId: childSnapShot.key .toString(),
                       
                    floor_capacity: childSnapShot.val().floor_capacity,
                    floor_name: childSnapShot.val().floor_name,
                    floor_notes: childSnapShot.val().floor_notes,
                       
                        


                };

                data.push(GSTData);
            });

            this.setState({floorsList: data, countPage: data.length, loading: false});
            console.log(this.state.floorsList);
    
        });


    }

    tableList=()=>{


        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("tables_with_floors/");

        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const GSTData = {
                    tableId: childSnapShot.key .toString(),
                       
                    table_name: childSnapShot.val().table_name,
                    table_capacity: childSnapShot.val().table_capacity,
                    table_floor: childSnapShot.val().table_floor,

                    table_icon: childSnapShot.val().table_icon, 
                    table_notes: childSnapShot.val().table_notes,

                  table_qrcode:  childSnapShot.val().table_qrcode,
                  status:childSnapShot.val().status,
                        


                };

                data.push(GSTData);
            });

            this.setState({tableList: data, countPage: data.length, loading: false});
            console.log(this.state.tableList);
    
        });



    }

    render() {
        return (
            <div className="page-wrapper">
   
<Sidebar/>
         
        
            <div className="page-container">
                <Header/>
       
                {/* <header className="header-desktop">
                
                <div className="logo_hipal">
                    <a href="#">
                        <img src="images/icon/logo.svg" alt="Hipal Admin" />
                    </a>
                </div>
                
                
                Welcome Back Varun
                </header> */}
              
                <div className="main-content">
                    <div className="section__content">
                    
                    
                    
            
                    
    <div className="container-fluid">
    
    <div className="row">
    
    <div className="col-md-12 p-0">
    
    <div className="search_profile">
    
    <div className="row">
    <div className="col-md-8">
    
    <div className="search_top">
    
    
        <a href="#" className="search_icon"><i className="fas fa-search"></i></a>       
        <input className="search_input" type="text" name="" placeholder="Search..."/>
             
    
        </div>
    </div>
    
    
    <div className="col-md-4 ">
    
    <div className="profile_user">
    <span className="usericon">
    <img src="/images/icon/profile.jpg"/>
    </span>
    <span className="profile_data">
    <p className="name">{sessionStorage.getItem("username")}</p>
    <p>{sessionStorage.getItem("email")}</p>
    </span>
    </div>
    
    
    </div>
    </div>
    
    </div>
    
    
    </div>
                
    </div>
    
    
    <div className="row mt-30">
    
    <div className="col-md-5 p-0">
    <div className="overview-wrap">
    <div className="order_btns">
        <Link to="/Orders">
    <span className="btn view_ord">View Order </span> </Link>
    <Link to="/Tables"> <span className="btn add_ord"><img src="/images/icon/add_plus_icon_w.svg" /> Add Order
    <span className="red_dot"></span>
    </span></Link>
    </div>
    </div>
    </div>
            
            
    <div className="col-md-7 p-0">
    <div className="track_box">
    
    
    <div className="track_ord_block track_box_center">
    <div className="track_bg">
    <div className="track-50 w-100">
    <form>
    <div className="input-group">
    <input type="text" className="form-control" placeholder="Track here"/>
    <span className="track_a_btn"><img src="/images/icon/track_arrow_right.svg"/></span>
    </div>
    </form>
    </div>
    
    </div>
    </div>
    </div>
    </div>
                        
    </div>
    
    
    <div className="row mt-30">
    
    <div className="col-md-12 p-0">
    <div className="orders_menu">
    <ul>
    <li><a href="#" className="activemenu">All</a></li>
    <li><a href="#">Dine In</a></li>
    <li><a href="#">Delivery</a></li>
    <li><a href="#">Take away</a></li>
    </ul>
    </div>
    
    </div>
            
            
    
                        
    </div>
    
    
    
    
    
    
    <div className="row m-t-30 m-b-30">
    
    <div className="col-md-12">
    
    <div className="floor_box">		
    <div className="dropdown">
      <button className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        <span>
        <img src="/images/filter_icon.png"/>
        </span>Floor 1
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li><a href="#" data-value="Floor 1">Floor 1</a></li>
        <li><a href="#" data-value="Floor 2">Floor 2</a></li>
        <li><a href="#" data-value="Floor 3">Floor 3</a></li>
        <li><a href="#" data-value="Floor 4">Floor 4</a></li>
      </ul>
    </div>
    </div>
    
    
    </div>
    
    
    {/* <div className="table_2 mb-20">
    <div className="head_table"></div>
    <div className="table-design two_people">
    <div className="persons_row">
    <span className="person vacant"></span>
    <span className="person vacant"></span>
    </div>
    <div className="persons_data_table">
    <div className="avaliabe_row-tablename">
    <span className="kot">KOT PENDING</span>
    <span className="tablename">T1</span>
    
    </div>
    <div className="avaliabe_row-head">
    <span className="avalibility">Vacant</span>
    <span className="time">2:02</span>
    </div>
    
    <div className="avaliabe_row vacant"></div>
    </div>
    <div className="persons_row">
    <span className="person down vacant"></span>
    <span className="person down vacant"></span>
    </div>
    </div>
    </div>
    
    <div className="table_2 mb-20">
    <div className="head_table">Order Palced <span></span></div>
    <div className="table-design two_people">
    <div className="persons_row">
    <span className="person ocupied"></span>
    <span className="person vacant"></span>
    </div>
    <div className="persons_data_table">
    <div className="avaliabe_row-tablename">
    <span className="kot">COOKING</span>
    <span className="tablename">T2</span>
    
    </div>
    <div className="avaliabe_row-head">
    <span className="avalibility">Occupied</span>
    <span className="time">2:02</span>
    </div>
    
    <div className="avaliabe_row ocupied"></div>
    </div>
    <div className="persons_row">
    <span className="person down ocupied"></span>
    <span className="person down vacant"></span>
    </div>
    </div>
    </div>
    
    <div className="table_2 mb-20">
    <div className="head_table"></div>
    <div className="table-design two_people">
    <div className="persons_row">
    <span className="person ocupied"></span>
    <span className="person vacant"></span>
    </div>
    <div className="persons_data_table">
    <div className="avaliabe_row-tablename">
    <span className="kot">TO DELIVER</span>
    <span className="tablename">T3</span>
    
    </div>
    <div className="avaliabe_row-head">
    <span className="avalibility">Vacant</span>
    </div>
    
    <div className="avaliabe_row vacant"></div>
    </div>
    <div className="persons_row">
    <span className="person down ocupied"></span>
    <span className="person down vacant"></span>
    </div>
    </div>
    </div>
    
    <div className="table_2 mb-20">
    <div className="head_table"></div>
    <div className="table-design two_people">
    <div className="persons_row">
    <span className="person vacant"></span>
    <span className="person vacant"></span>
    </div>
    <div className="persons_data_table">
    <div className="avaliabe_row-tablename">
    <span className="tablename">T4</span>
    
    </div>
    <div className="avaliabe_row-head">
    <span className="avalibility">Merged With T-5</span>
    
    </div>
    
    <div className="avaliabe_row merge"></div>
    </div>
    <div className="persons_row">
    <span className="person down vacant"></span>
    <span className="person down vacant"></span>
    </div>
    </div>
    </div>
    
    <div className="table_2 mb-20">
    
    <div className="head_table"></div>
    <div className="table-design two_people">
    <div className="persons_row">
    <span className="person vacant"></span>
    <span className="person vacant"></span>
    </div>
    <div className="persons_data_table">
    <div className="avaliabe_row-tablename">
    <span className="tablename">T5</span>
    
    </div>
    <div className="avaliabe_row-head">
    <span className="avalibility">Vacant</span>
    
    </div>
    
    <div className="avaliabe_row merge"></div>
    </div>
    <div className="persons_row">
    <span className="person down vacant"></span>
    <span className="person down vacant"></span>
    </div>
    </div>
    </div>
    
    
    
    <div className="table_2 mb-20">
    <div className="head_table"></div>
    <div className="table-design two_people">
    <div className="persons_row">
    <span className="person vacant"></span>
    <span className="person reserved"></span>
    </div>
    <div className="persons_data_table">
    <div className="avaliabe_row-tablename">
    
    <span className="tablename">T6</span>
    
    </div>
    <div className="avaliabe_row-head">Reserved <br></br> <span className="span_font">12 Sept 1:00 pm</span></div>
    <div className="avaliabe_row reserved"></div>
    </div>
    <div className="persons_row">
    <span className="person down vacant"></span>
    <span className="person down vacant"></span>
    </div>
    </div>
    </div>
     */}
       {this.state.tableList && this.state.tableList.map((table,index) => {
return (
    
    <div className="table_2 mb-20"  key={index}>
    <div className="head_table"></div>
    <Link to={`/ViewTables/${table.tableId}`}>

    <div className="table-design three_people">
    <div className="persons_row">
    <span className="person vacant"></span>
    <span className="person vacant"></span>
    <span className="person vacant"></span>
    </div>
    <div className="persons_data_table">
    <div className="avaliabe_row-tablename">
<span className="tablename">{table.table_name}</span>
    </div>
    <div className="avaliabe_row-head">
    <span className="avalibility">{table.status}</span>
    </div>
    <div className="avaliabe_row vacant"></div>
    </div>
    <div className="persons_row">
    <span className="person down vacant"></span>
    <span className="person down vacant"></span>
    <span className="person down vacant"></span>
    </div>
    </div>
    </Link>
    </div>
)})}
    
    {/* <div className="table_1 mb-20">
    <div className="head_table"></div>
    <div className="table-design one_people">
    <div className="persons_row">
    
    <span className="person ocupied"></span>
    </div>
    <div className="persons_data_table">
    <div className="avaliabe_row-tablename">
    <span className="tablename">T8</span>
    </div>
    <div className="avaliabe_row-head">
    <span className="avalibility">Occupied</span>
    </div>
    <div className="avaliabe_row ocupied"></div>
    </div>
    <div className="persons_row">
    
    <span className="person down ocupied"></span>
    </div>
    </div>
    </div>
    
    <div className="table_1 mb-20">
    <div className="head_table"></div>
    <div className="table-design one_people">
    <div className="persons_row">
    
    <span className="person vacant"></span>
    </div>
    <div className="persons_data_table">
    <div className="avaliabe_row-tablename">
    <span className="tablename">T9</span>
    
    
    </div>
    <div className="avaliabe_row-head">
    <span className="avalibility">Reserved</span>
    </div>
    <div className="avaliabe_row vacant"></div>
    </div>
    <div className="persons_row">
    
    <span className="person down vacant"></span>
    </div>
    </div>
    </div>
     */}
    
    </div>
    
    
    
    <div className="row">
    <div className="col-md-12 p-0">
    
    <div className="orders_table">
    <span>Move</span>
    <span>Merge</span>
    <span>Swap</span>
    </div>	
    </div>		
    </div>
    
    
    
    
    
    
    </div>
    
    
    
    
    
    </div>
    
    
    
    
    
    
    
    </div>
                   
    
    
    
    
    
    
    
                   </div>
                
                
                </div>
               
        );
    }
}

export default Tables;