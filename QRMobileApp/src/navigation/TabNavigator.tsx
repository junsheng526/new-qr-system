import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {ICON_HOME, ICON_ORDER, ICON_PROFILE} from '../assets/assets';
import {ImageSourcePropType} from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import Orders from '../screens/BottomTab/Orders';
import Table from '../screens/BottomTab/Table';
import ProfileStackNavigator from './ProfileStack';

const Tab = createMaterialBottomTabNavigator();

type Icons = {
  [key: string]: ImageSourcePropType;
};

export const TabNavigator = () => {
  const icons: Icons = {
    Home: ICON_HOME,
    Profile: ICON_PROFILE,
    Orders: ICON_ORDER,
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#ffffff"
      inactiveColor="#000000"
      barStyle={{backgroundColor: '#ececec'}}
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          return <TabBarIcon icon={icons[route.name]} size={26} />;
        },
      })}>
      <Tab.Screen name="Home" component={Table} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};
