import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ApplicationContainer from './src/application/connected/container';
import app from './src/common/firebase';
import { Provider } from 'react-redux';
import { goBack, navigate, navigationRef, reset } from './src/application/navigation';
import { store } from './src/application/store';
import { setupNav } from './src/common/navigation';

const initFirebase = app;

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
                <ApplicationContainer />
            </NavigationContainer>
        </Provider>
    );
};

export default App;

setupNav(
    (screenName, param) => navigate(screenName, param),
    (screenName, param) => reset(screenName, param),
    () => goBack(),
);