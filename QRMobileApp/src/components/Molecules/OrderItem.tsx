import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import DishRow from './DishItem';

export interface OrderItemProps {
    order: any;
    index: number;
}

const OrderItem = (props: OrderItemProps) => {
    const { order, index } = props;

    let total = 0;
    let total_quantity = 0;
    let order_number = index + 1;
    let mTop = index === 0 ? 0 : 20;
    if (order.dishes) {
        for (let i = 0; i < order.dishes.length; i++) {
            let price = order.dishes[i].price;
            let quantity = order.dishes[i].quantity;
            total += price * quantity;
            total_quantity += quantity;
        }
    }

    console.log('order.dishes >> ' + JSON.stringify(order.dishes));

    return (
        <View style={{ flexDirection: 'column', marginTop: mTop }}>
            <Text
                style={{
                    backgroundColor: '#F50057',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingVertical: 7,
                }}>
                {'Order #' + order_number + ' : ' + order.ordertime.toDate().toString()}
            </Text>
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#F50057' }}>
                    <Text style={[styles.tableHeader, { flex: 2 }]}>
                        Item
                    </Text>
                    <Text style={[styles.tableHeader, { flex: 1.5 }]}>
                        Quantity
                    </Text>
                    <Text style={[styles.tableHeader, { flex: 1.5 }]}>
                        Price
                    </Text>
                </View>
                <FlatList
                    data={
                        order.dishes ? order.dishes : [{ name: 'N/A', price: 0, quantity: 0 }]
                    }
                    renderItem={({ item }) => (
                        <DishRow dish={item} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flexDirection: 'row', backgroundColor: '#F50057' }}>
                    <Text style={[styles.tableHeader, { flex: 2 }]}>
                        Total
                    </Text>
                    <Text style={[styles.tableHeader, { flex: 1.5 }]}>
                        {total_quantity}
                    </Text>
                    <Text style={[styles.tableHeader, { flex: 1.5 }]}>
                        {total}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    tableHeader: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
