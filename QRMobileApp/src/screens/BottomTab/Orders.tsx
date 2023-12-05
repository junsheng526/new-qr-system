import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Order from '../../components/Order';
import Button from '../../components/Button';
import {OrderModel} from '../../model/model';

const fakeTables = ['1', '2'];

const Orders = () => {
  const [tables, setTables] = useState(fakeTables);
  const [unfinished, setUnfinished] = useState(true);

  const loadedOrders: OrderModel[] = [
    {
      tableNumber: '1',
      finished: true,
      orders: [
        {
          ordertime: new Date(),
          finished: true,
          dishes: [
            {name: 'Dish 1', quantity: 2, price: 10},
            {name: 'Dish 2', quantity: 1, price: 15},
          ],
        },
      ],
    },
    {
      tableNumber: '2',
      finished: false,
      orders: [
        {
          ordertime: new Date(),
          finished: false,
          dishes: [
            {name: 'Dish 3', quantity: 3, price: 8},
            {name: 'Dish 4', quantity: 1, price: 12},
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    loadTables();
  }, [unfinished]); // Reload tables when the unfinished state changes

  const loadTables = () => {
    // Load tables based on the current unfinished state
    const filteredTables = fakeTables.filter(table => {
      // Customize this condition based on your actual data structure
      const order = loadedOrders.find(o => o.tableNumber === table);
      return order ? order.finished === unfinished : false;
    });

    setTables(filteredTables);
  };

  const handleProgress = () => {
    setUnfinished(true);
  };

  const handleServed = () => {
    setUnfinished(false);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'column', alignSelf: 'center'}}>
        <View style={{flexDirection: 'row', marginVertical: 1}}>
          <Button
            title={'In Progress'}
            onPress={handleProgress}
            buttonStyles={unfinished ? styles.activeTabStyle : styles.tabStyle}
            textStyles={
              unfinished ? styles.activeTabTextStyle : styles.tabTextStyle
            }
          />

          <Button
            title={'Served'}
            onPress={handleServed}
            buttonStyles={unfinished ? styles.tabStyle : styles.activeTabStyle}
            textStyles={
              unfinished ? styles.tabTextStyle : styles.activeTabTextStyle
            }
          />
        </View>
      </View>
      <FlatList
        data={tables}
        renderItem={({item}) => (
          <Order
            key={item}
            tableNumber={item}
            filter={!unfinished}
            loadedOrders={loadedOrders}
          />
        )}
        keyExtractor={item => item}
        extraData={unfinished}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  activeTabStyle: {
    backgroundColor: '#AD40AF',
    padding: 8,
    borderRadius: 8,
    margin: 8,
  },
  tabStyle: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    margin: 8,
  },
  tabTextStyle: {color: '#000'},
  activeTabTextStyle: {color: '#fff'},
  leftTabStyle: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: 145,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: '#000',
    borderWidth: 1,
  },
  rightTabStyle: {
    borderColor: '#000',
    width: 145,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
