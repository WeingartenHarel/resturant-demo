import { orderService } from "../../services/orderService"
// Action Dispatcher
export function loadOrders(filterBy, pageNumber, isSort) {
  return async (dispatch) => {
    const Orders = await orderService.query(filterBy, pageNumber, isSort);
    // console.log('Action Dispatche loadOrders',Orders)
    dispatch({ type: "SET_Orders", Orders });
  };
}


export function getById(OrderId) {
  return async (dispatch) => {
    // const Order = await orderService.getById(OrderId);
    dispatch({ type: "GET_Order", OrderId });
    // return Order
  };
}

export function removeOrder(OrderId) {
  return async (dispatch) => {
    try {
      await orderService.remove(OrderId);
      dispatch({ type: "REMOVE_Order", OrderId: OrderId });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}

export function addOrder(Order) {
  return async (dispatch) => {
    try {
      // console.log('addOrder(Orders)', Order)
      // const savedOrder = await OrderService.save(Order);
      dispatch({ type: "ADD_Order", Order: Order });
      // return savedOrder
    } catch (err) {
      console.log("ERROR!", err);
    }
  };
}

export function editOrder(Order) {
  // console.log('editOrder Order',Order)
  return async (dispatch) => {
    try {
      // const updatedOrder = await OrderService.update(Order);
      dispatch({ type: "EDIT_Order", Order });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}

export function setOrder(Order) {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_Order", Order });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}

export function setOrders(Orders) {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_Orders", Orders });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}

export function setOrderByID(OrderId) {
  return async (dispatch) => {
    try {
      // console.log('setOrderByID', OrderId)
      const Order = await orderService.getById(OrderId);
      dispatch({ type: "SET_Order", Order });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}



