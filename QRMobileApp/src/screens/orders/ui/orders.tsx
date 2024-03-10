import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Order from '../../../components/Order';
import Button from '../../../components/Button';
import firestore from '@react-native-firebase/firestore';
import { OrderModel } from '../../../model/model';


export interface OrdersActions {
    init: () => void
}

export let Orders: React.FC<OrdersActions> = ({ init }) => {

    const [tables, setTables] = useState<string[]>();
    const [unfinished, setUnfinished] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadTables();
        // addExampleDataToFirestore();
    }, []);

    const addExampleDataToFirestore = async () => {
        const exampleOrderData = {
            ordertime: new Date(),
            dishes: [
                { name: 'Dish 1', quantity: 2, price: 10 },
                { name: 'Dish 2', quantity: 1, price: 15 },
                // Add more dishes as needed
            ],
            finished: false,
        };

        const tableNumber = '2'; // Replace with your table number

        try {
            await firestore()
                .collection('restaurants')
                .doc('R00001')
                .collection('tables')
                .doc(tableNumber)
                .collection('orders')
                .add(exampleOrderData);

            console.log('Example order data added to Firestore successfully!');
        } catch (error) {
            console.error('Error adding example order data to Firestore:', error);
        }
    };

    const loadTables = async () => {
        try {
            const tablesSnapshot = await firestore()
                .collection('restaurants')
                .doc('R00001')
                .collection('tables')
                .get();

            const result: string[] = [];
            tablesSnapshot.forEach(tableDoc => {
                result.push(tableDoc.id);
            });
            setTables(result);

            const docSnapshot = await firestore()
                .collection('restaurants')
                .doc('R00001')
                .collection('tables')
                .doc('1')
                .get();

            // NEED_TO_SERVE
            const updatedStatus = docSnapshot.data()?.status;
            console.log('Check data >> ' + updatedStatus);

            console.log('Check table from Firestore >> ' + JSON.stringify(result));

            if (tables) {
                const loadedOrders: OrderModel[] = [];
                const filteredTables = tables.filter((table: string) => {
                    const order = loadedOrders.find(o => o.tableNumber === table);
                    return order ? order.finished === unfinished : false;
                });

                setTables(filteredTables);
            }
        } catch (error) {
            console.log('Encountered error:', error);
        }
    };

    const handleProgress = () => {
        setUnfinished(true);
    };

    const handleServed = () => {
        setUnfinished(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', marginVertical: 1 }}>
                    <Button
                        title={'In Progress'}
                        onPress={handleProgress}
                        buttonStyles={unfinished ? styles.activeTabStyle : styles.tabStyle}
                        textStyles={
                            unfinished ? styles.activeTabTextStyle : styles.tabTextStyle
                        }
                    />

                    <Button
                        title={'Served'}
                        onPress={handleServed}
                        buttonStyles={unfinished ? styles.tabStyle : styles.activeTabStyle}
                        textStyles={
                            unfinished ? styles.tabTextStyle : styles.activeTabTextStyle
                        }
                    />
                </View>
            </View>
            <FlatList
                data={tables}
                renderItem={({ item }) => (
                    <Order key={item} tableNumber={item} filter={!unfinished} />
                )}
                keyExtractor={item => item}
                extraData={unfinished}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    activeTabStyle: {
        backgroundColor: '#5FBDFF',
        padding: 8,
        borderRadius: 8,
        margin: 8,
    },
    tabStyle: {
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        margin: 8,
    },
    tabTextStyle: { color: '#000' },
    activeTabTextStyle: { color: '#fff' },
    leftTabStyle: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        width: 145,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderColor: '#000',
        borderWidth: 1,
    },
    rightTabStyle: {
        borderColor: '#000',
        width: 145,
        borderBottomRightRadius: 20,
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
});