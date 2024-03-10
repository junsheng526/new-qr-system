/**
 * Construct root saga
 */
import { all, fork, takeLatest, put } from 'redux-saga/effects';
import { Sagas as TableSagas } from '../screens/table/sagas';
import { Sagas as OrdersSagas } from '../screens/orders/sagas';
import { Sagas as ProfileSagas } from '../screens/profile/sagas';
import { SagaActions, StoreActions } from './shared';
import { createActionData } from './redux-utils';
// import app from '../common/firebase-init';

export const rootSaga = function* () {
  const sagas: any[] = [];

  let copyall = (saga: any) => sagas.push(saga);

  //modules processes
  TableSagas.forEach(copyall);
  OrdersSagas.forEach(copyall);
  ProfileSagas.forEach(copyall);

  //Application level processes
  sagas.push(watchApplicationInitialization);

  yield all(sagas.map(saga => fork(saga)));
};

export const watchApplicationInitialization = function* () {
  yield takeLatest(SagaActions.INIT, initializeApplication);
};

function* initializeApplication(init: Action) {

  // const initFirebase = app
  yield put(createActionData(StoreActions.SET, { isInitDone: true }));

  return;
}
