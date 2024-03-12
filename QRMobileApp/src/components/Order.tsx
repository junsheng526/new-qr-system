import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { OrderModel } from '../screens/orders/model';
import TableOrder from './Organisms/TableOrder';

type OrderProps = {
  tableNumber: string;
  filter?: boolean;
};

const Order = (props: OrderProps) => {
  const { tableNumber, filter } = props;
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const snapshot = await firestore()
        .collection('restaurants')
        .doc('R00001')
        .collection('tables')
        .doc(tableNumber)
        .collection('orders')
        .get();

      const result = snapshot.docs.map(doc => doc.data() as OrderModel);
      setOrders(result);
    } catch (error) {
      setError('Error getting orders');
    } finally {
      setLoading(false);
    }
  };

  const data = orders.filter(order => order.finished === filter);

  const isEmpty = data.length ? false : true;

  return (
    !isEmpty && (
      <View style={{ padding: 10 }}>
        <Card style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header}>Table Number: {tableNumber}</Text>
          </View>
          <Divider />
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <TableOrder order={item} index={index} />
            )}
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
  container: {
    borderRadius: 10,
    marginVertical: 25,
    marginHorizontal: 0,
  },
});
