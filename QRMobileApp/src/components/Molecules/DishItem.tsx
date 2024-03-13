import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export interface OrderProps {
    dish: any;
    index?: number;
}

const DishItem = (props: OrderProps) => {
    const { dish, index } = props;

    return (
        <View style={{ flexDirection: 'row' }}>
            {index !== undefined &&
                (
                    <Text style={styles.tableData}>
                        {index + 1}
                    </Text>
                )
            }
            <Text style={styles.tableData}>
                {dish ? dish.name : 'N/A'}
            </Text>
            <Text style={styles.tableData}>
                {dish ? dish.quantity : 0}
            </Text>
            <Text style={styles.tableData}>
                {dish ? dish.price : 0}
            </Text>
        </View>
    );
};

export default DishItem;

const styles = StyleSheet.create({
    tableData: {
        textAlign: 'center',
        fontSize: 15,
        padding: 3,
        flex: 1.5
    },
});
