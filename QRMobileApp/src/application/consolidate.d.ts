/**
 * All the data
 *
 * Entries here must follow the name entered in the store.tsx
 * Under the combineReducers section
 *
 * This type is use to help check for all valid data
 */
type ApplicationStore = {
  applicationReducer: import('./shared').ApplicationStoreData;
  tableReducer: import('../screens/table/shared').TableModel;
  ordersReducer: import('../screens/orders/shared').OrdersModel;
  profileReducer: import('../screens/profile/shared').ProfileModel;
};

interface WithNavigation {
  navigation: any;
}
