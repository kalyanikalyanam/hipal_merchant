import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config";
import { Modal } from "react-bootstrap";
import Sidebar from "./sidebar";
import Header from "./header";
import FilterModal from "./filterModal";

const Bills = () => {
  const [loading, setLoading] = useState(false);
  const [bills, setBills] = useState([]);
  const [permanentBills, setPermanentBills] = useState([]);
  const [show, setShow] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getBills = async () => {
      setLoading(true);
      var businessId = sessionStorage.getItem("businessId");
      const querySnapshot = await db
        .collection("bills")
        .where("businessId", "==", businessId)
        .get();
      let bills = [];
      querySnapshot.forEach((doc) => bills.push({ ...doc.data(), id: doc.id }));
      setPermanentBills(bills);
      setLoading(false);
    };
    getBills();
  }, []);

  useEffect(() => {
    setBills(permanentBills);
  }, [permanentBills]);

  useEffect(() => {
    let grandTotal = 0;
    bills &&
      bills.map((bill) => {
        let subTotal = 0,
          discount = 0,
          tax = 0;
        bill.bill &&
          bill.bill.forEach((item) => {
            subTotal += parseFloat(item.price * item.quantity);
            discount += parseFloat(
              ((item.price * item.discount) / 100) * item.quantity
            );
            tax += parseFloat(((item.price * item.tax) / 100) * item.quantity);
          });
        let total = subTotal + tax - discount;
        let temp = total;
        total += (total * 2.5) / 100;
        total += (temp * 2.5) / 100;
        grandTotal += Math.round(total);
      });
    setGrandTotal(grandTotal);
  }, [bills]);

  const dateString = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let AmPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return [`${day}-${month}-${year}`, `${hours}:${minutes} ${AmPm}`];
  };

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    let newBills = permanentBills;
    setSearch(value);
    if (value !== "") {
      const val = escapeRegexCharacters(value.trim());
      const regex = new RegExp("^" + val, "i");
      newBills = newBills.filter((bill) => regex.test(bill.billId));
    }
    setBills(newBills);
  };

  const filter = (data) => {
    let from = new Date(data.validFrom);
    from.setHours(0, 0, 0, 0);
    let to = new Date(data.validTo);
    to.setHours(23, 59, 59, 999);
    const newBills = permanentBills.filter((bill) => {
      if (!bill.date) return false;
      return bill.date <= Date.parse(to) && bill.date >= Date.parse(from);
    });
    setBills(newBills);
  };

  const reset = () => {
    setBills(permanentBills);
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
                    <div className="category_upload_image">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-3 filterkalyani">
                            Bill View
                          </div>
                          <div className="col-md-3 filterkalyani">
                            <button
                              type="button"
                              class="btn btn-secondary mb-1"
                              onClick={() => {
                                setShow(true);
                              }}
                            >
                              Filters
                            </button>
                          </div>
                          <div className="col-md-3 filterkalyani">
                            <input
                              name="bill-search"
                              onChange={handleSearch}
                              value={search}
                              placeholder="Search By BIllID"
                            />
                          </div>
                          <div className="col-md-3 filterkalyani">
                            <b>Total Amount : Rs</b> {grandTotal && grandTotal}
                          </div>
                        </div>
                      </div>

                      <div className="upload_img_block add_menu">
                        <div className="row">
                          <div className="col-md-12 p-0 bills_table">
                            <div className="table-responsive table-data">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <td>S.no</td>
                                    <td>BILL ID</td>
                                    <td>Order Id</td>

                                    <td>Settled By</td>
                                    <td>Amount</td>
                                    <td>Date</td>
                                    <td>Timing</td>

                                    {sessionStorage.getItem("role") ==
                                      "Merchant" ||
                                    sessionStorage.getItem("viewbill") ==
                                      "Yes" ? (
                                      <td>Actions </td>
                                    ) : (
                                      ""
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  {bills &&
                                    bills
                                      // .filter((bill) => {
                                      //   console.log(bill.date);
                                      //   console.log(
                                      //     Date.parse("December 2, 2020")
                                      //   );
                                      //   if (!bill.date) return false;
                                      //   return (
                                      //     bill.date <=
                                      //       Date.parse("December 2, 2020") &&
                                      //     bill.date >=
                                      //       Date.parse("December 1, 2020")
                                      //   );
                                      // })
                                      .map((bill, index) => {
                                        let subTotal = 0,
                                          discount = 0,
                                          tax = 0;
                                        bill.bill &&
                                          bill.bill.forEach((item) => {
                                            subTotal += parseFloat(
                                              item.price * item.quantity
                                            );
                                            discount += parseFloat(
                                              ((item.price * item.discount) /
                                                100) *
                                                item.quantity
                                            );
                                            tax += parseFloat(
                                              ((item.price * item.tax) / 100) *
                                                item.quantity
                                            );
                                          });

                                        let total = subTotal + tax - discount;
                                        let temp = total;
                                        total += (total * 2.5) / 100;
                                        total += (temp * 2.5) / 100;
                                        const [date, time] = dateString(
                                          new Date(bill.date)
                                        );
                                        return (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{bill.billId}</td>
                                            <td>{bill.orderId}</td>

                                            <td>{bill.employee}</td>
                                            <td>Rs {Math.round(total)}</td>
                                            <td className="bill_date">
                                              {date}
                                            </td>
                                            <td>{time} </td>

                                            {sessionStorage.getItem("role") ==
                                              "Merchant" ||
                                            sessionStorage.getItem(
                                              "viewbill"
                                            ) == "Yes" ? (
                                              <td>
                                                <Link
                                                  to={`/ViewBill/${bill.id}`}
                                                >
                                                  <span className="btn view_order_btn_td">
                                                    View Bill
                                                  </span>
                                                </Link>
                                                {/* <img
                                                    src="/images/icon/delete_cross.svg"
                                                    onClick={this.deleteItem.bind(
                                                      this,
                                                      bill.billid
                                                    )}
                                                    className="edit_delete"
                                                  /> */}
                                              </td>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                        );
                                      })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <FilterModal filter={filter} setShow={setShow} resetFilter={reset} />
      </Modal>
    </>
  );
};

export default Bills;
