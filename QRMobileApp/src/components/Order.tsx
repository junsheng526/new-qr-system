import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Divider} from 'react-native-paper';

type OrderProps = {
  tableNumber: string;
  filter?: boolean;
  loadedOrders: Array<{
    tableNumber: string;
    finished: boolean;
    orders: Array<{
      ordertime: any;
      dishes: Array<{
        name: string;
        quantity: number;
        price: number;
      }>;
    }>;
  }>;
};

const Order = (props: OrderProps) => {
  const {tableNumber, filter, loadedOrders} = props;
  //   const [orders, setOrders] = useState([]);
  const [orders, setOrders] = useState(loadedOrders);

  useEffect(() => {
    loadOrders();
    console.log('Checking data >> ' + JSON.stringify(orders));
  }, [filter]);

  const loadOrders = () => {
    setOrders(loadedOrders);
  };

  //   type DishProps = {dish: any; index: number};

  const orderDish = (
    dish: {
      name: string;
      quantity: number;
      price: number;
    },
    index: number,
  ) => (
    <View style={{flexDirection: 'row'}}>
      <Text style={Object.assign({}, {flex: 1.5}, styles.tableData)}>
        {dish ? index + 1 : 'N/A'}
      </Text>
      <Text style={Object.assign({}, {flex: 1.5}, styles.tableData)}>
        {dish ? dish.name : 'N/A'}
      </Text>
      <Text style={Object.assign({}, {flex: 1.5}, styles.tableData)}>
        {dish ? dish.quantity : 0}
      </Text>
      <Text style={Object.assign({}, {flex: 1.5}, styles.tableData)}>
        {dish ? dish.price : 0}
      </Text>
    </View>
  );

  const tableItem = (
    order: {
      ordertime: any;
      dishes: {name: string; quantity: number; price: number}[];
    },
    index: number,
  ) => {
    if (order != null) {
      let total = 0;
      let total_quantity = 0;
      let order_number = index + 1;
      let mTop = index === 0 ? 0 : 20;
      if (order.dishes) {
        for (let i = 0; i < order.dishes.length; i++) {
          const price = order.dishes[i].price;
          const quantity = order.dishes[i].quantity;
          total += price * quantity;
          total_quantity += quantity;
        }
      }
      const date = order.ordertime ? order.ordertime : 'No date';
      let day;

      if (date !== 'No Date') {
        day = date.toLocaleString();
      }

      return (
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              backgroundColor: '#AD40AF',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {'Order #' + order_number + ' : ' + day}
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
              data={
                order.dishes
                  ? order.dishes
                  : [{name: 'N/A', price: 0, quantity: 0}]
              }
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
                {total_quantity}
              </Text>
              <Text style={Object.assign({}, {flex: 1.5}, styles.tableHeader)}>
                {total}
              </Text>
            </View>
          </View>
        </View>
      );
    }

    // Return a default element or null if order is null
    return <View></View>;
  };

  const data =
    orders.filter(order => order.finished === filter)[0]?.orders || [];

  return (
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
    // fontFamily: "Roboto",
  },
  orders: {
    color: 'black',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  tableHeader: {
    color: 'white',
    textAlign: 'center',
    //fontFamily: "Roboto",
    fontSize: 15,
    padding: 10,
    fontWeight: 'bold',
  },
  tableData: {
    // fontFamily: "Roboto",
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
