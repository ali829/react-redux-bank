import { combineReducers, createStore } from "redux";
// *initial states
const accountInitialStates = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const customerInitialStates = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

//* actions
const ACTION_ACCOUNT = {
  ACCOUNT_DEPOSIT: "account/deposit",
  ACCOUNT_WITHDRAW: "account/withdraw",
  ACCOUNT_REQUEST_LOAN: "account/requestLoan",
  ACCOUNT_PAY_LOAN: "account/payLoan",
};
const ACTION_CUSTOMER = {
  CUSTOMER_CREATE: "customer/create",
  CUSTOMER_UPDATE: "customer/updateFullName",
};

function accountReducer(state = accountInitialStates, action) {
  switch (action.type) {
    case ACTION_ACCOUNT.ACCOUNT_DEPOSIT:
      return { ...state, balance: state.balance + action.payload };
    case ACTION_ACCOUNT.ACCOUNT_WITHDRAW:
      if (state.balance < action.payload)
        throw new Error("U don't have enough amount");
      return { ...state, balance: state.balance - action.payload };
    case ACTION_ACCOUNT.ACCOUNT_REQUEST_LOAN:
      if (state.loan > 0) return state;
      //TODO: later
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case ACTION_ACCOUNT.ACCOUNT_PAY_LOAN:
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = customerInitialStates, action) {
  switch (action.type) {
    case ACTION_CUSTOMER.CUSTOMER_CREATE:
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case ACTION_CUSTOMER.CUSTOMER_UPDATE:
      return { ...state, fullName: action.payload.fullName };

    default:
      return state;
  }
}
const reducersRoot = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(reducersRoot);

// action  creator for account
const withdraw = (amount) => {
  return { type: ACTION_ACCOUNT.ACCOUNT_WITHDRAW, payload: amount };
};

const deposit = (amount) => {
  return { type: ACTION_ACCOUNT.ACCOUNT_DEPOSIT, payload: amount };
};

const requestLoan = (amount, purpose) => {
  return {
    type: ACTION_ACCOUNT.ACCOUNT_REQUEST_LOAN,
    payload: { amount, purpose },
  };
};

const payLoan = () => {
  return { type: ACTION_ACCOUNT.ACCOUNT_REQUEST_LOAN };
};

// store.dispatch(deposit(3000));
// console.log(store.getState());

// store.dispatch(withdraw(300));
// console.log(store.getState());

// action creator for costumer
const createCostumer = (fullName, nationalID) => {
  return {
    type: ACTION_CUSTOMER.CUSTOMER_CREATE,
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
};

const updateCustomerFullName = (fullName) => {
  return { type: ACTION_CUSTOMER.CUSTOMER_UPDATE, payload: { fullName } };
};
store.dispatch(createCostumer("abdelali elyasraoui", "G2461752"));
console.log(store.getState());
