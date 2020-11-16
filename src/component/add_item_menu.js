import React from "react";
import firebase from "../config";
import Sidebar from "./sidebar";
import Header from "./header";
import SimpleReactValidator from "simple-react-validator";
import FileUploader from "react-firebase-file-uploader";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
// import Modal from 'react-responsive-modal';
import AddItemType from "./add_item_type";
import AddStation from "./add_station";
import Select from "react-select";
class AddItemMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open1: false,
      created_on: new Date().toLocaleString(),
      item_id: "",
      item_name: "",
      item_description: "",
      item_halal: "",
      item_image: "",
      item_points: "",

      station_name: "",
      item_restaurant_id: "",
      item_type: "",
      // item_hash_tags:'',

      item_hash_tags: [],
      input: "",
      bestrecommendation: "UnSelect",

      item_price: "",
      item_tax: "",

      category: "",
      sub_category: "",

      employer_sevice_message: "",
      validError: false,
      mobile_message: "",
      name_message: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
      filenames: [],

      uploadProgress: 0,
      downloadURLs: [],

      advance: "",
      carbs: "",
      protien: "",
      fat: "",
      item_video: "",
      item_multiple_image: "",

      extra: "",
      healthytag: "",
      bestsellertag: "",

      recommendations: [
        {
          recommenditem: "",
        },
      ],

      portions_details: [
        {
          name: "",

          price: "",
        },
      ],

      //     printer_details:[
      // {
      //     printer_name:'',
      // }
      //     ]
      currentCategory: [{}],
      stationList: [],
      selectedOption1: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);

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

    this.itemTypeList();
    this.stationList();
    this.itemMenuList();
    this.itemCategoryList();
  }

  itemMenuList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await firebase
      .firestore()
      .collection("menuitems2")
      .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
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
        // console.log(itemTypeList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  itemTypeList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await firebase
      .firestore()
      .collection("ItemType")
      .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            itemtypeId: childSnapShot.id,
            item_type: childSnapShot.data().item_type,
            color: childSnapShot.data().color,
            created_on: childSnapShot.data().created_on,
            businessId: childSnapShot.data().businessId,
            sessionId: childSnapShot.data().sessionId,
          };

          data.push(GSTData);
        });
        this.setState({
          itemTypeList: data,
          countPage: data.length,
          loading: false,
        });
        // console.log(itemTypeList);
      })
      .catch((err) => {
        console.log(err);
      });
    this.componentDidMount();
  };

  itemCategoryList = () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({ loading: true });
    firebase
      .firestore()

      .collection("categories2")
      .where("sessionId", "==", sessionId)
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
        console.log(err);
      });
  };

  explore = async (e, name) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    e.preventDefault();
    let { id } = e.target;
    firebase
      .firestore()
      .collection("categories2")
      .where("sessionId", "==", sessionId)
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
        this.setState({ currentCategory: arr });
        console.log(this.state.currentCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // stationList = async () => {
  //   var sessionId = sessionStorage.getItem("RoleId");
  //   var businessId = sessionStorage.getItem("businessId");

  //   this.setState({ loading: true });
  //   await firebase
  //     .firestore()
  //     .collection("settings_station")
  //     .where("sessionId", "==", sessionId)
  //     .where("businessId", "==", businessId)
  //     .get()
  //     .then((querySnapshot) => {
  //       var stationList = [];
  //       querySnapshot.forEach((doc) => {
  //         const GSTData = {
  //           stationId: doc.id,
  //           station_name: doc.data().station_name,
  //           businessId: doc.data().businessId,
  //           sessionId: doc.data().sessionId,
  //         };

  //         stationList.push(GSTData);
  //       });
  //       this.setState({ stationList: stationList });
  //       console.log(stationList);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  stationList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await firebase
      .firestore()
      .collection("settings_station")
      .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var stationList = [];
        querySnapshot.forEach((doc) => {
          const GSTData = {
            stationId: doc.id,
            station_name: doc.data().station_name,
            businessId: doc.data().businessId,
            sessionId: doc.data().sessionId,
            value: doc.data().station_name,
            label: doc.data().station_name,
          };
          stationList.unshift(GSTData);
        });

        this.setState(
          {
            stationList: stationList,
          },
          () => {
            console.log(this.state.stationList, "stationList");
          }
        );
      });
  };

  selectcategory = async (id, name) => {
    console.log(id);
    console.log(id);

    let array = [];
    array.push(id);
    this.setState({ parentName: name });

    await this.setState({
      parentId: array,
    });
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onOpenModal1 = () => {
    this.setState({ open1: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  onCloseModal1 = () => {
    this.setState({ open1: false });
  };

  handleInputChange(evt) {
    this.setState({ input: evt.target.value });
  }

  handleInputKeyDown(evt) {
    if (evt.keyCode === 17) {
      const { value } = evt.target;

      this.setState((state) => ({
        item_hash_tags: [...state.item_hash_tags, value],
        input: "",
      }));
    }

    if (
      this.state.item_hash_tags.length &&
      evt.keyCode === 8 &&
      !this.state.input.length
    ) {
      this.setState((state) => ({
        item_hash_tags: state.item_hash_tags.slice(
          0,
          state.item_hash_tags.length - 1
        ),
      }));
    }
  }

  handleRemoveItem(index) {
    return () => {
      this.setState((state) => ({
        item_hash_tags: state.item_hash_tags.filter((item, i) => i !== index),
      }));
    };
  }

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
      .then((url) => this.setState({ item_image: url }));
  };
  handleItemVideoSuccess = (filename) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ item_video: url }));
  };

  handleUploadSuccess = async (filename) => {
    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();

    this.setState((oldState) => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: 100,
      isUploading: false,
    }));
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRemoveShareholder = (idx) => () => {
    this.setState({
      recommendations: this.state.recommendations.filter(
        (s, sidx) => idx !== sidx
      ),
    });
  };

  handleShareholderNameChange = (idx) => (evt) => {
    const recommendations = this.state.recommendations.map(
      (recommendations, sidx) => {
        if (idx !== sidx) return recommendations;
        return {
          ...recommendations,
          [evt.target.name]: evt.target.value,
        };
      }
    );

    this.setState({ recommendations: recommendations });
  };

  handleAddShareholder = () => {
    this.setState({
      recommendations: this.state.recommendations.concat([
        {
          recommenditem: "",
        },
      ]),
    });
  };

  handlePortionRemoveShareholder = (idx) => () => {
    this.setState({
      portions_details: this.state.portions_details.filter(
        (s, sidx) => idx !== sidx
      ),
    });
  };

  handlePortionShareholderNameChange = (idx) => (evt) => {
    const portions_details = this.state.portions_details.map(
      (portions_details, sidx) => {
        if (idx !== sidx) return portions_details;
        return {
          ...portions_details,
          [evt.target.name]: evt.target.value,
        };
      }
    );

    this.setState({ portions_details: portions_details });
  };

  handlePortionAddShareholder = () => {
    this.setState({
      portions_details: this.state.portions_details.concat([
        {
          price: "",
        },
      ]),
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      let dbCon = await firebase.firestore().collection("menuitems2");
      var key = Math.round(new Date().getTime() / 1000);

      let dbcon1 = await dbCon.add({
        item_unique_id: key,

        item_id: this.state.item_id,
        item_name: this.state.item_name,
        item_description: this.state.item_description,
        item_halal: this.state.item_halal,
        item_image: this.state.item_image,
        item_points: this.state.item_points,

        station_name: this.state.selectedOption1,
        // station_name: this.state.station_name,
        // item_restaurant_id:this.state.item_restaurant_id,
        item_type: this.state.item_type,
        item_hash_tags: this.state.item_hash_tags,
        item_price: this.state.item_price,
        item_tax: this.state.item_tax,

        sessionId: sessionId,
        status: this.state.status,
        username: username,

        portions: this.state.portions,
        portions_details: this.state.portions_details,

        advance: this.state.advance,
        carbs: this.state.carbs,
        protien: this.state.protien,
        fat: this.state.fat,
        item_video: this.state.item_video,
        item_multiple_image: this.state.downloadURLs,

        extra: this.state.extra,
        healthytag: this.state.healthytag,
        bestsellertag: this.state.bestsellertag,

        recommend: this.state.recommend,
        // recommenditem:this.state. recommenditem,
        recommendations: this.state.recommendations,

        created_on: this.state.created_on,
        bestrecommendation: "UnSelect",

        businessId: businessId,

        categoryId: this.state.parentId,
        // categoryId: this.state.CategoryList,
      });

      for (let i = 0; i < this.state.parentId.length; i++) {
        let result = await firebase
          .firestore()
          .collection("categories2")
          .doc(this.state.parentId[i])
          .update({
            itemId: firebase.firestore.FieldValue.arrayUnion(dbcon1.id),
          });
      }

      // window.location.href="/ViewItemMenu";
      this.props.history.push("/ViewItemMenu");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  itemidChange = (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      item_id: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = firebase
        .firestore()
        .collection("menuitems2/")
        .where("sessionId", "==", sessionId)
        .where("businessId", "==", businessId)
        .where("item_id", "==", e.target.value)

        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;
          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              mobile_message: "Item Id already exist",
              validError: false,
            });
          } else {
            this.setState({ mobile_message: "", validError: true });
          }
        });
    }
  };
  itemNameChange = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      item_name: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = await firebase
        .firestore()
        .collection("menuitems2/")
        .where("sessionId", "==", sessionId)
        .where("businessId", "==", businessId)
        .where("item_name", "==", e.target.value)

        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;
          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              name_message: "Item Name already exist",
              validError: false,
            });
          } else {
            this.setState({ name_message: "", validError: true });
          }
        });
    }
  };
  handleSelect1 = (selectedOption1) => {
    this.setState({ selectedOption1 });
    console.log(`Option selected:`, selectedOption1);
  };

  render() {
    const { open, open1, selectedOption1, stationList } = this.state;
    const styles = {
      container: {
        border: "1px solid #ddd",
        padding: "5px",
        borderRadius: "5px",
      },

      input: {
        outline: "none",
        border: "none",
        fontSize: "14px",
        fontFamily: "Helvetica, sans-serif",
      },
    };

    return (
      <>
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
                        <span className="btn add_categoty_menu">
                          {" "}
                          <span className="active"></span> items
                        </span>
                      </Link>
                      <Link to="/AddCategoryMenuDuplicate">
                        <span className="btn add_categoty_menu">Category</span>
                      </Link>

                      <span className="btn add_categoty_menu"> coupon</span>
                    </div>
                  </div>

                  <Form onSubmit={this.handleSubmit}>
                    <div className="row mt-30">
                      <div className="col-md-7 p-0">
                        <div className="orders_menu">
                          <ul>
                            <li>
                              <a href="/AddItemMenu" className="activemenu">
                                Add Items
                              </a>
                            </li>
                            <li>
                              <a href="/ViewItemMenu">View Items</a>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-md-5 p-0">
                        <div className="form-group">
                          <button type="submit" className="btn save_btn_menu">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-30">
                      <div className="col-md-12 p-0">
                        <div className="category_upload_image">
                          <h1>Item Primary Info</h1>
                          <div className="upload_img_block add_menu">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Item ID
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      type="text"
                                      id="text-input"
                                      name="item_id"
                                      value={this.state.item_id}
                                      placeholder="IT10002345"
                                      onChange={this.itemidChange}
                                      className="form-control"
                                    />
                                    {this.validator.message(
                                      "Item Id",
                                      this.state.item_id,
                                      "required|whitespace|min:10|max:10"
                                    )}
                                    <div className="text-danger">
                                      {" "}
                                      {this.state.mobile_message}
                                    </div>
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Item Name
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      type="text"
                                      name="item_name"
                                      onChange={this.itemNameChange}
                                      value={this.state.item_name}
                                      placeholder="Item Name"
                                      className="form-control"
                                    />
                                    {this.validator.message(
                                      "Item Name",
                                      this.state.item_name,
                                      "required|whitespace|min:2|max:70"
                                    )}
                                    <div className="text-danger">
                                      {" "}
                                      {this.state.name_message}
                                    </div>
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Item Description
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <textarea
                                      name="item_description"
                                      onChange={this.onChange}
                                      value={this.state.item_description}
                                      rows="3"
                                      placeholder="Enter text here"
                                      className="form-control"
                                    ></textarea>
                                    {this.validator.message(
                                      "Item Description",
                                      this.state.item_description,
                                      "required|whitespace|min:2|max:70"
                                    )}
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Halal
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <select
                                      name="item_halal"
                                      id="select"
                                      value={this.state.item_halal}
                                      onChange={this.onChange}
                                      className="form-control"
                                    >
                                      <option value="select">select</option>
                                      <option value="Yes">Yes</option>
                                      <option value="NO">NO</option>
                                    </select>
                                    {this.validator.message(
                                      "Halal",
                                      this.state.item_halal,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      images
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    {this.state.item_image && (
                                      <img
                                        src={this.state.item_image}
                                        width="50%"
                                        height="50%"
                                      />
                                    )}
                                    <FileUploader
                                      accept="image/*"
                                      name="item_image"
                                      randomizeFilename
                                      storageRef={firebase
                                        .storage()
                                        .ref("images")}
                                      onUploadStart={
                                        this.handleFrontImageUploadStart
                                      }
                                      onUploadError={this.handleUploadError}
                                      onUploadSuccess={
                                        this.handleItemPhotoSuccess
                                      }
                                      onProgress={this.handleProgress}
                                    />
                                    {this.validator.message(
                                      "Image",
                                      this.state.item_image,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Add Points
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      type="number"
                                      name="item_points"
                                      onChange={this.onChange}
                                      value={this.state.item_points}
                                      placeholder="34+"
                                      className="form-control"
                                    />
                                    {this.validator.message(
                                      "Item Points",
                                      this.state.item_points,
                                      "required|min:1|max:3"
                                    )}
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Status
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <select
                                      name="status"
                                      onChange={this.onChange}
                                      value={this.state.status}
                                      className="form-control"
                                    >
                                      <option value="select">select</option>
                                      <option value="Active">Active</option>
                                      <option value="InActive">InActive</option>
                                    </select>
                                    {this.validator.message(
                                      "status",
                                      this.state.status,
                                      "required"
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Station Name
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    {/* <select
                                      className="form-control pro-edt-select form-control-primary"
                                      name="station_name"
                                      onChange={this.onChange}
                                    >
                                      <option>Select Station Name</option>
                                      {this.state.stationList &&
                                        this.state.stationList.map(
                                          (data, index) => {
                                            return (
                                              <option
                                                value={data.station_name}
                                                key={index}
                                              >
                                                {data.station_name}
                                              </option>
                                            );
                                          }
                                        )}
                                    </select> */}
                                    <Select
                                      value={selectedOption1}
                                      onChange={this.handleSelect1}
                                      options={stationList}
                                      isMulti
                                      name="station_name"
                                      className="basic-multi-select"
                                      classNamePrefix="select"
                                    />

                                    <div
                                      onClick={this.onOpenModal1}
                                      className="btn add_btn_pop_orange addmode_pad m-t-15"
                                    >
                                      Add Station
                                    </div>
                                    {this.validator.message(
                                      "Station Name",
                                      this.state.selectedOption1,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Business ID
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      value={sessionStorage.getItem(
                                        "businessId"
                                      )}
                                      className="form-control"
                                    />
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Item Type
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <select
                                      className="form-control pro-edt-select form-control-primary"
                                      name="item_type"
                                      onChange={this.onChange}
                                    >
                                      <option>Select Item Type</option>
                                      {this.state.itemTypeList &&
                                        this.state.itemTypeList.map(
                                          (data, index) => {
                                            return (
                                              <option
                                                value={data.item_type}
                                                key={index}
                                              >
                                                {data.item_type}
                                              </option>
                                            );
                                          }
                                        )}
                                    </select>

                                    {/* <Link to="/AddItemType"></Link> */}
                                    <div
                                      onClick={this.onOpenModal}
                                      className="btn add_btn_pop_orange addmode_pad m-t-15"
                                    >
                                      Type Your own
                                    </div>
                                    {this.validator.message(
                                      "Item Type",
                                      this.state.item_type,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Hash Tags
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <ul
                                      className="hashtags"
                                      style={styles.container}
                                    >
                                      {this.state.item_hash_tags.map(
                                        (item, i) => (
                                          <li
                                            key={i}
                                            onClick={this.handleRemoveItem(i)}
                                          >
                                            {item}
                                            {/* (x) */}
                                          </li>
                                        )
                                      )}
                                      <input
                                        style={styles.input}
                                        value={this.state.input}
                                        onChange={this.handleInputChange}
                                        onKeyDown={this.handleInputKeyDown}
                                      />
                                    </ul>
                                    {/* <input type="text" name="item_hash_tags" onChange={this.onChange} value={this.state.item_hash_tags} className="form-control"/> */}

                                    <div>
                                      Press <b>Ctrl</b> To Enter the Hash Tag
                                    </div>
                                    {this.validator.message(
                                      "hash Tags",
                                      this.state.item_hash_tags,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Price
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <span class="pull-left">
                                      <select
                                        name="select"
                                        id="select"
                                        class="form-control"
                                      >
                                        <option value="0">₹</option>
                                      </select>
                                    </span>
                                    <span class="pull-left line-40 price_text">
                                      <input
                                        type="number"
                                        name="item_price"
                                        onChange={this.onChange}
                                        value={this.state.item_price}
                                        placeholder="Price"
                                        className="form-control"
                                      />
                                    </span>
                                    {this.validator.message(
                                      "Price",
                                      this.state.item_price,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Tax
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <input
                                      type="number"
                                      name="item_tax"
                                      onChange={this.onChange}
                                      value={this.state.item_tax}
                                      placeholder="Tax in %"
                                      className="form-control"
                                    />
                                    {this.validator.message(
                                      "Tax",
                                      this.state.item_tax,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Add to Catagory
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8 menu_cate_links">
                                    <span>
                                      {/* <a href="#">Menu</a>/<a href="#">MainCourse</a> */}

                                      <div
                                        className="breadcrumbs"
                                        style={{
                                          fontSize: "12px",
                                          display: "flex",
                                        }}
                                      >
                                        {this.state.currentCategory.map(
                                          (i, index) => (
                                            <p
                                              style={{ marginLeft: "3px" }}
                                              id={i.id}
                                            >
                                              {" "}
                                              &gt; {i.name}{" "}
                                            </p>
                                          )
                                        )}
                                        <p>
                                          <p style={{ marginLeft: "3px" }}>
                                            {" "}
                                            &gt; {this.state.parentName}{" "}
                                          </p>
                                        </p>
                                      </div>
                                    </span>
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-12">
                                    {/* <button type="button" className="btn btn-secondary mb-1" data-toggle="modal" data-target="#choose_category">
Choose Category
</button> */}
                                    <span
                                      className="pull-right addmore_btn"
                                      data-toggle="modal"
                                      data-target="#choose_category"
                                    >
                                      Choose Catagory
                                    </span>
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
                          <h1>
                            Portions
                            <span className="head_drop">
                              <select
                                name="portions"
                                onChange={this.onChange}
                                value={this.state.portions}
                                id="select"
                                className="form-control edit_portion"
                              >
                                <option value="0">select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </span>
                            {this.validator.message(
                              "portions",
                              this.state.portions,
                              "required"
                            )}
                          </h1>

                          {this.state.portions == "Yes" ? (
                            <div className="upload_img_block add_menu">
                              {this.state.portions_details &&
                                this.state.portions_details
                                  // .slice(0, this.state.desired_Machines)
                                  .map((portions_details, idx) => (
                                    <div className="row m-t-20" key={idx}>
                                      <div className="col-md-3">
                                        <label className=" form-control-label">
                                          {idx + 1}. Portions{" "}
                                        </label>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="row form-group">
                                          <div className="col col-md-4">
                                            <label className=" form-control-label">
                                              {" "}
                                              Name
                                            </label>
                                          </div>
                                          <div className="col-12 col-md-8">
                                            <input
                                              type="text"
                                              id="text-input"
                                              name="name"
                                              value={portions_details.name}
                                              onChange={this.handlePortionShareholderNameChange(
                                                idx
                                              )}
                                              placeholder="Full"
                                              className="form-control"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-md-3">
                                        <div className="row form-group">
                                          <div className="col-md-4">
                                            <label className=" form-control-label pull-right">
                                              Price
                                            </label>
                                          </div>
                                          <div className="col-12 col-md-8">
                                            <input
                                              type="text"
                                              id="text-input"
                                              name="price"
                                              value={portions_details.price}
                                              onChange={this.handlePortionShareholderNameChange(
                                                idx
                                              )}
                                              placeholder="200"
                                              className="form-control"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      {idx != 0 ? (
                                        <button
                                          type="button"
                                          onClick={this.handlePortionRemoveShareholder(
                                            idx
                                          )}
                                          className="btn btn-danger m-r-10"
                                        >
                                          Remove
                                        </button>
                                      ) : (
                                        ""
                                      )}

                                      <button
                                        type="button"
                                        onClick={
                                          this.handlePortionAddShareholder
                                        }
                                        className="btn create_add_more_btn m-r-10"
                                      >
                                        Add More
                                      </button>
                                    </div>
                                  ))}
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
                          <h1>
                            Advance
                            <span className="head_drop">
                              <select
                                name="advance"
                                onChange={this.onChange}
                                value={this.state.advance}
                                id="select"
                                className="form-control edit_portion"
                              >
                                <option value="0">select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </span>
                            {this.validator.message(
                              "advance",
                              this.state.advance,
                              "required"
                            )}
                          </h1>

                          {this.state.advance == "Yes" ? (
                            <div className="upload_img_block add_menu">
                              <div className="row diet_row">
                                <div className="col-md-4">
                                  <span>Carbs</span>
                                  <span>
                                    <input
                                      type="number"
                                      name="carbs"
                                      onChange={this.onChange}
                                      value={this.state.carbs}
                                      className="form-control"
                                    />
                                  </span>
                                </div>
                                {this.validator.message(
                                  "carbs",
                                  this.state.carbs,
                                  "required"
                                )}
                                <div className="col-md-4">
                                  <span>Protien</span>
                                  <span>
                                    <input
                                      type="number"
                                      name="protien"
                                      onChange={this.onChange}
                                      value={this.state.protien}
                                      className="form-control"
                                    />
                                  </span>
                                </div>
                                {this.validator.message(
                                  "protien",
                                  this.state.protien,
                                  "required"
                                )}
                                <div className="col-md-4">
                                  <span>Fat</span>
                                  <span>
                                    <input
                                      type="number"
                                      name="fat"
                                      onChange={this.onChange}
                                      value={this.state.fat}
                                      className="form-control"
                                    />
                                  </span>
                                </div>

                                {this.validator.message(
                                  "fat",
                                  this.state.fat,
                                  "required"
                                )}
                              </div>

                              <div className="row m-t-20">
                                <div className="col-md-5">
                                  <div className="row form-group">
                                    <div className="col col-md-4">
                                      <label className=" form-control-label">
                                        Add Intro <br></br>
                                        Video/ GIF
                                      </label>
                                    </div>
                                    <div className="col-12 col-md-8">
                                      {this.state.item_video && (
                                        <video
                                          controls
                                          width="80%"
                                          height="80%"
                                          src={this.state.item_video}
                                        />
                                      )}
                                      <FileUploader
                                        accept="video/*"
                                        name="item_video"
                                        randomizeFilename
                                        storageRef={firebase
                                          .storage()
                                          .ref("images")}
                                        onUploadStart={
                                          this.handleFrontImageUploadStart
                                        }
                                        onUploadError={this.handleUploadError}
                                        onUploadSuccess={
                                          this.handleItemVideoSuccess
                                        }
                                        onProgress={this.handleProgress}
                                      />
                                    </div>

                                    {/* {this.validator.message("Video", this.state.item_video, "required")} */}
                                  </div>
                                </div>

                                <div className="col-md-7">
                                  <div className="row form-group">
                                    <div className="col col-md-3">
                                      <label className=" form-control-label">
                                        Add Image
                                      </label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                      {/* <div className="upload_img upload_small">
 <div className="form-group">
    <div className="img_show product_img_small"><img id="img-upload"/></div>
       <div className="input-group">
            <span className="input-group-btn">
                <span className="btn btn-default btn-file">
                    Upload An Image <input type="file" id="imgInp"/>
                </span>
            </span>
            <input type="text" className="form-control" readonly=""/>
        </div>
        
    </div>
    </div>
    
    <div className="upload_img upload_small">
 <div className="form-group">
    <div className="img_show product_img_small"><img id="img-upload"/></div>
       <div className="input-group">
            <span className="input-group-btn">
                <span className="btn btn-default btn-file">
                    Upload An Image <input type="file" id="imgInp"/>
                </span>
            </span>
            <input type="text" className="form-control" readonly=""/>
        </div>
        
    </div>
    </div>
    
    <div className="upload_img upload_small">
 <div className="form-group">
    <div className="img_show product_img_small"><img id="img-upload"/></div>
       <div className="input-group">
            <span className="input-group-btn">
                <span className="btn btn-default btn-file">
                    Upload An Image <input type="file" id="imgInp"/>
                </span>
            </span>
            <input type="text" className="form-control" readonly=""/>
        </div>
        
    </div>
    </div> */}

                                      {/* {this.state.isUploading && (
                                        <p>
                                          Filenames:{" "}
                                          {this.state.filenames.join(", ")}
                                        </p>
                                      )} */}

                                      <div>
                                        {this.state.downloadURLs &&
                                          this.state.downloadURLs.map(
                                            (downloadURL, i) => {
                                              return (
                                                <img
                                                  key={i}
                                                  src={downloadURL}
                                                  style={{
                                                    height: "30%",
                                                    width: "30%",
                                                    marginRight: "5px",
                                                    marginTop: "5px",
                                                  }}
                                                />
                                              );
                                            }
                                          )}
                                      </div>
                                      <FileUploader
                                        accept="image/*"
                                        name="image-uploader-multiple"
                                        randomizeFilename
                                        storageRef={firebase
                                          .storage()
                                          .ref("images")}
                                        onUploadStart={this.handleUploadStart}
                                        onUploadError={this.handleUploadError}
                                        onUploadSuccess={
                                          this.handleUploadSuccess
                                        }
                                        onProgress={this.handleProgress}
                                        multiple
                                      />

                                      {this.validator.message(
                                        "Multiple Image",
                                        this.state.downloadURLs,
                                        "required|min:3|max:3"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </Form>

                  <div className="row mt-30">
                    <div className="col-md-12 p-0">
                      <div className="category_upload_image">
                        <h1>
                          Recommendation
                          <span className="head_drop">
                            <select
                              name="recommend"
                              onChange={this.onChange}
                              value={this.state.recommend}
                              id="select"
                              className="form-control edit_portion"
                            >
                              <option value="0">select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </span>
                          {this.validator.message(
                            "Recommendation",
                            this.state.recommend,
                            "required"
                          )}
                        </h1>

                        {this.state.recommend == "Yes" ? (
                          <div className="upload_img_block add_menu">
                            <div className="row">
                              <div className="col-md-6">
                                {this.state.recommendations
                                  // .slice(0, this.state.desired_Machines)
                                  .map((recommendations, idx) => (
                                    <div className="row form-group" key={idx}>
                                      <div className="col col-md-4">
                                        <label className=" form-control-label">
                                          Item {idx + 1}
                                        </label>
                                      </div>
                                      <div className="col-12 col-md-8">
                                        {/* <select
                                                      className="form-control edit_product"
                                                        name="printer_name"
                                                        // value={printer_details.printer_name}
                                                        onChange={this.handleprinterShareholderNameChange(idx)}>
                                                        <option>Select Printer ID</option>
                                                        {this.state.printeridList && this
                                                            .state
                                                            .printeridList
                                                            .map((data, index) => {

                                                                return (
                                                                    <option value={data.printer_id}  id={data} key={index}>{data.printer_id}</option>
                                                                )

                                                            })}

                                                    </select> */}
                                        <select
                                          name="recommenditem"
                                          value={recommendations.recommenditem}
                                          onChange={this.handleShareholderNameChange(
                                            idx
                                          )}
                                          id="select"
                                          className="form-control"
                                        >
                                          <option value="select">
                                            select Item
                                          </option>

                                          {this.state.itemMenuList &&
                                            this.state.itemMenuList.map(
                                              (data, index) => {
                                                return (
                                                  <option
                                                    value={data.item_name}
                                                    id={data}
                                                    key={index}
                                                  >
                                                    {data.item_name}
                                                  </option>
                                                );
                                              }
                                            )}
                                        </select>
                                        {this.validator.message(
                                          "Recommendation",
                                          recommendations.recommenditem,
                                          "required"
                                        )}
                                      </div>

                                      {idx != 0 ? (
                                        <button
                                          type="button"
                                          onClick={this.handleRemoveShareholder(
                                            idx
                                          )}
                                          className="btn btn-danger m-r-10"
                                        >
                                          Remove
                                        </button>
                                      ) : (
                                        ""
                                      )}

                                      <button
                                        type="button"
                                        onClick={this.handleAddShareholder}
                                        className="btn create_add_more_btn m-r-10"
                                      >
                                        Add More
                                      </button>
                                    </div>
                                  ))}
                              </div>
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
                        <h1>
                          Extra
                          <span className="head_drop">
                            <select
                              name="extra"
                              onChange={this.onChange}
                              value={this.state.extra}
                              id="select"
                              className="form-control edit_portion"
                            >
                              <option value="0">select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </span>
                          {this.validator.message(
                            "extra",
                            this.state.extra,
                            "required"
                          )}
                        </h1>

                        {this.state.extra == "Yes" ? (
                          <div className="upload_img_block add_menu">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Bestseller tag
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <select
                                      name="bestsellertag"
                                      onChange={this.onChange}
                                      value={this.state.bestsellertag}
                                      id="select"
                                      className="form-control"
                                    >
                                      <option value="0">select</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                    {this.validator.message(
                                      "Bestseller Tag",
                                      this.state.bestsellertag,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="row form-group">
                                  <div className="col col-md-4">
                                    <label className=" form-control-label">
                                      Healthy tag
                                    </label>
                                  </div>
                                  <div className="col-12 col-md-8">
                                    <select
                                      name="healthytag"
                                      onChange={this.onChange}
                                      value={this.state.healthytag}
                                      id="select"
                                      className="form-control"
                                    >
                                      <option value="0">select</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                    {this.validator.message(
                                      "Healthy tag",
                                      this.state.healthytag,
                                      "required"
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {open ? (
            <Modal open={open} onClose={this.onCloseModal}>
              <AddItemType onClose={this.onCloseModal} />
            </Modal>
          ) : (
            ""
          )}
          {open1 ? (
            <Modal open={open1} onClose={this.onCloseModal1}>
              <AddStation onClose={this.onCloseModal1} />
            </Modal>
          ) : (
            ""
          )}
        </div>

        <div
          className="modal fade"
          id="choose_category"
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
                              {/* <button data-dismiss="modal"> */}
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
                              {/* </button> */}

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
      </>
    );
  }
}

export default AddItemMenu;
