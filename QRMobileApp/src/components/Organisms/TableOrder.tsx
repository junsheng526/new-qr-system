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
            <Divider />
            <Text
                style={styles.orderTitle}>
                {`Order #${index + 1} : ${order.ordertime
                    ? order.ordertime.toDate().toLocaleString()
                    : 'No date'
                    }`}
            </Text>
            <Divider />
            <View style={{ flexDirection: 'column' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#5FBDFF',
                        // borderColor: '#ececec',
                    }}>
                    <Text style={[styles.tableHeader, { flex: 2 }]}>
                        Index
                    </Text>
                    <Text style={[styles.tableHeader, { flex: 2 }]}>
                        Item
                    </Text>
                    <Text style={[styles.tableHeader, { flex: 1.5 }]}>
                        Amount
                    </Text>
                    <Text style={[styles.tableHeader, { flex: 1.5 }]}>
                        Each Price
                    </Text>
                </View>
                <FlatList
                    data={order.dishes}
                    renderItem={({ item, index }) => <DishItem dish={item} index={index} />}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#5FBDFF',
                        marginVertical: 5,
                    }}>
                    <Text style={[styles.tableHeader, { flex: 3.5 }]}>
                        Total
                    </Text>
                    <Text style={[styles.tableHeader, { flex: 1.5 }]}>
                        {totalQuantity}
                    </Text>
                    <Text style={[styles.tableHeader, { flex: 1.5 }]}>
                        {totalPrice}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default TableOrder;

const styles = StyleSheet.create({
    header: {
        color: 'white',
        backgroundColor: '#5FBDFF',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10,
    },
    tableHeader: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        padding: 10,
        fontWeight: 'bold',
    },
    orderTitle: {
        backgroundColor: '#5FBDFF',
        borderColor: '#ececec',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
});
