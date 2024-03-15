import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './connected/profile-menu-screen';
import Profile from './connected/profile-screen';
import ProfileMenuEdit from './connected/profile-menu-edit-screen';

const Stack = createStackNavigator();

export type ProfileStackParamList = {
  ProfileScreen: {};
  ProfileMenuScreen: {};
  ProfileMenuEditScreen: { id: string };
};

let Composed = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileScreen" component={Profile} />
    <Stack.Screen name="ProfileMenuScreen" component={Menu} />
    <Stack.Screen name="ProfileMenuEditScreen" component={ProfileMenuEdit} />
  </Stack.Navigator>
);

export default Composed;
