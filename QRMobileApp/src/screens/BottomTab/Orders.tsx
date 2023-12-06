import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Order from '../../components/Order';
import Button from '../../components/Button';
import {OrderModel} from '../../model/model';
import firestore from '@react-native-firebase/firestore';

const fakeTables = ['1'];

const Orders = () => {
  const [tables, setTables] = useState();
  const [unfinished, setUnfinished] = useState(true);
  const [orders, setOrders] = useState([]);

  const loadedOrders: OrderModel[] = [];

  useEffect(() => {
    loadFirebaseTables();
    loadTables();
  }, [unfinished]); // Reload tables when the unfinished state changes

  const loadTables = async () => {
    var result: string[] = [];
    // koiSushiTables
    await firestore()
      .collection('restaurants')
      .doc('R00001')
      .collection('tables')
      .get()
      .then(
        tablesSnapshot => {
          tablesSnapshot.forEach(tableDoc => {
            // console.log(tableDoc.ref.id)
            result.push(tableDoc.ref.id);
            // this.setState({ tables: [...this.state.tables, tableDoc.ref.id] });
          });
          setTables(result);
        },
        err => {
          console.log(`Encountered error: ${err}`);
        },
      );

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

  const loadFirebaseTables = () => {
    var result = [];
    // console.log(this.props.tableNumber)
    // console.log("orders: ", koiSushiTables.doc(this.props.tableNumber).collection("orders").ordertime);
    firestore()
      .collection('restaurants')
      .doc('R00001')
      .collection('tables')
      .doc('1')
      .collection('orders')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data());
          result.push(doc.data());
        });
        console.log('check result >> ' + JSON.stringify(result));
        setOrders(result);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
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
            loadedOrders={orders}
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
