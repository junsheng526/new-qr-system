import { useState } from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

var tableRef: {onSnapshot: (arg0: (querySnapshot: any) => void) => void};

const numColumns = 3;
const formatData = (data: any, numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }
  return data;
};

var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;

function sortAlphaNum(a: any, b: any) {
  // console.log(a);
  a = a.name;
  // console.log(a);
  b = b.name;
  var aA = a.replace(reA, '');
  var bA = b.replace(reA, '');
  if (aA === bA) {
    var aN = parseInt(a.replace(reN, ''), 10);
    var bN = parseInt(b.replace(reN, ''), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
}

const Table = () => {
  const [tables, setTables] = useState<string[]>();

  const fetchTable = () => {
    tableRef.onSnapshot((querySnapshot: any[]) => {
      const tableList: {name: any; status: any; paymentChoice: any}[] = [];
      querySnapshot.forEach(
        (doc: {data: () => {name: any; status: any; paymentChoice: any}}) => {
          const {name, status, paymentChoice} = doc.data();
          tableList.push({
            name,
            status,
            paymentChoice,
          });
        },
      );

      setTables(tableList.sort(sortAlphaNum));
    });
  };

  return (
    <View>
      <Text>Table</Text>
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  item: {
    backgroundColor: '#64d8cb',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    height: Dimensions.get('window').width / numColumns,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },

  header: {
    color: 'black',
    backgroundColor: '#000',
    fontWeight: 'bold',
    fontSize: 30,
    // fontFamily: "Roboto",
    padding: 10,
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
    fontWeight: 'bold',
  },
  tableData: {
    // fontFamily: "Roboto",
    textAlign: 'center',
  },
});
