import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './connected/menu';
import Profile from './connected/profile';

const Stack = createStackNavigator();

let Composed = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileScreen" component={Profile} options={{ headerShown: false }} />
    <Stack.Screen name="ProfileMenuScreen" component={Menu} />
  </Stack.Navigator>
);

export default Composed;
