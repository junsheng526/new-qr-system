import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from './connected/orders-screen';

const Stack = createStackNavigator();

let Composed = () => (
  <Stack.Navigator>
    <Stack.Screen name="OrdersLanding" component={Orders} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default Composed;
