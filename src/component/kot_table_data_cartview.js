import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";

const KOTTableDataCartView = () => {
  return (
    <>
      <div
        className="modal fade"
        id="view_table"
        tabindex="-1"
        role="dialog"
        aria-labelledby="smallmodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm kot_table_pop" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="col-12 w-100-row kot_head">
                Table: 07A <span data-dismiss="modal">X</span>
              </div>

              <div className="col-12 w-100-row kot_waiter">Waiter: Varun S</div>

              <div className="col-12 w-100-row kot_date">
                Items <span>21/07/2021 | 12.20pm</span>
              </div>

              <div className="col-12 w-100-row bdr-top1">
                <div className="w-10 no">
                  <span className="check-icon">
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </span>
                </div>

                <div className="w-80 table_kotdata">
                  <h5>Pepporoni Pizza(Large)</h5>
                  <p>+ Cheese Burst</p>
                  <p>+ Mushrooms</p>
                  <p>+ Green Peppers</p>
                </div>
                <div className="w-10 text-right">
                  x<span className="big_font">1</span>
                </div>
              </div>

              <div className="col-12 w-100-row p-0">
                <div className="w-10 no pb-10">
                  <i
                    className="fa fa-info-circle info-circle"
                    aria-hidden="true"
                  ></i>
                </div>

                <div className="w-90 color_black">
                  (Make the pizza little spicy)
                </div>
              </div>

              <div className="col-12 w-100-row bdr-top1">
                <div className="w-10 no">
                  <span className="check-icon">
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </span>
                </div>

                <div className="w-80 table_kotdata">
                  <h5>Pepporoni Pizza(Large)</h5>
                </div>
                <div className="w-10 text-right">
                  x<span className="big_font">2</span>
                </div>
              </div>

              <div className="col-12 w-100-row bdr-top1">
                <div className="w-30 color_black">Location:</div>

                <div className="w-70 color_black">
                  123, JK Nagar, Bharat Road, Bhopal, India
                </div>
              </div>

              <div className="col-12 w-100-row bdr-top1">
                <div className="col-12 p-0 text-center">
                  <button type="button" className="btn btn_print_kot">
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                              <p className="name">The Coffee Cup Sanikpuri </p>
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
                              <p className="name">Krisha Kola</p>
                              <p>krishna.kola@gmail.com</p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-30">
                  <div className="col-md-8 p-0">
                    <div className="orders_menu my_menu_link">
                      <ul>
                        <li>
                          <a href="#" className="activemenu">
                            Station 1
                          </a>
                        </li>
                        <li>
                          <a href="#">Station 2</a>
                        </li>
                        <li>
                          <a href="#">Station 3</a>
                        </li>
                        <li>
                          <a href="#">Station 4</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-4 p-0">
                    <div className="kot_btns">
                      <span className="btns">
                        <a href="#">History</a>
                      </span>
                      <span className="btns">
                        <a href="#" className="activemenu">
                          Card View
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row m-t-30">
                  <div className="col-md-10 p-0">
                    <div className="indicator_restaurent">
                      <span>
                        <i
                          className="fa fa-circle dinein_color"
                          aria-hidden="true"
                        ></i>{" "}
                        Dine in
                      </span>
                      <span>
                        <i
                          className="fa fa-circle takeway_color"
                          aria-hidden="true"
                        ></i>{" "}
                        Take away
                      </span>
                      <span>
                        <i
                          className="fa fa-circle delivery_color"
                          aria-hidden="true"
                        ></i>{" "}
                        Delivery
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row m-t-30 m-b-30">
                  <div className="list-kot">
                    <div className="box-kot">
                      <div className="kot-card selected">
                        <div className="headrow">
                          <h1>
                            Dine in{" "}
                            <i
                              className="fa fa-circle dinein_color"
                              aria-hidden="true"
                            ></i>
                            <span>
                              <i className="fas fa-ellipsis-v"></i>
                            </span>
                          </h1>
                        </div>

                        <div className="main-head">
                          <span>Table: 07A</span>
                          <span>0:44</span>
                        </div>

                        <div className="waiterrow">Waiter: Varun S</div>

                        <div className="iteamsrow-gray">
                          <span>Iteams</span>
                          <span>0/2</span>
                        </div>

                        <div className="iteamsrow">
                          <div className="w-15">
                            <i className="far fa-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Pepporoni Pizza(Large)</h5>
                            <p>+ Cheese Burst</p>
                            <p>+ Mushrooms</p>
                            <p>+ Green Peppers</p>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                          </div>
                        </div>

                        <div className="iteamsrow">
                          <div className="w-15">
                            <i className="far fa-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Loaded Nachos(full)</h5>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                          </div>
                        </div>

                        <div className="iteamsrow text-center">
                          <button type="button" className="btn served_kot">
                            Served
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="box-kot">
                      <div className="kot-card">
                        <div className="headrow">
                          <h1>
                            Take away{" "}
                            <i
                              className="fa fa-circle takeway_color"
                              aria-hidden="true"
                            ></i>
                            <span>
                              <i className="fas fa-ellipsis-v"></i>
                            </span>
                          </h1>
                        </div>

                        <div className="main-head">
                          <span>14:35 hours</span>
                          <span>0:44</span>
                        </div>

                        <div className="waiterrow">0931280AASD90</div>

                        <div className="iteamsrow-gray">
                          <span>Iteams</span>
                          <span>0/2</span>
                        </div>

                        <div className="iteamsrow">
                          <div className="w-15">
                            <i className="far fa-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Pepporoni Pizza(Large)</h5>
                            <p>+ Cheese Burst</p>
                            <p>+ Mushrooms</p>
                            <p>+ Green Peppers</p>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                            <img src="/images/icon/info-icon-new.png" />
                          </div>
                        </div>

                        <div className="iteamsrow checkedrow">
                          <div className="w-15">
                            <i className="far fa-check-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Loaded Nachos(full)</h5>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                          </div>
                        </div>

                        <div className="iteamsrow text-center">
                          <button type="button" className="btn served_kot">
                            Served
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="box-kot">
                      <div className="kot-card">
                        <div className="headrow">
                          <h1>
                            Delivery{" "}
                            <i
                              className="fa fa-circle delivery_color"
                              aria-hidden="true"
                            ></i>
                            <span>
                              <i className="fas fa-ellipsis-v"></i>
                            </span>
                          </h1>
                        </div>

                        <div className="main-head">
                          <span>14:35 hours</span>
                          <span>0:44</span>
                        </div>

                        <div className="waiterrow">0931280AASD90</div>

                        <div className="iteamsrow-gray">
                          <span>Iteams</span>
                          <span>0/2</span>
                        </div>

                        <div className="iteamsrow">
                          <div className="w-15">
                            <i className="far fa-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Pepporoni Pizza(Large)</h5>
                            <p>+ Cheese Burst</p>
                            <p>+ Mushrooms</p>
                            <p>+ Green Peppers</p>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                            <img src="/images/icon/info-icon-new.png" />
                          </div>
                        </div>

                        <div className="iteamsrow checkedrow">
                          <div className="w-15">
                            <i className="far fa-check-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Loaded Nachos(full)</h5>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                          </div>
                        </div>

                        <div className="iteamsrow checkedrow">
                          <div className="w-15">
                            <i className="far fa-check-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Loaded Nachos(full)</h5>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                          </div>
                        </div>

                        <div className="iteamsrow">
                          <div className="w-15">
                            <i className="far fa-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Pepporoni Pizza(Large)</h5>
                            <p>+ Cheese Burst</p>
                            <p>+ Mushrooms</p>
                            <p>+ Green Peppers</p>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                            <img src="/images/icon/info-icon-new.png" />
                          </div>
                        </div>

                        <div className="iteamsrow text-center">
                          <button type="button" className="btn served_kot">
                            Served
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="box-kot">
                      <div className="kot-card">
                        <div className="headrow">
                          <h1>
                            Dine in{" "}
                            <i
                              className="fa fa-circle dinein_color"
                              aria-hidden="true"
                            ></i>
                            <span>
                              <i className="fas fa-ellipsis-v"></i>
                            </span>
                          </h1>
                        </div>

                        <div className="main-head">
                          <span>Table: 07A</span>
                          <span>0:44</span>
                        </div>

                        <div className="waiterrow">Waiter: Varun S</div>

                        <div className="iteamsrow-gray">
                          <span>Iteams</span>
                          <span>0/2</span>
                        </div>

                        <div className="iteamsrow">
                          <div className="w-15">
                            <i className="far fa-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Pepporoni Pizza(Large)</h5>
                            <p>+ Cheese Burst</p>
                            <p>+ Mushrooms</p>
                            <p>+ Green Peppers</p>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                          </div>
                        </div>

                        <div className="iteamsrow">
                          <div className="w-15">
                            <i className="far fa-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Loaded Nachos(full)</h5>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                          </div>
                        </div>

                        <div className="iteamsrow text-center">
                          <button type="button" className="btn served_kot">
                            Served
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="box-kot">
                      <div className="kot-card">
                        <div className="headrow">
                          <h1>
                            Take away{" "}
                            <i
                              className="fa fa-circle takeway_color"
                              aria-hidden="true"
                            ></i>
                            <span>
                              <i className="fas fa-ellipsis-v"></i>
                            </span>
                          </h1>
                        </div>

                        <div className="main-head">
                          <span>14:35 hours</span>
                          <span>0:44</span>
                        </div>

                        <div className="waiterrow">0931280AASD90</div>

                        <div className="iteamsrow-gray">
                          <span>Iteams</span>
                          <span>0/2</span>
                        </div>

                        <div className="iteamsrow">
                          <div className="w-15">
                            <i className="far fa-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Pepporoni Pizza(Large)</h5>
                            <p>+ Cheese Burst</p>
                            <p>+ Mushrooms</p>
                            <p>+ Green Peppers</p>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                            <img src="/images/icon/info-icon-new.png" />
                          </div>
                        </div>

                        <div className="iteamsrow">
                          <div className="w-15">
                            <i className="far fa-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Loaded Nachos(full)</h5>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                          </div>
                        </div>

                        <div className="iteamsrow text-center">
                          <button type="button" className="btn served_kot">
                            Served
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="box-kot">
                      <div className="kot-card">
                        <div className="headrow">
                          <h1>
                            Delivery{" "}
                            <i
                              className="fa fa-circle delivery_color"
                              aria-hidden="true"
                            ></i>
                            <span>
                              <i className="fas fa-ellipsis-v"></i>
                            </span>
                          </h1>
                        </div>

                        <div className="main-head">
                          <span>14:35 hours</span>
                          <span>0:44</span>
                        </div>

                        <div className="waiterrow">0931280AASD90</div>

                        <div className="iteamsrow-gray">
                          <span>Iteams</span>
                          <span>0/2</span>
                        </div>

                        <div className="iteamsrow">
                          <div className="w-15">
                            <i className="far fa-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Pepporoni Pizza(Large)</h5>
                            <p>+ Cheese Burst</p>
                            <p>+ Mushrooms</p>
                            <p>+ Green Peppers</p>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                            <img src="/images/icon/info-icon-new.png" />
                          </div>
                        </div>

                        <div className="iteamsrow checkedrow">
                          <div className="w-15">
                            <i className="far fa-check-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Loaded Nachos(full)</h5>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                          </div>
                        </div>

                        <div className="iteamsrow checkedrow">
                          <div className="w-15">
                            <i className="far fa-check-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Loaded Nachos(full)</h5>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                          </div>
                        </div>

                        <div className="iteamsrow">
                          <div className="w-15">
                            <i className="far fa-square"></i>
                          </div>
                          <div className="w-70">
                            <h5>Pepporoni Pizza(Large)</h5>
                            <p>+ Cheese Burst</p>
                            <p>+ Mushrooms</p>
                            <p>+ Green Peppers</p>
                          </div>
                          <div className="w-15 text-right">
                            x<span className="bigfont">2</span>
                            <img src="/images/icon/info-icon-new.png" />
                          </div>
                        </div>

                        <div className="iteamsrow text-center">
                          <button type="button" className="btn served_kot">
                            Served
                          </button>
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
    </>
  );
};

export default KOTTableDataCartView;
