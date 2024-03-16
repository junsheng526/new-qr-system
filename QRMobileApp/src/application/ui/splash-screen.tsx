import { useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, Text } from 'react-native';
import { SPLASH_IMAGE } from '../../constants/assets';
import { reset } from '../../common/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SplashData { }

export interface SplashAction { }

export let Splash: React.FC<SplashData & SplashAction> = ({

}) => {

  const auth = getAuth();

  const appInit = async () => {
    // setValue("isDeviceRegistered", "false")
    const isDeviceRegistered = await AsyncStorage.getItem("isDeviceRegistered") === 'true';
    console.log("isDeviceRegistered: ", isDeviceRegistered);
    // isDeviceRegistered ? reset('secure', {}) : reset('LoginActivate', {});
    const unsubcribeFromAuthStateChanged = onAuthStateChanged(auth, user => {
      console.log("Check user auth state >> " + user)
      if (user && isDeviceRegistered) {
        reset('Main', {});
      } else if (!user && !isDeviceRegistered) {
        reset('Register', {});
      }
      else {
        reset('Login', {});
      }
    });
    return unsubcribeFromAuthStateChanged;
  }

  useEffect(() => {
    appInit()
  }, []);

  return (
    <>
      <View style={styles.content}>
        <Image style={styles.logo}
          resizeMode="contain"
          source={SPLASH_IMAGE}
        />
        <Text style={{ fontSize: 20, color: "#000000", fontWeight: "800" }}>
          Qr Food Ordering
        </Text>
      </View></>
  )
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    height: windowHeight * 0.12,
    width: windowHeight * 0.12,
  },
});