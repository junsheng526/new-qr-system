/**
 * This is the main redux store
 *
 * Combine all your module store here
 */
import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga';
import { ApplicationStoreData, StoreActions } from './shared';
import { sampleSecureReducer } from '../screens/table/store'

let applicatonData: ApplicationStoreData = {
  isInitDone: false,
  loginNav: undefined,
}

const applicationReducer: ReducerFormat<ApplicationStoreData> = function (state = { ...applicatonData }, action) {
  switch (action.type) {
    case StoreActions.SET:
      return { ...state, ...action.data }
    default:
      return state;
  }
}

const reduxSaga = createSagaMiddleware();
/**
 * All your application reducers
 */
const rootReducers = combineReducers({
  applicationReducer,
  sampleSecureReducer
});

export const store = legacy_createStore(
  rootReducers,
  applyMiddleware(reduxSaga),
);
reduxSaga.run(rootSaga);