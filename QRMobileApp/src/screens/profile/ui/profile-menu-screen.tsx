import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import { Dialog, Portal, TextInput } from 'react-native-paper';
import Dish from '../../../components/Organisms/Dish';
import Button from '../../../components/Atoms/Button';

export interface ProfileMenuActions {
    init: () => void
}

export interface ProfileMenuData {
    username: string
}

export let ProfileMenu: React.FC<ProfileMenuActions & ProfileMenuData> = ({
    // username,
    init
}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [newCategory, setNewCategory] = useState<string | null>(null);
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [restauCategories, setRestauCategories] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);
    let username = 'R00001'

    let MenuRef = firebase.firestore().collection(username + "Menu");

    useEffect(() => {
        console.log("username >> " + username)
        getCurIndex();
        getAllID();
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        firebase.firestore().collection("restaurants").doc(username)
            .get()
            .then(doc => {
                const categories = doc.data()?.categories || [];
                console.log("categories from firestore >> " + categories)
                setRestauCategories(categories);
            });
    };

    const getCurIndex = () => {
        firebase.firestore().collection("restaurants").doc(username)
            .get()
            .then(doc => {
                console.log("doc.data() >> " + JSON.stringify(doc.data()))
                setCurrentIndex(doc.data()?.index || 0);
            });
    };

    const hideCategoryDialog = () => {
        setCategoryDialogOpen(false);
    };

    const createNew = () => {
        if (currentIndex !== undefined) {
            console.log("currentIndex !== undefined")
            MenuRef.doc(currentIndex.toString())
                .set({
                    image: "", name: currentIndex.toString(), price: 0, categories: ["All"], description: "",
                    id: currentIndex.toString(), availability: true, newPrice: 0
                })
                .then(() =>
                    firebase.firestore().collection("restaurants").doc(username)
                        .update({ index: currentIndex + 1 })
                ).then(() => setCurrentIndex(currentIndex + 1));

            getAllID();
        }
        console.log("currentIndex === undefined")
    };

    const deleteDish = (dishId: string) => {
        MenuRef.doc(dishId).delete();
        getAllID();
    };

    const getAllID = () => {
        const list: number[] = [];
        MenuRef
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    list.push(Number(doc.id));
                });
                setData(list.sort((a, b) => a - b));
            });
    };

    const addCategory = () => {
        if (newCategory !== null) {
            firebase.firestore().collection("restaurants").doc(username)
                .update({
                    categories: firebase.firestore.FieldValue.arrayUnion(newCategory)
                })
                .then(fetchCategories)
                .then(() => setNewCategory(null));
        }
    };

    const deleteCategory = (category: string) => {
        if (category !== null) {
            firebase.firestore().collection("restaurants").doc(username)
                .update({
                    categories: firebase.firestore.FieldValue.arrayRemove(category)
                })
                .then(fetchCategories);
        }
    };

    const renderCategory = (category: string) => {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>{category}</Text>
                    <Button
                        title="Delete"
                        onPress={() => deleteCategory(category)}
                        textStyles={{
                            color: '#5FBDFF',
                        }}
                        buttonStyles={{
                            borderColor: '#5FBDFF',
                            borderWidth: 2,
                            borderRadius: 3,
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            marginHorizontal: 5,
                        }}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20 }}> MENU </Text>
            <Button
                title="Edit Category"
                onPress={() => { setCategoryDialogOpen(true) }}
                textStyles={{
                    color: '#5FBDFF',
                }}
                buttonStyles={{
                    borderColor: '#5FBDFF',
                    borderWidth: 2,
                    borderRadius: 3,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    marginHorizontal: 5,
                }}
            />
            <Portal>
                <Dialog
                    visible={categoryDialogOpen}
                    onDismiss={hideCategoryDialog}>
                    <Dialog.Title>All Categories</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            placeholder='Enter New Category'
                            value={newCategory || undefined}
                            onChangeText={inputCategory => setNewCategory(inputCategory)}
                        />
                        <Button
                            title="Add"
                            onPress={() => { addCategory() }}
                            textStyles={{
                                color: '#5FBDFF',
                            }}
                            buttonStyles={{
                                borderColor: '#5FBDFF',
                                borderWidth: 2,
                                borderRadius: 3,
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                marginHorizontal: 5,
                            }}
                        />
                        <FlatList
                            data={restauCategories}
                            renderItem={({ item, index }) => renderCategory(item)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={hideCategoryDialog}
                            title='Done'
                            textStyles={{
                                color: '#5FBDFF',
                            }}
                            buttonStyles={{
                                borderColor: '#5FBDFF',
                                borderWidth: 2,
                                borderRadius: 3,
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                marginHorizontal: 5,
                            }}
                        />
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }}>
                <Button
                    title='Add New Dish'
                    onPress={() => { createNew() }}
                    textStyles={{
                        color: '#5FBDFF',
                    }}
                    buttonStyles={{
                        borderColor: '#5FBDFF',
                        borderWidth: 2,
                        borderRadius: 3,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        marginHorizontal: 5,
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Dish id={item.toString()} deleteDish={deleteDish} username={username} />}
                    keyExtractor={item => item.toString()}
                    numColumns={2}
                />
            </View>
        </View>
    );
}