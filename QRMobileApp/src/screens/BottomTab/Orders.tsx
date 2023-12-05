import {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import Order from '../../components/Order';

const fakeTables = ['1', '2'];

export interface Orders {
  title: string;
  orders: string[];
}

const Orders = () => {
  // const [tables, setTables] = useState([]);
  const [tables, setTables] = useState(fakeTables);

  const [unfinished, setUnfinished] = useState(true);

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = () => {
    setTables(fakeTables);
    // const result = [];
    // firebase
    //   .firestore()
    //   .collection('restaurants')
    //   .doc(String(loggedUser.displayName))
    //   .collection('tables')
    //   .get()
    //   .then(tablesSnapshot => {
    //     tablesSnapshot.forEach(tableDoc => {
    //       result.push(tableDoc.ref.id);
    //     });
    //     setTables(result);
    //   })
    //   .catch(err => {
    //     console.log(`Encountered error: ${err}`);
    //   });
  };

  const handleProgress = () => {
    setUnfinished(true);
    console.log('Check unfinish >> ' + unfinished);
  };

  const handleServed = () => {
    setUnfinished(false);
    console.log('Check unfinish >> ' + unfinished);
  };

  // const renderObjects = () => {
  //   return (
  //     <View>
  //       <Divider style={{backgroundColor: 'blue'}} />;
  //     </View>
  //   );
  // };

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'column', alignSelf: 'center'}}>
        <View style={{flexDirection: 'row', marginVertical: 1}}>
          <Button title="In Progress" onPress={handleProgress} />
          <Button title="Served" onPress={handleServed} />
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
  activeTabStyle: {backgroundColor: 'white'},
  tabStyle: {backgroundColor: '#000'},
  tabTextStyle: {color: 'white'},
  activeTabTextStyle: {color: '#000'},
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
