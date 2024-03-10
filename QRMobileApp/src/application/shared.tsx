export const PREFIX = 'APP@';
export const REDUCER_PREFIX = 'R@' + PREFIX;
export const SAGA_PREFIX = 'S@' + PREFIX;

export const SagaActions = {
    INIT: SAGA_PREFIX + 'INIT',
}

export const StoreActions = {
    SET: REDUCER_PREFIX + 'SET',
}

export interface ApplicationStoreData {
    isInitDone?: boolean;
    userId: string;
}