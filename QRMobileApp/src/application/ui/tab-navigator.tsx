import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  ACTIVE_LOGIN,
  ACTIVE_ORDERS,
  ACTIVE_USER,
  INACTIVE_LOGIN,
  INACTIVE_ORDERS,
  INACTIVE_USER,
} from '../../assets/assets';
import { ImageURISource } from 'react-native';
import TabBarIcon from '../../components/TabBarIcon';
import Orders from '../../screens/orders';
import Table from '../../screens/table';
import Profile from '../../screens/profile';

export interface TabNavigatorData {

}

export interface TabNavigatorActions {

}

const Tab = createMaterialBottomTabNavigator();

type IconSet = {
  active: ImageURISource;
  inactive: ImageURISource;
};

type Icons = {
  [key: string]: IconSet;
};

export const TabNavigator: React.FC<TabNavigatorData & TabNavigatorActions> = () => {
  const icons: Icons = {
    Home: {
      active: ACTIVE_LOGIN,
      inactive: INACTIVE_LOGIN,
    },
    Orders: {
      active: ACTIVE_ORDERS,
      inactive: INACTIVE_ORDERS,
    },
    Profile: {
      active: ACTIVE_USER,
      inactive: INACTIVE_USER,
    },
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#5FBDFF"
      inactiveColor="#adaeb3"
      barStyle={{ backgroundColor: '#ececec' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const { active, inactive } = icons[route.name];
          const iconSource = focused ? active : inactive;
          return <TabBarIcon icon={iconSource} size={26} />;
        },
      })}>
      <Tab.Screen name="Home" component={Table} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
