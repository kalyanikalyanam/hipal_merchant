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
      //   IsParent:true,
    };

    // this.explore=this.explore.bind(this);

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

  componentDidMount() {
    this.setState({ loading: true });
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    if (sessionId) {
      //console.log(sessionId);

      firebase
        .database()
        .ref("merchant_users/" + sessionId)
        .on("value", (snapshot) => {
          var Users = snapshot.val();
          //console.log(Users);
          sessionStorage.setItem("username", Users.user_name);
          sessionStorage.setItem("email", Users.email_id);

          this.setState({
            userRole: Users.Role,
            loading: false,
          });
        });

      firebase
        .database()
        .ref("merchaant_business_details/" + businessId)
        .on("value", (snapshot) => {
          var business = snapshot.val();
          console.log(business);
          sessionStorage.setItem("BusinessId", business.businessId);
          sessionStorage.setItem("BusinessName", business.business_name);
          sessionStorage.setItem("BusinessLogo", business.business_logo);

          this.setState({});
        });
    }

    this.itemCategoryList();
    this.itemMenuList();
  }

  // itemCategoryList() {
  //   var sessionId = sessionStorage.getItem("RoleId");
  //   var businessId = sessionStorage.getItem("businessId");
  //   this.setState({ loading: true });
  //   var ref = firebase
  //     .database()
  //     .ref("dummy/")
  //     .orderByChild("sessionId")
  //     .equalTo(sessionStorage.getItem("RoleId"));

  //   ref.on("value", (snapshot) => {
  //     const data = [];
  //     snapshot.forEach((childSnapShot) => {
  //       const GSTData = {
  //         categoryId: childSnapShot.key.toString(),
  //         name: childSnapShot.val().name,
  //         isParent: childSnapShot.val().isParent,
  //         photo: childSnapShot.val().photo,
  //         color: childSnapShot.val().color,
  //         created_on: childSnapShot.val().created_on,
  //         parentId: childSnapShot.val().parentId,
  //         sessionId: childSnapShot.val().sessionId,
  //         username: childSnapShot.val().username,
  //       };

  //       data.push(GSTData);
  //     });
  //     let businessid = data.filter((res) => {
  //       return res.businessId === businessId;
  //     });

  //     let sortedKeys = businessid.filter((res) => {
  //       return res.parentId === "";
  //     });

  //     this.setState({
  //       CategoryList: sortedKeys,
  //       countPage: data.length,
  //       loading: false,
  //     });

  //     this.setState({
  //       currentCategory: [
  //         {
  //           id: "",
  //           name: "categories",
  //         },
  //       ],
  //     });
  //   });
  // }
  // explore = (e, name) => {
  //   var sessionId = sessionStorage.getItem("RoleId");
  //   var businessId = sessionStorage.getItem("businessId");
  //   e.preventDefault();
  //   let { id } = e.target;

  //   let exp = firebase
  //     .database()
  //     .ref("/dummy")
  //     .orderByChild("sessionId")
  //     .equalTo(sessionStorage.getItem("RoleId"));
  //   console.log("id", id, "name", name);
  //   exp.on("value", async (snapshot) => {
  //     const data = [];
  //     snapshot.forEach((childSnapShot) => {
  //       const GSTData = {
  //         categoryId: childSnapShot.key.toString(),

  //         name: childSnapShot.val().name,
  //         isParent: childSnapShot.val().isParent,
  //         photo: childSnapShot.val().photo,
  //         color: childSnapShot.val().color,
  //         created_on: childSnapShot.val().created_on,
  //         parentId: childSnapShot.val().parentId,
  //         sessionId: childSnapShot.val().sessionId,
  //         username: childSnapShot.val().username,
  //       };
  //       data.push(GSTData);
  //     });
  //     let businessid = data.filter((res) => {
  //       return res.businessId === businessId;
  //     });

  //     let sortedKeys = businessid.filter((res) => {
  //       return res.parentId === "";
  //     });
  //     this.setState({
  //       CategoryList: sortedKeys,
  //       countPage: data.length,
  //       loading: false,
  //     });
  //     let arr = this.state.currentCategory;
  //     for (let i = 0; i < this.state.currentCategory.length; i++) {
  //       console.log(arr);
  //       console.log(arr[i]);
  //       if (arr[i].id === id) {
  //         arr = arr.slice(0, i);
  //         break;
  //       }
  //     }
  //     console.log(arr);

  //     arr.push({
  //       id: id,
  //       name: name,
  //     });
  //     await this.setState({ currentCategory: arr });
  //     console.log(this.state.currentCategory);
  //   });
  // };

  itemCategoryList() {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({ loading: true });
    var ref = firebase
      .database()
      .ref("dummy/")
      .orderByChild("businessId")
      .equalTo(businessId);

    ref.on("value", (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapShot) => {
        const GSTData = {
          categoryId: childSnapShot.key.toString(),
          name: childSnapShot.val().name,
          isParent: childSnapShot.val().isParent,
          photo: childSnapShot.val().photo,
          color: childSnapShot.val().color,
          created_on: childSnapShot.val().created_on,
          parentId: childSnapShot.val().parentId,
          sessionId: childSnapShot.val().sessionId,
          username: childSnapShot.val().username,
        };

        data.push(GSTData);
      });
      let sortedKeys = data.filter((res) => {
        return res.parentId === "";
      });

      this.setState({
        CategoryList: sortedKeys,
        countPage: data.length,
        loading: false,
      });

      this.setState({
        currentCategory: [
          {
            id: "",
            name: "categories",
          },
        ],
      });
    });
  }
  explore = (e, name) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    e.preventDefault();
    let { id } = e.target;

    let exp = firebase
      .database()
      .ref("/dummy")
      .orderByChild("businessId")
      .equalTo(businessId);
    console.log("id", id, "name", name);
    exp.on("value", async (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapShot) => {
        const GSTData = {
          categoryId: childSnapShot.key.toString(),

          name: childSnapShot.val().name,
          isParent: childSnapShot.val().isParent,
          photo: childSnapShot.val().photo,
          color: childSnapShot.val().color,
          created_on: childSnapShot.val().created_on,
          parentId: childSnapShot.val().parentId,
          sessionId: childSnapShot.val().sessionId,
          username: childSnapShot.val().username,
        };
        data.push(GSTData);
      });
      let sortedKeys = data.filter((res) => {
        return res.parentId === id;
      });
      this.setState({
        CategoryList: sortedKeys,
        countPage: data.length,
        loading: false,
      });
      let arr = this.state.currentCategory;
      for (let i = 0; i < this.state.currentCategory.length; i++) {
        console.log(arr);
        console.log(arr[i]);
        if (arr[i].id === id) {
          arr = arr.slice(0, i);
          break;
        }
      }
      console.log(arr);

      arr.push({
        id: id,
        name: name,
      });
      await this.setState({ currentCategory: arr });
      console.log(this.state.currentCategory);
    });
  };

  itemMenuList = () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({ loading: true });
    var ref = firebase
      .database()
      .ref("merchant_menu_items/")
      .orderByChild("sessionId")
      .equalTo(sessionId);

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

          item_type: childSnapShot.val().item_type,
          item_hash_tags: childSnapShot.val().item_hash_tags,
          item_price: childSnapShot.val().item_price,
          item_tax: childSnapShot.val().item_tax,

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
          sessionId: childSnapShot.val().sessionId,
          businessId: childSnapShot.val().businessId,
          categoryId: this.state.categoryId,
        };

        data.push(GSTData);
      });

      let sortedKeys = data.filter((res) => {
        return res.businessId === businessId;
      });

      this.setState({
        itemMenuList: sortedKeys,
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
      .then((url) => this.setState({ photo: url }));
  };

  //   handleSubmit = async (event) => {
  //     event.preventDefault();
  //     if (this.validator.allValid()) {
  //       var sessionId = sessionStorage.getItem("RoleId");
  //       var username = sessionStorage.getItem("username");
  //       var businessId = sessionStorage.getItem("businessId");
  //       let dbCon = firebase.database().ref("/dummy");

  //       await dbCon.push({
  //         name: this.state.name,
  //         isParent: false,
  //         photo: this.state.photo,
  //         color: this.state.color,
  //         parentId: this.state.parentId,
  //         sessionId: sessionId,
  //         username: username,
  //         businessId: businessId,
  //         itemId:this.state.itemId,
  //       });

  //       if(this.state.parentId !== "")
  //       await firebase
  //         .database()
  //         .ref("/dummy/" +this.state.parentId )
  //         .update({ isParent: true });

  //       window.location.href = "/AddCategoryMenuDuplicate";
  //     } else {
  //       this.validator.showMessages();
  //       this.forceUpdate();
  //     }
  //   };
  // temp=async ()=>{

  //  let res = await firebase.firestore().collection("cities")
  //  .where("name", "==", "Tokyo").where("country",'array-contains-any',["Mumbai","chennai"])    .get()

  // if(res.docs.length>0){
  //   for(const doc of res.docs){
  //     console.log(doc.id, '=>', doc.data());
  //   }
  // }
  // else{
  //   console.log("no data present")
  // }

  // }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");

      await firebase.firestore().collection("dummy").add({
        name: this.state.name,
        isParent: false,
        photo: this.state.photo,
        color: this.state.color,
        parentId: this.state.parentId,
        sessionId: sessionId,
        username: username,
        businessId: businessId,
        itemId: this.state.itemId,
      });

      if (this.state.parentId !== "")
        await firebase
          .firestore()
          .ref("/dummy/" + this.state.parentId)
          .update({ isParent: true });

      window.location.href = "/AddCategoryMenuDuplicate";
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  // temp=async ()=>{

  // let res = await firebase.firestore().collection("cities")
  // .where("name", "==", "Tokyo").where("country",'array-contains-any',["Mumbai","chennai"])    .get()

  // if(res.docs.length>0){
  // for(const doc of res.docs){
  //   console.log(doc.id, '=>', doc.data());
  // }
  // }
  // else{
  // console.log("no data present")
  // }

  // }

  CategoryChange = (e) => {
    this.setState({
      name: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = firebase
        .database()
        .ref("items_categories/")
        .orderByChild("name")
        .equalTo(e.target.value);
      ref.on("value", (snapshot) => {
        var user_exist = snapshot.numChildren();

        if (user_exist > 0 && this.state.validError != true) {
          this.setState({
            name_message: " Category Name already exist",
            validError: false,
          });
        } else {
          this.setState({ name_message: "", validError: true });
        }
      });
    }
  };

  selectcategory = async (id, name) => {
    console.log(id);
    // let arr = this.state.currentCategory;
    // let k =1;
    //   for (let i = 0; i < this.state.currentCategory.length; i++) {
    //     console.log(arr);
    //     console.log(arr[i]);
    //     if (arr[i].id === id) {
    //       arr = arr.slice(0, i);
    //       break;
    //     }
    //   }
    this.setState({ parentName: name });
    //   console.log(arr);

    //   arr.push({
    //     id: id,
    //     name: name,
    //   });
    //   await this.setState({ currentCategory: arr });
    //   console.log(this.state.currentCategory);
    await this.setState({
      parentId: id,
    });
  };

  selectItem = (id) => {
    // var color = document.getElementById("color");
    // color.classList.remove("bg_green");
    console.log(id);
    let temparr = this.state.itemId;
    let index = temparr.indexOf(id);
    if (index > -1) {
      temparr.splice(index, 1);
    } else {
      temparr.push(id);
    }
    this.setState({ itemId: temparr });

    let data = firebase
      .database()
      .ref("/merchant_menu_items/" + id)
      .update({ categoryId: true });

    return data;
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
                    <button type="button" onClick={this.temp}>
                      temp
                    </button>
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
                                {" "}
                                name
                              </label>
                            </div>
                            <div className="col-12 col-md-8">
                              <input
                                type="text"
                                name="name"
                                onChange={this.CategoryChange}
                                value={this.state.name}
                                placeholder="Main course"
                                className="form-control"
                              />
                            </div>
                            {this.validator.message(
                              "Category Name",
                              this.state.name,
                              "required|whitespace|min:2|max:70"
                            )}
                            <div className="text-danger">
                              {" "}
                              {this.state.name_message}
                            </div>
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
                                <option value="select">select</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                              </select>
                            </div>
                            {this.validator.message(
                              "IsParent  ",
                              this.state.IsParent,
                              "required"
                            )}
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
                              <div className="col-md-3">
                                {this.state.photo && (
                                  <img src={this.state.photo} />
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

                            <div class="row">
                              {this.state.itemId &&
                                this.state.itemId.map((item, index) => {
                                  return (
                                    <div
                                      class="col-md-4 product_box"
                                      key={index}
                                    >
                                      <div class="product_box_item">
                                        <div class="product_item_row m-b-20">
                                          <div class="left">
                                            <div class="img_box">
                                              <span class="star_yellow">
                                                <img src="images/icon/star_rate_ye.svg" />
                                              </span>
                                              <img src="images/category_img.png" />
                                            </div>
                                          </div>
                                          <div class="right">
                                            <p>
                                              <span class="item_recipe">
                                                <span class="dot veg"></span>
                                              </span>
                                              <span class="btn best_seller">
                                                BESTSELLER
                                              </span>
                                            </p>
                                            <p class="item_name">
                                              {item.itemId}
                                            </p>
                                            <p class="price">₹ 220.00</p>
                                          </div>
                                        </div>

                                        <div class="product_item_row">
                                          <div class="left">
                                            <span class="btn remove_btn pull-left">
                                              Remove
                                            </span>
                                          </div>
                                          <div class="right">
                                            <span class="btn edit_btn">
                                              Edit
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
                      </div>
                    </div>

                    <div className="row mb-30 mt-30">
                      <div className="w-100-row m-t-20 text-center">
                        <span className="btn cancel_btn2">
                          <Link to="/AddCategoryMenuDuplicate">Cancel</Link>
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
                {/* <div
                  className='breadcrumbs'
                  style={{ fontSize: "12px", display: "flex" }}
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
                </div> */}

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

                                {category.isParent === true ? (
                                  <button
                                    className="btn m-t-10 btn_explore"
                                    // data-toggle='modal'
                                    // data-target='#add_parent_category'
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
                                    <span
                                      className="btn remove_btn pull-left bg_green"
                                      id="color"
                                      onClick={this.selectItem.bind(
                                        this,
                                        item.itemmenuid
                                      )}
                                    >
                                      Add
                                    </span>

                                    {/* <span className="btn remove_btn pull-left">Remove</span> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

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

export default AddCategoryMenuDuplicate;
