import {useAuth} from '../common/useAuth';
import {AppNavigator} from './AppNavigator';
import {TabNavigator} from './TabNavigator';

export default function RootNavigation() {
  const {user} = useAuth();

  return user ? <TabNavigator /> : <AppNavigator />;
}
