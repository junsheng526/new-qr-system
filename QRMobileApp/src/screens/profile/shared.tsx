export const PREFIX = 'PROFILE@';
export const REDUCER_PREFIX = 'R@' + PREFIX;
export const SAGA_PREFIX = 'S@' + PREFIX;

export let SagaActions = {
  INIT: SAGA_PREFIX + 'INIT',
  GET_CATEGORIES_LIST: SAGA_PREFIX + 'GET_CATEGORIES_LIST',
  GET_MENU_ID_LIST: SAGA_PREFIX + 'GET_MENU_ID_LIST',
  GET_MENU_DATA: SAGA_PREFIX + 'GET_MENU_DATA',
  GET_DISH_DATA: SAGA_PREFIX + 'GET_DISH_DATA',
};

export let StoreActions = {
  SET: REDUCER_PREFIX + 'SET',
  LOAD: REDUCER_PREFIX + 'LOAD',
};

export interface MenuDataTypes {
  name: string
  price: number
  categories: string
  description: string
  availability: boolean
}
export interface ProfileModel {
  error: string;
  categoriesList: any;
  menuIdList: any;
  menuData: MenuDataTypes[];
}
