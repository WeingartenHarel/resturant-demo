import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { itemReducer } from "./reducers/itemReducer";
import { orderReducer } from "./reducers/orderReducer";
import { themeReducer } from "./reducers/themeReducer";

const rootReducer = combineReducers({
  itemReducer: itemReducer,
  orderReducer: orderReducer,
  themeReducer: themeReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store;
