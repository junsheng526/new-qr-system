import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef: any = createNavigationContainerRef();

export const navigate = (name: string, params: any) => {
  if (navigationRef.isReady && navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const reset = (name: string, params: any) => {
  if (navigationRef.isReady && navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{name, params}],
    });
  }
};

export const goBack = () => {
  if (navigationRef.isReady && navigationRef.isReady()) {
      navigationRef.goBack();
  }
};