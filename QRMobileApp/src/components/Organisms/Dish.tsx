import { firebase } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { navigate } from '../../common/navigation';

export interface DishProps {
    id: string;
    deleteDish: (id: string) => void;
    username: string;
}

const Dish = (props: DishProps) => {
    const { id, deleteDish, username } = props;

    const [tableData, setTableData] = useState<any | null>(null);

    const MenuRef = firebase.firestore().collection(username + 'Menu');

    useEffect(() => {
        fetchTable();
    }, [id]);

    const fetchTable = () => {
        if (id != null) {
            MenuRef.doc(id).onSnapshot(doc => {
                setTableData(doc.data());
            });
        }
    };

    const [isModalVisible, setModalVisible] = useState(false);

    const pickImage = async () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
            },
            response => {
                console.log(response, 'response');
                if (response.didCancel) {
                    // user cancel image selection
                    console.log('User cancel');
                } else if (response.errorMessage) {
                    console.log('Upload error >> ' + response.errorMessage);
                } else {
                    // here you access the image with response object
                    if (response?.assets) {
                        console.log('uri >> ' + response.assets[0].uri);
                        if (response.assets[0].uri) {
                            uploadImage(response.assets[0].uri, id);
                        }
                    }
                }
            },
        );
    };

    const uploadImage = async (uri: string, imageName: string) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = storage().ref(username + '/' + imageName);
        const url = ref.put(blob);

        ref.put(blob).then(function (result) {
            //Get URL and store to pass
            ref.getDownloadURL().then(url => {
                MenuRef.doc(imageName).update({ image: url.toString() });
            });
        });
    };

    const rightSwipe = (
        progress: any,
        dragX: {
            interpolate: (arg0: any) => any;
        },
    ) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                }}
                onPress={() => { deleteDish(id) }}
            >
                <Animated.Text style={{ transform: [{ scale: scale }], color: '#ffffff' }}>
                    DELETE
                </Animated.Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
            {tableData ? (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        margin: 1,
                        backgroundColor: '#EEEEEE'
                    }}
                    onPress={() => {
                        navigate('ProfileMenuEditScreen', { id: id })
                    }}>
                    <Swipeable renderRightActions={rightSwipe}>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingVertical: 8,
                                paddingStart: 24,
                            }}>
                            <Avatar.Image
                                size={60}
                                source={{
                                    uri:
                                        tableData.image !== ''
                                            ? tableData.image
                                            : 'https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/koisushiMenu%2Fdefault-food-image.jpg?alt=media&token=e6958bef-eae1-4144-b670-e717768d518f',
                                }}
                            />
                            <View
                                style={{
                                    padding: 8,
                                }}>
                                <Text
                                    style={{
                                        fontWeight: '700',
                                        textTransform: 'uppercase',
                                    }}>
                                    {tableData.name}
                                </Text>
                                <Text>RM {tableData.price}</Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row' }}>
                                <Button title='Edit' onPress={() => {
                                    // setModalVisible(true);
                                    navigate('ProfileMenuEditScreen', { id: id })
                                }}
                                />
                                <Button title='Delete' onPress={() => { deleteDish(id); }} />
                            </View> */}
                        </View>
                    </Swipeable>
                </TouchableOpacity>
            ) : (
                <View></View>
            )}
        </>
    );
};

export default Dish;

const styles = StyleSheet.create({
    deleteContainer: {},
});
