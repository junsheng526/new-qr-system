import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Order from '../../components/Order';
import Button from '../../components/Button';
import firestore from '@react-native-firebase/firestore';

const Orders = () => {
  const [tables, setTables] = useState();
  const [unfinished, setUnfinished] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadTables();
    // addExampleDataToFirestore();
  }, [unfinished]);

  const addExampleDataToFirestore = async () => {
    const exampleOrderData = {
      ordertime: new Date(),
      dishes: [
        {name: 'Dish 1', quantity: 2, price: 10},
        {name: 'Dish 2', quantity: 1, price: 15},
        // Add more dishes as needed
      ],
      finished: false,
    };

    const tableNumber = '2'; // Replace with your table number

    try {
      await firestore()
        .collection('restaurants')
        .doc('R00001')
        .collection('tables')
        .doc(tableNumber)
        .collection('orders')
        .add(exampleOrderData);

      console.log('Example order data added to Firestore successfully!');
    } catch (error) {
      console.error('Error adding example order data to Firestore:', error);
    }
  };

  const loadTables = async () => {
    var result = [];
    await firestore()
      .collection('restaurants')
      .doc('R00001')
      .collection('tables')
      .get()
      .then(
        tablesSnapshot => {
          tablesSnapshot.forEach(tableDoc => {
            result.push(tableDoc.ref.id);
          });
          setTables(result);
        },
        err => {
          console.log(`Encountered error: ${err}`);
        },
      );
    var result2 = [];
    const docSnapshot = await firestore()
      .collection('restaurants')
      .doc('R00001')
      .collection('tables')
      .doc('1')
      .get();
    const updatedStatus = docSnapshot.data().status;

    console.log('Check data >> ' + updatedStatus);

    console.log('Check table from Firestore >> ' + JSON.stringify(result));
    // Load tables based on the current unfinished state
    if (tables) {
      const filteredTables = tables.filter((table: string) => {
        // Customize this condition based on your actual data structure
        const order = loadedOrders.find(o => o.tableNumber === table);
        return order ? order.finished === unfinished : false;
      });

      setTables(filteredTables);
    }
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
          <Order key={item} tableNumber={item} filter={!unfinished} />
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
