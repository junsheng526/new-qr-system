import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export interface OrderProps {
    dish: any;
    index?: number;
}

const DishItem = (props: OrderProps) => {
    const { dish, index } = props;

    return (
        <View style={{
            flexDirection: 'row',
        }}>
            <Text style={[styles.tableData, {
                flex: 5
            }]}>
                {dish ? dish.name : 'N/A'}
            </Text>
            <Text style={[styles.tableData, {
                flex: 2,
            }]}>
                {dish ? 'Qty: ' + dish.quantity : 0}
            </Text>
            <Text style={[styles.tableData, {
                flex: 3,
                textAlign: 'right',
            }]}>
                {dish ? 'RM ' + dish.price.toFixed(2) : 0}
            </Text>
        </View>
    );
};

export default DishItem;

const styles = StyleSheet.create({
    tableData: {
        paddingHorizontal: 10,
        fontSize: 14,
        fontWeight: '700',
    },
});
