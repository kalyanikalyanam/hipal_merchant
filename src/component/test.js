import React from "react";
import { db } from "../config";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.test = this.test.bind(this);
  }

  test = async (data) => {
    console.log(data);
    db.collection("bills")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(async function (doc) {
          await db.collection("bills").doc(doc.id).update({
            gst: "2.5",
            cgst: "2.5",
            address:
              "The Coffee Cup Pizzeria E-89, Sainikpuri, Telangana 500094",
            logo:
              "https://firebasestorage.googleapis.com/v0/b/hipal-39192.appspot.com/o/images%2F21f86201-8188-455c-8e13-2531801b7840.svg?alt=media&token=d61e910d-7166-4d5f-b8cf-b3329b23d9f7",
            gstNumber: "456AEW453462",
          });

          console.log(doc.id, " => ", doc.data());
        });
      });
  };

  render() {
    const { open } = this.state;
    return (
      <>
        <div className="col-12 col-md-6">
          <div
            className="btn add_btn_pop_orange addmode_pad m-t-15"
            onClick={this.test}
          >
            Test
          </div>
        </div>
      </>
    );
  }
}

export default Test;
