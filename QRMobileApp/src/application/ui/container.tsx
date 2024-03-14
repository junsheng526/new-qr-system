import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Table from '../../screens/table';
import TabNavigator from '../connected/tab-navigator'
import Login from '../connected/login-screen'
import SplashScreen from '../connected/splash-screen';

let Stack = createStackNavigator();

export interface ScreenBuilder {
  name: string;
  component: (props: any) => JSX.Element;
}

export interface ApplicationData {
}

export interface ApplicationActions {
  initialization: () => void;
}

export let Container: React.FC<ApplicationData & ApplicationActions> = ({
  initialization,
}) => {

  useEffect(() => {
    console.log('root screen reload');
    initialization();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Signup" component={Table} />
    </Stack.Navigator>
  );
};

/**
 * Main Stack with only 3 screens, Main will be the landing page controlling by navigator
 */
