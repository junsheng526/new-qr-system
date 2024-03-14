import React from 'react';
import {
    Alert,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { ICON_LOGIN } from '../../constants/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { navigate } from '../../common/navigation';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginScreenData {

}

export interface LoginScreenActions {
    setUserId: (userId: string) => void
}

export var loggedUser: any;
const { width, height } = Dimensions.get('window');
const imageWidth = width * 0.4;
const imageHeight = height * 0.4;

const auth = getAuth();

export const LoginScreen: React.FC<LoginScreenData & LoginScreenActions> = ({
    setUserId,
}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navToMain = () => {
        navigate('Main')
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                loggedUser = auth.currentUser;
                console.log("loggedUser >> " + loggedUser)
                setUserId(loggedUser);
                if (rememberMe) {
                    AsyncStorage.setItem('isAuthenticate', 'true');
                }
            })
            .then(navToMain)
            .catch(function (error: any) {
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert(
                    errorCode,
                    errorMessage,
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                    { cancelable: false },
                );
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={ICON_LOGIN} style={styles.logo} />
                </View>
                <Text style={styles.text}>Login</Text>
                <View style={styles.inputTextBox}>
                    <TextInput
                        placeholder="Email Address"
                        style={styles.inputText}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={styles.inputTextBox}>
                    <TextInput
                        placeholder="Password"
                        style={styles.inputText}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={rememberMe}
                        onValueChange={(newValue) => setRememberMe(newValue)}
                        tintColors={{ true: '#AD40AF', false: '#AD40AF' }}
                    />
                    <Text style={styles.label}>Remember Me</Text>
                </View>
                <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: imageWidth,
        height: imageHeight,
    },
    text: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 30,
    },
    inputTextBox: {
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
    },
    inputText: {
        flex: 1,
        paddingVertical: 0,
    },
    button: {
        backgroundColor: '#AD40AF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
    },
    btnText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#AD40AF',
        marginRight: 10,
    },
    label: {
        fontSize: 16,
    },
});