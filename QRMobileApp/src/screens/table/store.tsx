import { StoreActions, TableModel } from './shared';

let initial: TableModel = {
  value: ''
};

export const tableReducer: ReducerFormat<TableModel> = function (
  state: TableModel = { ...initial },
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
