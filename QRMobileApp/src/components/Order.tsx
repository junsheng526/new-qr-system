import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Divider} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

type OrderProps = {
  tableNumber: string;
  filter?: boolean;
};

const Order = (props: OrderProps) => {
  const {tableNumber, filter} = props;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, [filter]);

  const loadOrders = async () => {
    try {
      const snapshot = await firestore()
        .collection('restaurants')
        .doc('R00001')
        .collection('tables')
        .doc(tableNumber)
        .collection('orders')
        .get();

      const result = snapshot.docs.map(doc => doc.data());
      console.log('Check order details >> ' + JSON.stringify(result));
      setOrders(result);
    } catch (error) {
      console.log('Error getting documents', error);
    }
  };

  const orderDish = (dish, index) => (
    <View style={{flexDirection: 'row'}}>
      <Text style={Object.assign({}, {flex: 1.5}, styles.tableData)}>
        {index + 1}
      </Text>
      <Text style={Object.assign({}, {flex: 1.5}, styles.tableData)}>
        {dish.name}
      </Text>
      <Text style={Object.assign({}, {flex: 1.5}, styles.tableData)}>
        {dish.quantity}
      </Text>
      <Text style={Object.assign({}, {flex: 1.5}, styles.tableData)}>
        {dish.price}
      </Text>
    </View>
  );

  const tableItem = (order, index) => {
    const totalQuantity = order.dishes.reduce(
      (acc, dish) => acc + dish.quantity,
      0,
    );
    const totalPrice = order.dishes.reduce(
      (acc, dish) => acc + dish.price * dish.quantity,
      0,
    );

    return (
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{
            backgroundColor: '#AD40AF',
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {`Order #${index + 1} : ${
            order.ordertime
              ? order.ordertime.toDate().toLocaleString()
              : 'No date'
          }`}
        </Text>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', backgroundColor: '#000'}}>
            <Text style={Object.assign({}, {flex: 2}, styles.tableHeader)}>
              Index
            </Text>
            <Text style={Object.assign({}, {flex: 2}, styles.tableHeader)}>
              Item
            </Text>
            <Text style={Object.assign({}, {flex: 1.5}, styles.tableHeader)}>
              Amount
            </Text>
            <Text style={Object.assign({}, {flex: 1.5}, styles.tableHeader)}>
              Each Price
            </Text>
          </View>
          <FlatList
            data={order.dishes}
            renderItem={({item, index}) => orderDish(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#000',
              marginVertical: 5,
            }}>
            <Text style={Object.assign({}, {flex: 3.5}, styles.tableHeader)}>
              Total
            </Text>
            <Text style={Object.assign({}, {flex: 1.5}, styles.tableHeader)}>
              {totalQuantity}
            </Text>
            <Text style={Object.assign({}, {flex: 1.5}, styles.tableHeader)}>
              {totalPrice}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const data = orders.filter(order => order.finished === filter);

  const isEmpty = data.length ? false : true;

  return (
    !isEmpty && (
      <View style={{padding: 10}}>
        <Card style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header}>Table Number: {tableNumber}</Text>
          </View>
          <Divider />
          <FlatList
            data={data}
            renderItem={({item, index}) => tableItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </Card>
        <Divider />
      </View>
    )
  );
};

export default Order;

const styles = StyleSheet.create({
  header: {
    color: 'white',
    backgroundColor: '#000',
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
  tableData: {
    textAlign: 'center',
    fontSize: 15,
    padding: 3,
  },
  container: {
    borderRadius: 10,
    marginVertical: 25,
    marginHorizontal: 0,
  },
});
