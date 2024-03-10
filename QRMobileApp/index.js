/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Application from './src/application';
import {name as appName} from './app.json';
import {initializeApp} from 'firebase/app';

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }
  return <Application />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
