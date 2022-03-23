import logo from './logo.svg';
import hero from './assets/hero.jpg'
import './App.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadItems,
  getById,
  setItem,
  removeItem,
  addItem,
  editItem,
  loadItemsCount,
  chooseItem,
} from './store/actions/itemActions';
import { loadOrders, setOrder, setOrders } from './store/actions/orderActions';
import { ItemList } from './CMPS/ItemList';
import { Actions } from './CMPS/Actions';
import { setTheme } from './store/actions/themeActions'
import { savedOrdersService } from './services/savedOrdersService'

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.itemReducer.Items);
  const chooseItem = useSelector((state) => state.itemReducer.chooseItem);
  const orders = useSelector((state) => state.orderReducer.Orders);
  const [view, setView] = useState(false)
  const viewTheme = useSelector((state) => state.themeReducer.viewTheme);
  const [currOrder, setCurrOrder] = useState('null')
  const [isCurrOrderDone, setIsCurrOrderDone] = useState(true)
  const [notification, setNotification] = useState('Please Handle next order , click Next Order ')
  const [savedOrders, setSavedOrders] = useState([])

  useEffect(() => {
    async function fetchData() {
      await dispatch(loadItems());
      await dispatch(loadOrders());
    }
    fetchData()
  }, []);

  const saveOrdersToDisk = async () => {
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([JSON.stringify(savedOrders)], { type: "text/plain" }));
    a.download = "completed_orders.json";
    a.click();
  }

  const changeView = (value) => {
    setView(!view)
  }

  const onChangeTheme = (value) => {
    dispatch(setTheme(!viewTheme))
  }

  const setNextOrder = async () => {
    if (orders.length === 0) {
      setNotification(`No more Orders`);
      return
    }

    let OrdersCopy = [...orders]
    let Order = OrdersCopy.shift()
    await setCurrOrder(Order)
    let table = findTable(Order)
    if (table === undefined) {
      setNotification(`No free tables`);
      return
    }
    handleSetOrder(table, Order)
    await dispatch(setOrders(OrdersCopy))
  }

  const findTable = (Order) => {
    for (let i = 0; i < items.length; i++) {
      let tableA = items[i]
      if (tableA.Diners === Order.Diners && !tableA.picked) {
        return tableA
      }
    }
  }

  const handleSetOrder = async (item, Order) => {
    if (item === undefined) {
      setNotification(`No free tables`);
      return
    }
    if (item.currOrder) {
      setNotification(`This table${item.Table} is  occupied`)
      return
    };
    if (Order.Diners <= item.Diners) {
      let orderWithStartDate = {
        ...Order,
        startDate: Date.now()
      }
      // set current order to table
      setTableOrder(item,orderWithStartDate)
      // set timeout to clear table after X seconds 
      setTableStandBy(item,orderWithStartDate) 
      // set timeout to clear table after X seconds 
      setTableClear(item,orderWithStartDate)
    } else {
      setNotification('No free Tables...')
    }
  }

  const setTableOrder=async (item,orderWithStartDate) =>{
    await setCurrOrder(orderWithStartDate)

    let chooseItem = {
      ...item,
      picked: 'picked',
      currOrder: { ...orderWithStartDate },
    }
    await dispatch(editItem(chooseItem))
  }

  const setTableStandBy = (item,orderWithStartDate)=>{
    setTimeout(async () => {
      // table on stabdby 
      let chooseItemStandby = {
        ...item,
        picked: 'standby',
        currOrder: { ...orderWithStartDate },
      }
      await dispatch(editItem(chooseItemStandby))
      setNotification(`Table ${item.Table} is on standby`)
    }, 60000);
  }

  const setTableClear = (item,orderWithStartDate)=>{
    setTimeout(async () => {
      let orderWithEndDate = {
        ...orderWithStartDate,
        endDate: Date.now()
      }

      setSavedOrders(prevState => ([
        ...prevState,
        orderWithEndDate
      ]))

      // reset / clear Table 
      let chooseItemReset = {
        ...item,
        picked: false,
        currOrder: null,
      }
      await dispatch(editItem(chooseItemReset))
      setNotification(`Table ${item.Table} is free`)
    }, 90000);
  }

  return (

    <div className={viewTheme ? "App " : "App Dark"}>
      <div className='Hero'>
        {/* <img src={hero} alt="hero"/> */}
        {currOrder && <div className='orderContainer'>Current Order: Costumer Mobile number :{currOrder.Mobile}   |   Number of diners:{currOrder.Diners}</div>}
        {notification && <div className='notification'>Notification: {notification} </div>}
      </div>
        <div className='main-actions'>
          <Actions onChangeView={changeView} onChangeTheme={onChangeTheme} view={view} viewTheme={viewTheme} />
          <button className='button colorB' onClick={() => saveOrdersToDisk}>Save orders to disk</button>
          <button className='button colorA' onClick={setNextOrder}>Next Order </button>
        </div>
      
      <div className='section'>
        <div className='main-container'>
          <div className="main-list">

            {items && <ItemList items={items} view={view} handleSetOrder={handleSetOrder} />}
            <div className="actions-pagination">
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
