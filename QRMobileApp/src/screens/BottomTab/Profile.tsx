import {useNavigation} from '@react-navigation/native';
import {getAuth, signOut} from 'firebase/auth';
import {
  Alert,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const imageWidth = width * 0.2;
const imageHeight = height * 0.2;

const Profile = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const user = auth.currentUser;

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View>
        <Text style={styles.displayName}>{'Admin'}</Text>
        <View style={styles.menuICons}>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => {
              navigation.navigate('Menu' as never);
            }}>
            {/* <FontAwesome name="book" size={50} color="#64d8cb" /> */}
            <Text style={{fontWeight: 'bold'}}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => {
              Alert.alert('Email: pjj851135136@gmail.com\nTel: 6083815169');
            }}>
            {/* <FontAwesome name="plus" size={50} color="#64d8cb" /> */}
            <Text style={{fontWeight: 'bold'}}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Admin</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>
      </View>
      <Button
        color="#AD40AF"
        title="Logout"
        // style={styles.button}
        onPress={handleSignOut}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#AAA',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuICons: {
    flex: 1,
    margin: 0,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
  },
  profileInfo: {
    flex: 2,
  },
  displayName: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 15,
  },

  menuIcon: {
    margin: 0,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
  },
  profPic: {
    alignSelf: 'center',
  },

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#AD40AF',
  },
  value: {
    fontSize: 25,
  },
  button: {
    flex: 1,
    width: 20,
  },
});
