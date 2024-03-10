// import React, { useEffect } from 'react';
// import { Provider } from 'react-redux';
// import { NavigationContainer } from '@react-navigation/native';
// import ApplicationContainer from './connected/container';
// import { store } from './store';
// import { goBack, navigate, navigationRef, reset } from './navigation';
// import { setupNav } from '../common/navigation';
// // import app from '../../src/common/firebase-init';


// export default function App() {

//   // const initFirebase = app;

//   return (
//     <Provider store={store}>
//       <NavigationContainer ref={navigationRef}>
//         <ApplicationContainer />
//       </NavigationContainer>
//     </Provider>
//   );
// }

// /**
//  * Use to remove dependency from application
//  * Export the project navigation to commons
//  */
// setupNav(
//   (screenName, param) => navigate(screenName, param),
//   (screenName, param) => reset(screenName, param),
//   () => goBack(),
// );
