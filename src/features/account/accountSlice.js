const accountInitialStates = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export const ACTION_ACCOUNT = {
  ACCOUNT_DEPOSIT: "account/deposit",
  ACCOUNT_WITHDRAW: "account/withdraw",
  ACCOUNT_REQUEST_LOAN: "account/requestLoan",
  ACCOUNT_PAY_LOAN: "account/payLoan",
};

export default function accountReducer(state = accountInitialStates, action) {
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

export const withdraw = (amount) => {
  return { type: ACTION_ACCOUNT.ACCOUNT_WITHDRAW, payload: amount };
};

export const deposit = (amount) => {
  return { type: ACTION_ACCOUNT.ACCOUNT_DEPOSIT, payload: amount };
};

export const requestLoan = (amount, purpose) => {
  return {
    type: ACTION_ACCOUNT.ACCOUNT_REQUEST_LOAN,
    payload: { amount, purpose },
  };
};

export const payLoan = () => {
  return { type: ACTION_ACCOUNT.ACCOUNT_REQUEST_LOAN };
};
