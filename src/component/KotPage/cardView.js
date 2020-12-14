import React, { useEffect } from 'react'


const CardView = ({kotItems}) => {
    return (
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
    )
}

export default CardView