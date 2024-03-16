import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { OrderModel } from '../../screens/orders/model';
import TableOrder from './TableOrder';
import Button from '../Atoms/Button';

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
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                  Table {tableNumber}
                </Text>
                <Text style={{
                  fontSize: 11,
                }}>
                  Today at 12:33 AM
                </Text>
              </View>
              <View>
                <Text style={{
                  fontSize: 13,
                  textAlign: 'right',
                }}>
                  {'Order No - ' + '11001010'}
                </Text>
                <Text style={{
                  fontSize: 16,
                  textAlign: 'right',
                }}>
                  Total: RM 106.00
                </Text>
              </View>
            </View>
          </View>
          <Divider />
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <TableOrder order={item} index={index} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{
            flexDirection: 'row',
            margin: 8,
            justifyContent: 'space-between',
          }}>
            <Button
              onPress={() => { }}
              title={'Edit Order'}
              buttonStyles={{
                borderColor: '#5FBDFF',
                borderWidth: 1,
                paddingVertical: 8,
                paddingHorizontal: 8,
                borderRadius: 6,
                margin: 2,
              }}
              textStyles={{
                color: '#5FBDFF',
              }} />
            <View style={{
              flexDirection: 'row',
            }}>
              <Button
                onPress={() => { }}
                title={'Cancel Order'}
                buttonStyles={{
                  backgroundColor: 'red',
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                  borderRadius: 6,
                  margin: 2,
                }}
                textStyles={{
                  color: '#FFFFFF',
                }} />
              <Button
                onPress={() => { }}
                title={'Complete Order'}
                buttonStyles={{
                  backgroundColor: '#4CCD99',
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                  borderRadius: 6,
                  margin: 2,
                }}
                textStyles={{
                  color: '#FFFFFF',
                }} />
            </View>
          </View>
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
    backgroundColor: 'white',
  },
});
