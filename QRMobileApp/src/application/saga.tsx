/**
 * Construct root saga
 */
import { all, fork, takeLatest, put } from 'redux-saga/effects';
import { Sagas as TableSagas } from '../screens/table/sagas';

export const rootSaga = function* () {
  const sagas: any[] = [];

  let copyall = (saga: any) => sagas.push(saga);

  //modules processes
  TableSagas.forEach(copyall);

  yield all(sagas.map(saga => fork(saga)));
};
