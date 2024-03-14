import React, { useEffect, useState } from 'react';
import { firebase } from '@react-native-firebase/firestore';
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { Switch, TextInput } from 'react-native-paper';

export interface DishElementProps {
    username: string
    id: string
    modalVisible: boolean
    setModalVisible: (val: boolean) => void
}

const DishElement = (props: DishElementProps) => {
    const { username, id, modalVisible, setModalVisible } = props;

    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [categories, setCategories] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");
    const [availability, setAvailability] = useState<boolean>(false);
    const [restauCategories, setRestauCategories] = useState<string[]>([]);
    const [checkeds, setCheckeds] = useState<{ [key: string]: boolean }>({});

    const MenuRef = firebase.firestore().collection(username + "Menu");
    const RestaurantRef = firebase.firestore().collection("restaurants").doc(username);

    useEffect(() => {
        fetchDish();
        fetchCategory();
    }, []);

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

    const updateAll = () => {
        MenuRef.doc(id).update({
            name: name,
            price: Number(price),
            description: description,
            availability: availability
        });
        updateCategories();
    }

    const updateCategories = () => {
        const list: string[] = [];
        Object.entries(checkeds).forEach(([key, value]) => {
            if (value === true) {
                list.push(key);
            }
        });
        MenuRef.doc(id).update({ categories: list });
    }

    const createCheckBox = () => {
        return restauCategories.map((category, index) => (
            <View key={index} style={{ flexDirection: 'row' }}>
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
        <View style={{ padding: 10, alignItems: "center" }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableHighlight onPress={() => { updateAll(); setModalVisible(true); }}>
                    <Text style={{ fontSize: 20, padding: 20 }}>Save</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => { setModalVisible(false); }}>
                    <Text style={{ fontSize: 20, padding: 20 }}>Cancel</Text>
                </TouchableHighlight>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 200, padding: 10 }}>
                    <TextInput
                        label="Enter the food name:"
                        value={name}
                        onChangeText={na => setName(na)}
                    />
                    <TextInput
                        label="Enter the price:"
                        value={String(price)}
                        keyboardType="numeric"
                        onChangeText={pri => setPrice(Number(pri))}
                    />
                    <TextInput
                        label="Enter the description:"
                        value={description}
                        multiline={true}
                        onChangeText={des => setDescription(des)}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Availability:</Text>
                        <Switch
                            value={availability}
                            onValueChange={setAvailability}
                        />
                    </View>
                </View>
                <ScrollView>
                    <Text>Category: </Text>
                    {restauCategories ? createCheckBox() : "aa"}
                </ScrollView>
            </View>
        </View>
    );
};

export default DishElement;
