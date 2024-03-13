import { firebase } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';

export interface DishProps {
    id: string;
    deleteDish: (id: string) => void;
    username: string;
}

const Dish = (props: DishProps) => {
    const { id, deleteDish, username } = props;

    const [tableData, setTableData] = useState<any | null>(null);

    const MenuRef = firebase.firestore().collection(username + "Menu");

    useEffect(() => {
        fetchTable();
    }, [id]);

    const fetchTable = () => {
        if (id != null) {
            MenuRef.doc(id).onSnapshot((doc) => {
                setTableData(doc.data());
            });
        }
    };

    const [isModalVisible, setModalVisible] = useState(false);

    // const getPermissionAsync = async () => {
    //     if (Platform.OS === 'ios') {
    //         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //         if (status !== 'granted') {
    //             alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //     }
    // };

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

    return (
        <>
            {
                tableData ? (
                    <View style={{ flex: 10, margin: 1, borderStyle: 'solid' }}>
                        <Modal
                            style={{ margin: 0, justifyContent: 'center', position: 'absolute', alignItems: 'center' }}
                            animationType="slide"
                            transparent={false}
                            visible={isModalVisible}>
                            <Text>HAHA</Text>
                            <Button title='haha' onPress={() => setModalVisible(false)} />
                            {/* <DishElement id={this.state.id} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} /> */}

                        </Modal>



                        <View>
                            <Text> Name: {tableData.name}</Text>
                            <Text> Price: ${tableData.price}</Text>
                            <TouchableOpacity
                                onPress={() => pickImage()}>
                                <Avatar.Image size={50}
                                    source={{ uri: (tableData.image !== "") ? tableData.image : "https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/koisushiMenu%2Fdefault-food-image.jpg?alt=media&token=e6958bef-eae1-4144-b670-e717768d518f" }}
                                />
                                <Text>Change Image</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <Button title='Edit' onPress={() => { setModalVisible(true); }} />
                                <Button title='Delete' onPress={() => { deleteDish(id); }} />
                            </View>
                        </View>
                    </View>
                ) : (
                    <View></View>
                )
            }
        </>
    );
};

export default Dish;
