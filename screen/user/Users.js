import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {deleteData, getAdminData} from '../../components/api';
import {useSelector} from 'react-redux';
import {globalStyle} from '../../components/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoadingCard from '../../components/loading';
export default function Users(props) {
  const userData = useSelector(state => state.auth);
  const [phone, setPhone] = useState(null);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const getUser = async () => {
    if (phone != null) {
      setLoading(true);
      const resData = await getAdminData(
        `/users/findByPhone/${phone}`,
        userData.token,
      );
      if (resData.con) {
        setUser(resData.result);
        setShowCard(true);
      } else console.log(resData);
      ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
      setLoading(false);
    }
  };
  const showConfirmDialog = () => {
    return Alert.alert('Are you sure?', 'To delete Customer', [
      {
        text: 'Yes',
        onPress: () => {
          deleteUser();
        },
      },
      {
        text: 'No',
      },
    ]);
  };
  const deleteUser = async () => {
    setLoading(true);
    const resData = await deleteData(
      `/users/drop/${user._id}`,
      userData.token,
    );
    setLoading(false);

    ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
    props.navigation.goBack();
  };

  const UserCard = ({item}) => {
    return (
      <>
        <View style={styles.userContainer}>
          <Text style={styles.label}>Name : {item.name}</Text>
          <Text style={styles.label}>Phone : {item.phone}</Text>
          <Text style={styles.label}>Email : {item.email}</Text>
          <Text style={styles.label}>Points : {item.points}</Text>
          <Text style={styles.label}>Address : {item.address}</Text>
          <Text style={styles.label}>Type : {item.role.name}</Text>
        </View>

        {userData.role.name == 'admin' && (
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('RoleManage', {post: item})
              }
              style={styles.btnHistory}>
              <Feather name="user-check" color="#000" size={30} />
              <Text style={styles.label}>Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => showConfirmDialog()}
              style={styles.btnHistory}>
              <Feather name="trash" color="red" size={30} />
              <Text style={styles.label}>Delete User</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('UserRecord', {uid: item._id})
            }
            style={styles.btnHistory}>
            <MaterialIcons name="notes" color="#000" size={30} />
            <Text style={styles.label}> History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('PointsManage', {post: item})
            }
            style={styles.btnHistory}>
            <FontAwesome5 name="coins" color="#000" size={30} />
            <Text style={styles.label}>Add Points</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  if (loading) {
    return <LoadingCard />;
  }

  return (
    <View style={globalStyle.container}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.inputBox}
          placeholder="Search user by phone number"
          placeholderTextColor="#00BCD4"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={text => setPhone(text)}
        />
        <TouchableOpacity onPress={() => getUser()} style={styles.findBtn}>
          <Text style={{color: '#fff', fontSize: 16}}>Search</Text>
        </TouchableOpacity>
      </View>
      {showCard == true && <UserCard item={user} />}
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    width: '100%',
    height: 190,
    backgroundColor: '#fff',
    marginVertical: 3,
    padding: 10,
  },
  findBtn: {
    width: 70,
    height: 40,
    backgroundColor: '#448AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  inputBox: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 10,
  },
  label: {
    color: '#000',
    marginVertical: 5,
  },
  btnHistory: {
    width: 90,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    margin: 5,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 1,
  },
});
