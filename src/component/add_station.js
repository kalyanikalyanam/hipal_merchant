import React from "react";
import firebase from "../config";
import Sidebar from "../component/sidebar";
import Header from "../component/header";
import { Form } from "reactstrap";
import SimpleReactValidator from "simple-react-validator";
import { Modal } from "react-responsive-modal";
import AddPrinterId from "../settings/add_printer_id";
class AddStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      printer_details: [
        {
          printer_name: "",
        },
      ],
      open: false,
      employer_sevice_message: "",
      validError: false,
      mobile_message: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onPrinterAdd = this.onPrinterAdd.bind(this);
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
    this.printeridList();
  }
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
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
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
  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      var sessionId = sessionStorage.getItem("RoleId");
      var username = sessionStorage.getItem("username");
      var businessId = sessionStorage.getItem("businessId");
      let dbCon = await firebase
        .firestore()
        .collection("/settings_station")

        .add({
          sessionId: sessionId,

          username: username,
          businessId: businessId,

          station_name: this.state.station_name,
          // printer_name:this.state.printer_name,
          printer_details: this.state.printer_details,
        });
      await this.props.onStationAdd({
        stationId: dbCon.id,
        station_name: this.state.station_name,
        businessId: businessId,
        sessionId: sessionId,
        value: this.state.station_name,
        label: this.state.station_name,
      });
      // window.location.href="/Settings";
      this.props.onClose();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
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
        //.where("sessionId", "==", sessionId)
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

  render() {
    const { open } = this.state;
    return (
      <>
        {/* <div className="modal fade" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true"> */}
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
                      {/* <Link to="/AddPrinterId"> */}
                      <div
                        className="btn add_btn_pop_orange addmode_pad m-t-15"
                        onClick={this.onOpenModal}
                      >
                        Add Printer Id
                      </div>
                      {/* </Link> */}
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
        {open ? (
          <Modal open={open} onClose={this.onCloseModal}>
            <AddPrinterId
              onClose={this.onCloseModal}
              onPrinterAdd={this.onPrinterAdd}
            />
          </Modal>
        ) : (
          ""
        )}
        {/* </div> */}
      </>
    );
  }
}

export default AddStation;
