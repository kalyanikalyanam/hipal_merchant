//This is the code for adding the item type.
//when we add the new item ,we need to add the item type also (veg,nonveg,...).
//In add item menu page we add the button called add item type , when we click on button  this page will take action.
// added item types will be listed and we need to choose any one item type.
import React from "react";
import firebase from "../config";
import { Form } from "reactstrap";
import SimpleReactValidator from "simple-react-validator";
class AddItemType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_type: "",

      created_on: new Date().toLocaleString(),
      mobile_message: "",
      validError: false,
      color: "#1569a8",
      active: false,
    };
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

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      let dbCon = await firebase.firestore().collection("/ItemType");

      dbCon.add({
        item_type: this.state.item_type,
        created_on: this.state.created_on,
        color: this.state.color,
        sessionId: sessionId,
        businessId: businessId,
      });
      await this.props.onItemType({
        item_type: this.state.item_type,
        created_on: this.state.created_on,
        color: this.state.color,
        sessionId: sessionId,
        businessId: businessId,
      });
      this.props.onClose();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  //if already exist name is entered again then this fuction will take action and replied message called name already exist
  itemTypeChange = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    this.setState({
      item_type: e.target.value,
    });
    if (this.state.validError != true) {
      await firebase
        .firestore()
        .collection("ItemType")
        .where("businessId", "==", businessId)
        .where("item_type", "==", e.target.value)

        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;

          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              mobile_message: "Type Name already exist",
              validError: false,
            });
          } else {
            this.setState({ mobile_message: "", validError: true });
          }
        });
    }
  };

  render() {
    return (
      <>
        <div className="modal-dialog modal-sm hipal_pop" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="smallmodalLabel">
                Add Item Type
              </h5>
            </div>
            <div className="single-product-tab-area ">
              <div className="single-pro-review-area">
                <div className="container-fluid">
                  <div className="row">
                    <div className="product-tab-list tab-pane fade active in"></div>
                    <Form onSubmit={this.handleSubmit}>
                      <div className="modal-body product_edit">
                        <div className="col-12 w-100-row">
                          <div className="row form-group">
                            <div className="col col-md-4">
                              <label className=" form-control-label">
                                {" "}
                                Item Type
                              </label>
                            </div>
                            <div className="col-12 col-md-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Item Type Name*"
                                id="Edit_Role"
                                name="item_type"
                                onChange={this.itemTypeChange}
                                value={this.state.item_type}
                              />{" "}
                              {this.validator.message(
                                "Item Type Name",
                                this.state.item_type,
                                "required|whitespace|specialChar|min:3|max:70"
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
                                {" "}
                                select color
                              </label>
                            </div>
                            <div className="col-12 col-md-6">
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
                              {this.validator.message(
                                "color",
                                this.state.color,
                                "required"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button type="submit" className="btn save_btn">
                          Save
                        </button>
                      </div>
                    </Form>
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

export default AddItemType;
