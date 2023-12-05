import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/BottomTab/Profile';
import Menu from '../screens/Menu';

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileStack"
        component={Profile}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen name="Menu" component={Menu} />
    </ProfileStack.Navigator>
  );
}
