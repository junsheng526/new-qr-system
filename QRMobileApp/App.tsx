import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ApplicationContainer from './src/application/connected/container';
import app from './src/common/firebase';
import { Provider } from 'react-redux';
import { goBack, navigate, navigationRef, reset } from './src/application/navigation';
import { store } from './src/application/store';
import { setupNav } from './src/common/navigation';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

const initFirebase = app;
// const DefaultTheme = useTheme();

const App = () => {
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            secondaryContainer: 'transparent'
        }
    };

    return (
        <PaperProvider theme={theme}>
            <Provider store={store}>
                <NavigationContainer ref={navigationRef}>
                    <ApplicationContainer />
                </NavigationContainer>
            </Provider>
        </PaperProvider>
    );
};

export default App;

setupNav(
    (screenName, param) => navigate(screenName, param),
    (screenName, param) => reset(screenName, param),
    () => goBack(),
);