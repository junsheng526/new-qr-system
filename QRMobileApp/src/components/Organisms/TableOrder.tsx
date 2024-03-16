import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import DishItem from '../Molecules/DishItem';

export interface TableOrderProps {
    order: any;
    index: number;
}

const TableOrder = (props: TableOrderProps) => {
    const { order, index } = props;

    const totalQuantity = order.dishes.reduce(
        (acc: any, dish: any) => acc + dish.quantity,
        0,
    );
    const totalPrice = order.dishes.reduce(
        (acc: any, dish: any) => acc + dish.price * dish.quantity,
        0,
    );

    return (
        <View style={{ flexDirection: 'column' }}>
            {/* <Divider />
            <Text
                style={styles.orderTitle}>
                {`Order #${index + 1} : ${order.ordertime
                    ? order.ordertime.toDate().toLocaleString()
                    : 'No date'
                    }`}
            </Text> */}
            <View style={{ flexDirection: 'column' }}>
                <Divider style={{
                    height: 1,
                    marginBottom: 8,
                }} />
                <FlatList
                    data={order.dishes}
                    renderItem={({ item, index }) => <DishItem dish={item} index={index} />}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Divider style={{
                    height: 1.5,
                    marginTop: 8,
                }} />
                <View
                    style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                    }}>
                    <Text style={{
                        flex: 1,
                        fontSize: 12,
                        padding: 10,
                        fontWeight: '500',
                    }}>
                        Message: Hi, Please pack green sauce in my order and please tell your delivery boy that have to come on 2nd floor because I'm not at home.
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default TableOrder;

const styles = StyleSheet.create({
    tableHeader: {
        textAlign: 'center',
        fontSize: 15,
        padding: 10,
        fontWeight: 'bold',
    },
    orderTitle: {
        borderColor: '#ececec',
        // color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
});
