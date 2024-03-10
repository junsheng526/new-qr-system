import { StoreActions, OrdersModel } from './shared';

let initial: OrdersModel = {
  value: ''
};

export const ordersReducer: ReducerFormat<OrdersModel> = function (
  state: OrdersModel = { ...initial },
  action,
) {
  switch (action.type) {
    case StoreActions.SET:
      console.log('value: ', action.data);
      return { ...state, value: action.data };

    default:
      return state;
  }
};
