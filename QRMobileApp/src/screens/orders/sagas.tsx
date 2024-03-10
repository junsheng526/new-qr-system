import { takeLatest } from 'redux-saga/effects';
import { SagaActions } from './shared';

/**
 * Watchers are action that starts the process
 */

export const watchOrders = function* () {
  yield takeLatest(SagaActions.INIT, ordersProcess);
};

/**
 * Add all the watchers here
 */
export const Sagas = [watchOrders];

function* ordersProcess(init: Action) {

}
