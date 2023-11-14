const customerInitialStates = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

//* actions

export const ACTION_CUSTOMER = {
  CUSTOMER_CREATE: "customer/create",
  CUSTOMER_UPDATE: "customer/updateFullName",
};

export default function customerReducer(state = customerInitialStates, action) {
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

export const createCostumer = (fullName, nationalID) => {
  return {
    type: ACTION_CUSTOMER.CUSTOMER_CREATE,
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
};

export const updateCustomerFullName = (fullName) => {
  return { type: ACTION_CUSTOMER.CUSTOMER_UPDATE, payload: { fullName } };
};
