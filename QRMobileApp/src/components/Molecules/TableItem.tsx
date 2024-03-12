import React from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { EMTPY_TABLE } from '../../constants/assets';
import { changeTableColor } from '../../common/utils';
import { TABLE_COLUMN } from '../../constants/constants';

export interface TableProps {
    item: any;
    onPress: (tablename: string) => void;
    onLongPress: (tableName: string) => void;
}

const TableButton = (props: TableProps) => {
    const { item, onPress, onLongPress } = props;

    return (
        <>
            {!item.empty ? (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => onPress(item.name)}
                    onLongPress={() => onLongPress(item.name)}>
                    {/* <Icon.Button
                        name="local-dining"
                        backgroundColor={changeTableColor(item)}
                        onPress={() => ShowOrders(item.name)}
                        onLongPress={() => editTable(item.name)}
                    /> */}
                    <TouchableOpacity
                        style={styles.item}
                        // backgroundColor={changeTableColor(item)}
                        onPress={() => onPress(item.name)}
                        onLongPress={() => onLongPress(item.name)}>
                        {/* <View style={{ height: 20, width: 60, backgroundColor: changeTableColor(item) }}>
                            <Text>Dine In</Text>
                        </View> */}
                        <Image source={EMTPY_TABLE} style={{ height: 75, width: 75 }} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={{ color: changeTableColor(item) }}>{item.status}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={[styles.item, styles.itemInvisible]} />
            )}
        </>
    );
};

export default TableButton;

const styles = StyleSheet.create({
    item: {
        // backgroundColor: "#64d8cb",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 3,
        height: Dimensions.get('window').width / TABLE_COLUMN,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
});
