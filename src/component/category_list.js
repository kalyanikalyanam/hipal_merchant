import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import swal from "sweetalert";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_category: "",
      item_sub_category: "",
      item_categoty_list: "",

      employer_sevice_message: "",
      validError: false,
      mobile_message: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
      filenames: [],
      uploadProgress: 0,
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        passwordvalid: {
          message:
            "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
            "ter and 1 alphabet.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(
                val,
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
        passwordMismatch: {
          message: "confirm password must match with password field.",
          rule: function (val, params, validator) {
            return document.getElementById("password_input").value === val
              ? true
              : false;
          },
        },
        whitespace: {
          message: "The :attribute not allowed first whitespace   characters.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },

        zip: {
          message: "Invalid Pin Code",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
            // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
            // params.indexOf(val) === -1
            return (
              validator.helpers.testRegex(
                val,
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
              ) && params.indexOf(val) === -1
            );
          },
        },
        Fax: {
          message: "Invalid fax number ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
      },
    });
  }

  componentDidMount() {
    this.setState({ loading: true });

    var sessionId = sessionStorage.getItem("RoleId");
    if (sessionId) {
      console.log(sessionId);

      firebase
        .firestore()
        .collection("/merchant_users")
        .doc(sessionId)
        .get()
        .then((snapshot) => {
          var Users = snapshot.data();
          console.log(Users);
          sessionStorage.setItem("username", Users.user_name);
          sessionStorage.setItem("email", Users.email_id);

          this.setState({
            userRole: Users.Role,
            loading: false,
          });
        });
      var businessId = sessionStorage.getItem("businessId");
      firebase
        .firestore()
        .collection("/businessdetails")
        .doc(businessId)
        .get()
        .then((snapshot) => {
          var business = snapshot.data();
          console.log(business);
          sessionStorage.setItem("BusinessName", business.business_name);
          sessionStorage.setItem("BusinessLogo", business.business_logo);
        });
    }

    this.itemCategoryList();
    this.itemMenuList();
  }

  itemCategoryList = () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({ loading: true });
    firebase
      .firestore()
      .collection("categories2")
      // .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)

      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            categoryId: childSnapShot.id,
            name: childSnapShot.data().name,
            isParent: childSnapShot.data().isParent,
            photo: childSnapShot.data().photo,
            color: childSnapShot.data().color,
            created_on: childSnapShot.data().created_on,
            parentId: childSnapShot.data().parentId,
            sessionId: childSnapShot.data().sessionId,
            username: childSnapShot.data().username,
            itemId: childSnapShot.data().itemId,
          };

          data.push(GSTData);
        });
        this.setState({
          CategoryList: data,
          countPage: data.length,
          loading: false,
        });
        // console.log(CategoryList);
        this.setState({
          currentCategory: [
            {
              id: "",
              name: "categories2",
            },
          ],
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  itemMenuList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    firebase
      .firestore()
      .collection("menuitems")
      // .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            idSelected: false,
            itemmenuid: childSnapShot.id,
            item_unique_id: childSnapShot.data().item_unique_id,

            item_id: childSnapShot.data().item_id,
            item_name: childSnapShot.data().item_name,
            item_description: childSnapShot.data().item_description,
            item_halal: childSnapShot.data().item_halal,
            item_image: childSnapShot.data().item_image,
            item_points: childSnapShot.data().item_points,

            station_name: childSnapShot.data().station_name,

            item_type: childSnapShot.data().item_type,
            item_hash_tags: childSnapShot.data().item_hash_tags,
            item_price: childSnapShot.data().item_price,
            item_tax: childSnapShot.data().item_tax,

            sessionId: childSnapShot.data().sessionId,
            businessId: childSnapShot.data().businessId,

            status: childSnapShot.data().status,
            username: childSnapShot.data().username,

            portions: childSnapShot.data().portions,
            portions_details: childSnapShot.data().portions_details,

            advance: childSnapShot.data().advance,
            carbs: childSnapShot.data().carbs,
            protien: childSnapShot.data().protien,
            fat: childSnapShot.data().fat,
            item_video: childSnapShot.data().item_video,
            item_multiple_image: childSnapShot.data().downloadURLs,

            extra: childSnapShot.data().extra,
            healthytag: childSnapShot.data().healthytag,
            bestsellertag: childSnapShot.data().bestsellertag,

            recommend: childSnapShot.data().recommend,

            recommendations: childSnapShot.data().recommendations,

            created_on: childSnapShot.data().created_on,
            sessionId: childSnapShot.data().sessionId,
            businessId: childSnapShot.data().businessId,
            categoryId: this.state.categoryId,
          };

          data.push(GSTData);
        });
        this.setState({
          itemMenuList: data,
          countPage: data.length,
          loading: false,
        });
        //// console.log(itemTypeList);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  deleteItem = (id) => {
    swal({
      title: "Are you sure?",
      text: "Do your really want to remove?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        console.log(id);
        var playersRef = firebase
          .firestore()
          .collection("/categories2")
          .doc(id);
        playersRef.delete();
      } else {
      }
    });
  };

  render() {
    return (
      <div className="page-wrapper">
        <Sidebar />
        <div className="page-container">
          <Header />
          <div className="main-content">
            <div className="section__content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 p-0">
                    <div className="search_profile">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="company_name_box">
                            <div className="company_iocn">
                              <img
                                src={sessionStorage.getItem("BusinessLogo")}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                            <div className="company_details">
                              <p className="name">
                                {sessionStorage.getItem("BusinessName")}{" "}
                              </p>
                              <p className="open">
                                OPEN{" "}
                                <i
                                  className="fa fa-circle"
                                  aria-hidden="true"
                                ></i>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          {/* <div className="search_top">
                            <a href="#" className="search_icon">
                              <i className="fas fa-search"></i>
                            </a>
                            <input
                              className="search_input"
                              type="text"
                              name=""
                              placeholder="Search..."
                            />
                          </div> */}
                        </div>
                        <div className="col-md-3 ">
                          <div className="profile_user">
                            <span className="usericon">
                              <img src="/images/icon/profile.jpg" />
                            </span>
                            <span className="profile_data">
                              <p className="name">
                                {sessionStorage.getItem("username")}
                              </p>
                              <p>{sessionStorage.getItem("email")}</p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-30">
                  <div className="col-md-12 p-0">
                    <Link to="/ViewItemMenu">
                      <span className="btn add_categoty_menu">Items</span>
                    </Link>
                    <Link to="/CategoryList">
                      <span className="btn add_categoty_menu">
                        <span className="active"></span>Category
                      </span>
                    </Link>
                    <span className="btn add_categoty_menu">coupon</span>
                  </div>
                </div>

                <div className="row mt-30">
                  <div className="col-md-12 p-0">
                    <div className="orders_menu">
                      <ul>
                        <li>
                          <Link to="/CategoryList" className="activemenu">
                            View category
                          </Link>
                        </li>
                        {sessionStorage.getItem("role") == "Merchant" ||
                        sessionStorage.getItem("categories") == "Yes" ? (
                          <li>
                            <Link to="AddCategoryMenuDuplicate">
                              Add category
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row mt-30">
                  <div className="col-md-12 p-0 employes_table view_category_table">
                    <div className="table-responsive table-data">
                      <table className="table">
                        <thead>
                          <tr>
                            <td>S.no</td>
                            <td>Category Name</td>
                            {/* <td>No.Of Parent Catagory</td>
                            <td>No.Sub Catagory</td> */}
                            <td>Number of Items Number</td>
                            <td>Color</td>
                            {/* <td>Add Item</td> */}
                            <td>View Category</td>
                            {sessionStorage.getItem("role") == "Merchant" ||
                            sessionStorage.getItem("categories") == "Yes" ? (
                              <td>Actions</td>
                            ) : (
                              ""
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.CategoryList &&
                            this.state.CategoryList.map((category, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{category.name}</td>
                                  {/* <td>2</td>
                                  <td>0</td> */}
                                  <td>{category.itemId.length}</td>
                                  <td>{category.color}</td>
                                  {/* <td>ADD</td> */}
                                  <td>
                                    {" "}
                                    <Link
                                      to={`/ViewCategoryMenu/${category.categoryId}`}
                                    >
                                      click
                                    </Link>
                                  </td>
                                  {sessionStorage.getItem("role") ==
                                    "Merchant" ||
                                  sessionStorage.getItem("categories") ==
                                    "Yes" ? (
                                    <td>
                                      <Link
                                        to={`/EditCategoryMenu/${category.categoryId}`}
                                      >
                                        <img
                                          src="images/icon/edit_icon_blue.svg"
                                          className="edit_delete"
                                        />{" "}
                                      </Link>
                                      <img
                                        src="images/icon/delete_cross.svg"
                                        onClick={this.deleteItem.bind(
                                          this,
                                          category.categoryId
                                        )}
                                        className="edit_delete"
                                      />
                                    </td>
                                  ) : (
                                    ""
                                  )}
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
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

export default CategoryList;
