import React from "react";
// import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import CategoryList from "./category_list";
import firebase from "firebase";
import { thisExpression } from "@babel/types";
import { array } from "yargs";
class ViewCategoryMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parentName: "",
      currentCategory: [{}],
      item_category: "",
      item_sub_category: "",
      item_categoty_list: "",
      display_category: false,
      employer_sevice_message: "",
      validError: false,
      mobile_message: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
      filenames: [],
      uploadProgress: 0,
      color: "#1569a8",
      active: false,
      status: "select",
      parentId: "",
      itemId: [],
      //   IsParent:true,
    };

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
                /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z]).{6,30}$/i
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
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/g
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

  async componentDidMount() {
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

    await this.itemCategoryList();
    this.itemMenuList();
  }

  itemCategoryList = async () => {
    const { categoryId } = this.props.match.params;
    this.setState({ loading: true });
    let ref = await firebase
      .firestore()
      .collection("categories2")
      .doc(categoryId)
      .get()
      .then((snapshot) => {
        var Category = snapshot.data();

        // console.log(categories2)
        console.log("isParent", Category.isParent);
        this.setState({
          name: Category.name,
          isParent: Category.isParent,
          photo: Category.photo,
          color: Category.color,
          created_on: Category.created_on,
          parentId: Category.parentId,
          sessionId: Category.sessionId,
          username: Category.username,
          // itemId: Category.itemId,
        });

        console.log(CategoryList);
        this.setState({
          currentCategory: [
            {
              id: "",
              name: "categories2",
            },
          ],
        });
      });
    if (this.state.parentId == "") {
    } else {
      await firebase
        .firestore()
        .collection("categories2")
        .doc(this.state.parentId)
        .get()
        .then((snapshot) => {
          var Category = snapshot.data();

          // console.log(categories2)
          console.log("isParent", Category.isParent);
          this.setState({
            name1: Category.name,
            isParent: Category.isParent,
            photo: Category.photo,
            color: Category.color,
            created_on: Category.created_on,
            parentId: Category.parentId,
            sessionId: Category.sessionId,
            username: Category.username,
            // itemId: Category.itemId,
          });
        });
    }
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    let rrr = await firebase
      .firestore()
      .collection("menuitems2")
      // .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      // .where("categoryId", "==", "bSZnzQSrsw8eeWwkeHc4")
      .where("categoryId", "array-contains-any", [categoryId])
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            idSelected: true,
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
            categoryId: childSnapShot.data().categoryId,
          };

          data.push(GSTData);
        });
        this.setState({
          itemId: data,
          countPage: data.length,
          loading: false,
        });
      });
    // let data2 = await firebase
    //   .firestore()
    //   .collection("menuitems2")
    //   .where("sessionId", "==", sessionId)
    //   .where("businessId", "==", businessId).get().then(snapshot=>{

    //   });
  };

  explore = async (e, name) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    e.preventDefault();
    let { id } = e.target;
    firebase
      .firestore()
      .collection("categories2")
      // .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .where("parentId", "==", id)
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
          };

          data.push(GSTData);
        });

        this.setState({
          CategoryList: data,
          countPage: data.length,
          loading: false,
        });
        let arr = this.state.currentCategory;
        for (let i = 0; i < this.state.currentCategory.length; i++) {
          // console.log(arr);
          // console.log(arr[i]);
          if (arr[i].id === id) {
            arr = arr.slice(0, i);
            break;
          }
        }
        // console.log(arr);

        arr.push({
          id: id,
          name: name,
        });
        this.setState({ currentCategory: arr });
        // console.log(this.state.currentCategory);
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
      .collection("menuitems2")
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
            categoryId: childSnapShot.data().categoryId,
          };

          data.push(GSTData);
        });
        this.setState({
          itemMenuList: data,
          countPage: data.length,
          loading: false,
        });

        console.log("itemid", this.state.itemId);
        console.log("item menu", this.state.itemMenuList);
        let id = this.state.itemId;
        let menu = this.state.itemMenuList;
        for (let i = 0; i < id.length; i++) {
          for (let j = 0; j < menu.length; j++) {
            if (id[i].itemmenuid === this.state.itemMenuList[j].itemmenuid) {
              menu[j].isSelected = !menu[j].isSelected;
              console.log("hererere");
              break;
            }
          }
        }

        this.setState({ itemMenuList: menu });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  render() {
    return (
      <>
        <div className="page-wrapper">
          <Sidebar />
          <div className="page-container">
            <Header />
            <div className="main-content">
              <div className="section__content">
                <div className="container-fluid">
                  {/* <button type="button" onClick={this.temp}>
                      temp
                    </button> */}
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
                          {/* <li>
                            <Link to="/AddCategoryMenuDuplicate">
                              Add category
                            </Link>
                          </li>
                          <li>
                            <Link to="/CategoryList">View category</Link>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-6 p-0">
                      <div className="category_form">
                        <div className="row form-group">
                          <div className="col col-md-4">
                            <label className=" form-control-label"> name</label>
                          </div>
                          <div className="col-12 col-md-8">
                            <input
                              value={this.state.name}
                              className="form-control"
                            />
                          </div>
                        </div>

                        {/* <div className="row form-group">
                          <div className="col col-md-4">
                            <label className="form-control-label">
                              Add as child
                            </label>
                          </div>
                          <div className="col-12 col-md-8">
                            {console.log(
                              this.state.isParent,
                              this.state.parentId
                            )}
                            <select
                              name="isParent"
                              id="select"
                              value={this.state.isParent}
                              className="form-control"
                            >
                              <option
                                value={this.state.isParent.toString()}
                                //   selected={this.state.isParent}
                              >
                                {this.state.isParent}
                              </option>
                              <option value="true">True</option>
                              <option
                                value="false"
                                selected={
                                  this.state.isParent.toString() === "false"
                                    ? false
                                    : null
                                }
                              >
                                False
                              </option>
                            </select>
                          </div>
                        </div> */}
                        {this.state.parentId == "" ? (
                          ""
                        ) : (
                          <div className="row form-group">
                            <div className="col col-md-4">
                              <label className=" form-control-label">
                                parent category
                              </label>
                            </div>
                            <div className="col-12 col-md-8">
                              {this.state.name1}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0">
                      <div className="category_upload_image">
                        <h1>Upload Image</h1>
                        <div className="upload_img_block">
                          <div className="row">
                            <div className="col-md-4">
                              {this.state.photo && (
                                <img
                                  src={this.state.photo}
                                  width="50%"
                                  height="50%"
                                />
                              )}
                            </div>

                            <div className="col-md-1 or">
                              <span>OR</span>
                            </div>
                            <div className="col-md-7">
                              <div className="colored_block">
                                <div className="row">
                                  <div className="col-md-3">
                                    <div
                                      className="color-box"
                                      style={{ background: this.state.color }}
                                    >
                                      <label>
                                        {/* <span>{this.state.color}</span> */}
                                        <input
                                          type="color"
                                          value={this.state.color}
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0">
                      <div className="category_upload_image">
                        <h1>Items</h1>

                        <div className="upload_img_block addproducts">
                          <h2>
                            {this.state.itemId && this.state.itemId.length}{" "}
                            Items
                          </h2>

                          <div className="row">
                            {this.state.itemId &&
                              this.state.itemId.map((item, index) => {
                                return (
                                  <div
                                    className="col-md-4 product_box"
                                    key={index}
                                  >
                                    <div className="product_box_item">
                                      <div className="product_item_row m-b-20">
                                        <div className="left">
                                          <div className="img_box">
                                            {item.advance == "Yes" ? (
                                              <span className="star_yellow">
                                                <img src="/images/icon/star_rate_ye.svg" />
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                            <img src={item.item_image} />
                                          </div>
                                          {/* <div className="img_box">
                                              <span className="star_yellow">
                                                <img src="/images/icon/star_rate_ye.svg" />
                                              </span>
                                              <img src="/images/category_img.png" />
                                            </div> */}
                                        </div>
                                        <div className="right">
                                          {/* <p>
                                              <span className="item_recipe">
                                                <span className="dot veg"></span>
                                              </span>
                                              <span className="btn best_seller">
                                                BESTSELLER
                                              </span>
                                            </p> */}
                                          <p>
                                            <span className="item_recipe">
                                              {item.item_type == "Veg" ? (
                                                <span className="dot veg"></span>
                                              ) : (
                                                <span className="dot non-veg"></span>
                                              )}
                                            </span>
                                            {item.extra == "Yes" ? (
                                              <>
                                                {item.bestsellertag == "Yes" ? (
                                                  <span className="btn best_seller">
                                                    BESTSELLER
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                                {item.healthytag == "Yes" ? (
                                                  <span className="btn best_seller">
                                                    HEALTHY
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </p>
                                          <p className="item_name">
                                            {item.item_name}
                                          </p>
                                          <p className="price">
                                            ₹ {item.item_price}.00
                                          </p>
                                        </div>
                                      </div>

                                      {/* <div className="product_item_row">
                                          <div className="left">
                                            <span className="btn remove_btn pull-left">
                                              Remove
                                            </span>
                                          </div>
                                          <div className="right">
                                            <span className="btn edit_btn">
                                              Edit
                                            </span>
                                          </div>
                                        </div> */}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ViewCategoryMenu;
