import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/BottomTab/Profile';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Menu from '../screens/Menu';
import {TabNavigator} from './TabNavigator';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
};
