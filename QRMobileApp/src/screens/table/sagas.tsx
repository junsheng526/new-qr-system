import { takeLatest, take, put, select } from 'redux-saga/effects';
import { SagaActions, StoreActions } from './shared';
import { navigate } from '../../common/navigation';

/**
 * Watchers are action that starts the process
 */

export const watchTable = function* () {
  yield takeLatest(SagaActions.INIT, tableProcess);
};

/**
 * Add all the watchers here
 */
export const Sagas = [watchTable];

function* tableProcess(init: Action) {

}
