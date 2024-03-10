export const PREFIX = 'PROFILE@';
export const REDUCER_PREFIX = 'R@' + PREFIX;
export const SAGA_PREFIX = 'S@' + PREFIX;

export let SagaActions = {
  INIT: SAGA_PREFIX + 'INIT',
};

export let StoreActions = {
  SET: REDUCER_PREFIX + 'SET',
  LOAD: REDUCER_PREFIX + 'LOAD',
};

export interface ProfileModel {
  value: string;
}
