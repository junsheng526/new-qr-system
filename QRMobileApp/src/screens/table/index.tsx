import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Table from './connected/table-screen';

const Stack = createStackNavigator();

let Composed = () => (
  <Stack.Navigator>
    <Stack.Screen name="TableLanding" component={Table} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default Composed;
