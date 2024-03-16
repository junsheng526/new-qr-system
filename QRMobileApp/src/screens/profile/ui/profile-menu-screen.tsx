import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ToastAndroid } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import { Dialog, Portal, TextInput } from 'react-native-paper';
import Dish from '../../../components/Organisms/Dish';
import Button from '../../../components/Atoms/Button';
import AppBar from '../../../components/Atoms/AppBar';
import { navigate } from '../../../common/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '..';
import { RouteProp } from '@react-navigation/native';
import CategoriesList from '../../../components/Organisms/CategoriesList';

export interface ProfileMenuActions {
    init: () => void
}

export interface ProfileMenuData {
    username: string
}

export type OwnProps = {
    navigation: StackNavigationProp<ProfileStackParamList>;
    route: RouteProp<ProfileStackParamList, 'ProfileMenuScreen'>;
}

export let ProfileMenu: React.FC<ProfileMenuActions & ProfileMenuData & OwnProps> = ({
    username,
    navigation,
    route,
    init
}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [newCategory, setNewCategory] = useState<string | null>(null);
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [restauCategories, setRestauCategories] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);

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
            console.log("currentIndex >> " + currentIndex.toString())
            MenuRef.doc(currentIndex.toString())
                .set({
                    image: "",
                    name: `Dish ${currentIndex.toString()}`,
                    price: 0, categories: ["All"],
                    description: "",
                    id: currentIndex.toString(),
                    availability: true,
                    newPrice: 0
                })
                .then(() => {
                    ToastAndroid.show(`Dish ${currentIndex.toString()} added successfuly!`, ToastAndroid.SHORT)
                })
                .then(() =>
                    firebase.firestore().collection("restaurants").doc(username)
                        .update({ index: currentIndex + 1 })
                ).then(() => setCurrentIndex(currentIndex + 1));

            getAllID();
        } else {
            console.log("currentIndex === undefined")
        }
    };

    const deleteDish = (dishId: string) => {
        MenuRef.doc(dishId).delete()
            .then(() => {
                ToastAndroid.show('Dish deleted successfuly!', ToastAndroid.SHORT)
            })
            .catch(error => {
                console.log('Error when delete the dish >> ' + error);
                ToastAndroid.show('Error when delete the dish >> ' + error, ToastAndroid.LONG);
                return
            });
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

    return (
        <View style={{ flex: 1 }}>
            <AppBar title='MENU' onBack={() => { navigation.pop() }} />
            <CategoriesList
                visible={categoryDialogOpen}
                categories={restauCategories}
                newCategory={newCategory}
                hideCategoryDialog={hideCategoryDialog}
                setNewCategory={setNewCategory}
                addCategory={addCategory}
                deleteCategory={deleteCategory}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }}>
                <Button
                    title="Edit Category"
                    onPress={() => { setCategoryDialogOpen(true) }}
                    buttonStyles={{
                        backgroundColor: '#5FBDFF',
                        paddingVertical: 16,
                        paddingHorizontal: 24,
                        borderRadius: 4,
                        marginHorizontal: 5,
                    }}
                    textStyles={{
                        color: '#FFFFFF',
                    }}
                />
                <Button
                    title='Add New Dish'
                    onPress={() => { createNew() }}
                    buttonStyles={{
                        backgroundColor: '#5FBDFF',
                        paddingVertical: 16,
                        paddingHorizontal: 24,
                        borderRadius: 4,
                        marginHorizontal: 5,
                    }}
                    textStyles={{
                        color: '#FFFFFF',
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Dish id={item.toString()} deleteDish={deleteDish} username={username} />}
                    keyExtractor={item => item.toString()}
                    numColumns={1}
                />
            </View>
        </View>
    );
}