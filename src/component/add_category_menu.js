import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
class AddCategoryMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };

    // this.explore=this.explore.bind(this);
    this.onChange = this.onChange.bind(this);
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
        .database()
        .ref("merchant_users/" + sessionId)
        .on("value", (snapshot) => {
          var Users = snapshot.val();
          console.log(Users);
          sessionStorage.setItem("username", Users.user_name);
          sessionStorage.setItem("email", Users.email_id);

          this.setState({
            userRole: Users.Role,
            loading: false,
          });
        });
    }

    this.itemCategoryList();
    this.itemMenuList();
  }

  itemCategoryList() {
    this.setState({ loading: true });
    var ref = firebase.database().ref("items_categories/");
    // .orderByChild('parent_category_select').equalTo('No');

    ref.on("value", (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapShot) => {
        const GSTData = {
          categoryId: childSnapShot.key.toString(),

          sub_category_name: childSnapShot.val().sub_category_name,

          parent_category_select: childSnapShot.val().parent_category_select,

          parent_category: childSnapShot.val().parent_category,

          parent_category_photo: childSnapShot.val().parent_category_photo,

          sub_category_photo: childSnapShot.val().sub_category_photo,

          color: childSnapShot.val().color,

          created_on: childSnapShot.val().created_on,
        };

        data.push(GSTData);
      });

      this.setState({
        CategoryList: data,
        countPage: data.length,
        loading: false,
      });
      console.log(this.state.CategoryList);
    });
  }

  itemMenuList = () => {
    this.setState({ loading: true });
    var ref = firebase.database().ref("merchant_menu_items/");

    ref.on("value", (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapShot) => {
        const GSTData = {
          itemmenuid: childSnapShot.key.toString(),
          item_unique_id: childSnapShot.val().item_unique_id,

          item_id: childSnapShot.val().item_id,
          item_name: childSnapShot.val().item_name,
          item_description: childSnapShot.val().item_description,
          item_halal: childSnapShot.val().item_halal,
          item_image: childSnapShot.val().item_image,
          item_points: childSnapShot.val().item_points,

          station_name: childSnapShot.val().station_name,
          item_restaurant_id: childSnapShot.val().item_restaurant_id,
          item_type: childSnapShot.val().item_type,
          item_hash_tags: childSnapShot.val().item_hash_tags,
          item_price: childSnapShot.val().item_price,
          item_tax: childSnapShot.val().item_tax,

          category: childSnapShot.val().category,
          sub_category: childSnapShot.val().sub_category,

          sessionId: childSnapShot.val().sessionId,
          status: childSnapShot.val().status,
          username: childSnapShot.val().username,

          portions: childSnapShot.val().portions,
          portions_details: childSnapShot.val().portions_details,

          advance: childSnapShot.val().advance,
          carbs: childSnapShot.val().carbs,
          protien: childSnapShot.val().protien,
          fat: childSnapShot.val().fat,
          item_video: childSnapShot.val().item_video,
          item_multiple_image: childSnapShot.val().downloadURLs,

          extra: childSnapShot.val().extra,
          healthytag: childSnapShot.val().healthytag,
          bestsellertag: childSnapShot.val().bestsellertag,

          recommend: childSnapShot.val().recommend,

          recommendations: childSnapShot.val().recommendations,

          created_on: childSnapShot.val().created_on,
        };

        data.push(GSTData);
      });

      this.setState({
        itemMenuList: data,
        countPage: data.length,
        loading: false,
      });
      console.log(this.state.itemMenuList);
    });
  };

  handleUploadStart = () =>
    this.setState({ isUploading: true, uploadProgress: 0 });

  handleFrontImageUploadStart = () =>
    this.setState({ isUploading: true, uploadProgress: 0, avatarURL: "" });
  handleProgress = (progress) => this.setState({ uploadProgress: progress });

  handleUploadError = (error) => {
    this.setState({
      isUploading: false,
      // Todo: handle error
    });
    console.error(error);
  };

  handleItemPhotoSuccess = (filename) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ category_photo: url }));
  };

  explore = (e) => {
    e.preventDefault();
    console.log(e.target);
    this.setState({
      display_category: true,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      if (this.state.parent_category_select == "Yes") {
        let dbCon = firebase.database().ref("/items_categories");

        dbCon.push({
          sub_category_name: this.state.category_name,
          parent_category_select: this.state.parent_category_select,
          parent_category: this.state.parent_category,

          sub_category_photo: this.state.category_photo,
          color: this.state.color,
          sessionId: sessionId,
          username: username,
        });
      } else {
        let dbCon = firebase.database().ref("/items_categories");

        dbCon.push({
          parent_category: this.state.category_name,
          parent_category_select: this.state.parent_category_select,
          // parent_category:this.state.parent_category,
          sub_category_name: "No",
          parent_category_photo: this.state.category_photo,
          color: this.state.color,

          sessionId: sessionId,
          username: username,
        });
      }
      this.props.history.push("/AddCategoryMenu");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  // handleSubmit = (event)=>{
  //     event.preventDefault();
  //     let data = {
  //         color:this.state.color
  //         color:this.state.color
  //         color:this.state.color
  //         color:this.state.color
  //         color:this.state.color
  //         color:this.state.color
  //     }
  //     var snap = firebase.database().ref("/dummy").push(data);
  // }
  CategoryChange = (e) => {
    this.setState({
      category_name: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = firebase
        .database()
        .ref("items_categories/")
        .orderByChild("category_name")
        .equalTo(e.target.value);
      ref.on("value", (snapshot) => {
        var user_exist = snapshot.numChildren();
        console.log(user_exist);

        if (user_exist > 0 && this.state.validError != true) {
          this.setState({
            category_name_message: " Category Name already exist",
            validError: false,
          });
        } else {
          this.setState({ category_name_message: "", validError: true });
        }
      });
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

  render() {
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
                    <div className="row">
                      <div className="col-md-12 p-0">
                        <div className="search_profile">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="company_name_box">
                                <div className="company_iocn"></div>
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
                              <div className="search_top">
                                <a href="#" className="search_icon">
                                  <i className="fas fa-search"></i>
                                </a>
                                <input
                                  className="search_input"
                                  type="text"
                                  name=""
                                  placeholder="Search..."
                                />
                              </div>
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
                        <Link to="/AddItemMenu">
                          <span className="btn add_categoty_menu">Items</span>
                        </Link>
                        <Link to="/AddCategoryMenu">
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
                              <a href="#" className="activemenu">
                                Add category
                              </a>
                            </li>
                            <li>
                              <a href="#">View category</a>
                            </li>
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
                                Category name
                              </label>
                            </div>
                            <div className="col-12 col-md-8">
                              <input
                                type="text"
                                name="category_name"
                                onChange={this.CategoryChange}
                                value={this.state.category_name}
                                placeholder="Main course"
                                className="form-control"
                              />
                            </div>
                            {this.validator.message(
                              "Category Name",
                              this.state.category_name,
                              "required|whitespace|min:2|max:70"
                            )}
                            <div className="text-danger">
                              {" "}
                              {this.state.category_name_message}
                            </div>
                          </div>

                          <div className="row form-group">
                            <div className="col col-md-4">
                              <label className="form-control-label">
                                Parent category
                              </label>
                            </div>
                            <div className="col-12 col-md-8">
                              <select
                                name="parent_category_select"
                                id="select"
                                value={this.state.parent_category_select}
                                onChange={this.onChange}
                                className="form-control"
                              >
                                <option value="select">select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                            {this.validator.message(
                              "Parent Ctaegory ",
                              this.state.parent_category_select,
                              "required"
                            )}
                          </div>
                          {this.state.parent_category_select == "Yes" ? (
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
                              <div className="col-md-3">
                                {/* <div className="upload_img">
<div className="form-group">
<div className="img_show" style={{height:"200px"}}><img id='img-upload'/></div>
  <div className="input-group">
       <span className="input-group-btn">
           <span className="btn btn-default btn-file">
               Upload An Image <input type="file" id="imgInp"/>
           </span>
       </span>
       <input type="text" className="form-control" readonly/>
   </div>
   
</div>
</div> */}

                                {this.state.category_photo && (
                                  <img src={this.state.category_photo} />
                                )}
                                <FileUploader
                                  accept="image/*"
                                  name="category_photo"
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
                                "category photo",
                                this.state.category_photo,
                                "required"
                              )}
                              <div className="col-md-1 or">
                                <span>AND</span>
                              </div>
                              <div className="col-md-8">
                                <div className="colored_block">
                                  <div className="row">
                                    <div className="col-md-3">
                                      <div
                                        className="color-box"
                                        style={{ background: this.state.color }}
                                      >
                                        <label className="color-selector">
                                          {/* <span>{this.state.color}</span> */}
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
                              0 Items
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

                            {/* <div className="row form-group">
<div className="col col-md-4">
<label className="form-control-label"> Choose Items</label>
</div>
<div className="col-12 col-md-8">
<select
                                                        className="form-control edit_product"
                                                        name="items"
                                                        onChange={this.onChange}>
                                                        <option>Select Item</option>
                                                        {this.state.itemMenuList && this
                                                            .state
                                                            .itemMenuList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.item_name} key={index}>{data.item_name}</option>
                                                                )

                                                            })}

                                                    </select>
    </div>
    {this.validator.message("Select Items ", this.state.items, "required")}
</div> */}

                            {/* <div className="row">

<div className="col-md-4 product_box">

<div className="product_box_item">

<div className="product_item_row m-b-20">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>

</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span></p>
<p className="item_name">Caesar Salad</p>
<p className="price">₹ 220.00</p>
</div>

</div>

<div className="product_item_row">
<div className="left">
<span className="btn remove_btn pull-left">Remove</span>
</div>
<div className="right">
<span className="btn edit_btn">Edit</span>

</div>



</div>


</div>
</div>

<div className="col-md-4 product_box">

<div className="product_box_item">

<div className="product_item_row m-b-20">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>

</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span></p>
<p className="item_name">Caesar Salad</p>
<p className="price">₹ 220.00</p>
</div>

</div>

<div className="product_item_row">
<div className="left">
<span className="btn remove_btn pull-left">Remove</span>
</div>
<div className="right">
<span className="btn edit_btn">Edit</span>

</div>



</div>


</div>
</div>



<div className="col-md-4 product_box">

<div className="product_box_item">

<div className="product_item_row m-b-20">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>

</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span></p>
<p className="item_name">Caesar Salad</p>
<p className="price">₹ 220.00</p>
</div>

</div>

<div className="product_item_row">
<div className="left">
<span className="btn remove_btn pull-left">Remove</span>
</div>
<div className="right">
<span className="btn edit_btn">Edit</span>

</div>



</div>


</div>
</div>



<div className="col-md-4 product_box">

<div className="product_box_item">

<div className="product_item_row m-b-20">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>

</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span></p>
<p className="item_name">Caesar Salad</p>
<p className="price">₹ 220.00</p>
</div>

</div>

<div className="product_item_row">
<div className="left">
<span className="btn remove_btn pull-left">Remove</span>
</div>
<div className="right">
<span className="btn edit_btn">Edit</span>

</div>



</div>


</div>
</div>



<div className="col-md-4 product_box">

<div className="product_box_item">

<div className="product_item_row m-b-20">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>

</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span></p>
<p className="item_name">Caesar Salad</p>
<p className="price">₹ 220.00</p>
</div>

</div>

<div className="product_item_row">
<div className="left">
<span className="btn remove_btn pull-left">Remove</span>
</div>
<div className="right">
<span className="btn edit_btn">Edit</span>

</div>



</div>


</div>
</div>



<div className="col-md-4 product_box">

<div className="product_box_item">

<div className="product_item_row m-b-20">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>

</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span></p>
<p className="item_name">Caesar Salad</p>
<p className="price">₹ 220.00</p>
</div>

</div>

<div className="product_item_row">
<div className="left">
<span className="btn remove_btn pull-left">Remove</span>
</div>
<div className="right">
<span className="btn edit_btn">Edit</span>

</div>



</div>


</div>
</div>



<div className="col-md-4 product_box">

<div className="product_box_item">

<div className="product_item_row m-b-20">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>

</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span></p>
<p className="item_name">Caesar Salad</p>
<p className="price">₹ 220.00</p>
</div>

</div>

<div className="product_item_row">
<div className="left">
<span className="btn remove_btn pull-left">Remove</span>
</div>
<div className="right">
<span className="btn edit_btn">Edit</span>

</div>



</div>


</div>
</div>



<div className="col-md-4 product_box">

<div className="product_box_item">

<div className="product_item_row m-b-20">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>

</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span></p>
<p className="item_name">Caesar Salad</p>
<p className="price">₹ 220.00</p>
</div>

</div>

<div className="product_item_row">
<div className="left">
<span className="btn remove_btn pull-left">Remove</span>
</div>
<div className="right">
<span className="btn edit_btn">Edit</span>

</div>



</div>


</div>
</div>


<div className="col-md-4 product_box">

<div className="product_box_item">

<div className="product_item_row m-b-20">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>

</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span></p>
<p className="item_name">Caesar Salad</p>
<p className="price">₹ 220.00</p>
</div>

</div>

<div className="product_item_row">
<div className="left">
<span className="btn remove_btn pull-left">Remove</span>
</div>
<div className="right">
<span className="btn edit_btn">Edit</span>

</div>



</div>


</div>
</div>




</div> */}

                            {/* <div cl="row">
<div className="pagi_nation w-100">
<a href="#" className="activepage">1</a>
<a href="#">2</a>
<a href="#">3</a>
</div>
</div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn save_btn_menu">
                      Save
                    </button>
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
                  {/* <div className="col-12 w-100-row">
<div className="row">
<div className="col col-md-5 font-18">
Search by name
</div>
<div className="col col-md-7 bill_id_settle">
<div className="form-group">
<span className="pull-left"><input type="text" id="text-input" name="text-input" placeholder="T1" className="form-control edit_product"/></span>
<span className="btn pull-right add_btn_pop_orange bg_green addmode_pad">Go</span>
</div>
</div>
</div>
</div>
 */}

                  <div className="col-12 w-100-row">
                    <div className="row">
                      <div className="col col-md-6 font-15">
                        Menu : <Link to="#">Maincourse</Link> /
                        <Link to="#">Parent</Link>
                      </div>

                      <div className="col col-md-6 text-center">
                        <img src="images/icon/back_arrow_left_o.svg" />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row">
                      <div className="row">
                        {this.state.CategoryList &&
                          this.state.CategoryList.map((category, index) => {
                            return (
                              <div
                                className="col-md-4 mb-15 text-center"
                                key={index}
                              >
                                <div
                                  className="cate_img_box  shadow_box"
                                  style={{ background: category.color }}
                                >
                                  <img
                                    className="img_empty2"
                                    src={category.parent_category_photo}
                                  ></img>

                                  <p> {category.parent_category}</p>
                                </div>

                                {
                                  category.sub_category_name == "No" ? (
                                    ""
                                  ) : (
                                    <button className="btn m-t-10 btn_explore">
                                      Explore
                                    </button>
                                  )
                                  //  onClick={this.explore()}
                                }
                              </div>
                            );
                          })}

                        {/* <div className="col-md-4 mb-15 text-center">
<div className="cate_img_box  shadow_box" style={{background:"#fff"}}>
<div className="img_empty2"></div>
<p> CATEGORY 2</p>
</div>
</div>

<div className="col-md-4 mb-15 text-center">
<div className="cate_img_box  shadow_box" style={{background:"#fff"}}>
<div className="img_empty2"></div>
<p> CATEGORY 3</p>
</div>
</div>

<div className="col-md-4 mb-15 text-center">
<div className="cate_img_box  shadow_box" style={{background:"#fff"}}>
<div className="img_empty2"></div>
<p> CATEGORY 4</p>
</div>
</div>

<div className="col-md-4 mb-15 text-center">
<div className="cate_img_box shadow_box" style={{background:"#fff"}}>
<div className="img_empty2"></div>
<p> CATEGORY 5</p>
</div>
</div>

<div className="col-md-4 mb-15 text-center">
<div className="cate_img_box active_explore shadow_box" style={{background:"#fff"}}>
<div className="img_empty2"></div>
<p> CATEGORY 6</p>
</div>

<button className="btn m-t-10 btn_explore">Explore</button>

</div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn save_btn">
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
                  <span className="black_font">12 Iteams added</span>
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
                      {/* <div className="col-md-6 product_box">
<div className="product_box_item selected_box">
<div className="product_item_row m-b-20">
<div className="left">
<div className="img_box">
<span className="star_yellow"><img src="images/icon/star_rate_ye.svg"/></span>
<img src="images/category_img.png"/>
</div>
</div>
<div className="right">
<p><span className="item_recipe"><span className="dot veg"></span></span>
<span className="btn best_seller">BESTSELLER</span></p>
<p className="item_name">Caesar Salad</p>
<p className="price">₹ 220.00</p>
</div>

</div>

<div className="product_item_row">
<div className="left">
<span className="btn remove_btn pull-left">Remove</span>
</div>
</div>


</div>
</div> */}

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
                                      ₹ {item.item_price}.00
                                    </p>
                                  </div>
                                </div>

                                <div className="product_item_row">
                                  <div className="left">
                                    <span className="btn remove_btn pull-left bg_green">
                                      Add
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
                  <button type="button" className="btn save_btn">
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

export default AddCategoryMenu;
