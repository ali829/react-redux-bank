import { createStore } from "redux";

const initialStates = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const ACTION = {
  ACCOUNT_DEPOSIT: "account/deposit",
  ACCOUNT_WITHDRAW: "account/withdraw",
  ACCOUNT_REQUEST_LOAN: "account/requestLoan",
  ACCOUNT_PAY_LOAN: "account/payLoan",
};

function reducer(state = initialStates, action) {
  switch (action.type) {
    case ACTION.ACCOUNT_DEPOSIT:
      return { ...state, balance: state.balance + action.payload };
    case ACTION.ACCOUNT_WITHDRAW:
      if (state.balance < action.payload)
        throw new Error("U don't have enough amount");
      return { ...state, balance: state.balance - action.payload };
    case ACTION.ACCOUNT_REQUEST_LOAN:
      if (state.loan > 0) return state;
      //TODO: later
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case ACTION.ACCOUNT_PAY_LOAN:
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

const store = createStore(reducer);

const withdraw = (amount) => {
  return { type: ACTION.ACCOUNT_WITHDRAW, payload: amount };
};

const deposit = (amount) => {
  return { type: ACTION.ACCOUNT_DEPOSIT, payload: amount };
};

const requestLoan = (amount, purpose) => {
  return { type: ACTION.ACCOUNT_REQUEST_LOAN, payload: { amount, purpose } };
};

const payLoan = () => {
  return { type: ACTION.ACCOUNT_REQUEST_LOAN };
};

store.dispatch(deposit(3000));
console.log(store.getState());

store.dispatch(withdraw(300));
console.log(store.getState());
