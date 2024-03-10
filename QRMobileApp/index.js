import {AppRegistry} from 'react-native';
// import Application from './src/application';
import {name as appName} from './app.json';
import app from './src/common/firebase';
import App from './App';

const initFirebase = app;

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }
  return <Application />;
}

AppRegistry.registerComponent(appName, () => App);
