import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaActions, StoreActions } from './shared';
import { firebase } from '@react-native-firebase/firestore';
import { createActionData } from '../../application/redux-utils';

/**
 * Watchers are action that starts the process
 */

export const watchMenu = function* () {
  yield takeLatest(SagaActions.INIT, menuProcess);
};

/**
 * Add all the watchers here
 */
export const Sagas = [watchMenu];

function* menuProcess(init: Action): Generator<any, void, any> {
  yield takeLatest(SagaActions.GET_CATEGORIES_LIST, getCategoriesList);
  yield takeLatest(SagaActions.GET_MENU_ID_LIST, getMenuIdList);
  yield takeLatest(SagaActions.GET_MENU_DATA, getMenuData);
  yield takeLatest(SagaActions.GET_DISH_DATA, getDishData);
}

function* getCategoriesList(init: Action): Generator<any, void, any> {
  let categories = [];
  try {
    const username = init.data.username;
    const doc = yield call(() =>
      firebase.firestore().collection("restaurants").doc(username).get()
    );
    categories = doc.data()?.categories;
    console.log("categories from firestore >> ", categories);
  } catch (error) {
    console.error("Error fetching categories: ", error);
    yield put(createActionData(StoreActions.SET, { error: 'Retrieving categories error!' }))
    return
  }
  yield put(createActionData(StoreActions.SET, { categories: categories }))
}

function* getMenuData(init: Action): Generator<any, void, any> {

  const id = init.data.id
  const username = init.data.username;
  let MenuRef = firebase.firestore().collection(username + "Menu");

  try {
    const response = yield call(() => MenuRef.doc(id).get());
    yield put(createActionData(StoreActions.SET, { categoriesList: response }))
  } catch (error) {
    console.error("Error fetching menu data: ", error);
    yield put(createActionData(StoreActions.SET, { error: 'Retrieve menu data error!' }))
    return
  }
};

function* getDishData(init: Action): Generator<any, void, any> {
  const id = init.data.id
  const username = init.data.username;
  let MenuRef = firebase.firestore().collection(username + "Menu");

  try {
    const response = yield call(() => MenuRef.doc(id).get());
    yield put(createActionData(StoreActions.SET, {
      menuData: {
        name: response.name,
        price: response.price,
        categories: response.categories,
        description: response.description,
        availability: response.availability,
      }
    }))
  } catch (error) {
    console.error("Error fetching menu data: ", error);
    yield put(createActionData(StoreActions.SET, { error: 'Retrieve menu data error!' }))
    return
  }


}

function* getMenuIdList(init: Action): Generator<any, void, any> {
  const username = init.data.username;
  let MenuRef = firebase.firestore().collection(username + "Menu");
  let list: number[] = [];
  try {
    const querySnapshot = yield call(() => MenuRef.get());
    querySnapshot.forEach((doc: { id: string | number; }) => {
      list.push(Number(doc.id));
    });
    list = list.sort((a, b) => a - b)
  } catch (error) {
    console.error("Error fetching all IDs: ", error);
    yield put(createActionData(StoreActions.SET, { error: 'Retrieving all IDs error!' }))
    return
  }
  yield put(createActionData(StoreActions.SET, { menuIdList: list }))
}