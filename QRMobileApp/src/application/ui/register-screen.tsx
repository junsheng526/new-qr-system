import React from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View,
} from 'react-native';
import { ICON_LOGIN } from '../../constants/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { navigate, reset } from '../../common/navigation';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RegisterScreenData {

}

export interface RegisterScreenActions {
    setUserId: (userId: string) => void
}

export var loggedUser: any;
const { width, height } = Dimensions.get('window');
const imageWidth = width * 0.4;
const imageHeight = height * 0.4;

export const RegisterScreen: React.FC<RegisterScreenData & RegisterScreenActions> = ({
}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSignUp = () => {
        if (confirmPassword !== password) {
            Alert.alert(
                'Passwords Do Not Match',
                'Please re-enter your password correctly',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        } else {
            auth().
                createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User account created & signed in!');
                    ToastAndroid.show('User account created successfuly!', ToastAndroid.SHORT);
                    firestore().collection("restaurants").doc(username).set({ categories: ["all"] })
                    AsyncStorage.setItem('isRegistered', 'true');
                })
                .then(() => {
                    let user = auth().currentUser;
                    if (user) {
                        user
                            .updateProfile({
                                displayName: username,
                            })
                            .then(() => {
                                auth().signOut();
                                reset('Login', {})
                            });
                    }
                })
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
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={ICON_LOGIN} style={styles.logo} />
                </View>
                <Text style={styles.text}>Signup</Text>
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
                        placeholder="Restaurant Name"
                        style={styles.inputText}
                        value={username}
                        onChangeText={text => setUsername(text)}
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
                <View style={styles.inputTextBox}>
                    <TextInput
                        placeholder="Re-Enter Password"
                        style={styles.inputText}
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                    />
                </View>
                <TouchableOpacity onPress={() => handleSignUp()} style={styles.button}>
                    <Text style={styles.btnText}>Create Account</Text>
                </TouchableOpacity>
            </ScrollView>
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
});