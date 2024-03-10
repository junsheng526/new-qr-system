import { takeLatest } from 'redux-saga/effects';
import { SagaActions } from './shared';

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

function* menuProcess(init: Action) {

}
