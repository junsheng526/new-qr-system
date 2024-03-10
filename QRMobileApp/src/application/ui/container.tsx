import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Sample1Secure from '../../screens/table';
import TabNavigator from '../connected/tab-navigator'
import Login from '../connected/login'
import { useAuth } from '../../common/fiebase-auth';

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
}) => {

  const { user } = useAuth();

  const isAuthenticate = user ? "Main" : "Login";

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticate}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Signup" component={Sample1Secure} />
    </Stack.Navigator>
  );
};
