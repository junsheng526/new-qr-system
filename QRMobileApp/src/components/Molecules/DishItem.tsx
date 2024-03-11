import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export interface OrderProps {
    dish: any;
}

const DishRow = (props: OrderProps) => {
    const { dish } = props;

    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>
                {dish ? dish.name : 'N/A'}
            </Text>
            <Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>
                {dish ? dish.quantity : 0}
            </Text>
            <Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>
                {dish ? dish.price : 0}
            </Text>
        </View>
    );
};

export default DishRow;

const styles = StyleSheet.create({
    tableData: {
        // fontFamily: "Roboto",
        textAlign: 'center',
    },
});
