import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";

const KOTTableDataTableView = () => {
  return (
    <>
      <div
        class="modal fade"
        id="view_table"
        tabindex="-1"
        role="dialog"
        aria-labelledby="smallmodalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-sm kot_table_pop" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="col-12 w-100-row kot_head">
                Table: 07A <span data-dismiss="modal">X</span>
              </div>

              <div class="col-12 w-100-row kot_waiter">Waiter: Varun S</div>

              <div class="col-12 w-100-row kot_date">
                Items <span>21/07/2021 | 12.20pm</span>
              </div>

              <div class="col-12 w-100-row bdr-top1">
                <div class="w-10 no">
                  <span class="check-icon">
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </span>
                </div>

                <div class="w-80 table_kotdata">
                  <h5>Pepporoni Pizza(Large)</h5>
                  <p>+ Cheese Burst</p>
                  <p>+ Mushrooms</p>
                  <p>+ Green Peppers</p>
                </div>
                <div class="w-10 text-right">
                  x<span class="big_font">1</span>
                </div>
              </div>

              <div class="col-12 w-100-row p-0">
                <div class="w-10 no pb-10">
                  <i
                    class="fa fa-info-circle info-circle"
                    aria-hidden="true"
                  ></i>
                </div>

                <div class="w-90 color_black">
                  (Make the pizza little spicy)
                </div>
              </div>

              <div class="col-12 w-100-row bdr-top1">
                <div class="w-10 no">
                  <span class="check-icon">
                    <i class="fa fa-check" aria-hidden="true"></i>
                  </span>
                </div>

                <div class="w-80 table_kotdata">
                  <h5>Pepporoni Pizza(Large)</h5>
                </div>
                <div class="w-10 text-right">
                  x<span class="big_font">2</span>
                </div>
              </div>

              <div class="col-12 w-100-row bdr-top1">
                <div class="w-30 color_black">Location:</div>

                <div class="w-70 color_black">
                  123, JK Nagar, Bharat Road, Bhopal, India
                </div>
              </div>

              <div class="col-12 w-100-row bdr-top1">
                <div class="col-12 p-0 text-center">
                  <button type="button" class="btn btn_print_kot">
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-wrapper">
        <Sidebar />
        <div class="page-container">
          <Header />
          <div class="main-content">
            <div class="section__content">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12 p-0">
                    <div class="search_profile">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="company_name_box">
                            <div class="company_iocn"></div>
                            <div class="company_details">
                              <p class="name">The Coffee Cup Sanikpuri </p>
                              <p class="open">
                                OPEN{" "}
                                <i class="fa fa-circle" aria-hidden="true"></i>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="search_top">
                            <a href="#" class="search_icon">
                              <i class="fas fa-search"></i>
                            </a>
                            <input
                              class="search_input"
                              type="text"
                              name=""
                              placeholder="Search..."
                            />
                          </div>
                        </div>
                        <div class="col-md-3 ">
                          <div class="profile_user">
                            <span class="usericon">
                              <img src="/images/icon/profile.jpg" />
                            </span>
                            <span class="profile_data">
                              <p class="name">Krisha Kola</p>
                              <p>krishna.kola@gmail.com</p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row mt-30">
                  <div class="col-md-8 p-0">
                    <div class="orders_menu my_menu_link">
                      <ul>
                        <li>
                          <a href="#" class="activemenu">
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

                  <div class="col-md-4 p-0">
                    <div class="kot_btns">
                      <span class="btns">
                        <a href="#">History</a>
                      </span>
                      <span class="btns">
                        <a href="#" class="activemenu">
                          Card View
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="row m-t-30">
                  <div class="col-md-10 p-0">
                    <div class="indicator_restaurent">
                      <span>
                        <i
                          class="fa fa-circle dinein_color"
                          aria-hidden="true"
                        ></i>{" "}
                        Dine in
                      </span>
                      <span>
                        <i
                          class="fa fa-circle takeway_color"
                          aria-hidden="true"
                        ></i>{" "}
                        Take away
                      </span>
                      <span>
                        <i
                          class="fa fa-circle delivery_color"
                          aria-hidden="true"
                        ></i>{" "}
                        Delivery
                      </span>
                    </div>
                  </div>

                  <div class="col-md-2 p-0">
                    <span class="cate_search w-100">
                      <input type="text" placeholder="Search" />
                      <a href="#" class="search_icon">
                        <i class="fas fa-search"></i>
                      </a>
                    </span>
                  </div>
                </div>

                <div class="row m-t-30 m-b-30">
                  <div class="col-md-12 p-0">
                    <div class="kot-table_row head">
                      <div class="databox td1"></div>
                      <div class="databox td2">Order Type</div>
                      <div class="databox td3">Table No</div>
                      <div class="databox td4">Table status</div>
                      <div class="databox td5">Last Update</div>
                      <div class="databox td6">Fulfilment Status</div>
                      <div class="databox td7">Order ID</div>
                      <div class="databox td8">View Order</div>
                    </div>

                    <div class="kot-table_row bg-trans  p-10">
                      <span class="bg text-left">- New -</span>
                    </div>

                    <div class="kot-table_row">
                      <div class="databox td1">
                        <span>
                          <i
                            class="fa fa-circle dinein_color"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                      <div class="databox td2">Dine in</div>
                      <div class="databox td3">Table 7A</div>
                      <div class="databox td4">
                        <span>Cooking</span>
                      </div>
                      <div class="databox td5">6 Mins</div>
                      <div class="databox td6">1/2</div>
                      <div class="databox td7">7878727542</div>
                      <div class="databox td8">
                        <span
                          class="btn view_order_btn_td padd_kot"
                          data-toggle="modal"
                          data-target="#view_table"
                        >
                          View
                        </span>
                      </div>
                    </div>

                    <div class="kot-table_row">
                      <div class="databox td1">
                        <span>
                          <i
                            class="fa fa-circle takeway_color"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                      <div class="databox td2">Dine in</div>
                      <div class="databox td3">Table 7A</div>
                      <div class="databox td4">
                        <span class="served-color">Served</span>
                      </div>
                      <div class="databox td5">6 Mins</div>
                      <div class="databox td6">1/2</div>
                      <div class="databox td7">7878727542</div>
                      <div class="databox td8">
                        <span class="btn view_order_btn_td padd_kot">View</span>
                      </div>
                    </div>

                    <div class="kot-table_row">
                      <div class="databox td1">
                        <span>
                          <i
                            class="fa fa-circle delivery_color"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                      <div class="databox td2">Dine in</div>
                      <div class="databox td3">Table 7A</div>
                      <div class="databox td4">
                        <span>Cooking</span>
                      </div>
                      <div class="databox td5">6 Mins</div>
                      <div class="databox td6">1/2</div>
                      <div class="databox td7">7878727542</div>
                      <div class="databox td8">
                        <span class="btn view_order_btn_td padd_kot">View</span>
                      </div>
                    </div>

                    <div class="kot-table_row">
                      <div class="databox td1">
                        <span>
                          <i
                            class="fa fa-circle dinein_color"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                      <div class="databox td2">Dine in</div>
                      <div class="databox td3">Table 7A</div>
                      <div class="databox td4">
                        <span class="served-color">Served</span>
                      </div>
                      <div class="databox td5">6 Mins</div>
                      <div class="databox td6">1/2</div>
                      <div class="databox td7">7878727542</div>
                      <div class="databox td8">
                        <span class="btn view_order_btn_td padd_kot">View</span>
                      </div>
                    </div>

                    <div class="kot-table_row">
                      <div class="databox td1">
                        <span>
                          <i
                            class="fa fa-circle delivery_color"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                      <div class="databox td2">Dine in</div>
                      <div class="databox td3">Table 7A</div>
                      <div class="databox td4">
                        <span>Cooking</span>
                      </div>
                      <div class="databox td5">6 Mins</div>
                      <div class="databox td6">1/2</div>
                      <div class="databox td7">7878727542</div>
                      <div class="databox td8">
                        <span class="btn view_order_btn_td padd_kot">View</span>
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

export default KOTTableDataTableView;
