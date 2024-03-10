import uuid from 'react-native-uuid';

export const createAction: (action: string) => Action = dispatchAction => {
  return {
    id: uuid.v4(),
    type: dispatchAction,
  };
};

export const createActionData: (action: string, data: any) => Action = (
  dispatchAction,
  data,
) => {
  return {
    id: uuid.v4(),
    type: dispatchAction,
    data,
  };
};
