import { combineReducers, createStore } from "redux";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerSlice";

const reducersRoot = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(reducersRoot);

export default store;
