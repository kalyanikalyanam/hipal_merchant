// here in this page we get list of settings stations data
import React from "react";
import firebase from "../config";
import { db } from "../config";
import { Form } from "reactstrap";
import swal from "sweetalert";
import SimpleReactValidator from "simple-react-validator";

import { Modal } from "react-bootstrap";
class SettingsStationDuplicate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      addPrinter: false,
      editStation: false,
      printer_id: "",
      printer_details: [
        {
          printer_name: "",
        },
      ],

      employer_sevice_message: "",
      validError: false,
      mobile_message: "",
    };
    this.onSettingStationAdd = this.onSettingStationAdd.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onPrinterAdd = this.onPrinterAdd.bind(this);

    this.deleteItem = this.deleteItem.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onPrinterIdSubmit = this.onPrinterIdSubmit.bind(this);

    this.editStation = this.editStation.bind(this);

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

    this.stationList();
    this.printeridList();
  }
  onSettingStationAdd = async (data) => {
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
      .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var stationList = [];
        querySnapshot.forEach((doc) => {
          const GSTData = {
            stationId: doc.id,
            station_name: doc.data().station_name,
            printer_details: doc.data().printer_details,

            businessId: doc.data().businessId,
            sessionId: doc.data().sessionId,
          };

          stationList.push(GSTData);
        });
        this.setState({ stationList: stationList });
        console.log(stationList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onPrinterAdd = async (data) => {
    console.log(data);
    let temp = this.state.printeridList;
    temp.push(data);
    await this.setState({ printeridList: temp });
    this.forceUpdate();
  };
  printeridList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await firebase
      .firestore()
      .collection("Printers")
      // .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          const GSTData = {
            printerid: doc.id,
            printer_id: doc.data().printer_id,
            businessId: doc.data().businessId,
            sessionId: doc.data().sessionId,
          };

          data.push(GSTData);
        });
        this.setState({
          printeridList: data,
          countPage: data.length,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleprinterRemoveShareholder = (idx) => () => {
    this.setState({
      printer_details: this.state.printer_details.filter(
        (s, sidx) => idx !== sidx
      ),
    });
  };

  handleprinterShareholderNameChange = (idx) => (evt) => {
    const printer_details = this.state.printer_details.map(
      (printer_details, sidx) => {
        if (idx !== sidx) return printer_details;
        return {
          ...printer_details,
          [evt.target.name]: evt.target.value,
        };
      }
    );

    this.setState({ printer_details: printer_details });
  };

  handleprinterAddShareholder = () => {
    this.setState({
      printer_details: this.state.printer_details.concat([
        {
          printer_name: "",
        },
      ]),
    });
  };
  stationNameChange = (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      station_name: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = firebase
        .firestore()
        .collection("settings_station/")
        // .where("sessionId", "==", sessionId)
        .where("businessId", "==", businessId)
        .where("station_name", "==", e.target.value)

        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;
          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              mobile_message: "Station Name already exist",
              validError: false,
            });
          } else {
            this.setState({ mobile_message: "", validError: true });
          }
        });
    }
  };

  onPrinterIdSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");

      var businessId = sessionStorage.getItem("businessId");
      let dbCon = await firebase.firestore().collection("/Printers");

      dbCon.add({
        printer_id: this.state.printer_id,

        sessionId: sessionId,
        username: username,
        businessId: businessId,
      });
      await this.props.onPrinterAdd({
        printer_id: this.state.printer_id,
        sessionId: this.state.sessionId,
        username: this.state.username,
        businessId: this.state.businessId,
      });
      this.setState({
        employer_sevice_message: "Data Added",
        printer_id: "",
        addPrinter: false,
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  printer_id_Change = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    this.setState({
      printer_id: e.target.value,
    });
    if (this.state.validError != true) {
      var ref = await firebase
        .firestore()
        .collection("Printers/")
        // .where("sessionId", "==", sessionId)
        .where("businessId", "==", businessId)
        .where("printer_id", "==", e.target.value)

        .get()
        .then((snapshot) => {
          var user_exist = snapshot.size;
          console.log(user_exist);

          if (user_exist > 0 && this.state.validError != true) {
            this.setState({
              mobile_message: "Station Name already exist",
              validError: false,
            });
          } else {
            this.setState({ mobile_message: "", validError: true });
          }
        });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      await db
        .collection("/settings_station")

        .add({
          sessionId: sessionId,
          username: username,
          businessId: businessId,
          station_name: this.state.station_name,
          printer_details: this.state.printer_details,
        });
      await this.props.onSettingStationAdd({
        sessionId: this.state.sessionId,

        username: this.state.username,
        businessId: this.state.businessId,
        station_name: this.state.station_name,
        printer_details: this.state.printer_details,
      });

      this.setState({
        employer_sevice_message: "Data Added",

        station_name: "",
        printer_details: "",
        show: false,
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  editStation = (id) => {
    this.setState({ editStation: true });
    var station;
    for (var i = 0; i < this.state.stationList.length; i++) {
      if (this.state.stationList[i].stationId === id) {
        station = this.state.stationList[i];
        break;
      }
    }
    console.log(station);
    this.setState({
      station_name: station.station_name,
      printer_details: station.printer_details,

      stationId: id,
    });
  };
  onEditSubmit = async (e) => {
    var sessionId = sessionStorage.getItem("RoleId");
    var username = sessionStorage.getItem("username");
    var businessId = sessionStorage.getItem("businessId");
    e.preventDefault();
    await db.collection("settings_station").doc(this.state.stationId).update({
      sessionId: sessionId,
      username: username,
      businessId: businessId,
      station_name: this.state.station_name,
      printer_details: this.state.printer_details,
    });
    this.setState({
      editStation: false,
      station_name: "",
      printer_details: "",
      stationId: "",
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
        var playersRef = db.collection("/settings_station").doc(id);
        playersRef.delete();
      } else {
      }
    });
  };

  render() {
    return (
      <>
        <div className="row business_reg_box">
          <div className="col-md-12">
            <h3> Stations</h3>
          </div>

          <div className="col-md-12">
            <div className="row form-group mb-0">
              {this.state.stationList &&
                this.state.stationList.map((data, index) => {
                  return (
                    <div
                      className="col-md-4"
                      key={index}
                      style={{ marginTop: "10px" }}
                    >
                      <div className="billion_stations">
                        <span className="edit_billing">
                          {" "}
                          <button
                            className="edit_small_button"
                            onClick={() => {
                              this.editStation(data.stationId);
                            }}
                          >
                            EDIT
                          </button>
                        </span>
                        <p>{data.station_name}</p>
                        <p>
                          Number Of Printers :{" "}
                          <span> {data.printer_details.length}</span>
                        </p>
                        {/* {this.state.printer_details.map((data, index) => {
                          return (
                            <>
                              <p>
                                Number Of Printers :{" "}
                                <span> {data.printer_name.length}</span>
                              </p>

                              <p>
                                Added Printer :{" "}
                                <span key={index}>({data.printer_name})</span>
                              </p>
                            </>
                          );
                        })} */}

                        {/* </>
                                     )})} */}
                      </div>
                    </div>
                  );
                })}
              {/* <div className="col-md-4">
<div className="billion_stations">
<span className="edit_billing"><button className="edit_small_button">EDIT</button></span>
<p>Billing Counter</p>
<p>Number Of Printers : <span>1</span></p>
<p>Added Printer : <span>(hP00123)</span></p>
</div>
</div> */}
              <div
                className="col-md-4"
                onClick={() => {
                  this.setState({ show: true });
                }}
              >
                <div className="add_station">
                  <img src="images/icon/plus_add.png" />
                  <br></br>
                  Add station
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          show={this.state.show}
          onHide={() => {
            this.setState({ show: false });
          }}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  Add Station
                </h5>
              </div>
              <Form onSubmit={this.handleSubmit}>
                <div className="modal-body product_edit">
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Station name
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          id="text-input"
                          name="station_name"
                          onChange={this.stationNameChange}
                          value={this.state.station_name}
                          placeholder="BAR"
                          className="form-control edit_product"
                        />
                      </div>
                      {this.validator.message(
                        "Station Name",
                        this.state.station_name,
                        "required"
                      )}
                      <div className="text-danger">
                        {" "}
                        {this.state.mobile_message}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    {this.state.printer_details
                      // .slice(0, this.state.desired_Machines)
                      .map((printer_details, idx) => (
                        <div className="row form-group" key={idx}>
                          <div className="col col-md-4">
                            <label className=" form-control-label">
                              Select Printer {idx + 1} :
                            </label>
                          </div>
                          <div className="col-12 col-md-6">
                            <select
                              className="form-control edit_product"
                              name="printer_name"
                              // value={printer_details.printer_name}
                              onChange={this.handleprinterShareholderNameChange(
                                idx
                              )}
                            >
                              <option>Select Printer ID</option>
                              {this.state.printeridList &&
                                this.state.printeridList.map((data, index) => {
                                  return (
                                    <option
                                      value={data.printer_id}
                                      id={data}
                                      key={index}
                                    >
                                      {data.printer_id}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>

                          {idx != 0 ? (
                            <button
                              type="button"
                              onClick={this.handleprinterRemoveShareholder(idx)}
                              className="btn btn-danger m-r-10"
                            >
                              Remove
                            </button>
                          ) : (
                            ""
                          )}

                          <button
                            type="button"
                            onClick={this.handleprinterAddShareholder}
                            className="btn create_add_more_btn m-r-10"
                          >
                            Add More
                          </button>
                        </div>
                      ))}
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Add Printer :
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <div
                          className="btn add_btn_pop_orange addmode_pad m-t-15"
                          onClick={() => {
                            this.setState({ addPrinter: true });
                          }}
                        >
                          Add Printer Id
                        </div>
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
        </Modal>
        <Modal
          show={this.state.editStation}
          onHide={() => this.setState({ editStation: false })}
        >
          <div className="modal-dialog modal-sm hipal_pop" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="smallmodalLabel">
                  Edit Station
                </h5>
              </div>
              <Form onSubmit={this.onEditSubmit}>
                <div className="modal-body product_edit">
                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Station name
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          id="text-input"
                          name="station_name"
                          onChange={this.stationNameChange}
                          value={this.state.station_name}
                          placeholder="BAR"
                          className="form-control edit_product"
                        />
                      </div>
                      {this.validator.message(
                        "Station Name",
                        this.state.station_name,
                        "required"
                      )}
                      <div className="text-danger">
                        {" "}
                        {this.state.mobile_message}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 w-100-row">
                    {this.state.printer_details
                      // .slice(0, this.state.desired_Machines)
                      .map((printer_details, idx) => (
                        <div className="row form-group" key={idx}>
                          <div className="col col-md-4">
                            <label className=" form-control-label">
                              Select Printer {idx + 1} :
                            </label>
                          </div>
                          <div className="col-12 col-md-6">
                            <select
                              className="form-control edit_product"
                              name="printer_name"
                              // value={printer_details.printer_name}
                              onChange={this.handleprinterShareholderNameChange(
                                idx
                              )}
                            >
                              <option>Select Printer ID</option>
                              {this.state.printeridList &&
                                this.state.printeridList.map((data, index) => {
                                  return (
                                    <option
                                      value={data.printer_id}
                                      id={data}
                                      key={index}
                                    >
                                      {data.printer_id}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>

                          {idx != 0 ? (
                            <button
                              type="button"
                              onClick={this.handleprinterRemoveShareholder(idx)}
                              className="btn btn-danger m-r-10"
                            >
                              Remove
                            </button>
                          ) : (
                            ""
                          )}

                          <button
                            type="button"
                            onClick={this.handleprinterAddShareholder}
                            className="btn create_add_more_btn m-r-10"
                          >
                            Add More
                          </button>
                        </div>
                      ))}
                  </div>

                  <div className="col-12 w-100-row">
                    <div className="row form-group">
                      <div className="col col-md-4">
                        <label className=" form-control-label">
                          Add Printer :
                        </label>
                      </div>
                      <div className="col-12 col-md-6">
                        <div
                          className="btn add_btn_pop_orange addmode_pad m-t-15"
                          onClick={() => {
                            this.setState({ addPrinter: true });
                          }}
                        >
                          Add Printer Id
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn save_btn">
                    Update
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </Modal>
        <Modal
          show={this.state.addPrinter}
          onHide={() => this.setState({ addPrinter: false })}
        >
          <>
            <div className="modal-dialog modal-sm hipal_pop" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="smallmodalLabel">
                    Add Printer
                  </h5>
                </div>
                <Form onSubmit={this.onPrinterIdSubmit}>
                  <div className="modal-body product_edit">
                    <div className="col-12 w-100-row">
                      <div className="row form-group">
                        <div className="col col-md-4">
                          <label className=" form-control-label">
                            Printer ID
                          </label>
                        </div>
                        <div className="col-12 col-md-6">
                          <input
                            type="text"
                            name="printer_id"
                            onChange={this.printer_id_Change}
                            value={this.state.printer_id}
                            placeholder=""
                            className="form-control edit_product"
                          />
                        </div>
                        {this.validator.message(
                          "Printer ID",
                          this.state.printer_id,
                          "required|whitespace|min:2|max:70"
                        )}
                        <div className="text-danger">
                          {" "}
                          {this.state.mobile_message}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="submit" className="btn save_btn">
                      Add
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </>
        </Modal>
      </>
    );
  }
}

export default SettingsStationDuplicate;
