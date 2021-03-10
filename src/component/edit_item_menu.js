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
import AddItemType from "./add_item_type";
import AddStation from "./add_station";
class EditItemMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: [{}],
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

      item_hash_tags: [],
      input: "",
      bestrecommendation: "UnSelect",
      item_price:0,
      item_tax: 0,

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

      currentCategory: [{}],
      stationList: [],
      selectedOption1: null,
      selectedstations: [],
      categoryitemId: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.onStationAdd = this.onStationAdd.bind(this);
    this.onItemType = this.onItemType.bind(this);
    this.updateSelectedStations = this.updateSelectedStations.bind(this);
    this.updateSelectedStations1 = this.updateSelectedStations1.bind(this);
    this.onChange = this.onChange.bind(this);
    this.selectCategoryList = this.selectCategoryList.bind(this);
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

    this.itemTypeList();
    this.stationList();
    await this.itemMenuList();
    this.itemCategoryList();
  }

  itemMenuList = async () => {
    const { itemmenuid } = this.props.match.params;
    this.setState({ loading: true });
    let ref = await firebase
      .firestore()
      .collection("menuitems2")
      .doc(itemmenuid)
      .get()
      .then((snapshot) => {
        var items = snapshot.data();

        this.setState({
          item_unique_id: items.item_unique_id,

          item_id: items.item_id,
          item_name: items.item_name,
          item_description: items.item_description,
          item_halal: items.item_halal,
          item_image: items.item_image,
          item_points: items.item_points,

          selectedstations: items.station_name,

          item_type: items.item_type,
          item_hash_tags: items.item_hash_tags,
          item_price: items.item_price,
          item_tax: items.item_tax,

          sessionId: items.sessionId,
          businessId: items.businessId,

          status: items.status,
          username: items.username,

          portions: items.portions,
          portions_details: items.portions_details,

          advance: items.advance,
          carbs: items.carbs,
          protien: items.protien,
          fat: items.fat,
          item_video: items.item_video,
          item_multiple_image: items.downloadURLs,

          extra: items.extra,
          healthytag: items.healthytag,
          bestsellertag: items.bestsellertag,

          recommend: items.recommend,

          recommendations: items.recommendations,

          created_on: items.created_on,
          sessionId: items.sessionId,
          businessId: items.businessId,
        });
      });

    var businessId = sessionStorage.getItem("businessId");
    await firebase
      .firestore()
      .collection("categories2")
      .where("businessId", "==", businessId)
      .where("itemId", "array-contains-any", [itemmenuid])
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            idSelected: true,
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
          categoryitemId: data,
          countPage: data.length,
          loading: false,
        });
        console.log(this.state.categoryitemId);
      });
  };
  itemCategoryList = () => {
    var businessId = sessionStorage.getItem("businessId");
    this.setState({ loading: true });
    firebase
      .firestore()

      .collection("categories2")
      .where("businessId", "==", businessId)

      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            idSelected: false,
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

        console.log("categoryid", this.state.categoryitemId);
        console.log("category menu", this.state.CategoryList);
        let id = this.state.categoryitemId;
        let menu = this.state.CategoryList;
        for (let i = 0; i < id.length; i++) {
          for (let j = 0; j < menu.length; j++) {
            if (id[i].categoryId === this.state.CategoryList[j].categoryId) {
              menu[j].isSelected = !menu[j].isSelected;
              console.log("hererere");
              break;
            }
          }
        }

        this.setState({ CategoryList: menu });
      })
      .catch((err) => {});
  };

  onItemType = async (data) => {
    console.log(data);
    let temp = this.state.itemTypeList;
    temp.push(data);
    await this.setState({ itemTypeList: temp });
    this.forceUpdate();
  };
  itemTypeList = async () => {
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await firebase
      .firestore()
      .collection("ItemType")
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  selectCategoryList = async (id) => {
    console.log("selected id", id);

    let menu = this.state.CategoryList;
    for (let i = 0; i < this.state.CategoryList.length; i++) {
      if (this.state.CategoryList[i].categoryId === id) {
        menu[i].isSelected = !menu[i].isSelected;
        break;
      }
    }
    let filteredArr = this.state.CategoryList.filter(
      (d) => d.categoryId === id
    );
    filteredArr = filteredArr[0];
    let arr = this.state.categoryitemId;
    let k = 0;
    for (let i = 0; i < this.state.categoryitemId.length; i++) {
      if (this.state.categoryitemId[i].categoryId === id) {
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
    console.log("prev", this.state.categoryitemId);
    console.log("new", arr);
    await this.setState({ CategoryList: menu });
    await this.setState({ categoryitemId: arr });
  };

  onStationAdd = async (data) => {
    console.log(data);
    let temp = this.state.stationList;
    temp.push(data);
    await this.setState({ stationList: temp });
    this.forceUpdate();
  };
  stationList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await firebase
      .firestore()
      .collection("settings_station")

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
      const { itemmenuid } = this.props.match.params;
      var businessId = sessionStorage.getItem("businessId");
      let itemArray = [];
      for (let i = 0; i < this.state.categoryitemId.length; i++) {
        itemArray.push(this.state.categoryitemId[i].categoryId);
      }
      await firebase
        .firestore()
        .collection("menuitems2")
        .doc(itemmenuid)

        .update({
          item_id: this.state.item_id,
          item_name: this.state.item_name,
          item_description: this.state.item_description,
          item_halal: this.state.item_halal,
          item_image: this.state.item_image,
          item_points: this.state.item_points,

          station_name: this.state.selectedstations,
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
          recommendations: this.state.recommendations,

          created_on: this.state.created_on,
          bestrecommendation: "UnSelect",

          businessId: businessId,

          categoryId: itemArray,
        });
      console.log(itemArray);
      for (let i = 0; i < itemArray.length; i++) {
        await firebase
          .firestore()
          .collection("categories2")
          .where("businessId", "==", businessId)
          .get()
          .then((snap) => {
            snap.forEach((doc) => {
              doc.ref.update({
                itemId: firebase.firestore.FieldValue.arrayRemove(itemmenuid),
              });
            });
          });
      }

      for (let i = 0; i < itemArray.length; i++) {
        await firebase
          .firestore()
          .collection("categories2")
          .doc(itemArray[i])
          .update({
            itemId: firebase.firestore.FieldValue.arrayUnion(itemmenuid),
          });
      }

      window.location.href = "/ViewItemMenu";
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  itemidChange = (e) => {
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      item_id: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = firebase
        .firestore()
        .collection("menuitems2/")
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
        // .where("sessionId", "==", sessionId)
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
  updateSelectedStations = async (e) => {
    let val = e.target.id;
    let arr = this.state.selectedstations;
    console.log(arr.includes(val.toString()), val);

    if (arr.includes(val) === true) {
      let index = arr.indexOf(val);
      arr.splice(index, 1);
    }
    console.log(arr);
    await this.setState({ selectedstations: arr });
  };
  updateSelectedStations1 = async (e) => {
    console.log("dropdown select", e.target.value);
    let val = e.target.value;
    let arr = this.state.selectedstations;
    if (arr.includes(val) === false) {
      arr.push(val);
    }
    console.log(arr);
    this.setState({ selectedstations: arr });
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
                        <span className="btn add_categoty_menu">
                          {" "}
                          <span className="active"></span> items
                        </span>
                      </Link>
                      <Link to="/CategoryList">
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
                            {/* <li>
                              <a href="/AddItemMenu" className="activemenu">
                                Add Items
                              </a>
                            </li>
                            <li>
                              <a href="/ViewItemMenu">View Items</a>
                            </li> */}
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
                                      // onChange={this.itemidChange}
                                      className="form-control"
                                    />
                                    {/* {this.validator.message(
                                      "Item Id",
                                      this.state.item_id,
                                      "required|whitespace|min:10|max:10"
                                    )}
                                    <div className="text-danger">
                                      {" "}
                                      {this.state.mobile_message}
                                    </div> */}
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
                                      // rows="3"
                                      placeholder="Enter text here"
                                      className="form-control"
                                    ></textarea>
                                    {this.validator.message(
                                      "Item Description",
                                      this.state.item_description,
                                      "required|whitespace|min:2|max:500"
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
                                      <option value="Not Applicable">
                                        Not Applicable
                                      </option>
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
                                    {/* <Select
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
                                </div> */}

                                    <span className="form-control pro-edt-select form-control-primary">
                                      {this.state.selectedstations &&
                                        this.state.selectedstations.map(
                                          (i, index) => (
                                            <div
                                              style={{
                                                padding: "5px",
                                                margin: "5px",
                                                color: "#000",
                                                backgroundColor: "#e6ebe7",
                                                borderRadius: "5px",
                                                width: "fit-content",
                                              }}
                                            >
                                              <p
                                                style={{
                                                  float: "left",
                                                  marginRight: "10px",
                                                }}
                                              >
                                                {i}
                                              </p>
                                              <p
                                                id={i}
                                                onClick={
                                                  this.updateSelectedStations
                                                }
                                              >
                                                x
                                              </p>
                                            </div>
                                          )
                                        )}
                                    </span>
                                    <label>Select Station</label>
                                    <select
                                      onChange={this.updateSelectedStations1}
                                    >
                                      <option>Choose Station</option>
                                      {this.state.stationList.map(
                                        (i, index) => (
                                          <option id={i.station_name}>
                                            {i.station_name}
                                          </option>
                                        )
                                      )}
                                    </select>

                                    <div
                                      onClick={this.onOpenModal1}
                                      className="btn add_btn_pop_orange addmode_pad m-t-15"
                                    >
                                      Add Station
                                    </div>
                                    {this.validator.message(
                                      "Station Name",
                                      this.state.selectedstations,
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
                                                selected={
                                                  data.item_type ==
                                                  this.state.item_type
                                                }
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
                                    {/* {this.validator.message(
                                      "hash Tags",
                                      this.state.item_hash_tags,
                                      "required"
                                    )} */}
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
                          <h1>Categories</h1>

                          <div className="upload_img_block addproducts">
                            <h2>
                              {this.state.categoryitemId &&
                                this.state.categoryitemId.length}{" "}
                              Categories
                              <span className="additems btn">
                                <button
                                  type="button"
                                  data-toggle="modal"
                                  data-target="#add_categories"
                                >
                                  Add Category{" "}
                                </button>
                              </span>
                            </h2>

                            <div className="row">
                              {this.state.categoryitemId &&
                                this.state.categoryitemId.map(
                                  (category, index) => {
                                    return (
                                      <div
                                        className="col-md-3 mb-15 text-center"
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
                                      </div>
                                    );
                                  }
                                )}
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
                                              type="number"
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
                                {this.state.recommendations.map(
                                  (recommendations, idx) => (
                                    <div className="row form-group" key={idx}>
                                      <div className="col col-md-4">
                                        <label className=" form-control-label">
                                          Item {idx + 1}
                                        </label>
                                      </div>
                                      <div className="col-12 col-md-8">
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
                                  )
                                )}
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
              <AddItemType
                onClose={this.onCloseModal}
                onItemType={this.onItemType}
              />
            </Modal>
          ) : (
            ""
          )}
          {open1 ? (
            <Modal open={open1} onClose={this.onCloseModal1}>
              <AddStation
                onClose={this.onCloseModal1}
                onStationAdd={this.onStationAdd}
              />
            </Modal>
          ) : (
            ""
          )}
        </div>

        <div
          className="modal fade"
          id="add_categories"
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
                  Add Category
                </h5>
                {/* <span className="black_font">12 Iteams added</span> */}
              </div>

              <div className="modal-body product_edit">
                <div className="col-12 bdr_bottom_gray pb-15 mb-15">
                  <div className="row">
                    {/* <div className="col col-md-5 font-18">
                      Search by name / ID
                    </div> */}
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
                        {/* <span className="btn pull-left add_btn_pop_orange bg_green addmode_pad ml-5">
                          Go
                        </span>
                        <span className="btn pull-right pad-back">Back</span> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 w-100-row">
                  <div className="row add-Items_scroll">
                    {this.state.CategoryList &&
                      this.state.CategoryList.map((category, index) => {
                        return (
                          <div
                            className="col-md-4 product_box text-center"
                            key={index}
                          >
                            <div className="product_box_item">
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

                              <div className="product_item_row">
                                <div className="left">
                                  <span
                                    className={
                                      category.isSelected === true
                                        ? "btn remove_btn"
                                        : "btn remove_btn bg_green"
                                    }
                                    id="color"
                                    onClick={this.selectCategoryList.bind(
                                      this,
                                      category.categoryId,
                                      category.name
                                    )}
                                  >
                                    {category.isSelected === true
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
                  Add Categories
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditItemMenu;
