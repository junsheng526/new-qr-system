import React, { useEffect, useState } from 'react';
import EditAppBar from '../../../components/Atoms/EditAppBar';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import LabelTextInput from '../../../components/Atoms/LabelTextInput';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '..';
import { RouteProp } from '@react-navigation/native';

export interface ProfileMenuEditActions {
    init: () => void
}

export interface ProfileMenuEditData {
    username: string
}

export type OwnProps = {
    navigation: StackNavigationProp<ProfileStackParamList>;
    route: RouteProp<ProfileStackParamList, 'ProfileMenuEditScreen'>;
}

export let ProfileMenuEdit: React.FC<ProfileMenuEditActions & ProfileMenuEditData & OwnProps> = ({
    navigation,
    route,
    init
}) => {

    let username = 'R00001'
    let id = route.params.id

    const [tableData, setTableData] = useState<any | null>(null);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [categories, setCategories] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");
    const [availability, setAvailability] = useState<boolean>(false);
    const [restauCategories, setRestauCategories] = useState<string[]>([]);
    const [checkeds, setCheckeds] = useState<{ [key: string]: boolean }>({});

    const MenuRef = firebase.firestore().collection(username + "Menu");
    const RestaurantRef = firebase.firestore().collection("restaurants").doc(username);

    const defaultUri = "https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/koisushiMenu%2Fdefault-food-image.jpg?alt=media&token=e6958bef-eae1-4144-b670-e717768d518f"

    const [imageUri, setImageUri] = useState<string>(defaultUri);

    useEffect(() => {
        fetchDish();
        fetchCategory();
    }, []);

    useEffect(() => {
        if (tableData) {
            if (tableData.image !== '') {
                setImageUri(tableData.image);
            }
        }
    }, [tableData]);

    const fetchDish = () => {
        MenuRef.doc(id).get().then(doc => {
            if (doc.exists) {
                const data = doc.data();
                if (data) {
                    setName(data.name);
                    setPrice(data.price);
                    setCategories(data.categories);
                    setDescription(data.description);
                    setAvailability(data.availability);
                }
            } else {
                console.log("No such doc");
            }
        });
    }

    const fetchCategory = () => {
        RestaurantRef.get().then(doc => {
            const restaurantCategories = doc.data()?.categories || [];
            setRestauCategories(restaurantCategories);
            const temp: { [key: string]: boolean } = {};
            restaurantCategories.forEach((category: string | number) => {
                temp[category] = false;
            });
            categories.forEach(category => {
                if (temp[category] !== undefined) {
                    temp[category] = true;
                }
            });
            setCheckeds(temp);
        });
    }

    useEffect(() => {
        fetchTable();
    }, [id]);


    const fetchTable = () => {
        if (id !== null) {
            MenuRef.doc(id).onSnapshot((doc) => {
                setTableData(doc.data());
            });
        }
    };

    const pickImage = async () => {
        launchImageLibrary({
            mediaType: 'photo'
        }, (response) => {
            console.log(response, 'response')
            if (response.didCancel) {
                // user cancel image selection
                console.log("User cancel")
            } else if (response.errorMessage) {
                console.log("Upload error >> " + response.errorMessage)
            } else {
                // here you access the image with response object
                if (response?.assets) {
                    console.log("uri >> " + response.assets[0].uri)
                    if (response.assets[0].uri) {
                        uploadImage(response.assets[0].uri, id)
                    }
                }
            }
        });
    };

    const uploadImage = async (uri: string, imageName: string) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = storage().ref(username + "/" + imageName);
        const url = ref.put(blob);

        ref.put(blob).then(function (result) {
            //Get URL and store to pass
            ref.getDownloadURL().then((url) => {
                MenuRef.doc(imageName).update({ image: url.toString() });
            });
        });
    };

    const handleSave = () => {
        // TODO: Handle save data to firestore
        MenuRef.doc(id).update({
            name: name,
            price: Number(price),
            description: description,
            availability: availability
        }).then(() => {
            console.log('Menu updated successfuly!');
            ToastAndroid.show('Menu updated successfuly!', ToastAndroid.SHORT);
            // TODO: If success will navigate pop
            navigation.pop();
        }).catch(error => {
            console.log('Error when update menu details >> ' + error);
            ToastAndroid.show('Error when update menu details >> ' + error, ToastAndroid.LONG);
            return
        });
    }

    const createCheckBox = () => {
        return restauCategories.map((category, index) => (
            <View
                key={index}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Text>{category}</Text>
                <Switch
                    value={checkeds[category]}
                    onValueChange={() => {
                        const temp = { ...checkeds };
                        temp[category] = !checkeds[category];
                        if (category === "prompt" && temp[category] === true) {
                            Alert.alert("Don't forget to set Prompt Price!");
                        }
                        setCheckeds(temp);
                    }}
                />
            </View>
        ));
    }

    return (
        <View style={styles.safeArea}>
            <EditAppBar
                title='Edit Dish Details'
                onBack={() => { navigation.pop() }}
                onPressSave={() => { handleSave() }}
            />
            <ScrollView style={styles.container}>
                <View style={{
                    alignItems: 'center',
                    paddingVertical: 36,
                }}>
                    <TouchableOpacity
                        onPress={() => pickImage()}>
                        <Avatar.Image size={150}
                            source={{ uri: imageUri }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    paddingHorizontal: 24
                }}>
                    <LabelTextInput
                        label='NAME'
                        labelStyle={{
                            paddingStart: 8,
                            fontWeight: '700'
                        }}
                        value={name}
                        onChangeText={na => setName(na)}
                    />
                    <LabelTextInput
                        label='PRICE'
                        labelStyle={{
                            paddingStart: 8,
                            fontWeight: '700'
                        }}
                        value={String(price)}
                        onChangeText={pri => setPrice(Number(pri))}
                    />
                    <LabelTextInput
                        label='DESCRIPTION'
                        labelStyle={{
                            paddingStart: 8,
                            fontWeight: '700'
                        }}
                        value={description}
                        onChangeText={des => setDescription(des)}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: 50,
                    }}>
                        <Text style={{
                            paddingStart: 8,
                            fontWeight: '700',
                            alignSelf: 'center',
                        }}>AVAILABILITY</Text>
                        <Switch
                            value={availability}
                            onValueChange={setAvailability}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        paddingStart: 8,
                    }}>
                        <Text style={{
                            fontWeight: '700',
                            paddingBottom: 16,
                        }}>CATEGORIES</Text>
                        {restauCategories !== null ? createCheckBox() : "aa"}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 16,
    },
});