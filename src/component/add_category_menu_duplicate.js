//This is the code for creating a new categories ,
//this page is all about adding categories(parent,child and main category)
//adding parent category and also adding child category to a parent caregory(in one case the parent category can act as a child category to another parent category and  child category can act as a parent category to another child category(vice versa))
//we can add items to each and every categories
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
import LoaderPage from "./Loader";
class AddCategoryMenuDuplicate extends React.Component {
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
      loading: false,
      isLoading: null,
    };

    this.selectcategory = this.selectcategory.bind(this);
    this.selectItem = this.selectItem.bind(this);

    this.onChange = this.onChange.bind(this);
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        passwordvalid: {
          message:
            "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
            "ter and 1 alphabet.",
          rule: function (val, params, validator) {
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
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },

        zip: {
          message: "Invalid Pin Code",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
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
    var businessId = sessionStorage.getItem("businessId");
    this.setState({ loading: true });
    firebase
      .firestore()
      .collection("categories2")
      .where("businessId", "==", businessId)
      .where("parentId", "==", "")
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

        this.setState({
          currentCategory: [
            {
              id: "",
              name: "categories2",
            },
          ],
        });
      })
      .catch((err) => {});
  };
  // here is the working logic of explore button in the list of categories page ,
  //if the particular category is having sub or child categories then below that category,
  // explore button will display,if we press on that explore button ,
  //in the next page that paticular category related (sub categories) will displayed.
  explore = async (e, name) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    e.preventDefault();
    let { id } = e.target;
    firebase
      .firestore()
      .collection("categories2")
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

        arr.push({
          id: id,
          name: name,
        });
        this.setState({ currentCategory: arr });
      })
      .catch((err) => {});
  };
  // this is for getting the list of items
  itemMenuList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    firebase
      .firestore()
      .collection("menuitems2")
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
      })
      .catch((err) => {});
  };

  handleUploadStart = () =>
    this.setState({ isUploading: true, uploadProgress: 0 });

  handleFrontImageUploadStart = () =>
    this.setState({
      isUploading: true,

      uploadProgress: 0,
      avatarURL: "",
    });
  handleProgress = (progress) => this.setState({ uploadProgress: progress });

  handleUploadError = (error) => {
    this.setState({
      isUploading: false,
    });
    console.error(error);
  };

  handleItemPhotoSuccess = (filename) => {
    this.setState({ isLoading: true });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ photo: url }));
    this.setState({ isLoading: false });
  };

  handleSubmit = async (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      let itemArray = [];
      for (let i = 0; i < this.state.itemId.length; i++) {
        itemArray.push(this.state.itemId[i].itemmenuid);
      }
      let data = {
        name: this.state.name,
        isParent: false,
        photo: this.state.photo,
        color: this.state.color,
        parentId: this.state.parentId,
        sessionId: sessionId,
        username: username,
        businessId: businessId,
        itemId: itemArray,
      };
      console.log(data);
      var dbcon = await firebase
        .firestore()
        .collection("categories2")
        .add(data);
      for (let i = 0; i < itemArray.length; i++) {
        let result = await firebase
          .firestore()
          .collection("menuitems2")
          .doc(itemArray[i])
          .update({
            categoryId: firebase.firestore.FieldValue.arrayUnion(dbcon.id),
          });
      }
      if (this.state.parentId !== "")
        await firebase
          .firestore()
          .collection("categories2")
          .doc(this.state.parentId)
          .update({ isParent: true });

      window.location.href = "/CategoryList";
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  // for selecting the parent category name
  selectcategory = async (id, name) => {
    this.setState({ parentName: name });

    await this.setState({
      parentId: id,
    });
  };
  // for selecting or assiging items to a particular category
  selectItem = async (id) => {
    console.log("selected id", id);
    // total item list
    let menu = this.state.itemMenuList;
    for (let i = 0; i < this.state.itemMenuList.length; i++) {
      //if the selected item (id) is already there in this category it will remove the item (vice versa)
      if (this.state.itemMenuList[i].itemmenuid === id) {
        menu[i].isSelected = !menu[i].isSelected;
        break;
      }
    }
    let filteredArr = this.state.itemMenuList.filter(
      (d) => d.itemmenuid === id
    );
    filteredArr = filteredArr[0];
    let arr = this.state.itemId;
    let k = 0;
    for (let i = 0; i < this.state.itemId.length; i++) {
      if (this.state.itemId[i].itemmenuid === id) {
        console.log("before", arr);
        arr.splice(i, 1);
        console.log("after", arr);
        k = 1;
        break;
      }
    }
    if (k == 0) {
      arr.push(filteredArr);
    }
    console.log("prev", this.state.itemId);
    console.log("new", arr);
    await this.setState({ itemMenuList: menu });
    await this.setState({ itemId: arr });
  };

  temp = async () => {
    for (let i = 0; i < this.state.itemMenuList.length; i++) {
      console.log(this.state.itemMenuList[i].itemmenuid);
    }
  };

  handleChange = (e) => {
    this.setState({
      oldColor: this.state.color,
      color: e.target.value,
      active: !this.state.active,
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onSelectChange = (event) => {
    this.setState({
      [event.target.name]: !this.state.IsParent,
    });
  };
  // this logic is for handling ,when we enter the category name ,
  //if that category name is already exist then it will show error message (name alreacy exist)
  categoryNameChange = async (e) => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    this.setState({
      name: e.target.value,
    });
    if (this.state.validError != true) {
      firebase
        .firestore()
        .collection("categories2")
        .where("businessId", "==", businessId)
        .where("name", "==", e.target.value)

        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;

          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              mobile_message: " Name already exist",
              validError: false,
            });
          } else {
            this.setState({ mobile_message: "", validError: true });
          }
        });
    }
  };
  render() {
    const { isLoading } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
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
                            <div className="col-md-3"></div>
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
                              <Link to="/CategoryList">View category</Link>
                            </li>
                            {sessionStorage.getItem("role") == "Merchant" ||
                            sessionStorage.getItem("categories") == "Yes" ? (
                              <li>
                                <a
                                  href="/AddCategoryMenuDuplicate"
                                  className="activemenu"
                                >
                                  Add category
                                </a>
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-30">
                      <div className="col-md-6 p-0">
                        <div className="category_form">
                          <div className="row form-group">
                            <div className="col col-md-4">
                              <label className=" form-control-label">
                                {" "}
                                name
                              </label>
                            </div>
                            <div className="col-12 col-md-8">
                              <input
                                type="text"
                                name="name"
                                onChange={this.categoryNameChange}
                                value={this.state.name}
                                placeholder="Main course"
                                className="form-control"
                              />
                              <div className="text-danger">
                                {" "}
                                {this.state.mobile_message}
                              </div>
                            </div>
                            {this.validator.message(
                              "Category Name",
                              this.state.name,
                              "required|whitespace|min:2|max:70"
                            )}
                          </div>

                          <div className="row form-group">
                            <div className="col col-md-4">
                              <label className="form-control-label">
                                Add as child
                              </label>
                            </div>
                            <div className="col-12 col-md-8">
                              <select
                                name="IsParent"
                                id="select"
                                value={this.state.IsParent}
                                onChange={this.onSelectChange}
                                className="form-control"
                              >
                                {/* <option value="select">select</option> */}

                                <option value="false">False</option>
                                <option value="true">True</option>
                              </select>
                            </div>
                            {/* {this.validator.message(
                              "IsParent  ",
                              this.state.IsParent,
                              "required"
                            )} */}
                          </div>
                          {this.state.IsParent === true ? (
                            <div className="row form-group">
                              <div className="col col-md-4">
                                <label className=" form-control-label">
                                  Select parent category
                                </label>
                              </div>
                              <div className="col-12 col-md-8">
                                <button
                                  type="button"
                                  className="btn btn-secondary mb-1"
                                  data-toggle="modal"
                                  data-target="#add_parent_category"
                                >
                                  Choose
                                </button>
                              </div>
                              <div
                                className="breadcrumbs menu_cate_links"
                                style={{ fontSize: "15px", display: "flex" }}
                              >
                                {this.state.currentCategory.map((i, index) => (
                                  <p style={{ marginLeft: "3px" }} id={i.id}>
                                    {" "}
                                    &gt; {i.name}{" "}
                                  </p>
                                ))}
                                <p>
                                  <p style={{ marginLeft: "3px" }}>
                                    {" "}
                                    &gt; {this.state.parentName}{" "}
                                  </p>
                                </p>
                              </div>
                            </div>
                          ) : (
                            ""
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
                                {this.state.isLoading ? (
                                  <div className="divLoader">
                                    <LoaderPage />
                                  </div>
                                ) : (
                                  <>
                                    {this.state.photo && (
                                      <img
                                        src={this.state.photo}
                                        width="50%"
                                        height="50%"
                                      />
                                    )}
                                  </>
                                )}
                                <FileUploader
                                  accept="image/*"
                                  name="photo"
                                  randomizeFilename
                                  storageRef={firebase.storage().ref("images")}
                                  onUploadStart={
                                    this.handleFrontImageUploadStart
                                  }
                                  onUploadError={this.handleUploadError}
                                  onUploadSuccess={this.handleItemPhotoSuccess}
                                  onProgress={this.handleProgress}
                                />
                              </div>
                              {this.validator.message(
                                "photo",
                                this.state.photo,
                                "required"
                              )}
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
                                        <label className="color-selector">
                                          <input
                                            type="color"
                                            value={this.state.color}
                                            onChange={this.handleChange}
                                            className="hidden"
                                          />
                                        </label>
                                      </div>
                                    </div>
                                    {this.validator.message(
                                      "color",
                                      this.state.color,
                                      "required"
                                    )}
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
                              <span className="additems btn">
                                <button
                                  type="button"
                                  data-toggle="modal"
                                  data-target="#add_items"
                                >
                                  Add Items{" "}
                                </button>
                              </span>
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
                                          </div>
                                          <div className="right">
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
                                                  {item.bestsellertag ==
                                                  "Yes" ? (
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
                                              ??? {item.item_price}.00
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

                    <div className="row mb-30 mt-30">
                      <div className="w-100-row m-t-20 text-center">
                        <span className="btn cancel_btn2">
                          <Link to="/CategoryList">Cancel</Link>
                        </span>
                        <button type="submit">
                          <span className="btn create_btn" type="submit">
                            Create Catagory{" "}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="add_parent_category"
            tabindex="-1"
            role="dialog"
            aria-labelledby="smallmodalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm hipal_pop" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="smallmodalLabel">
                    Choose Parent Category
                  </h5>
                </div>

                <div className="modal-body product_edit">
                  <div className="col-12 w-100-row">
                    <div className="row">
                      <div className="col col-md-5 font-18">Search by name</div>
                      <div className="col col-md-7 bill_id_settle">
                        <div className="form-group">
                          <span className="pull-left">
                            <input
                              type="text"
                              id="text-input"
                              name="text-input"
                              placeholder="T1"
                              className="form-control edit_product"
                            />
                          </span>
                          <span className="btn pull-right add_btn_pop_orange bg_green addmode_pad">
                            Go
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row">
                      <div className="col col-md-12 font-15">
                        Menu :{" "}
                        <Link to="">
                          {" "}
                          <div
                            className="breadcrumbs"
                            style={{ fontSize: "15px", display: "flex" }}
                          >
                            {this.state.currentCategory.map((i, index) => (
                              <p
                                style={{ marginLeft: "3px" }}
                                id={i.id}
                                onClick={(e) => {
                                  this.explore(e, i.name);
                                }}
                              >
                                {" "}
                                &gt; {i.name}{" "}
                              </p>
                            ))}
                          </div>
                        </Link>
                      </div>

                      {/* <div className="col col-md-6 text-center">
<img src="images/icon/back_arrow_left_o.svg"/>
</div> */}
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row">
                      <div className="row">
                        {this.state.CategoryList &&
                          this.state.CategoryList.map((category, index) => {
                            return (
                              <div
                                id={category.categoryId}
                                onClick={this.selectcategory.bind(
                                  this,
                                  category.categoryId,
                                  category.name
                                )}
                                className="col-md-4 mb-15 text-center"
                                key={index}
                              >
                                <button data-dismiss="modal">
                                  <div
                                    className="cate_img_box  shadow_box"
                                    style={{ background: category.color }}
                                  >
                                    <img
                                      className="img_empty2"
                                      src={category.photo}
                                    ></img>

                                    <p> {category.name}</p>
                                  </div>
                                </button>
                                {category.isParent === true ? (
                                  <button
                                    className="btn m-t-10 btn_explore"
                                    id={category.categoryId}
                                    onClick={(e) => {
                                      this.explore(e, category.name);
                                    }}
                                  >
                                    Explore
                                  </button>
                                ) : null}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn save_btn"
                    data-dismiss="modal"
                  >
                    Add here
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="add_items"
            tabindex="-1"
            role="dialog"
            aria-labelledby="smallmodalLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-sm hipal_pop additempop"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="smallmodalLabel">
                    Add Item in Category(name)
                  </h5>
                  {/* <span className="black_font">12 Iteams added</span> */}
                </div>

                <div className="modal-body product_edit">
                  <div className="col-12 bdr_bottom_gray pb-15 mb-15">
                    <div className="row">
                      <div className="col col-md-5 font-18">
                        Search by name / ID
                      </div>
                      <div className="col col-md-7 bill_id_settle pl-0">
                        <div className="form-group">
                          <span className="pull-left">
                            <input
                              type="text"
                              id="text-input"
                              name="text-input"
                              placeholder="T1"
                              className="form-control edit_product"
                            />
                          </span>
                          <span className="btn pull-left add_btn_pop_orange bg_green addmode_pad ml-5">
                            Go
                          </span>
                          <span className="btn pull-right pad-back">Back</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row add-Items_scroll">
                      {this.state.itemMenuList &&
                        this.state.itemMenuList.map((item, index) => {
                          return (
                            <div className="col-md-6 product_box" key={index}>
                              <div className="product_box_item">
                                <div className="product_item_row m-b-20">
                                  <div className="left">
                                    <div className="img_box">
                                      {item.advance == "Yes" ? (
                                        <span className="star_yellow">
                                          <img src="images/icon/star_rate_ye.svg" />
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                      <img src={item.item_image} />
                                    </div>
                                  </div>
                                  <div className="right">
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
                                      ??? {item.item_price}.00
                                    </p>
                                  </div>
                                </div>

                                <div className="product_item_row">
                                  <div className="left">
                                    <span
                                      className={
                                        item.isSelected === true
                                          ? "btn remove_btn pull-left "
                                          : "btn remove_btn pull-left bg_green"
                                      }
                                      id="color"
                                      onClick={this.selectItem.bind(
                                        this,
                                        item.itemmenuid,
                                        item.item_name
                                      )}
                                    >
                                      {item.isSelected === true
                                        ? "Remove"
                                        : "Add"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn save_btn"
                    data-dismiss="modal"
                  >
                    Add Items
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default AddCategoryMenuDuplicate;
