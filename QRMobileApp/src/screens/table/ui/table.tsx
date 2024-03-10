import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { db } from '../../../common/firebase';
import { Icon } from 'react-native-vector-icons/Icon';
import { Button, Dialog, Divider, Portal, RadioButton, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export interface TableActions {
    init: () => void
}

export interface TableData {
    userId: string
}

var tableRef;

const numColumns = 3;

export let Table: React.FC<TableActions & TableData> = ({
    init,
    userId
}) => {

    const [newTableName, setNewTableName] = useState("");
    const [addTableDialogOpen, setAddTableDialogOpen] = useState(false);
    const [orderDialogOpen, setOrderDialogOpen] = useState(false);
    const [editTableDialogOpen, setEditTableDialogOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [selectedTableStatus, setSelectedTableStatus] = useState("");
    const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
    const [tables, setTables] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [unfinishOrder, setUnfinishOrder] = useState<any[]>([]);

    const hideAddTableDialog = () => setAddTableDialogOpen(false);
    const hideEditTableDialog = () => setEditTableDialogOpen(false);
    const hideOrdersDialog = () => setOrderDialogOpen(false);

    const tableRef = db
        .collection("restaurants")
        .doc("R00001")
        .collection("tables");

    useEffect(() => {
        console.log("userId >> " + JSON.stringify(userId))
        fetchTable();
    }, []);

    const formatData = (data: any, numColumns: number) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
        let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
        while (
            numberOfElementsLastRow !== numColumns &&
            numberOfElementsLastRow !== 0
        ) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }
        return data;
    };

    const addTable = (tableName: string) => {
        if (tableName !== "") {
            tableRef
                .doc(tableName)
                .set({
                    name: tableName,
                    needAssistance: false,
                    status: "NEEDTO_ORDER",
                    paymentChoice: "VISA"
                })
                .then(() => hideAddTableDialog());
        }
    };

    const editTable = (tableName: string) => {
        setEditTableDialogOpen(true);
        setSelectedTable(tableName);
    };

    const deleteTable = (tableName: string | null) => {
        console.log("delete: ", tableName);
        if (tableName != null) {
            tableRef.doc(tableName).delete();
            setEditTableDialogOpen(false);
        }
    };

    const fetchTable = () => {
        tableRef.onSnapshot((querySnapshot) => {
            const tableList: any[] = [];
            querySnapshot.forEach((doc) => {
                const { name, status, paymentChoice } = doc.data();
                tableList.push({
                    name,
                    status,
                    paymentChoice,
                });
            });

            setTables(tableList);
        });
    };

    // const fetchTable = async () => {
    //     try {
    //         const tablesSnapshot = await firestore()
    //             .collection('restaurants')
    //             .doc('R00001')
    //             .collection('tables')
    //             .get();

    //         const tableList: any[] = [];
    //         tablesSnapshot.forEach((doc) => {
    //             const { name, status, paymentChoice } = doc.data();
    //             tableList.push({
    //                 name,
    //                 status,
    //                 paymentChoice,
    //             });
    //         });

    //         setTables(tableList.sort(sortAlphaNum));

    //     } catch (error) {
    //         console.log('Encountered error:', error);
    //     }
    // };

    const ShowOrders = (tablename: string) => {
        setOrderDialogOpen(true);
        setSelectedTable(tablename);
        if (tablename != null) {
            tableRef
                .doc(tablename)
                .collection("orders")
                .get()
                .then((snapshot) => {
                    const fetchedOrder = snapshot.docs.map((doc) => doc.data());
                    const unfinish = fetchedOrder.filter((order) => order.finished == false);
                    setUnfinishOrder(unfinish);
                });
        }
    };

    const clearOrder = (tablename: string | null) => {
        if (tablename != null) {
            let orderRef = tableRef.doc(tablename).collection("orders");
            orderRef.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    var orderDoc = orderRef.doc(doc.id);
                    return orderDoc.update({
                        finished: true,
                    });
                });
            })
                .then(() => tableRef.doc(tablename).update({ status: "NEEDTO_ORDER" }));
        }
    };

    const updateStatus = (tablename: string, value: string) => {
        console.log(value);
        setSelectedTableStatus(value);
        tableRef.doc(tablename).update({ status: value });
    };

    const updatePaymentOption = (tablename: string, value: string) => {
        console.log(value);
        setSelectedPaymentOption(value);
        tableRef.doc(tablename).update({ paymentChoice: value });
    };

    const fetchStatus = () => {
        var tableObj = tables.filter((tb) => tb.name == selectedTable);
        if (tableObj.length != 0) {
            return tableObj[0].status;
        }
    };

    const fetchPaymentOption = () => {
        var tableObj = tables.filter((tb) => tb.name == selectedTable);
        console.log(tableObj);
        if (tableObj.length != 0) {
            return tableObj[0].paymentChoice;
        }
    };

    const changeTableColor = (item: { status: string }) => {
        const curr = item.status;
        switch (curr) {
            case "NEEDTO_ORDER":
                return "#00796b";
            case "NEEDTO_SERVE":
                return "#FFFF00";
            case "NEEDTO_PAY":
                return "#FFA500";
            case "NEEDTO_ASSIST":
                return "#FF0000";
        }
    };

    const renderTable = ({ item }: { item: any }) => {
        if (item.empty === true) {
            return <TouchableOpacity style={[styles.item, styles.itemInvisible]} />;
        } else
            return (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => ShowOrders(item.name)}
                    onLongPress={() => editTable(item.name)}
                >
                    {/* <Icon.Button
                        name="local-dining"
                        backgroundColor={changeTableColor(item)}
                        onPress={() => ShowOrders(item.name)}
                        onLongPress={() => editTable(item.name)}
                    /> */}
                    <TouchableOpacity
                        style={styles.item}
                        // backgroundColor={changeTableColor(item)}
                        onPress={() => ShowOrders(item.name)}
                        onLongPress={() => editTable(item.name)}
                    >
                        <Text>local-dining</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={{ color: changeTableColor(item) }}>{item.status}</Text>
                </TouchableOpacity>
            );
    };

    const renderOrder = (order: any, index: number) => {
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
        console.log("order.dishes >> " + JSON.stringify(order.dishes))
        return (
            <View style={{ flexDirection: "column", marginTop: mTop }}>
                <Text
                    style={{
                        backgroundColor: "#F50057",
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        paddingVertical: 7,
                    }}
                >
                    {"Order #" + order_number + " : " + order.ordertime.toDate().toString()}
                </Text>
                <View style={{ flexDirection: "column" }}>
                    <View style={{ flexDirection: "row", backgroundColor: "#F50057" }}>
                        <Text style={Object.assign({}, { flex: 2 }, styles.tableHeader)}>Item</Text>
                        <Text style={Object.assign({}, { flex: 1.5 }, styles.tableHeader)}>Quantity</Text>
                        <Text style={Object.assign({}, { flex: 1.5 }, styles.tableHeader)}>Price</Text>
                    </View>
                    <FlatList
                        data={order.dishes ? order.dishes : [{ name: "N/A", price: 0, quantity: 0 }]}
                        renderItem={({ item }) => renderDish(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={{ flexDirection: "row", backgroundColor: "#F50057" }}>
                        <Text style={Object.assign({}, { flex: 2 }, styles.tableHeader)}>Total</Text>
                        <Text style={Object.assign({}, { flex: 1.5 }, styles.tableHeader)}>{total_quantity}</Text>
                        <Text style={Object.assign({}, { flex: 1.5 }, styles.tableHeader)}>{total}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderDish = (dish: any) => {
        return (
            <View style={{ flexDirection: "row" }}>
                <Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>
                    {dish ? dish.name : "N/A"}
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

    return (
        <SafeAreaView style={styles.container}>
            <Button
                icon="plus"
                mode="contained"
                color="#26a69a"
                onPress={() => setAddTableDialogOpen(true)}
            >
                <Text style={{ fontSize: 15 }}>Add new table</Text>
            </Button>
            <FlatList
                data={formatData(tables, numColumns)}
                renderItem={renderTable}
                keyExtractor={(item) => item.name}
                numColumns={numColumns}
            />
            <Portal>
                <Dialog visible={addTableDialogOpen} onDismiss={hideAddTableDialog}>
                    <Dialog.Content>
                        <TextInput
                            label="Enter new table name:"
                            value={newTableName}
                            onChangeText={(name) => setNewTableName(name)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => hideAddTableDialog()}>Cancel</Button>
                        <Button
                            onPress={() => {
                                addTable(newTableName);
                                setNewTableName("");
                            }}
                        >
                            Done
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={orderDialogOpen} onDismiss={hideOrdersDialog}>
                    <Dialog.Title>Orders</Dialog.Title>
                    <FlatList
                        data={unfinishOrder}
                        renderItem={({ item, index }) => renderOrder(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={{ flexDirection: "row" }}>
                        <Dialog.Actions>
                            <Button onPress={hideOrdersDialog}>Cancel</Button>
                        </Dialog.Actions>
                        <Dialog.Actions>
                            <Button
                                onPress={() => {
                                    clearOrder(selectedTable);
                                    hideOrdersDialog();
                                }}
                            >
                                Finished
                            </Button>
                        </Dialog.Actions>
                    </View>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={editTableDialogOpen} onDismiss={hideEditTableDialog}>
                    <Dialog.Title>Table Status</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group
                            onValueChange={(value) => {
                                updateStatus(selectedTable || '', value);
                            }}
                            value={fetchStatus()}
                        >
                            <View>
                                <Text>Wait for order</Text>
                                <RadioButton value="NEEDTO_ORDER" />
                            </View>
                            <View>
                                <Text>Need to Serve</Text>
                                <RadioButton value="NEEDTO_SERVE" />
                            </View>
                            <View>
                                <Text>Need to help</Text>
                                <RadioButton value="NEEDTO_ASSIST" />
                            </View>
                        </RadioButton.Group>
                        <Divider />
                        <Divider />
                        <Text>Customer's chosen payment method</Text>
                        <RadioButton.Group
                            onValueChange={(value) => {
                                updatePaymentOption(selectedTable || '', value)
                            }}
                            value={fetchPaymentOption()}
                        >
                            <View>
                                <Text>CASH</Text>
                                <RadioButton value="CASH" />
                            </View>
                            <View>
                                <Text>VISA </Text>
                                <RadioButton value="VISA" />
                            </View>
                        </RadioButton.Group>
                        <Button
                            icon="delete"
                            onPress={() => {
                                deleteTable(selectedTable);
                            }}
                            uppercase={true}
                        >
                            Delete
                        </Button>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button icon="close" onPress={hideEditTableDialog}>
                            Cancel
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
    },
    item: {
        backgroundColor: "#64d8cb",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        margin: 3,
        height: Dimensions.get("window").width / numColumns,
    },
    itemInvisible: {
        backgroundColor: "transparent",
    },
    title: {
        fontSize: 20,
        textAlign: "center",
    },

    header: {
        color: "black",
        backgroundColor: "#F50057",
        fontWeight: "bold",
        fontSize: 30,
        // fontFamily: "Roboto",
        padding: 10,
    },
    orders: {
        color: "black",
        textAlign: "center",
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
    tableHeader: {
        color: "white",
        textAlign: "center",
        //fontFamily: "Roboto",
        fontWeight: "bold",
    },
    tableData: {
        // fontFamily: "Roboto",
        textAlign: "center",
    },
});