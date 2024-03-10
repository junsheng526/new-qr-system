import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Table from './connected/table';

const Stack = createStackNavigator();

let Composed = () => (
  <Stack.Navigator>
    <Stack.Screen name="TableLanding" component={Table} />
  </Stack.Navigator>
);

export default Composed;
