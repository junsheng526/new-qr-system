import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Table from '../../screens/table';
import TabNavigator from '../connected/tab-navigator'
import Login from '../connected/login'
import firebase from "../../common/firebase";
import { useAuth } from '../../common/firebase-auth';

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

  const { user } = useAuth();

  const isAuthenticate = user ? "Main" : "Login";

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticate}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Signup" component={Table} />
    </Stack.Navigator>
  );
};
