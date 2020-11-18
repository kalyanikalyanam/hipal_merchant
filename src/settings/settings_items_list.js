import React from "react";
import "../index.css";

import firebase from "../config";
import { Link } from "react-router-dom";

class SettingsItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      UploadCauroselList: [],
      bestrecommendation: true,
    };
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

    this.UploadCauroselList();
  }
  // UploadCauroselList() {
  //   var sessionId = sessionStorage.getItem("RoleId");
  //   var businessId = sessionStorage.getItem("businessId");

  //   this.setState({ loading: true });
  //   var ref = firebase
  //     .database()
  //     .ref("merchant_menu_items")
  //     .orderByChild("businessId")
  //     .equalTo(businessId);
  //   ref.once("value", (snapshot) => {
  //     const data = [];
  //     console.log(snapshot.val());
  //     snapshot.forEach((element) => {
  //       const usersData = {
  //         itemId: element.key.toString(),
  //         item_id: element.val().item_id,
  //         item_name: element.val().item_name,
  //         bestrecommendation: element.val().bestrecommendation,
  //         item_image: element.val().item_image,
  //         businessId: element.val().businessId,
  //         sessionId: element.val().sessionId,
  //       };
  //       data.unshift(usersData);
  //     });

  //     this.setState(
  //       { UploadCauroselList: data, countPage: data.length, loading: false },
  //       () => {
  //         console.log(this.state.UploadCauroselList, "UploadCauroselList");
  //       }
  //     );
  //   });
  // }
  UploadCauroselList = async () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");

    this.setState({ loading: true });
    await firebase
      .firestore()
      .collection("/menuitems2")
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
            bestrecommendation: childSnapShot.data().bestrecommendation,
          };

          data.push(GSTData);
        });
        this.setState({
          UploadCauroselList: data,
          countPage: data.length,
          loading: false,
        });
        // console.log(itemTypeList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = async (Id, bestrecommendation) => {
    const value = bestrecommendation === "UnSelect" ? "Selected" : "UnSelect";
    const data = this.state.UploadCauroselList;
    for (var i in data) {
      if (this.state.UploadCauroselList && data[i].itemId == Id) {
        await firebase
          .firestore()
          .collection("/menuitems2")
          .doc(data[i].itemId)
          .update({
            bestrecommendation: value,
          });
      }
      // else{
      //   let reff= firebase.database().ref(`/News/${data[i].editorId}`);
      //   reff.update({

      //     bestrecommendation:"select",
      // });

      // }
    }
  };

  onclose = () => {
    this.props.onClose();
    window.location.href = "/Settings";
    //  this
    //     .props
    //     .history
    //     .push("/Settings");
  };

  render() {
    return (
      <div class="modal-dialog modal-sm hipal_pop" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="smallmodalLabel">
              Select Recommended Items
            </h5>
          </div>

          <div class="modal-body upload_carosel">
            <div class="col-12 w-100-row line_bdr_bottom">
              {this.state.UploadCauroselList &&
                this.state.UploadCauroselList.map((items, index) => {
                  return (
                    <div class="row" key={index}>
                      <div class="col col-md-5 font-18">
                        <div class="upload_img upload_small p-0">
                          <div class="form-group">
                            <img src={items.item_image} id="img-upload" />
                          </div>
                        </div>
                      </div>
                      <div class="col col-md-6 bill_id_settle">
                        <div class="form-group">
                          <span class="pull-left m-b-20">
                            <div class="input-group">
                              <span class="input-group-btn">
                                <span class="btn btn_explore btn-default btn-file">
                                  <button
                                    onClick={() =>
                                      this.handleChange(
                                        items.itemId,
                                        items.bestrecommendation
                                      )
                                    }
                                  >
                                    {items.bestrecommendation == "Selected"
                                      ? "Selected"
                                      : "UnSelect"}
                                  </button>
                                </span>
                              </span>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div class="modal-footer">
            <Link to="/Settings">
              <button type="button" class="btn save_btn" onClick={this.onclose}>
                Add Items
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsItemsList;
