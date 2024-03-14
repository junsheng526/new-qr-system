import { StoreActions, ProfileModel } from './shared';

let initial: ProfileModel = {
  error: '',
  categoriesList: [],
  menuIdList: [],
  menuData: [],
};

export const profileReducer: ReducerFormat<ProfileModel> = function (
  state: ProfileModel = { ...initial },
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
