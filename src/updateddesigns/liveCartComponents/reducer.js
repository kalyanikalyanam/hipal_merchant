import * as actions from "./actionTypes";
import {db} from '../../config'
import {updateObject } from "./reducerUtils";
const initState = {
  liveCart: [],
  order: [],
  bill: [],
  show: false,
  modalItem: {},
  cardId: {},
  orderId: {},
  billPage: {
    billId: null,
    show: false,
  },
  currentEmployee: null,
  CustomerList: [],
  table: {},
  addCustomerShow: false,
  advancedOptionsShow: false,
  customerMergeModal: false,
  customerSwapModal: false,
  customerMoveModal: false,
  billModal: false,
  addUserModal: false,
  editMode: false,
  formOrder: false,
  userInfo: null,
  billModalData: null,
  kotModal: false,
  kotModalData: null,
  balance: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return updateObject(state, {orderStatus: {...action.orderStatus}})
    case "reset":
      return initState;
    case actions.ADDLIVE:
      return handleAddLiveCart(action, state);
    case actions.REMLIVE:
      return deleteLiveCartItem(action, state);
    case actions.SENDTOORDER:
      return handleToOrder(action, state);
    case actions.REMALLLIVE:
      return updateObject(state, { liveCart: [] });

    case actions.DELETEITEM:
      return deleteKotItem(action, state);

    case actions.REMALLORDER:
      return updateObject(state, { order: [] });
    case action.REMORDER:
      return deleteOrder(state, action.orderId);
    case actions.SENDTOBILL:
      return handleToBill(action, state);

    case actions.ADVACEDOPTIONSSHOW:
      return updateObject(state, {
        avancedOptionsShow: true,
        addCustomerShow: false,
      });
    case actions.ADVACEDOPTIONSHIDE:
      return updateObject(state, { avancedOptionsShow: false });
    case actions.ADDCUSTOMERSHOW:
      return updateObject(state, {
        addCustomerShow: true,
        avancedOptionsShow: false,
      });
    case actions.ADDCUSTOMERHIDE:
      return updateObject(state, { addCustomerShow: false });
    case actions.OPENMODEL:
      var editMode;
      if (action.editMode) editMode = true;
      else editMode = false;
      return updateObject(state, {
        modalItem: action.item,
        show: true,
        editMode,
        formOrder: action.formOrder,
      });
    case actions.CLOSEMODEL:
      return updateObject(state, { modalItem: null, show: false });
    case "mergeModal":
      return updateObject(state, { customerMergeModal: true });
    case "mergeModalHide":
      return updateObject(state, { customerMergeModal: false });
    case "moveModal":
      return updateObject(state, { customerMoveModal: true });
    case "moveModalHide":
      return updateObject(state, { customerMoveModal: false });
    case "swapModal":
      return updateObject(state, { customerSwapModal: true });
    case "swapModalHide":
      return updateObject(state, { customerSwapModal: false });
    case "addUserModal":
      return updateObject(state, {
        addUserModal: true,
        userInfo: action.info,
      });
    case "addUserModalHide":
      var CustomerList = state.CustomerList;
      CustomerList.push(action.customer);
      return updateObject(state, {
        addUserModal: false,
        userInfo: null,
        CustomerList,
      });
    case "billModalShow":
      const { bill, isSettle } = action;
      const newBillModalData = {
        bill,
        isSettle,
      };
      return updateObject(state, {
        billModal: true,
        billModalData: newBillModalData,
      });

    case "billModalHide":
      return updateObject(state, {
        billModal: false,
        billModalData: null,
      });
    case actions.BILLPAGESHOW:
      return handleBillPageShow(action, state);
    case actions.BILLPAGEHIDE:
      return handleBillPageHide(action, state);
    case actions.SETBILLID:
      return handleSetBillId(action, state);

    case actions.ADDTABLEDATA:
      return handleAddTableData(action, state);

    case actions.KOTORDER:
      return handleKOTorder(action, state);
    case actions.KOTCART:
      return handleKOTcart(action, state);
    case actions.KOTITEM:
      return handleKOTitem(action, state);
    case actions.ADDEmployee:
      return handleADDEmployee(action, state);
    case actions.CustomerList:
      return handleCustomerList(action, state);

    case "kotModalShow":
      return updateObject(state, { kotModal: true, kotModalData: action.bill });
    case "kotModalHide":
      return updateObject(state, { kotModal: false, kotModalData: null });
    case "balance":
      return updateObject(state, { balance: action.balance });
    default:
      return state;
  }
};

const handleAddTableData = (action, state) => {
  const tableData = action.table;
  return updateObject(state, { table: tableData });
};

const handleBillPageShow = (action, state) => {
  const billPage = state.billPage;
  billPage.show = true;
  return updateObject(state, { billPage });
};
const handleBillPageHide = (aciton, state) => {
  const billPage = state.billPage;
  billPage.show = false;
  return updateObject(state, { billPage });
};

