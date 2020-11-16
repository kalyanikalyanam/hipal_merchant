import { act } from "react-dom/test-utils";
import { CustomInput } from "reactstrap";
import * as actions from "./actionTypes";
import { addToarray, updateObject } from "./reducerUtils";
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
  table: {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return updateObject(state, initState);
    case actions.ADDLIVE:
      return handleAddLiveCart(action, state);
    case actions.REMLIVE:
      return deleteLiveCartItem(action, state);
    case actions.SENDTOORDER:
      return handleToOrder(action, state);
    case actions.REMALLLIVE:
      return updateObject(state, { liveCart: [] });

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
      return updateObject(state, { addUserModal: false, userInfo: null });

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
  const billPage = state.billPage;
  billPage.billId = action.billId;
  billPage.totalPrice = action.totalBill;
  billPage.bill = action.bill;
  return updateObject(state, { billPage });
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

const handleToOrder = (action, state) => {
  if (state.liveCart.length === 0) return state;
  const currentCart = state.liveCart;
  currentCart.cartId = action.cartId;
  currentCart.cartPrice = action.cartPrice;
  currentCart.cartDiscount = action.cartDiscount;
  const order = addToarray(state.order, currentCart);
  if (order.length === 1) {
    order.id = Math.floor(Math.random() * 100000000);
  }
  return updateObject(state, { liveCart: [], order });
};

const handleToBill = (action, state) => {
  let currentOrder = state.order;
  currentOrder.id = state.order.id;
  currentOrder.orderPrice = action.orderPrice;
  currentOrder.orderDiscout = action.orderDiscount;
  let currentBill = state.bill;
  currentBill.push(currentOrder);
  return updateObject(state, { bill: currentBill, order: [] });
};

const handleKOTcart = (action, state) => {
  const { cart } = action;
  let currentOrder = state.order;
  let currentBill = state.bill;
  let updateCart;
  for (var i = 0; i < currentOrder.length; i++) {
    if (currentOrder[i].cartId === cart.cartId) {
      updateCart = currentOrder[i];
      currentOrder[i].forEach((item) => {
        item.kot = true;
        console.log(`KOT FOR ${item.item_name}`);
      });
      break;
    }
  }
  return updateObject(state, { order: currentOrder, bill: currentBill });
};

const handleKOTitem = (action, state) => {
  const { cart, item } = action;
  let currentOrder = state.order;
  for (var i = 0; i < currentOrder.length; i++) {
    if (currentOrder[i].cartId === cart.cartId) {
      for (var j = 0; j < currentOrder[i].length; j++) {
        if (currentOrder[i][j].id === item.id) {
          currentOrder[i][j].kot = true;
          console.log(`KOT FOR ${currentOrder[i][j].item_name}`);
        }
      }
    }
  }
  return updateObject(state, { order: currentOrder });
};

const handleKOTorder = (action, state) => {
  const currentOrder = state.order;
  currentOrder.forEach((cart) => {
    cart.forEach((item) => {
      item.kot = true;
    });
  });
  return updateObject(state, { order: currentOrder });
};

const handleADDEmployee = (action, state) => {
  console.log(action);
  return updateObject(state, {
    currentEmployee: action.value,
  });
};

const handleCustomerList = (action, state) => {
  let newtable = state.table;
  newtable.status = "occupied";

  console.log(action);
  return updateObject(state, {
    CustomerList: action.value,
    table: newtable,
    addCustomerShow: false,
  });
};

export default reducer;
