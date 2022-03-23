const INITIAL_STATE = {
  Orders: JSON.parse(localStorage.getItem("Orders")) || [],
  currOrder: JSON.parse(localStorage.getItem("currOrder")) || null,
  OrdersCount:null,
};

export function orderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_Order":
      console.log('GET_Order action',action.OrderId, typeof action.OrderId)
      return {
        ...state,
        currOrder:  state.Orders.filter((Order) => Order.Table === +action.OrderId)[0],
      };
    case "SET_Orders":
      // console.log("SET_Orders",action.Orders)
      return {
        ...state,
        Orders: action.Orders,
        OrdersCount:action.Orders.length
      };
    case "SET_Order_BY_ID":
      return {
        ...state,
        currOrder: state.Orders.filter((Order) => Order.Table === action.OrderId),  
      };
    case "SET_Order":
      return {
        ...state,
        currOrder: action.Order,
      };
    case "REMOVE_Order":
      return {
        ...state,
        Orders: state.Orders.filter((Order) => Order.Table !== action.OrderId),
      };
    case "ADD_Order":
      return {
        ...state,
        Orders: [...state.Orders, action.Order],
      };
    case "EDIT_Order":
      console.log('EDIT_Order',action.Order)
      return {
        ...state,
        Orders: state.Orders.map((Order) =>
          Order.ModifiedDate === action.Order.ModifiedDate ? action.Order : Order
        ),
      };
    default:
      return state;
  }
}