const handleSetBillId = (action, state) => {
  let billPage = state.billPage;
  billPage.billId = action.billId;
  billPage.totalPrice = action.total;
  console.log(action)
  billPage.bill = action.bill;
  return updateObject(state, { billPage, balance: Math.round(action.balance) });
};

const handleAddLiveCart = (action, state) => {
  let liveCart = state.liveCart;
  if (!action.edit) {
    var flag = false;
    for (var i = 0; i < liveCart.length; i++) {
      let item = liveCart[i];
      if (
        item.item_id === action.item.item_id &&
        item.price === action.item.price
      ) {
        flag = true;
        item.quantity += action.item.quantity;
        item.instructions = action.item.instructions;
        item.discount = action.item.discount;
        item.item_status = action.item.status;
        item.id = action.id;
        item.kot = false;
        break;
      }
    }
    if (!flag) {
      const items = JSON.parse(JSON.stringify(action.item));
      items.id = action.id;
      items.kot = false;
      liveCart.push(items);
      if (liveCart.length === 1) {
        liveCart.id = Math.floor(Math.random() * 1000000000);
      }
    }
  } else {
    for (var i = 0; i < liveCart.length; i++) {
      let item = liveCart[i];
      if (action.item.id === item.id) {
        item.quantity = action.item.quantity;
        item.instructions = action.item.instructions;
        item.discount = action.item.discount;
        item.item_status = action.item.status;
        item.price = action.item.price;
        item.portion = action.item.portion;
      }
    }
  }
  return updateObject(state, { liveCart, show: false, modalItem: null });
};

const handleToOrder = (action, state) => {
  if (state.liveCart.length === 0) return state;
  let id = state.liveCart.id
  let currentOrder = state.order
  state.liveCart.forEach(item => {
    currentOrder.push(item) 
  })
  let total = 0
  let discount = 0
  currentOrder.forEach(orderItem => {
    total += orderItem.price
    discount += orderItem.discount
  })
  currentOrder.totalPrice = total
  currentOrder.totalDiscount = discount
  currentOrder.cartId = id
  currentOrder.id = Math.floor(Math.random() * 100000000);
  return updateObject(state, { liveCart: [], order: currentOrder });
};

const deleteLiveCartItem = (aciton, state) => {
  const itemId = aciton.itemId;
  const { liveCart } = state;
  let newLiveCart = liveCart.filter((item) => item.id !== itemId);
  return updateObject(state, { liveCart: newLiveCart, show: false });
};

const deleteOrder = (orderId, state) => {
  const { order } = state;
  let newOrder = order.filter((order) => order.order_id !== orderId);
  return updateObject(state, { order: newOrder });
};

const handleToBill = (action, state) => {
  if(state.order.length === 0) return state
  let currentBill = state.bill
  state.order.forEach(item => {
    currentBill.push(item)
  })
  let total = 0
  let discount = 0
  currentBill.forEach(item => {
    total += item.price
    discount += item.discount
  })
  currentBill.orderId = state.order.id
  currentBill.totalPrice = total
  currentBill.totalDiscount = discount
  currentBill.id = Math.floor(Math.random() * 1000000000);
  return updateObject(state, { bill: currentBill, order: [] });
};

const handleKOTcart = (action, state) => {
  let currentOrder = state.order;
  let items = [];
  currentOrder.forEach(orderItem => {
    if(!orderItem.kot){
      items.push(orderItem)
      orderItem.kot = true
    }
  })
  return updateObject(state, {
    order: currentOrder,
    kotModal: true,
    kotModalData: items,
  });
};

const handleKOTitem = (action, state) => {
  const { item } = action;
  let currentOrder = state.order;
  currentOrder.forEach(orderItem => {
    if(item.id === orderItem.id){
      orderItem.kot = true
    }
  })
  return updateObject(state, {
    order: currentOrder,
    kotModal: true,
    kotModalData: [item],
  });
};

const deleteKotItem = (action, state) => {
  let newOrder = [];
  state.order.forEach((cart) => {
    let newcart = cart.filter((item) => {
      return item.id != action.itemId;
    });
    if (newcart.length !== 0) newOrder.push(newcart);
  });
  return updateObject(state, {
    order: newOrder,
  });
};

const handleKOTorder = (action, state) => {
  let items = [];
  state.order.forEach((cart) => {
    cart.forEach((item) => {
      if (!item.kot) {
        item.kot = true;
        items.push(item);
      }
    });
  });
  const currentOrder = state.order;
  currentOrder.forEach((cart) => {
    cart.forEach((item) => {
      if (item.kot) {
        item.kot = true;
        items.push(item);
      }
    });
  });
  return updateObject(state, {
    order: currentOrder,
    kotModal: true,
    kotModalData: items,
  });
};

const handleADDEmployee = (action, state) => {
  console.log(action);
  return updateObject(state, {
    currentEmployee: action.value,
  });
};

const handleCustomerList = (action, state) => {
  let newtable = state.table;
  newtable.status = action.status;
  console.log(action);
  return updateObject(state, {
    CustomerList: action.value,
    occupency: action.occupency, 
    table: newtable,
    addCustomerShow: false,
  });
};

export default reducer;
